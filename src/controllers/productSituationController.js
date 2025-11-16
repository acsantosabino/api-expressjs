const { ProductSituation } = require('../models');

module.exports = {
  async index(req, res) {
    const productSituations = await ProductSituation.findAll();
    res.json({ success: true, data: productSituations });
  },
  async show(req, res) {
    const productSituation = await ProductSituation.findByPk(req.params.id);
    if (!productSituation) return res.status(404).json({ success: false, error: 'Situação do produto não encontrada' });
    res.json({ success: true, data: productSituation });
  },
  async create(req, res) {
    try {
      const productSituation = await ProductSituation.create(req.body);
      res.status(201).json({ success: true, data: productSituation });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async update(req, res) {
    const productSituation = await ProductSituation.findByPk(req.params.id);
    if (!productSituation) return res.status(404).json({ success: false, error: 'Situação do produto não encontrada' });
    try {
      await productSituation.update(req.body);
      res.json({ success: true, data: productSituation });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async delete(req, res) {
    const productSituation = await ProductSituation.findByPk(req.params.id);
    if (!productSituation) return res.status(404).json({ success: false, error: 'Situação do produto não encontrada' });
    await productSituation.destroy();
    res.json({ success: true });
  }
};
