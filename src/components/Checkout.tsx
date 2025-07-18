import React, { useState } from 'react';
import { X, CreditCard, Truck, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, onOrderComplete }) => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, addOrder } = useUser();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses.find(a => a.isDefault)?.id || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleOrder = () => {
    if (!user) {
      setError('Пожалуйста, войдите в аккаунт для оформления заказа.');
      return;
    }
    setError('');

    const order = {
      status: 'pending' as const,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: totalPrice,
      deliveryMethod: deliveryMethod === 'courier' ? 'Курьер' : 'Почта России',
      deliveryAddress: user.addresses.find(a => a.id === selectedAddress)!,
      trackingNumber: 'RU' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    addOrder(order);
    clearCart();
    setStep(1); // Reset checkout steps
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Оформление заказа
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600'
                  }`}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`w-16 h-0.5 ${
                      step > num ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Адрес доставки
                </h3>
                
                <div className="space-y-3">
                  {user?.addresses.map((address) => (
                    <label key={address.id} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {address.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {address.street}, {address.city}, {address.postalCode}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Способ доставки
                  </h4>
                  
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="delivery"
                      value="courier"
                      checked={deliveryMethod === 'courier'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                    />
                    <Truck className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Курьерская доставка
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Доставка в течение 1-2 дней • 500 ₽
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="delivery"
                      value="post"
                      checked={deliveryMethod === 'post'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                    />
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Почта России
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Доставка в течение 3-7 дней • 200 ₽
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Способ оплаты
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Банковской картой
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Visa, Mastercard, МИР
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="payment"
                      value="sbp"
                      checked={paymentMethod === 'sbp'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">₽</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Система быстрых платежей
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Мгновенный перевод
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">₽</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Наличными при получении
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Оплата курьеру
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Подтверждение заказа
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Товары в заказе
                  </h4>
                  
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.quantity} шт. × {item.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Итого:
                      </span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {totalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                {step === 1 ? 'Отмена' : 'Назад'}
              </button>
              <button
                onClick={() => step < 3 ? setStep(step + 1) : handleOrder()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                disabled={step === 3 && !user}
              >
                {step === 3 ? 'Оформить заказ' : 'Далее'}
              </button>
            </div>
            {error && (
              <div className="mt-4 text-red-600 text-center">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};