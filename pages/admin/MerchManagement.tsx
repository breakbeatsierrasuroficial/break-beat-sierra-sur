import React, { useState, useMemo, useContext } from 'react';
import { Reservation, Product } from '../../types';
import { DataContext } from '../../context/DataContext';
import Modal from '../../components/Modal';

const ProductForm: React.FC<{
    product: Product | null;
    onClose: () => void;
    onSave: (productData: Omit<Product, 'id'>) => void;
}> = ({ product, onClose, onSave }) => {
    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price || '');
    const [imageUrl, setImageUrl] = useState(product?.images[0] || '');
    const [stock, setStock] = useState(product?.stock || { "S": 0, "M": 0, "L": 0, "XL": 0, "XXL": 0 });
    const [active, setActive] = useState(product?.active ?? true);

    const handleStockChange = (size: string, value: string) => {
        const numValue = parseInt(value, 10);
        setStock(prev => ({ ...prev, [size]: isNaN(numValue) ? 0 : numValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, description, price, images: [imageUrl], stock, active });
        onClose();
    };

    const commonInputClass = "mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-1">
            <div>
                <label className="block text-sm font-medium text-gray-300">Nombre del Producto</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className={commonInputClass} required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Descripción</label>
                <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className={commonInputClass} required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300">Precio (ej: 25€)</label>
                <input type="text" value={price} onChange={e => setPrice(e.target.value)} className={commonInputClass} required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">URL de la Imagen</label>
                <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={commonInputClass} required placeholder="https://picsum.photos/seed/product/600/600"/>
            </div>
            <fieldset className="border border-gray-700 p-4 rounded-md">
                <legend className="text-sm font-medium text-gray-300 px-2">Stock por Talla</legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.keys(stock).map(size => (
                        <div key={size}>
                            <label className="block text-xs font-medium text-gray-400">{size}</label>
                            <input type="number" value={stock[size]} onChange={e => handleStockChange(size, e.target.value)} className={commonInputClass} min="0" />
                        </div>
                    ))}
                </div>
            </fieldset>
             <div className="flex items-center space-x-3 pt-2">
                <input type="checkbox" id="active" checked={active} onChange={e => setActive(e.target.checked)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500" />
                <label htmlFor="active" className="text-sm font-medium text-gray-300">Producto Activo (visible para socios)</label>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancelar</button>
                <button type="submit" className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-md transition-colors">Guardar Producto</button>
            </div>
        </form>
    );
};


const MerchManagement = () => {
    const { products, addProduct, updateProduct, deleteProduct, reservations, confirmSaleAndAwardPoints } = useContext(DataContext);
    
    // Product Modal State
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    // Reservation Management Modal State
    const [managingReservation, setManagingReservation] = useState<Reservation | null>(null);
    const [pointsToAward, setPointsToAward] = useState<string>('0');

    // Reservation Filter State
    const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'CONFIRMED' | 'CANCELED'>('all');
    const [productFilter, setProductFilter] = useState<string>('all');

    const handleOpenProductModal = (product: Product | null = null) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsProductModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
        if (editingProduct) {
            updateProduct({ ...editingProduct, ...productData });
        } else {
            addProduct(productData);
        }
    };
    
    const handleDeleteProduct = (id: number) => {
        if (window.confirm('¿Seguro que quieres eliminar este producto? Esto no afectará a las reservas ya existentes.')) {
            deleteProduct(id);
        }
    };
    
    // Reservation management logic
    const handleOpenManageModal = (reservation: Reservation) => {
        setManagingReservation(reservation);
        setPointsToAward('0');
    };
    
    const handleConfirmSale = () => {
        if (managingReservation) {
            confirmSaleAndAwardPoints(managingReservation.id, parseInt(pointsToAward, 10) || 0);
            setManagingReservation(null);
        }
    };
    
    const filteredReservations = useMemo(() => {
        return reservations.filter(res => {
            const statusMatch = statusFilter === 'all' || res.status === statusFilter;
            const productMatch = productFilter === 'all' || res.productId === parseInt(productFilter, 10);
            return statusMatch && productMatch;
        });
    }, [reservations, statusFilter, productFilter]);
    
    const productOptions = useMemo(() => {
        return [...new Set(reservations.map(r => r.productId))].map(productId => {
            const product = products.find(p => p.id === productId);
            return { id: productId, name: product?.name || `Producto ID: ${productId}`};
        });
    }, [products, reservations]);
    
    const commonInputClass = "mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

     return (
        <div>
            {/* Product Management Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-400">Gestión de Productos</h2>
                <button onClick={() => handleOpenProductModal()} className="bg-green-500 text-black font-bold py-2 px-4 rounded-md hover:bg-green-400 transition-colors">Añadir Producto</button>
            </div>
            <div className="bg-gray-900 rounded-lg overflow-x-auto mb-12">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                        <tr>
                            <th className="px-6 py-3">Producto</th>
                            <th className="px-6 py-3">Stock Total</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => {
                            const totalStock = Object.values(p.stock).reduce((a: number, b: number) => a + b, 0);
                            return (
                                <tr key={p.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                                    <td className="px-6 py-4">{totalStock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                            {p.active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button onClick={() => handleOpenProductModal(p)} className="text-blue-400 hover:underline">Editar</button>
                                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 hover:underline">Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Reservation Management Section */}
            <h2 className="text-2xl font-bold text-green-400 mb-4">Pedidos / Reservas</h2>
            <div className="mb-4 p-4 bg-gray-800/50 rounded-lg flex items-center space-x-4">
                 <div>
                    <label htmlFor="statusFilter" className="block text-xs font-medium text-gray-400">Filtrar por Estado</label>
                    <select id="statusFilter" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-gray-700 text-white rounded-md px-3 py-1.5 mt-1 text-sm">
                        <option value="all">Todos</option>
                        <option value="PENDING">Pendiente</option>
                        <option value="CONFIRMED">Confirmado</option>
                        <option value="CANCELED">Cancelado</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="productFilter" className="block text-xs font-medium text-gray-400">Filtrar por Producto</label>
                    <select id="productFilter" value={productFilter} onChange={e => setProductFilter(e.target.value)} className="bg-gray-700 text-white rounded-md px-3 py-1.5 mt-1 text-sm">
                        <option value="all">Todos los productos</option>
                        {productOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                    </select>
                </div>
            </div>

             <div className="bg-gray-900 rounded-lg overflow-x-auto">
                 <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                        <tr>
                            <th className="px-6 py-3">Producto</th>
                            <th className="px-6 py-3">Socio</th>
                            <th className="px-6 py-3">Fecha</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                     <tbody>
                        {filteredReservations.map(res => (
                            <tr key={res.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                                <td className="px-6 py-4 text-white font-medium">{res.productName} ({res.quantity}x {res.size})</td>
                                <td className="px-6 py-4">{res.userName} ({res.socioId})<br/><span className="text-xs text-gray-500">{res.userEmail}</span></td>
                                <td className="px-6 py-4">{res.date}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${res.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {res.status === 'PENDING' ? 'Pendiente' : 'Confirmada'}
                                    </span>
                                    {res.pointsAwarded !== null && <div className="text-xs text-green-300 mt-1">+{res.pointsAwarded} pts</div>}
                                </td>
                                <td className="px-6 py-4">
                                    {res.status === 'PENDING' && <button onClick={() => handleOpenManageModal(res)} className="text-blue-400 hover:underline">Gestionar</button>}
                                </td>
                            </tr>
                        ))}
                     </tbody>
                 </table>
                 {filteredReservations.length === 0 && <p className="text-center p-8 text-gray-500">No hay reservas que coincidan con los filtros seleccionados.</p>}
            </div>

            <Modal isOpen={isProductModalOpen} onClose={handleCloseProductModal} title={editingProduct ? 'Editar Producto' : 'Añadir Producto'}>
                <ProductForm product={editingProduct} onClose={handleCloseProductModal} onSave={handleSaveProduct} />
            </Modal>

            <Modal isOpen={!!managingReservation} onClose={() => setManagingReservation(null)} title="Confirmar Venta y Otorgar Puntos">
                {managingReservation && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-400">
                            Confirmando la venta de <span className="font-bold text-white">{managingReservation.productName}</span> para el socio <span className="font-bold text-white">{managingReservation.userName}</span>.
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Puntos a otorgar por esta compra</label>
                            <input type="number" value={pointsToAward} onChange={e => setPointsToAward(e.target.value)} className={commonInputClass} min="0" />
                        </div>
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                           <button type="button" onClick={() => setManagingReservation(null)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancelar</button>
                           <button onClick={handleConfirmSale} className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-md transition-colors">Confirmar Venta</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default MerchManagement;