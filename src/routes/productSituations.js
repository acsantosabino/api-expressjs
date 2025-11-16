const express = require('express');
const router = express.Router();
const productSituationController = require('../controllers/productSituationController');

router.get('/', productSituationController.index);
router.get('/:id', productSituationController.show);
router.post('/', productSituationController.create);
router.put('/:id', productSituationController.update);
router.delete('/:id', productSituationController.delete);

module.exports = router;
