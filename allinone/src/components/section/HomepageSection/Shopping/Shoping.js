export const getRandomProducts = (products, count = 10) => {
  return [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

