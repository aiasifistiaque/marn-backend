import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import getCategories from './getCategories.js';

const router = express.Router();

router.get('/', sort, getCategories);

export default router;
