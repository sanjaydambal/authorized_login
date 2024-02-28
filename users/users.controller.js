import { create,getUsers,getUserById,updateUser,deleteUser } from './users.service.js'; 
import { genSaltSync, hashSync } from 'bcrypt';

// Your createUser function
export const createUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        } else {
            res.status(201).json({
                status:'success',
                message: 'User created successfully',
                data: result
            });
        }
    });

}
export const getUsersList = (req, res) => {
    getUsers((err, result) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        } else {
            res.status(200).json({
                status:'success',
                message: 'Users retrieved successfully',
                data: result
            });
        }
    });
}
export const getUsersById = (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        } else {
            res.status(200).json({
                status:'success',
                message: 'User retrieved successfully',
                data: result
            });
        }
    });
}
export const updateUsers = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(id, body, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        } else {
            res.status(200).json({
                status:'success',
                message: 'User updated successfully',
                data: result
            });
        }
    });
}


export const deleteUsers = (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        } else if (!result) {
            // User with the given ID was not found
            res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`
            });
        } else {
            // User was successfully deleted
            res.status(200).json({
                status:'success',
                message: 'User deleted successfully',
                data: result
            });
        }
    });
}
