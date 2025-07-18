import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  deliveryMethod: string;
  trackingNumber?: string;
  deliveryAddress: Address;
}

interface UserContextType {
  user: User | null;
  orders: Order[];
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [
      // Mock order for demonstration
      {
        id: 'demo-order-1',
        date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        status: 'delivered',
        items: [
          {
            id: '1',
            name: 'Беспроводные наушники Sony WH-1000XM4',
            price: 24990,
            quantity: 1,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
          }
        ],
        total: 25490, // including delivery
        deliveryMethod: 'Курьер',
        trackingNumber: 'RU123456789',
        deliveryAddress: {
          id: '1',
          name: 'Дом',
          street: 'ул. Тверская, д. 10, кв. 25',
          city: 'Москва',
          postalCode: '125009',
          isDefault: true
        }
      }
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const login = (email: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      email,
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      addresses: [
        {
          id: '1',
          name: 'Дом',
          street: 'ул. Тверская, д. 10, кв. 25',
          city: 'Москва',
          postalCode: '125009',
          isDefault: true
        }
      ]
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString()
    };
    setUser(prev => prev ? {
      ...prev,
      addresses: [...prev.addresses, newAddress]
    } : null);
  };

  const removeAddress = (id: string) => {
    setUser(prev => prev ? {
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    } : null);
  };

  const updateAddress = (id: string, address: Partial<Address>) => {
    setUser(prev => prev ? {
      ...prev,
      addresses: prev.addresses.map(addr =>
        addr.id === id ? { ...addr, ...address } : addr
      )
    } : null);
  };

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider value={{
      user,
      orders,
      login,
      logout,
      updateProfile,
      addAddress,
      removeAddress,
      updateAddress,
      addOrder
    }}>
      {children}
    </UserContext.Provider>
  );
};