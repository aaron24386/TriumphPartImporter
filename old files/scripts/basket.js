import Part from './part';

class Basket {
    constructor(params) {
        const { id, name } = params;
        this.id = id || null;
        this.name = name || '';
        this.partList = {};
    }

    addPart(params) {
        const { partNumber } = params;
        const part = new Part(params);
        this.partList[partNumber] = part;
    }

}

export default Basket;