import { buildURL } from "../../../utils/api/api_builder";
import { PRODUCTS_ENDPOINTS } from "./products_endpoints";

export async function fetchProducts(page) {
  const products = PRODUCTS_ENDPOINTS.products;
  console.log(products, "prod");

  const url = buildURL(products);
  url.searchParams.set("_page", page);
  url.searchParams.set("_limit", 50);
  try {
    const productsResponse = await fetch(url);
    const productsData = await productsResponse.json();
    console.log(productsData);
    return productsData;
   
  } catch (error) {}
}
