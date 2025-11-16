const { Situation } = require('../../models');

module.exports = {
  async index(req, res) {
    const situations = await Situation.findAll();
    res.json({ success: true, data: situations });
  },
  async show(req, res) {
    const situation = await Situation.findByPk(req.params.id);
    if (!situation) return res.status(404).json({ success: false, error: 'Situação não encontrada' });
    res.json({ success: true, data: situation });
  },
  async create(req, res) {
    try {
      const situation = await Situation.create(req.body);
      res.status(201).json({ success: true, data: situation });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async update(req, res) {
    const situation = await Situation.findByPk(req.params.id);
    if (!situation) return res.status(404).json({ success: false, error: 'Situação não encontrada' });
    try {
      await situation.update(req.body);
      res.json({ success: true, data: situation });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async delete(req, res) {
    const situation = await Situation.findByPk(req.params.id);
    if (!situation) return res.status(404).json({ success: false, error: 'Situação não encontrada' });
    await situation.destroy();
    res.json({ success: true });
  }
};
