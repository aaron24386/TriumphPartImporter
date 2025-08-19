class Part {
  constructor(params) {
    const { number, quantity, description } = params;
    this.number = number || null;
    this.description = description || '';
    this.quantity = quantity || 0;
  }
}

export default Part;
