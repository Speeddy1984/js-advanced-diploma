/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  // TODO: ваш код будет тут

  const totalTiles = Math.pow(boardSize, 2);

  switch (true) {
    case index === 0:
      return "top-left";

    case index === boardSize - 1:
      return "top-right";

    case index === totalTiles - boardSize:
      return "bottom-left";

    case index === totalTiles - 1:
      return "bottom-right";

    case index > 0 && index < boardSize - 1:
      return "top";

    case index >= totalTiles - boardSize && index < totalTiles:
      return "bottom";

    case index % boardSize === 0 &&
      index !== 0 &&
      index !== totalTiles - boardSize:
      return "left";

    case (index + 1) % boardSize === 0 &&
      index !== boardSize - 1 &&
      index !== totalTiles - 1:
      return "right";

    default:
      return "center";
  }
}  

export function calcHealthLevel(health) {
  if (health < 15) {
    return "critical";
  }

  if (health < 50) {
    return "normal";
  }

  return "high";
}
