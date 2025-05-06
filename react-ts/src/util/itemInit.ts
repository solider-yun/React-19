
function getWeightedRandom() {
    const weighted = [
      1, 1, 1, 2,     
      2, 2, 2, 3,     
      3, 3, 3, 4,     
      4, 5, 6, 7, 8, 9  
    ];
    const index = Math.floor(Math.random() * weighted.length);
    return weighted[index];
  }
  

export const itemInit = Array.from({ length:16 }, () =>
Array.from({ length: 10 }, () => getWeightedRandom())
);
  