const express = require('express');
const router = express.Router();
const situationController = require('../controllers/situationController');

router.get('/', situationController.index);
router.get('/:id', situationController.show);
router.post('/', situationController.create);
router.put('/:id', situationController.update);
router.delete('/:id', situationController.delete);

module.exports = router;
