function getWeightedRandom() {
  const weighted = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 6, 7, 8, 9];
  const index = Math.floor(Math.random() * weighted.length);
  return weighted[index];
}

export const itemInit = ({ cols, rows }: { cols: number; rows: number }) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => getWeightedRandom())
  );
