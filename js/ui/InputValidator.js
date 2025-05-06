export class InputValidator {
  static isValidLevel(val, min, max) {
    if (isNaN(val) || val < min || val > max) {
      alert(`레벨은 ${min} ~ ${max} 사이로 입력해주세요.`);
      return false;
    }
    return true;
  }
}
