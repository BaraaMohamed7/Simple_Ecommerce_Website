export const getProduct = async (id) => {
  const response = await axios.get('https://fakestoreapi.com/products/' + id, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  })
  return response.data;
}