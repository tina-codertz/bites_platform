import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Order() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialProduct = queryParams.get('product') || 'Maandazi'; // Default to Maandazi if no product

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    quantity: 1,
    product: initialProduct,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Update product in formData if query param changes
    setFormData((prev) => ({ ...prev, product: initialProduct }));
  }, [initialProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders', formData);
      setMessage(
        response.data.message || `Order for ${formData.product} submitted successfully!`
      );
      setFormData({ email: '', phone: '', quantity: 1, product: 'Maandazi' });
    } catch (error) {
      console.error('Error submitting order:', error.response?.data || error.message);
      let errorMessage = 'Error submitting order. Please try again.';
      if (error.response?.status === 404) {
        errorMessage = 'API endpoint not found. Ensure the backend server is running on port 5000 and the proxy is configured.';
      } else if (error.response?.status === 500) {
        errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server error. Check the backend logs for details.';
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network error. Verify the backend server is running and accessible.';
      }
      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Place Your Order</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Submit Order
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
        <Link
          to="/"
          className="block mt-6 text-center bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default Order;