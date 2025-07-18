import React from 'react';
import { ArrowRight, Truck, Shield, Headphones, Gift } from 'lucide-react';
import { ProductCard } from './ProductCard';

const heroSlides = [
  {
    id: 1,
    title: 'Новая коллекция iPhone 15',
    subtitle: 'Скидки до 15% на все модели',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Купить сейчас',
    bgColor: 'from-blue-600 to-purple-700'
  },
  {
    id: 2,
    title: 'Беспроводные наушники',
    subtitle: 'Премиум качество звука',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Посмотреть',
    bgColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 3,
    title: 'Игровые консоли',
    subtitle: 'PlayStation 5 в наличии',
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Заказать',
    bgColor: 'from-orange-600 to-red-700'
  }
];

const categories = [
  {
    id: 1,
    name: 'Смартфоны',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '2,456 товаров'
  },
  {
    id: 2,
    name: 'Ноутбуки',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    count: '1,234 товара'
  },
  {
    id: 3,
    name: 'Наушники',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '892 товара'
  },
  {
    id: 4,
    name: 'Планшеты',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '567 товаров'
  },
  {
    id: 5,
    name: 'Умные часы',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '345 товаров'
  },
  {
    id: 6,
    name: 'Игры',
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400',
    count: '1,567 товаров'
  }
];

const featuredProducts = [
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
  }
];

const advantages = [
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Доставка по всей России от 1 дня'
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: 'Официальная гарантия на все товары'
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    description: 'Круглосуточная техническая поддержка'
  },
  {
    icon: Gift,
    title: 'Бонусная программа',
    description: 'Накапливайте баллы и получайте скидки'
  }
];

interface MainPageProps {
  onNavigate: (page: string) => void;
}

export const MainPage: React.FC<MainPageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl mx-4 md:mx-8">
        <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgColor} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
          />
          
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl text-white/90 mb-8 animate-fade-in">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 animate-slide-up"
                >
                  <span>{heroSlides[currentSlide].buttonText}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Популярные категории
          </h2>
          <button 
            onClick={() => onNavigate('catalog')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
          >
            <span>Все категории</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onNavigate('catalog')}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.count}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 mx-4 md:mx-8 rounded-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Мега распродажа!
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Скидки до 70% на тысячи товаров. Только до конца месяца!
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-white">15</div>
                  <div className="text-sm text-white/80">дней</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-white">08</div>
                  <div className="text-sm text-white/80">часов</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-white">42</div>
                  <div className="text-sm text-white/80">минут</div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('sales')}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Посмотреть предложения
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Распродажа"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Рекомендуемые товары
          </h2>
          <button 
            onClick={() => onNavigate('catalog')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
          >
            <span>Все товары</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Почему выбирают нас
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                  <advantage.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 dark:bg-blue-700 mx-4 md:mx-8 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Подпишитесь на новости
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Получайте информацию о новых товарах и специальных предложениях
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Подписаться
            </button>
          </div>
          
          <p className="text-sm text-blue-200 mt-4">
            Нажимая "Подписаться", вы соглашаетесь с обработкой персональных данных
          </p>
        </div>
      </section>

    </div>
  );
};