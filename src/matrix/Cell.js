export default class Cell {
  constructor(state, header, i = null, j = null) {
    this.state = state;
    this.header = header;
    this.i = i;
    this.j = j;
  }

  trigger() {
    this.state = !this.state;
  }

  getState() {
    return this.state;
  }

  isHeader() {
    return this.header;
  }
}
