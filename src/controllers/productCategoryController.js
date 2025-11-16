const { ProductCategory } = require('../../models');

module.exports = {
  async index(req, res) {
    const categories = await ProductCategory.findAll();
    res.json({ success: true, data: categories });
  },
  async show(req, res) {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: 'Categoria não encontrada' });
    res.json({ success: true, data: category });
  },
  async create(req, res) {
    try {
      const category = await ProductCategory.create(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async update(req, res) {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: 'Categoria não encontrada' });
    try {
      await category.update(req.body);
      res.json({ success: true, data: category });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async delete(req, res) {
    const category = await ProductCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: 'Categoria não encontrada' });
    await category.destroy();
    res.json({ success: true });
  }
};
