export function shuffleArray(array) {
  let result = [...array];

  for (let i = 0; i < array.length - 1; i++) {
    let randomIdx = i + Math.floor(Math.random() * (array.length - i));

    let aux = result[i];
    result[i] = result[randomIdx];
    result[randomIdx] = aux;
  }

  return result;
}
