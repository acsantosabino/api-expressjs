const { Product } = require('../models');

module.exports = {
  async index(req, res) {
    const products = await Product.findAll();
    res.json({ success: true, data: products });
  },
  async show(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Produto não encontrado' });
    res.json({ success: true, data: product });
  },
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async update(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Produto não encontrado' });
    try {
      await product.update(req.body);
      res.json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Produto não encontrado' });
    await product.destroy();
    res.json({ success: true });
  }
};
