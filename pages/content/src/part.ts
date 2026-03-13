import type { PartParams } from '../../../chrome-extension/public/types';

class Part {
  number: string;
  description: string;
  quantity: number;

  constructor(params: PartParams) {
    const { number, quantity, description } = params;
    this.number = number || '';
    this.description = description || '';
    this.quantity = quantity || 0;
  }
}

export default Part;
