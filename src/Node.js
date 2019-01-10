export default class Node {
  constructor(id, connectsTo = []) {
    this.id = id;
    this.connectsTo = connectsTo;
  }

  isConnectedTo({ id }) {
    return !!this.connectsTo.find(node => node.id === id);
  }
}
