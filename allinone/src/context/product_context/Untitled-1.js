// // //  function buildURL(path) {
// // //   const baseURL ="http://localhost:3000/";
// // //   return new URL(path, baseURL);
// // // }

// // //  async function searchProducts(page, searchValue = "") {
// // //   const products = "/products";

// // //   const url = buildURL(products);

// // //   url.searchParams.set("_page", page);
// // //   url.searchParams.set("_limit", 50);

// // //   if (searchValue && searchValue.trim() !== "") {
// // //     url.searchParams.set("q", searchValue.trim());
// // //   }

// // //   try {
// // //     const response = await fetch(url);
// // //     const data = await response.json();
// // //     console.log(data.length)
// // //     console.log(data)
// // //     return data;
// // //   } catch (error) {
// // //     console.error("searchProducts error:", error);
// // //     throw error;
// // //   }
// // // }
// // // searchProducts(1,"red  ")

// // function buildURL(path) {
// //   const baseURL = "http://localhost:3000/";
// //   return new URL(path, baseURL);
// // }

// // async function searchProducts(page, searchValue = "") {
// //   const products = "/products";

// //   const url = buildURL(products);

// //   // 📦 pagination
// //   url.searchParams.set("_page", page);
// //   url.searchParams.set("_limit", 50);

// //   const value = searchValue.trim();

// //   // 🔥 ONLY FIELD SEARCH (searchKey)
// //   if (value) {
// //     url.searchParams.set("searchKey_like", value);
// //   }

// //   try {
// //     const response = await fetch(url);
// //     const data = await response.json();

// //     console.log("count:", data.length);
// //     console.log(data);

// //     return data;
// //   } catch (error) {
// //     console.error("searchProducts error:", error);
// //     throw error;
// //   }
// // }

// // // 🔥 TEST
// // searchProducts(1, "red white");

// function buildURL(path) {
//   const baseURL = "http://localhost:3000/";
//   return new URL(path, baseURL);
// }

// async function searchProducts(page, searchValue = "") {
//   const products = "/products";

//   const url = buildURL(products);

//   // 📦 pagination
//   url.searchParams.set("_page", page);
//   url.searchParams.set("_limit", 50);

//   const value = searchValue.trim();

//   // 🔥 MULTI WORD SUPPORT (backend side LIKE)
//   if (value) {
//     const words = value.split(" ");

//     // multiple searchKey_like params
//     words.forEach((word) => {
//       url.searchParams.append("searchKey_like", word);
//     });
//   }

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log("count:", data.length);
//     console.log(data);

//     return data;
//   } catch (error) {
//     console.error("searchProducts error:", error);
//     throw error;
//   }
// }

// // 🔥 TEST
// searchProducts(1, "red shirt");
function buildURL(path) {
  const baseURL = "http://localhost:3000/";
  return new URL(path, baseURL);
}

/**
 * 🔥 API CALL (fetch raw data)
 */
async function searchProducts(page, searchValue = "") {
  const products = "/products";

  const url = buildURL(products);

  url.searchParams.set("_page", page);
  url.searchParams.set("_limit", 50);

  const value = searchValue.trim();

  // backend loose filtering (OR type)
  if (value) {
    const words = value.split(" ");

    words.forEach((word) => {
      url.searchParams.append("searchKey_like", word);
    });
  }

  const response = await fetch(url);
  const data = await response.json();

  console.log("API COUNT:", data.length);

  return data;
}

/**
 * 🔥 INTERSECTION LOGIC (AND SEARCH)
 */
function applyIntersection(data, searchValue) {
  if (!searchValue.trim()) return data;

  const words = searchValue.toLowerCase().split(" ");

  return data.filter((item) => {
    const text = item.searchKey.toLowerCase();

    // ALL words must exist
    return words.every((word) => text.includes(word));
  });
}

/**
 * 🔥 FINAL FUNCTION (API + INTERSECTION)
 */
async function searchProductsWithIntersection(page, searchValue) {
  const data = await searchProducts(page, searchValue);

  const filtered = applyIntersection(data, searchValue);

  console.log("AFTER INTERSECTION:", filtered.length);

  console.log(filtered);

  return filtered;
}

// 🔥 TEST
searchProductsWithIntersection(1, "red shoe men");
