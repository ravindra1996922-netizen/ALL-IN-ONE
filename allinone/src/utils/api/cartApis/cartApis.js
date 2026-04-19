const BASE_URL = "http://localhost:3000/users";

export const getCart = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  const data = await res.json();

  return data.cart || [];
};

export const saveCart = async (userId, cart) => {
  await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart }),
  });
};

export const addToCartApi = async (userId, item) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  const userData = await res.json();

  const cart = userData.cart || [];

  const exist = cart.find((p) => p.id === item.id);

  let updatedCart;

  if (exist) {
    updatedCart = cart.map((p) =>
      p.id === item.id ? { ...p, qty: p.qty + 1 } : p,
    );
  } else {
    updatedCart = [...cart, { ...item, qty: 1 }];
  }

  await saveCart(userId, updatedCart);

  return updatedCart;
};

export const removeFromCartApi = async (userId, productId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  const userData = await res.json();

  const updatedCart = (userData.cart || []).filter(
    (item) => item.id !== productId,
  );

  await saveCart(userId, updatedCart);

  return updatedCart;
};

export const updateQtyApi = async (userId, productId, type) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  const userData = await res.json();

  let updatedCart = userData.cart || [];

  updatedCart = updatedCart.map((item) => {
    if (item.id === productId) {
      if (type === "inc") {
        return { ...item, qty: item.qty + 1 };
      } else if (type === "dec") {
        return { ...item, qty: Math.max(1, item.qty - 1) };
      }
    }
    return item;
  });

  await saveCart(userId, updatedCart);

  return updatedCart;
};
const testProduct = {
  id: 101,
  title: "Test Product",
  price: 50,
  image: "https://via.placeholder.com/150",
};

const handleTestAdd = async (userId) => {
  const updatedCart = await addToCartApi(userId, testProduct);

  console.log("UPDATED CART:", updatedCart);

  return updatedCart;
};
