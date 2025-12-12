class Part {
  constructor(params) {
    const { partNumber, quantity, description } = params;
    this.number = partNumber || null;
    this.description = description || '';
    this.quantity = quantity || 0;
  }
}

export default Part;
