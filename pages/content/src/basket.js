import Part from './part';

class Basket {
  constructor(params) {
    const { name } = params;
    this.name = name || '';
    this.partList = [];
  }

  addPart(params) {
    const part = new Part(params);
    this.partList.push(part);
  }
}

export default Basket;
