export const getCollections = async () => {
  try {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    if (!collections.ok) throw new Error("Failed to fetch collections");
    return collections.json();
  } catch (error) {
    console.error("Error fetching collections:", error);
    return null;
  }
};
console.log("data")

export const getCollectionDetails = async (collectionId: string) => {
  try {
    const collection = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
    if (!collection.ok) throw new Error("Failed to fetch collection details");
    return collection.json();
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return null;
  }
};
console.log("collectionDetails")

export const getProducts = async () => {
  try {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (!products.ok) throw new Error("Failed to fetch products");
    const data = await products.json();
    console.log("products", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    if (!product.ok) throw new Error("Failed to fetch product details");
    return product.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export const getSearchedProducts = async (query: string) => {
  try {
    const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
    if (!searchedProducts.ok) throw new Error("Failed to fetch searched products");
    return searchedProducts.json();
  } catch (error) {
    console.error("Error fetching searched products:", error);
    return null;
  }
};

export const getOrders = async (customerId: string) => {
  try {
    const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`);
    if (!orders.ok) throw new Error("Failed to fetch orders");
    return orders.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

export const getRelatedProducts = async (productId: string) => {
  try {
    const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`);
    if (!relatedProducts.ok) throw new Error("Failed to fetch related products");
    return relatedProducts.json();
  } catch (error) {
    console.error("Error fetching related products:", error);
    return null;
  }
};
console.log("products")
