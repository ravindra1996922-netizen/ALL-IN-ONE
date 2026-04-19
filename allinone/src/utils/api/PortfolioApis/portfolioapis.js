const BASE_URL = "http://localhost:3000/users";

const getUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
};

const updateUser = async (userId, data) => {
  await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const getPortfolio = async (userId) => {
  const user = await getUser(userId);
  return user.portfolio || { stockQuantity: 0, Stockprice: 0, wallet: 0 };
};

const updateStock = async (userId, stock) => {
  const user = await getUser(userId);

  let portfolio = user.portfolio || {
    stockQuantity: 0,
    Stockprice: 0,
    wallet: 0,
  };

  const qty = stock.quantity; // ✅ object se
  const totalCost = stock.price * qty;
  const swallet = stock.wallet;

  let updatedPortfolio = {
    stockQuantity: qty,
    Stockprice: stock.price,
    wallet: swallet,
  };

  await updateUser(userId, {
    portfolio: updatedPortfolio,
  });

  return { updatedPortfolio };
};
const stock1 = {
  price: 3300,
  quantity: 1,
  wallet: 1000,
};

(async () => {
  try {
    const h = await updateStock(1, stock1);
    console.log(h);
  } catch (err) {}
})();
