export const getAllCategoryPreview = (products) => {
  const result = {};

  products.forEach((item) => {
    if (!result[item.category]) {
      result[item.category] = [];
    }

    if (result[item.category].length < 4) {
      result[item.category].push(item);
    }
  });

  // console.log(result);
  return result;
};

export const getProductsByCategory = (products, category) => {
  if (category === "all") return products;

  return products.filter((p) => p.category === category);
};

export const paginate = (data, page, limit) => {
  const start = (page - 1) * limit;
  return data.slice(start, start + limit);
};
