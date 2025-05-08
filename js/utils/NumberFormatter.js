// NumberFormatter.js

const suffixes = [
  '', 'k', 'm', 'b', 't',
  'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj',
  'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt'
];

/**
 * 큰 수를 단위 문자열로 변환합니다.
 * @param {number} num - 원본 숫자
 * @param {number} decimals - 소수점 자리 수 (기본값 2)
 * @returns {string} - 예: 1.23k, 4.56b, 7.89aa
 */

export function formatNumber(num, decimals = 2) {
  if (num < 1000) return num.toString();

  let tier = Math.floor(Math.log10(num) / 3);
  if (tier >= suffixes.length) tier = suffixes.length - 1;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  return scaled.toFixed(decimals) + suffix;
}

export function formatWithCommas(num, decimals = 2) {
  return Number(num.toFixed(decimals)).toLocaleString();
}
