export class AttackCalculator {
  calculate(charLevel) {
    return 30 * charLevel * Math.pow(1.01, charLevel);
  }
}
