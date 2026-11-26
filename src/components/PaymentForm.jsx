import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, User } from 'lucide-react';

const PaymentForm = ({ amount, onSuccess }) => {
  //estado de carga para el boton
  const [cardType, setCardType] = useState('default');
  const [isPending, setIsPending] = useState(false);
  const [cardData, setCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });

const handleChange = (e) => {
  const { name, value } = e.target;
  let formattedValue = value;

  // 1. Lógica para Número de Tarjeta
  if (name === 'number') {
  //const firstDigit = value[0];
  // Mejora técnica (opcional pero recomendada)
const cleanValue = value.replace(/\D/g, ''); // Limpiar primero
const firstDigit = cleanValue[0]; // Detectar después
    if (firstDigit === '4') setCardType('visa');
    else if (firstDigit === '5') setCardType('mastercard');
  else setCardType('default');
  formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }

  // 2. Lógica para Expiración 
  if (name === 'expiry') {
    const cleanValue = value.replace(/\D/g, '');
    
    // Bloqueo de mes inválido (ej: no permitir que empiece con 2, 3...)
    if (cleanValue.length === 1 && !/[01]/.test(cleanValue)) return;
    
    // Bloqueo si el mes es > 12
    if (cleanValue.length === 2) {
      const month = parseInt(cleanValue);
      if (month < 1 || month > 12) return;
    }

    formattedValue = cleanValue.replace(/(\d{2})(?=\d)/g, '$1/').slice(0, 5);
  }
  
  // 3. Lógica para CVC
  if (name === 'cvc') {
    formattedValue = value.replace(/\D/g, '').slice(0, 3);
  }

  // 4. Nombre (Solo letras para un toque extra de pro)
 if (name === 'name') {
  // 1. Solo permitimos letras, tildes y espacios
  let filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

  // 2. Eliminamos cualquier espacio que esté al principio de la cadena
  formattedValue = filteredValue.trimStart(); 
  
  // Opcional: Si no quieres que pongan dos espacios juntos en medio:
   formattedValue = formattedValue.replace(/\s+/g, ' ');
}

  setCardData({ ...cardData, [name]: formattedValue });
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsPending(true);
  // Simulamos una espera de red
  setTimeout(() => {
    setIsPending(false);
    onSuccess(cardData);
  }, 2000);
};

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-indigo-600 p-6 text-white text-center">
        <p className="text-indigo-100 text-sm uppercase tracking-wider">Total a pagar</p>
        <h2 className="text-4xl font-bold">${amount}</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Campo: Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre en la tarjeta</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              name="name"
              type="text" 
              placeholder="Juan Pérez"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={handleChange}
              value={cardData.name}
              required
            />
          </div>
        </div>

        {/* Campo: Número de Tarjeta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300">
              {cardType === 'visa' && <span className="text-blue-600 font-bold italic text-xs tracking-tighter">VISA</span>}
              {cardType === 'mastercard' && <span className="text-orange-500 font-bold text-xs tracking-tighter">MC</span>}
              {cardType === 'default' && <CreditCard className="text-gray-400 h-5 w-5" />}
            </div>
            <input 
              name="number"
              type="text" 
              placeholder="0000 0000 0000 0000"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={handleChange}
              value={cardData.number}
              maxLength="19"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Expiración */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiración</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                name="expiry"
                type="text" 
                placeholder="MM/YY"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
                value={cardData.expiry}
                maxLength="5"
                required
              />
            </div>
          </div>

          {/* CVC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                name="cvc"
                type="password" 
                placeholder="***"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={handleChange}
                value={cardData.cvc}
                maxLength="3"
                required
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isPending}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
            isPending ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {isPending ? "Procesando..." : "Pagar Ahora"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;