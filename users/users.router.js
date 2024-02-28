import {createUser,getUsersList,getUsersById,updateUsers,deleteUsers} from './users.controller.js';
import express from 'express';

const router = express.Router();


router.post('/', createUser);
router.get('/', getUsersList);
router.get('/:id', getUsersById);
router.patch('/:id', updateUsers);
router.delete('/:id', deleteUsers);

export { router };

