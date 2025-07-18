import React, { useState } from 'react';
import { User, MapPin, Package, Settings, LogOut, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  const { user, orders, logout, updateProfile, addAddress, removeAddress, login } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(user || {});
  const [loginEmail, setLoginEmail] = useState('');
  // Address editing state
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    isDefault: false
  });
  const [addingAddress, setAddingAddress] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setEditingProfile(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'shipped': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Доставлено';
      case 'shipped': return 'Отправлено';
      case 'processing': return 'Обрабатывается';
      case 'cancelled': return 'Отменено';
      default: return 'Ожидает';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Личный кабинет
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {!user ? (
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Войдите в свой аккаунт
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Для доступа к личному кабинету необходимо войти в систему
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="password"
                placeholder="Пароль"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => login(loginEmail)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Войти
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex border-b border-gray-200 dark:border-gray-800">
              {[
                { id: 'profile', label: 'Профиль', icon: User },
                { id: 'orders', label: 'Заказы', icon: Package },
                { id: 'addresses', label: 'Адреса', icon: MapPin },
                { id: 'settings', label: 'Настройки', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Информация о профиле
                    </h3>
                    <button
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {editingProfile ? 'Отменить' : 'Редактировать'}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Имя
                      </label>
                      <input
                        type="text"
                        value={profileData.name || ''}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!editingProfile}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email || ''}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!editingProfile}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone || ''}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!editingProfile}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-900"
                      />
                    </div>
                    {editingProfile && (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveProfile}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Сохранить
                        </button>
                        <button
                          onClick={() => setEditingProfile(false)}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Отменить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    История заказов
                  </h3>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        У вас пока нет заказов
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                Заказ #{order.id}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(order.date).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.quantity} шт. × {item.price.toLocaleString('ru-RU')} ₽
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {order.deliveryMethod}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              {order.total.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Адреса доставки</h3>
                    <button
                      onClick={() => {
                        setAddingAddress(true);
                        setEditingAddressId(null);
                        setAddressForm({ name: '', street: '', city: '', postalCode: '', isDefault: false });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-lg"
                    >
                      Добавить адрес
                    </button>
                  </div>
                  {/* Add/Edit Address Form */}
                  {(addingAddress || editingAddressId) && (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        if (editingAddressId) {
                          // Update address
                          updateProfile({
                            addresses: user.addresses.map(addr =>
                              addr.id === editingAddressId ? { ...addr, ...addressForm } : addr
                            )
                          });
                        } else {
                          // Add address
                          addAddress(addressForm);
                        }
                        setAddingAddress(false);
                        setEditingAddressId(null);
                        setAddressForm({ name: '', street: '', city: '', postalCode: '', isDefault: false });
                      }}
                      className="space-y-2 mb-4"
                    >
                      <input
                        type="text"
                        placeholder="Название (например, Дом)"
                        value={addressForm.name}
                        onChange={e => setAddressForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Улица, дом, квартира"
                        value={addressForm.street}
                        onChange={e => setAddressForm(f => ({ ...f, street: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Город"
                        value={addressForm.city}
                        onChange={e => setAddressForm(f => ({ ...f, city: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Почтовый индекс"
                        value={addressForm.postalCode}
                        onChange={e => setAddressForm(f => ({ ...f, postalCode: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={e => setAddressForm(f => ({ ...f, isDefault: e.target.checked }))}
                        />
                        <span>Сделать адресом по умолчанию</span>
                      </label>
                      <div className="flex space-x-2">
                        <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Сохранить</button>
                        <button type="button" onClick={() => { setAddingAddress(false); setEditingAddressId(null); }} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg">Отмена</button>
                      </div>
                    </form>
                  )}
                  {/* Address List */}
                  <div className="space-y-4">
                    {user?.addresses.map(addr => (
                      <div key={addr.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{addr.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{addr.street}, {addr.city}, {addr.postalCode}</div>
                          {addr.isDefault && <span className="text-xs text-blue-600 ml-2">(по умолчанию)</span>}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingAddressId(addr.id);
                              setAddingAddress(false);
                              setAddressForm(addr);
                            }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-lg"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => removeAddress(addr.id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Настройки
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-900 dark:text-white">Уведомления</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-900 dark:text-white">Email рассылка</span>
                      <input type="checkbox" className="toggle" />
                    </div>
                    
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Выйти из аккаунта</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};