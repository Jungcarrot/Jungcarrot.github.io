export class SkinInputHandler {
  constructor(ids) {
    this.ids = ids; // { rod: 'rodSkin', cannon: 'cannonSkin', ... }
  }
  getValues() {
    const result = {};
    for (const type in this.ids) {
      const el = document.getElementById(this.ids[type]);
      result[type] = parseFloat(el?.value) || 0;
    }
    return result;
  }
}
