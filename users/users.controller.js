import { create,getUsers,getUserById,updateUser,deleteUser,getUsersByEmail } from './users.service.js'; 
import { genSaltSync, hashSync,compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

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

export const login = (req, res) => {
    const body = req.body;
    
    getUsersByEmail(body.email, (err, results) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        } else if (!results || results.length === 0) { // Fixed typo result -> results
            res.status(404).json({
                status: 'error',
                message: 'invalid email or password'
            });
        } else { // Moved this else block to handle the next steps
            const result = compare(body.password, results.password);
            if(result) {
                results.password = undefined;
                
                const token = sign({
                    result: results
                }, process.env.JWT_SECRET, {
                    expiresIn: '24h'
                });
                res.status(200).json({
                    status:'success',
                    message: 'User logged in successfully',
                    data: {
                        token
                    }
                })
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'invalid email or password'
                });
            }
        }
    });
}
export const logout = (req, res) => {
    res.status(200).json({
        status:'success',
        message: 'User logged out successfully'
    })
}