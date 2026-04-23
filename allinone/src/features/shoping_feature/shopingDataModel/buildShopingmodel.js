export const getAllCategoryPreview = (products) => {
  if (!Array.isArray(products)) return {}; // ✅ FIX

  const result = {};

  products.forEach((item) => {
    if (!item.category) return;

    if (!result[item.category]) {
      result[item.category] = [];
    }

    if (result[item.category].length < 4) {
      result[item.category].push(item);
    }
  });

  return result;
};

export const getProductsByCategory = (products, category) => {
  if (!Array.isArray(products)) return [];

  if (category === "all") return products;

  return products.filter((p) => p.category === category);
};

export const paginate = (data, page, limit) => {
  if (!Array.isArray(data)) return [];

  const start = (page - 1) * limit;
  return data.slice(start, start + limit);
};