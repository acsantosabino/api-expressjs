const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');

router.get('/', productCategoryController.index);
router.get('/:id', productCategoryController.show);
router.post('/', productCategoryController.create);
router.put('/:id', productCategoryController.update);
router.delete('/:id', productCategoryController.delete);

module.exports = router;
