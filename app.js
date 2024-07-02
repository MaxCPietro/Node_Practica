const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const methodOverride = require('method-override');
const rutas = require('./src/routes/mainRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const middlewares = require( './src/middleware/indexMiddleware');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use('/',middlewares.verifyToken, rutas);

app.listen(port, () => {
  console.log(`Servidor corriendo http://localhost:${port}`);
});
