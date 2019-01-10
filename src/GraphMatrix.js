import lodash from 'lodash';
import Cell from './Cell';
import Node from './Node';

export default class Graphtable {
  makeLine = () => {
    for (let i = 1; i < this.resolution + 1; i += 1) {
      for (let j = 1; j < this.resolution + 1; j += 1) {
        if (j - i === 1) {
          this.table[i][j].trigger();
        }
      }
    }
    return this.table;
  };

  generateTable() {
    this.table = [];
    for (let i = 0; i < this.resolution + 1; i += 1) {
      this.table[i] = [];
      for (let j = 0; j < this.resolution + 1; j += 1) {
        if (i === 0) {
          this.table[i][j] = j !== 0 ? new Cell(j, true) : new Cell(null, true);
        } else if (j === 0) {
          this.table[i][j] = i !== 0 ? new Cell(i, true) : new Cell(null, true);
        } else {
          this.table[i][j] = new Cell(false, false, i, j);
        }
      }
    }
    return this;
  }

  constructor(resolution) {
    this.resolution = resolution;
    this.table = this.generateTable().makeLine();
  }

  getMatrix() {
    const filtered = this.table.map(row =>
      row.filter(cell => cell.header !== true)
    );
    return lodash.drop(filtered);
  }

  getTable() {
    return this.table;
  }

  getNodes() {
    const matrix = this.getMatrix();
    return matrix.reduce((acc, row, i) => {
      const relatives = row.reduce(
        (relAcc, cell) => (cell.state ? [...relAcc, cell.j] : relAcc),
        []
      );
      const id = i + 1;
      return {
        ...acc,
        [id]: new Node(id, relatives)
      };
    }, {});
  }

  getCell(i, j) {
    return this.table[i][j];
  }
}
