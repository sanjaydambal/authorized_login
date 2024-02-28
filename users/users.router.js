import {createUser,getUsersList,getUsersById,updateUsers,deleteUsers,login} from './users.controller.js';
import express from 'express';

const router = express.Router();


router.post('/', createUser);
router.get('/', getUsersList);
router.get('/:id', getUsersById);
router.patch('/:id', updateUsers);
router.delete('/:id', deleteUsers);
router.post('/login', login);

export { router };


