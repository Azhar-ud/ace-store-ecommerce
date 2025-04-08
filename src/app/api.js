const fetchData = async () => {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    response = await response.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};
export { fetchData };
