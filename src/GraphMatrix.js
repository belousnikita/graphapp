import Cell from './Cell';

export default class GraphMatrix {
  makeLine = () => {
    for (let i = 1; i < this.resolution + 1; i += 1) {
      for (let j = 1; j < this.resolution + 1; j += 1) {
        if (j - i === 1) {
          this.matrix[i][j].trigger();
        }
      }
    }
    return this.matrix;
  };

  generateMatrix() {
    this.matrix = [];
    for (let i = 0; i < this.resolution + 1; i += 1) {
      this.matrix[i] = [];
      for (let j = 0; j < this.resolution + 1; j += 1) {
        if (i === 0) {
          this.matrix[i][j] = j !== 0 ? new Cell(j, true) : new Cell(null, true);
        } else if (j === 0) {
          this.matrix[i][j] = i !== 0 ? new Cell(i, true) : new Cell(null, true);
        } else {
          this.matrix[i][j] = new Cell(false);
        }
      }
    }
    return this;
  }

  constructor(resolution) {
    this.resolution = resolution;
    this.matrix = this.generateMatrix().makeLine();
  }

  getMatrix() {
    return this.matrix;
  }

  getCell(i, j) {
    return this.matrix[i][j];
  }
}
