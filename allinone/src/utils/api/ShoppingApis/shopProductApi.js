import { END_POINTS } from "../../constant/constant";
import { buildURL } from "../apibuilder/api_builder";

export async function fetchProducts() {
  const products = END_POINTS.products;
  const url = buildURL(products);
  try {
    const productsResponse = await fetch(url);
    const productsData = await productsResponse.json();

    return productsData;
  } catch (error) {}
}

