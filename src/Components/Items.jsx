import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Chapati', price: 500 },
  { id: 2, name: 'Maandazi', price: 100 },
  { id: 3, name: 'Crisps', price: 500 },
];

function Items() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleProduct = (product) => {
    if (selectedProducts.includes(product.id)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product.id]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className='flex items-center justify-center'>
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Available Products</h2>
        <Link to="/" className='py-3 px-2 rounded-lg text-2xl font-bold text-blue-900 hover:to-blue-950'>Home</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-6 bg-white rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl ${
              selectedProducts.includes(product.id) ? 'border-2 border-blue-400 bg-blue-50' : ''
            }`}
            onClick={() => toggleProduct(product)}
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-4">Tsh{product.price.toFixed(2)}</p>
            <Link
              to={`/order?product=${encodeURIComponent(product.name)}`}
              className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Order Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;