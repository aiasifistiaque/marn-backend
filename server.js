import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import auth from './routes/authRoute.js';
import users from './routes/usersRoute.js';
import productsRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import morgan from 'morgan';
import orderRoute from './routes/orderRoute.js';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import searchRoute from './routes/searchRoute.js';
import exploreRoute from './routes/exploreRoute.js';
import dashRoute from './routes/dashRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import path from 'path';
import reviewRoute from './routes/reviewRoute.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

//admin-routes
import adminCategoriesRoute from './admin-routes/categories/index.js';
import adminProductsRoute from './admin-routes/products/index.js';
import adminUsersRoute from './admin-routes/users/index.js';
import adminOrdersRoute from './admin-routes/orders/index.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Library API',
			version: '1.0.0',
		},
	},
	apis: ['app.js', './routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors());

//admin-routes
app.use('/api/admin/categories', adminCategoriesRoute);
app.use('/api/admin/orders', adminOrdersRoute);
app.use('/api/admin/products', adminProductsRoute);
app.use('/api/admin/users', adminUsersRoute);

//routes
app.use('/api/register', users);
app.use('/api/login', auth);
app.use('/api/products', productsRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/profile', userRoute);
app.use('/api/search', searchRoute);
app.use('/api/explore', exploreRoute);
app.use('/api/dashboard', dashRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/review', reviewRoute);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//app.use('/api/payment', gatewayRoute);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
