export class WeaponInputHandler {
  constructor(ids) {
    this.ids = ids; // { rod: 'rodLevel', cannon: 'cannonLevel', ... }
  }
  getValues() {
    const result = {};
    for (const type in this.ids) {
      const el = document.getElementById(this.ids[type]);
      result[type] = parseInt(el?.value) || 0;
    }
    return result;
  }
}
