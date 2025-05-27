export class ShrineInputHandler {
  constructor(typeId, currentId, targetId) {
    this.type = document.getElementById(typeId);
    this.current = document.getElementById(currentId);
    this.target = document.getElementById(targetId);
  }

  getInput() {
    const shrineType = this.type.value;
    const currentLevel = parseInt(this.current.value);
    const targetLevel = parseInt(this.target.value);
    return { shrineType, currentLevel, targetLevel };
  }

  static getMaxLevel(shrineType) {
    switch (shrineType) {
      case 'growth': return 215;
      case 'abundance': return 190;
      case 'heavyblow': return 255;
      case 'sharpness': return 255;
      case 'will': return 255;
      default: return 0;
    }
  }
}
