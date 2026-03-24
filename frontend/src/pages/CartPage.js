import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Handle Checkout
  const handleCheckout = () => {
    if (!token) {
        alert("Please log in to proceed to checkout.");
        navigate('/login');
        return;
    }
    alert("Checkout functionality is not yet implemented!");
    // clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added any books yet.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-container">
        {/* Cart Items List */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img src={item.imageURL || item.image} alt={item.title} />
              </div>
              
              <div className="item-details">
                <Link to={`/book/${item._id}`}>
                    <h3>{item.title}</h3>
                </Link>
                <p className="item-author">by {item.author}</p>
                <p className="item-price">₹ {item.price}</p>
              </div>

              <div className="item-actions">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1, item.stockQuantity)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1, item.stockQuantity)}
                    disabled={item.quantity >= item.stockQuantity}
                  >
                    +
                  </button>
                </div>
                
                <p className="item-subtotal">
                  Subtotal: ₹ {(item.price * item.quantity).toFixed(2)}
                </p>

                <button 
                  className="btn btn-danger btn-remove"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹ {getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₹ 0.00</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>₹ {getCartTotal().toFixed(2)}</span>
          </div>
          
          <button className="btn btn-success checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          
          <button className="btn btn-warning clear-cart-btn" onClick={() => {
              if(window.confirm("Are you sure you want to empty your cart?")) clearCart();
          }}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
