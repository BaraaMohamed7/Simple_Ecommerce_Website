export const getProduct = async (id) => {
  const response = await axios.get('https://fakestoreapi.com/products/' + id, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
  return response.data;
}
export const getCategories = async (id) => {
  const response = await axios.get('https://fakestoreapi.com/products/categories', {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
  return response.data;
}
export const getCategoriesProducts = async (category) => {
  const response = await axios.get('https://fakestoreapi.com/products/category/' + category, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
  return response.data;
}

export default getCategories