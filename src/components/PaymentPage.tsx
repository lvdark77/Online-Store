import React, { useState } from 'react';

interface PaymentPageProps {
  onPaymentSuccess: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ onPaymentSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    card: '',
    expiry: '',
    cvv: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onPaymentSuccess();
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Платеж успешно!</h2>
        <p className="text-center">Спасибо за ваш заказ. Вы будете перенаправлены в историю заказов.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Оплата заказа</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Имя на карте"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="card"
          placeholder="Номер карты"
          value={form.card}
          onChange={handleChange}
          required
          maxLength={19}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            required
            maxLength={5}
            className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={form.cvv}
            onChange={handleChange}
            required
            maxLength={4}
            className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Оплатить
        </button>
      </form>
    </div>
  );
}; 