interface BasketParams {
  id: string;
  name: string;
}

interface PartParams {
  number: string;
  description: string;
  quantity: number;
}

interface IBasket {
  id: string;
  name: string;
  partList: IPart[];
}

interface IPart {
  number: string;
  quantity: number;
  description: string;
}

interface Message {
  type: string;
}

interface ImportBasketMessage extends Message {
  type: 'IMPORT_BASKET';
  basket: IBasket;
}

type NavigateToViewFunction = (view: string, basketId?: string) => void;

export type { BasketParams, PartParams, IBasket, IPart, ImportBasketMessage, NavigateToViewFunction };
