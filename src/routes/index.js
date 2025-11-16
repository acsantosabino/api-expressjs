const express = require('express');
const router = express.Router();

// Exemplo de rota
router.get('/', (req, res) => {
  res.json({ success: true, message: 'API Amanda rodando!' });
});

module.exports = router;
