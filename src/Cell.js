export default class Cell {
  constructor(state, header = false) {
    this.state = state;
    this.type = header;
  }

  trigger() {
    this.state = !this.state;
  }

  getState() {
    return this.state;
  }

  isHeader() {
    return this.type;
  }
}
