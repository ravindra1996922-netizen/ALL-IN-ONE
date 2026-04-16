import { END_POINTS } from "../../constant/constant";
import { buildURL } from "../apibuilder/api_builder";



export async function fetchProducts(page) {
  const products = END_POINTS.products;
  console.log(products, "prod");

  const url = buildURL(products);
  url.searchParams.set("_page", page);
  url.searchParams.set("_limit", 50);
  try {
    const productsResponse = await fetch(url);
    const productsData = await productsResponse.json();
    console.log(productsData.length);
    return productsData;
  } catch (error) {}
}

export async function searchProducts(page, searchValue = "") {
  const products = PRODUCTS_ENDPOINTS.products;

  const url = buildURL(products);

  url.searchParams.set("_page", page);
  url.searchParams.set("_limit", 50);

  const value = searchValue.trim();

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
