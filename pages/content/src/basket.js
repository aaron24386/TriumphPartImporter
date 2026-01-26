import Part from './part';

class Basket {
  constructor(params) {
    const { id, name } = params;
    this.id = id;
    this.name = name || '';
    this.partList = [];
  }

  addPart(params) {
    const part = new Part(params);
    this.partList.push(part);
  }
}

export default Basket;
