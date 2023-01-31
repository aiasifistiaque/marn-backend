import express from 'express';
import { admin, protect } from '../middleware/auth.js';
import getAllProducts from '../controller/product/getAllProducts.js';
import getSingleProduct from '../controller/product/getSingleProduct.js';
import createNewPorduct from '../controller/product/createNewProduct.js';
import deleteProduct from '../controller/product/deleteProduct.js';
import editProduct from '../controller/product/editProduct.js';
import changePicture from '../controller/product/changePicture.js';

const router = express.Router();

/**Swagger doc
 * completed
 * version 0.2
 * 18/07/21 03:22
 * total routes: 06
 * root: /api/products/
 */

router.post('/', getAllProducts);
router
	.route('/:id')
	.get(getSingleProduct)
	.put(protect, admin, editProduct)
	.delete(protect, admin, deleteProduct);
router.post('/createproduct', protect, admin, createNewPorduct);
router.post('/changepicture', changePicture);

export default router;

/**
 * Route #1
 * @swagger
 * /products:
 *   post:
 *     description: Get all products
 *     parameters:
 *       - name: page
 *         description: page number default 0
 *         in: req body
 *         type: Number
 *       - name: perPage
 *         description: Number of products per page default 10
 *         in: req body
 *         type: Number
 *       - name: sort
 *         description: sort options [Newest, Oldest, Name Asc, Name Dsc, Category, Sub Category, Hidden, Archived, Visibles]
 *         in: req body
 *         type: string
 *     responses:
 *       500:
 *         description: String - error
 *       200:
 *         description: returns {products:Array , count:Number}
 */

/**
 * Route #2
 * @swagger
 * /products/{id}:
 *   get:
 *     description: Get a product by id
 *     parameters:
 *       - name: id
 *         description: id of the product
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       404:
 *         description: String - error
 *       200:
 *         description: returns product:Object
 */

/**
 * Route #3
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Edit product [ADMIN]
 *     parameters:
 *       - name: auth token
 *         description: ADMIN auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: id
 *         description: id of the product
 *         in: req params
 *         required: true
 *         type: String
 *       - name: name
 *         description: name
 *         in: req params
 *         type: String
 *       - name: status
 *         description: visibility status
 *         in: req params
 *         type: String
 *       - name: description
 *         description: description
 *         in: req params
 *         type: String
 *       - name: price
 *         description: price
 *         in: req params
 *         type: Number
 *       - name: stock
 *         description: stock
 *         in: req params
 *         type: Number
 *       - name: size
 *         description: size
 *         in: req params
 *         type: String
 *       - name: note
 *         description: note
 *         in: req params
 *         type: String
 *       - name: category
 *         description: category
 *         in: req params
 *         type: String
 *       - name: subCateogry
 *         description: sub category
 *         in: req params
 *         type: String
 *       - name: tag
 *         description: tag
 *         in: req params
 *         type: String
 *     responses:
 *       404:
 *         description: String - error
 *       200:
 *         description: returns product:Object
 */

/**
 * Route #4
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: DELETE a product by id [ADMIN]
 *     parameters:
 *       - name: token
 *         description: ADMIN auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: id
 *         description: id of the product
 *         in: req params
 *         required: true
 *         type: String
 *     responses:
 *       404:
 *         description: returns {msg:String} - error
 *       200:
 *         description: returns {msg:String, product:Object} - success and deleted products
 */

/**
 * Route #5
 * @swagger
 * /products/creteproduct:
 *   post:
 *     description: CREATE a new product [ADMIN]
 *     parameters:
 *       - name: token
 *         description: ADMIN auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: name
 *         description: name
 *         in: req params
 *         required: true
 *         type: String
 *       - name: image
 *         description: image
 *         in: req params
 *         required: true
 *         type: String
 *       - name: price
 *         description: price
 *         in: req params
 *         required: true
 *         type: Number
 *       - name: description
 *         description: description
 *         in: req params
 *         type: String
 *       - name: countInStock
 *         description: stock
 *         in: req params
 *         type: Number
 *       - name: size
 *         description: size
 *         in: req params
 *         type: String
 *       - name: note
 *         description: note
 *         in: req params
 *         type: String
 *       - name: category
 *         description: category
 *         in: req params
 *         type: String
 *       - name: subCateogry
 *         description: sub category
 *         in: req params
 *         type: String
 *       - name: tag
 *         description: tag
 *         in: req params
 *         type: String
 *       - name: brand
 *         description: brand
 *         in: req params
 *         type: String
 *     responses:
 *       500:
 *         description: returns {msg:String} - error
 *       200:
 *         description: returns {product:Object} - newly created product
 */

/**
 * Route #6
 * @swagger
 * /products/changepicture:
 *   post:
 *     description: Change/Edit product image [ADMIN]
 *     parameters:
 *       - name: auth token
 *         description: ADMIN auth token
 *         in: header
 *         required: true
 *         type: token
 *       - name: image
 *         description: image url
 *         in: req body
 *         required: true
 *         type: String
 *     responses:
 *       404:
 *         description: returns {msg:String} - error
 *       200:
 *         description: returns product:Object - updated product
 */
