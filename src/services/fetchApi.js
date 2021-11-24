export default async function fetchApi(toSearch, path) {
  path = path.includes('comida') ? 'meal' : 'cocktail';
  const key = path.includes('meal') ? 'meals' : 'drinks';
  const fethEnd = async (end, search = '') => {
    try {
      const response = await fetch(`${end}${search}`);
      const data = await response.json();
      console.log(key)
      data[key] = data[key] ? data[key] : [];
      return data;
    } catch (error) {
      return error.mensage;
    }
  };
  switch (toSearch.type) {
  case 'radio':
    switch (toSearch.radio.radioType) {
    case 'name':
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/search.php?s=`, toSearch.radio.search);
    case 'ingredient':
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/filter.php?i=`, toSearch.radio.search);
    case 'first-letter':
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/search.php?f=`, toSearch.radio.search);
    default: return 'error';
    }
  case 'category':
    switch (toSearch.category.categoryType) {
    case 'filter':
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/filter.php?c=`, toSearch.category.search);
    case 'area':
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/list.php?a=list`);
    default:
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/list.php?c=list`);
    }
  case 'ingredients':
    switch (toSearch.ingredients.ingredientsType) {
    case 'filter':
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/filter.php?i=`, toSearch.ingredients.search);
    case 'get':
      return fethEnd(`https://www.the${path}db.com/api/json/v1/1/list.php?i=list`);
    default:
      return 'error';
    }
  case 'random':
    return fethEnd(`https://www.the${path}db.com/api/json/v1/1/random.php`);
  case 'details':
    return fethEnd(`https://www.the${path}db.com/api/json/v1/1/lookup.php?i=`, toSearch.details.search);
  case 'getByArea':
    return fethEnd(`https://www.the${path}db.com/api/json/v1/1/filter.php?a=`, toSearch.getByArea.search);
  default:
    return fethEnd(`https://www.the${path}db.com/api/json/v1/1/search.php?s=`);
  }
}
