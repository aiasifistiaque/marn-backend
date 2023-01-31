import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import getUsers from './getUsers.js';
import updateUserRole from './updateUserRole.js';

const router = express.Router();

router.get('/', sort, getUsers);
router.put('/:id/role', sort, updateUserRole);

export default router;
