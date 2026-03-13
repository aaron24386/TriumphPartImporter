import Part from './part';
import { BasketParams, PartParams } from '../../../chrome-extension/public/types';

class Basket {
  id: string;
  name: string;
  partList: Part[];

  constructor(params: BasketParams) {
    const { id, name } = params;
    this.id = id;
    this.name = name || '';
    this.partList = [];
  }

  addPart(params: PartParams) {
    this.partList.push(new Part(params));
  }
}

export default Basket;
