export default async function fetchDetails(id, path) {
  if (path === 'comidas') {
    path = 'meal';
  } else if (path === 'bebidas') {
    path = 'cocktail';
  }
  const fetchEnd = async (end) => {
    try {
      const response = await fetch(`${end}${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error.mensage;
    }
  };
  return fetchEnd(`https://www.the${path}db.com/api/json/v1/1/lookup.php?i=`);
}
