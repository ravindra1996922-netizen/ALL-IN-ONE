import React from "react";
import { useCart } from "../context/cartContext/useCart";
import { useAuth } from "../context/authContext/useAuth";
import {
  removeFromCartApi,
  updateQtyApi,
} from "../utils/api/cartApis/cartApis";


const CartPage = () => {
  const { cart, cartDispatch } = useCart();
  const { user } = useAuth();


  const handleInc = async (id) => {
    if (!user?.id) return;

    const updatedCart = await updateQtyApi(user.id, id, "inc");

    cartDispatch({
      type: "SET_CART",
      payload: updatedCart,
    });
  };


  const handleDec = async (id) => {
    if (!user?.id) return;

    const updatedCart = await updateQtyApi(user.id, id, "dec");

    cartDispatch({
      type: "SET_CART",
      payload: updatedCart,
    });
  };

 
  const handleRemove = async (id) => {
    if (!user?.id) return;

    const updatedCart = await removeFromCartApi(user.id, id);

    cartDispatch({
      type: "SET_CART",
      payload: updatedCart,
    });
  };

 
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) {
    return <h3 className="text-center mt-5">🛒 Your cart is empty</h3>;
  }

  return (
    <div className="container my-4">
      <h3 className="mb-4">Your Cart</h3>

      <div className="row">
        {cart.map((item) => (
          <div className="col-md-6 mb-4" key={item.id}>
            <div className="card p-3 d-flex flex-row align-items-center">
             
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />

              
              <div className="ms-3 flex-grow-1">
                <h6>{item.title}</h6>

                <p className="text-success fw-bold mb-2">₹{item.price}</p>

               
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => handleDec(item.id)}
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => handleInc(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

             
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div className="text-end mt-4">
        <h4>Total: ₹{totalPrice}</h4>
      </div>
    </div>
  );
};

export default CartPage;
