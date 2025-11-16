const { User } = require('../../models');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  },
  async show(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    res.json({ success: true, data: user });
  },
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async update(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    try {
      await user.update(req.body);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
  async delete(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    await user.destroy();
    res.json({ success: true });
  }
};
