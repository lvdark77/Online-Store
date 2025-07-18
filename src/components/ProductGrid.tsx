import React from 'react';
import { ProductCard } from './ProductCard';

const mockProducts = [
  {
    id: '1',
    name: 'Беспроводные наушники Sony WH-1000XM4',
    price: 24990,
    originalPrice: 29990,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 1234,
    category: 'Электроника'
  },
  {
    id: '2',
    name: 'Смартфон iPhone 15 Pro 128GB',
    price: 89990,
    originalPrice: 94990,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 2156,
    category: 'Смартфоны'
  },
  {
    id: '3',
    name: 'Ноутбук MacBook Air M2 13" 256GB',
    price: 119990,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 892,
    category: 'Компьютеры'
  },
  {
    id: '4',
    name: 'Умные часы Apple Watch Series 9',
    price: 39990,
    originalPrice: 44990,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 567,
    category: 'Носимые устройства'
  },
  {
    id: '5',
    name: 'Планшет iPad Pro 11" 128GB',
    price: 69990,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 1098,
    category: 'Планшеты'
  },
  {
    id: '6',
    name: 'Игровая консоль PlayStation 5',
    price: 49990,
    originalPrice: 54990,
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 3245,
    category: 'Игры'
  }
];

export const ProductGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Популярные товары
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {['Все', 'Электроника', 'Смартфоны', 'Компьютеры', 'Носимые устройства'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};