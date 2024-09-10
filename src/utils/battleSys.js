export function rollDice(expression) {
  // 用於解析骰子表達式的正則表達式
  const diceRegex = /(\d*)d(\d+)([+-]\d+)?/;
  const match = expression.match(diceRegex);

  if (!match) {
      throw new Error('Invalid dice expression');
  }

  // 獲取骰子數量、骰子面數和加數
  const numDice = parseInt(match[1]) || 1; // 默認為1顆骰子
  const sides = parseInt(match[2]);
  const modifier = parseInt(match[3]) || 0;

  let total = 0;

  // 擲骰子
  for (let i = 0; i < numDice; i++) {
      total += Math.floor(Math.random() * sides) + 1;
  }

  // 加上修正值
  total += modifier;

  return total;
}