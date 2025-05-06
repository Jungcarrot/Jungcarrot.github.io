export class ResultDisplayer {
  static show(containerId, message) {
    const el = document.getElementById(containerId);
    el.textContent = message;
  }
}
