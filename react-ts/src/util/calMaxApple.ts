function calculateMaxApples(
  deviceWidth: number,
  deviceHeight: number
): { cols: number; rows: number; total: number } {

  const appleSize = 43; // px
  const gap = 2; // px
  const paddingVertical = 10; // px (top + bottom is 20px total)
  const paddingHorizontal = 30; // px (left + right is 60px total)
  const topBarHeight = 76; // px
  const bottomBarHeight = deviceHeight * 0.1; // 10% of screen height

  const availableWidth = deviceWidth - paddingHorizontal * 2;
  const availableHeight =
    deviceHeight - topBarHeight - bottomBarHeight - paddingVertical * 2;

  const cols = Math.floor((availableWidth + gap) / (appleSize + gap));
  const rows = Math.floor((availableHeight + gap) / (appleSize + gap));
  const total = cols * rows;

  return { cols, rows, total };
}

export default calculateMaxApples;
