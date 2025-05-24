export type RandomPosition = { x: number; y: number };

function getRandomPosition(count: number = 30): RandomPosition[] {
  const max = 2000;
  const min = 250;
  const getRandomCoord = () =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const points: RandomPosition[] = [];

  for (let i = 0; i < count; i++) {
    points.push({
      x: getRandomCoord(),
      y: getRandomCoord(),
    });
  }

  return points;
}

// export function useRandomPosition(count: number = 30): RandomPosition[] {
//   return useMemo(() => getRandomPosition(count), [count]);
// }

export default getRandomPosition;
