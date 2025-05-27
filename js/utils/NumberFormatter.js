const suffixes = [
  '', 'k', 'm', 'b', 't',
  'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj',
  'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt'
];


export function formatNumber(num, decimals = 2) {
  if (num < 1000) return num.toString();

  let tier = Math.floor(Math.log10(num) / 3);
  if (tier >= suffixes.length) tier = suffixes.length - 1;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  return scaled.toFixed(decimals) + suffix;
}


export function formatWithCommas(num, decimals = 3) {
  return Number(num.toFixed(decimals)).toLocaleString();
}


export function formatNumberWithUnitAndCommas(num, decimals = 2) {
  if (num < 1000) return num.toLocaleString();

  let tier = Math.floor(Math.log10(num) / 3);
  if (tier >= suffixes.length) tier = suffixes.length - 1;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  return `${scaled.toFixed(decimals)}${suffix} (${num.toLocaleString()})`;
}
