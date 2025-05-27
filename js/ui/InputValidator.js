export class InputValidator {
  static isValidLevel(value, min, max, label = '') {
    if (value < min || value > max) {
      if (label) {
        alert(`${label} 값은 ${min}~${max} 사이여야 합니다.`);
      }
      return false;
    }
    return true;
  }
}
