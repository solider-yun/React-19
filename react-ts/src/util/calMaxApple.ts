function calculateMaxApples(
  deviceWidth: number,
  deviceHeight: number
): { cols: number; rows: number; total: number } {
  const appleSize = 48; // px
  const gap = 2; // px
  const paddingVertical = 10; // px (top + bottom is 20px total)
  const paddingHorizontal = 30; // px (left + right is 60px total)
  const topBarHeight = 60; // px
  const bottomBarHeight = 60; // 10% of screen height

  // Available space inside container
  const availableWidth = deviceWidth - paddingHorizontal * 2;
  const availableHeight =
    deviceHeight - topBarHeight - bottomBarHeight - paddingVertical * 2;

  const cols = Math.floor((availableWidth + gap) / (appleSize + gap));
  const rows = Math.floor((availableHeight + gap) / (appleSize + gap));
  const total = cols * rows;

  return { cols, rows, total };
}
export default calculateMaxApples;
