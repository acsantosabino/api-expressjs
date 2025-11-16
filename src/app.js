require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// importar rotas CRUD
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const productCategoryRoutes = require('./routes/productCategories');
const situationRoutes = require('./routes/situations');
const productSituationRoutes = require('./routes/productSituations');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/product-categories', productCategoryRoutes);
app.use('/situations', situationRoutes);
app.use('/product-situations', productSituationRoutes);

// middleware de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
