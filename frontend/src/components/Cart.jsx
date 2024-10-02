import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../cartSlice";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  const totalQuantity = useSelector((state) => state.cart.totalQuantity) || 0;
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  console.log(cartItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <Alert className="bg-indigo-100 p-4 rounded-lg flex items-center space-x-4">
          <ShoppingCart className="h-5 w-5 text-indigo-600" />
          <div>
            <AlertTitle className="text-indigo-800 font-semibold">
              Your cart is empty
            </AlertTitle>
            <AlertDescription className="text-indigo-700">
              Add some items to your cart to get started!
            </AlertDescription>
          </div>
        </Alert>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="py-6 flex items-center space-x-6 hover:bg-gray-50 transition ease-in-out duration-150 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    Price: ₹{item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button
                      className="text-gray-500 hover:text-gray-700 transition ease-in-out"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700 transition ease-in-out"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700 mt-3 flex items-center justify-end space-x-1 transition ease-in-out"
                    onClick={() => handleRemoveFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="h-5 w-5" />
                    <span>Remove</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-xl font-semibold text-gray-900">
              <p>Subtotal ({totalQuantity} items)</p>
              <p>₹{totalPrice.toLocaleString()}</p>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-8">
              <button className="w-full bg-indigo-600 border border-transparent rounded-lg py-3 px-8 flex items-center justify-center text-lg font-semibold text-white hover:bg-indigo-700 transition ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Checkout
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  type="button"
                  className="text-indigo-600 font-medium hover:text-indigo-500"
                >
                  Continue Shopping <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
