export default class GraphMatrix {
  makeLine = () => {
    for (let i = 1; i < this.resolution + 1; i += 1) {
      for (let j = 1; j < this.resolution + 1; j += 1) {
        if (j - i === 1) {
          this.matrix[i][j] = true;
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
          this.matrix[i][j] = j !== 0 ? j : null;
        } else if (j === 0) {
          this.matrix[i][j] = i !== 0 ? i : null;
        } else {
          this.matrix[i][j] = false;
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
}
