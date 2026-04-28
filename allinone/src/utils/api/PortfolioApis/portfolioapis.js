const BASE_URL = "http://localhost:3000/users";

const getUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
};

const updateUser = async (userId, data) => {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user");
};

const getSafePortfolio = (user) => {
  return {
    totalShares: Number(user.portfolio?.totalShares) || 0,
    totalInvested: Number(user.portfolio?.totalInvested) || 0,
  };
};

export const getPortfolio = async (userId) => {
  const user = await getUser(userId);
  return getSafePortfolio(user);
};

export const buyAndSell = async (userId, stockquantity,stockprice) => {
  const user = await getUser(userId);

  const portfolio = getSafePortfolio(user);

  const qty = Number(stockquantity);
  const price = Number(stockprice);

  const updatedPortfolio = {
    totalShares:  qty,
    totalInvested: price,
  };

  await updateUser(userId, {
    portfolio: updatedPortfolio,
  });

  return updatedPortfolio;
};

