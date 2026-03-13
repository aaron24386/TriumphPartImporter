interface BasketParams {
  id: string;
  name: string;
}

interface PartParams {
  number: string;
  description: string;
  quantity: number;
}

interface Basket {
  id: string;
  name: string;
  partList: Part[];
}

interface Part {
  number: string;
  quantity: number;
  description: string;
}

interface Message {
  type: string;
}

interface ImportBasketMessage extends Message {
  type: 'IMPORT_BASKET';
  basket: Basket;
}

export type { BasketParams, PartParams, Basket, Part, ImportBasketMessage };
