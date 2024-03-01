import {createUser,getUsersList,getUsersById,updateUsers,deleteUsers,login,logout} from './users.controller.js';
import express from 'express';

const router = express.Router();
import {verifyToken} from '../auth/token_validation.js';


router.post('/',verifyToken, createUser);
router.get('/',verifyToken, getUsersList);
router.get('/:id',verifyToken, getUsersById);
router.patch('/:id',verifyToken, updateUsers);
router.delete('/:id',verifyToken, deleteUsers);
router.post('/login', login);
router.post('/logout',logout);


export { router };


