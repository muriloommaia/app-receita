const randomFood = 'https://www.themealdb.com/api/json/v1/1/random.php';
const randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export async function getRandomFood() {
  const dataRaw = await fetch(randomFood);
  const data = await dataRaw.json();
  console.log(data);
  return data;
}

export async function getRandomDrink() {
  const dataRaw = await fetch(randomDrink);
  const data = await dataRaw.json();
  console.log(data);
  return data;
}
