/*************************************
 *  算数問題ジェネレーター (TypeScript)
 *************************************/

/**
 * 問題1問を表すインターフェース
 */
// interface Problem {
//   id: number;
//   type: "add" | "subtract" | "multiply" | "divide";
//   firstNumber: string;   // 整数または「分子/分母」形式の文字列
//   secondNumber: string;  // 整数または「分子/分母」形式の文字列
//   answer: string;        // 解答（整数または「分子/分母」形式）
//   level: "easy" | "medium" | "hard";
// }

import {Problem} from "../../types.ts";

/**
 * min以上max以下のランダムな整数を返すヘルパー
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 2つの整数の最大公約数 (GCD)
 */
function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}

/**
 * 分数を約分する
 * @param numerator   分子
 * @param denominator 分母
 * @returns 約分後の [分子, 分母]
 */
function reduceFraction(numerator: number, denominator: number): [number, number] {
  if (denominator === 0) throw new Error("分母が0になっています");
  const sign = Math.sign(numerator * denominator);
  const a = Math.abs(numerator);
  const b = Math.abs(denominator);
  const g = gcd(a, b);
  return [sign * (a / g), b / g];
}

/**
 * 分数を文字列に変換する
 * - 分母が1の場合は整数の文字列を返す
 */
function fractionToString(numerator: number, denominator: number): string {
  if (denominator === 1) {
    return String(numerator);
  } else {
    return `${numerator}/${denominator}`;
  }
}

/**
 * 分数 (num1/den1) と (num2/den2) を四則演算する
 * @param type "add" | "subtract" | "multiply" | "divide"
 * @param num1
 * @param den1
 * @param num2
 * @param den2
 * @returns [分子, 分母]
 */
function operateFractions(
  type: "add" | "subtract" | "multiply" | "divide",
  num1: number,
  den1: number,
  num2: number,
  den2: number
): [number, number] {
  switch (type) {
    case "add":
      // (num1/den1) + (num2/den2) = (num1*den2 + num2*den1) / (den1*den2)
      return [num1 * den2 + num2 * den1, den1 * den2];
    case "subtract":
      // (num1/den1) - (num2/den2) = (num1*den2 - num2*den1) / (den1*den2)
      return [num1 * den2 - num2 * den1, den1 * den2];
    case "multiply":
      // (num1/den1) * (num2/den2) = (num1*num2) / (den1*den2)
      return [num1 * num2, den1 * den2];
    case "divide":
      // (num1/den1) ÷ (num2/den2) = (num1*den2) / (den1*num2)
      return [num1 * den2, den1 * num2];
  }
}

/**
 * 結果の分数が正で、かつ数値として 10 以下かを判定する
 * @param num 分子
 * @param den 分母
 * @returns boolean
 */
function isValidResult(num: number, den: number): boolean {
  if (den === 0) return false;
  const value = num / den;
  return value > 0 && value <= 10;
}

/**
 * [Easy] 整数の加減乗除 (1～10の整数)
 * - 答えは必ず10以下（かつ正）
 * - 割り算は割り切れるもののみ
 */
function generateEasyProblems(count: number): Problem[] {
  const problems: Problem[] = [];
  const operations: Array<"add" | "subtract" | "multiply" | "divide"> = [
    "add",
    "subtract",
    "multiply",
    "divide",
  ];

  while (problems.length < count) {
    const type = operations[getRandomInt(0, operations.length - 1)];
    const a = getRandomInt(1, 10);
    const b = getRandomInt(1, 10);

    let answer = 0;
    switch (type) {
      case "add":
        answer = a + b;
        if (answer <= 10 && answer > 0) {
          problems.push({
            id: 0, // 仮。最終的に再付番
            type,
            firstNumber: String(a),
            secondNumber: String(b),
            answer: String(answer),
            level: "easy",
          });
        }
        break;
      case "subtract":
        answer = a - b;
        if (answer > 0 && answer <= 10) {
          problems.push({
            id: 0,
            type,
            firstNumber: String(a),
            secondNumber: String(b),
            answer: String(answer),
            level: "easy",
          });
        }
        break;
      case "multiply":
        answer = a * b;
        if (answer <= 10 && answer > 0) {
          problems.push({
            id: 0,
            type,
            firstNumber: String(a),
            secondNumber: String(b),
            answer: String(answer),
            level: "easy",
          });
        }
        break;
      case "divide":
        // 割り切れ、かつ結果が10以下かつ正
        if (a % b === 0) {
          answer = a / b;
          if (answer > 0 && answer <= 10) {
            problems.push({
              id: 0,
              type,
              firstNumber: String(a),
              secondNumber: String(b),
              answer: String(answer),
              level: "easy",
            });
          }
        }
        break;
    }
  }
  return problems;
}

/**
 * [Middle] 分数同士の簡単な計算 (分母同士が同じ場合のみ加減)
 * - 分子・分母は1～10
 * - 加減乗除
 * - 加減の場合は通分不要 (分母が同じ)
 * - 答えは 10 以下の正の分数または整数
 */
function generateMediumProblems(count: number): Problem[] {
  const problems: Problem[] = [];
  const operations: Array<"add" | "subtract" | "multiply" | "divide"> = [
    "add",
    "subtract",
    "multiply",
    "divide",
  ];

  while (problems.length < count) {
    const type = operations[getRandomInt(0, operations.length - 1)];

    // 分子・分母を1〜10でランダム生成
    const num1 = getRandomInt(1, 10);
    const den1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, 10);
    const den2 = getRandomInt(1, 10);

    // 中級では通分不要の加減 => 分母が同じ場合だけOK
    if ((type === "add" || type === "subtract") && den1 !== den2) {
      continue; // スキップして再挑戦
    }

    try {
      const [numR, denR] = operateFractions(type, num1, den1, num2, den2);
      const [rn, rd] = reduceFraction(numR, denR);

      if (isValidResult(rn, rd)) {
        problems.push({
          id: 0,
          type,
          firstNumber: fractionToString(num1, den1),
          secondNumber: fractionToString(num2, den2),
          answer: fractionToString(rn, rd),
          level: "normal",
        });
      }
    } catch {
      // 0除算などエラーが出たら無視
    }
  }
  return problems;
}

/**
 * [Hard] 分数同士の複雑な計算
 * - 分子・分母は1～20
 * - 加減乗除（通分が必要な加減算を含む）
 * - 答えは 10 以下の正の分数または整数
 */
function generateHardProblems(count: number): Problem[] {
  const problems: Problem[] = [];
  const operations: Array<"add" | "subtract" | "multiply" | "divide"> = [
    "add",
    "subtract",
    "multiply",
    "divide",
  ];

  while (problems.length < count) {
    const type = operations[getRandomInt(0, operations.length - 1)];
    const num1 = getRandomInt(1, 20);
    const den1 = getRandomInt(1, 20);
    const num2 = getRandomInt(1, 20);
    const den2 = getRandomInt(1, 20);

    try {
      const [numR, denR] = operateFractions(type, num1, den1, num2, den2);
      const [rn, rd] = reduceFraction(numR, denR);
      if (isValidResult(rn, rd)) {
        problems.push({
          id: 0,
          type,
          firstNumber: fractionToString(num1, den1),
          secondNumber: fractionToString(num2, den2),
          answer: fractionToString(rn, rd),
          level: "hard",
        });
      }
    } catch {
      // 0除算などエラーが出たら無視
    }
  }
  return problems;
}

// =========== 実行部分 ===========

// 各難易度で3問ずつ生成
export default function generateProblems(level: 'easy' | 'normal' | 'hard', count: number): Problem[] {
  // 各難易度で3問ずつ生成
  switch (level) {
    case "easy":
      return generateEasyProblems(count)
    case "normal":
      return generateMediumProblems(count)
    case "hard":
      return generateHardProblems(count)
    default:
      return null
  }

// // まとめてIDを再付番する
//   let currentId = 1;
//   return [...easySet, ...mediumSet, ...hardSet].map((p) => {
//     return { ...p, id: currentId++ };
//   });
}

