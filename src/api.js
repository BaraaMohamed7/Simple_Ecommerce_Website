export const getProduct = async (id) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/' + id)
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
}