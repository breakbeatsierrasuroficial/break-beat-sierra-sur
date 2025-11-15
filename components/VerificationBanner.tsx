import React from 'react';

const VerificationBanner: React.FC = () => {
  return (
    <div className="bg-yellow-500/10 text-yellow-400 text-center p-3 text-sm border-b border-t border-yellow-500/30">
        Tu cuenta de socio está <span className="font-bold">pendiente de verificación</span>. Algunas funciones, como comentar o reservar, estarán desactivadas hasta que un administrador apruebe tu cuenta.
    </div>
  );
};

export default VerificationBanner;
