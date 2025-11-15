import React, { useState, useContext } from 'react';
import { Product, ReservationHistoryItem } from '../types';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';


const ProductCard: React.FC<{ product: Product; onConfirmReservation: (productId: number, size: string, quantity: number) => void; }> = ({ product, onConfirmReservation }) => {
    const { user } = useContext(AuthContext);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const canReserve = user && user.role === 'SOCIO' && user.status === 'VERIFIED';
    // Fix: Let TypeScript infer the types for the reduce function's parameters.
    // The accumulator 'sum' is correctly typed as a number from the initial value '0'.
    const totalStock = Object.values(product.stock).reduce((sum, current) => sum + current, 0);
    const isProductAvailable = product.active && totalStock > 0;
    
    const maxQuantity = selectedSize ? product.stock[selectedSize] : 0;

    const handleSizeSelect = (size: string) => {
        if (product.stock[size] > 0) {
            setSelectedSize(size);
            setQuantity(1); // Reset quantity on size change
        }
    };

    const handleQuantityChange = (amount: number) => {
        const newQuantity = quantity + amount;
        if (newQuantity >= 1 && newQuantity <= maxQuantity) {
            setQuantity(newQuantity);
        }
    };

    const handleReserve = () => {
        if (canReserve && selectedSize && quantity > 0) {
            onConfirmReservation(product.id, selectedSize, quantity);
            setSelectedSize(null);
            setQuantity(1);
        }
    };
    
    return (
        <div className={`group relative border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50 flex flex-col ${!isProductAvailable ? 'opacity-50' : ''}`}>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-900">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                 {!isProductAvailable && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><span className="text-white font-bold text-lg tracking-widest uppercase">Agotado</span></div>}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <p className="text-lg font-semibold text-green-400">{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-400 flex-grow">{product.description}</p>
                
                {/* Reservation controls */}
                <div className="mt-auto pt-4">
                    {/* Size Selector */}
                    <div className="mt-4">
                        <label className="text-sm font-medium text-gray-400">Talla:</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {Object.keys(product.stock).map(size => {
                                const stock = product.stock[size];
                                const isDisabled = stock === 0;
                                const isSelected = selectedSize === size;
                                return (
                                    <button 
                                        key={size}
                                        onClick={() => handleSizeSelect(size)}
                                        disabled={isDisabled}
                                        className={`px-3 py-1.5 text-sm font-semibold rounded-md border transition-colors duration-200
                                            ${isDisabled ? 'border-gray-700 bg-gray-800 text-gray-600 line-through cursor-not-allowed' : ''}
                                            ${!isDisabled && isSelected ? 'bg-green-500/20 border-green-500 text-green-400' : ''}
                                            ${!isDisabled && !isSelected ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-green-500' : ''}
                                        `}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="mt-4">
                        <label className="text-sm font-medium text-gray-400">Cantidad:</label>
                        <div className="flex items-center gap-3 mt-2">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                disabled={!selectedSize || quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                            >
                                -
                            </button>
                            <span className="w-10 text-center font-bold text-white text-lg">{selectedSize ? quantity : '-'}</span>
                             <button
                                onClick={() => handleQuantityChange(1)}
                                disabled={!selectedSize || quantity >= maxQuantity}
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                            >
                                +
                            </button>
                            {selectedSize && <span className="text-xs text-gray-500">({maxQuantity} disp.)</span>}
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleReserve}
                        disabled={!canReserve || !isProductAvailable || !selectedSize}
                        className="w-full mt-6 bg-green-500/80 text-black font-bold py-2.5 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-green-500 enabled:shadow-lg enabled:shadow-green-500/10"
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
};


const Merch: React.FC = () => {
    const { products, updateProduct } = useContext(DataContext);
    const { user, updateUser } = useContext(AuthContext);
    
    const handleConfirmReservation = (productId: number, size: string, quantity: number) => {
        if (!user) return;
        const productToReserve = products.find(p => p.id === productId);
        if (!productToReserve) return;

        // Add to user's reservation history
        const newReservation: ReservationHistoryItem = {
            reservationId: Date.now(),
            productName: productToReserve.name,
            size,
            quantity,
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        };

        const updatedUser = {
            ...user,
            reservationHistory: [...user.reservationHistory, newReservation]
        };
        updateUser(updatedUser);
        
        // Update product stock in context
        const newStock = { ...productToReserve.stock };
        newStock[size] -= quantity;
        updateProduct({ ...productToReserve, stock: newStock });
        
        // In a real app, this would also add to a global 'reservations' database table
        
        alert(`¡Reserva confirmada para ${user.name}! ${quantity}x ${productToReserve.name} (Talla: ${size}).\nNos pondremos en contacto contigo a través de ${user.email} para gestionar el pago y la entrega. ¡Gracias!`);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p => p.active).map(product => (
                    <ProductCard key={product.id} product={product} onConfirmReservation={handleConfirmReservation} />
                ))}
            </div>
        </div>
    );
};

export default Merch;