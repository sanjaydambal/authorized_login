import { pool } from "../config/database.js";

export const create = (data, callback) => {
        pool.query(
            `INSERT INTO registration (firstname, lastname, gender, email, password, mobile_number) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.mobile_number
            ],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            }
        );
    }

    export const getUsers = (callback) => {
        pool.query(
            `SELECT * FROM registration`,
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            }
        );
    }
    export const getUserById = (id, callback) => {
        pool.query(
            `SELECT * FROM registration WHERE id =?`,
            [id],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result[0]);
                }
            }
        );
    }
    export const updateUser = (id, data, callback) => {
        pool.query(
            `UPDATE registration SET firstname =?, lastname =?, gender =?, email =?, password =?, mobile_number =? WHERE id =?`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.mobile_number,
                id
            ],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result[0]);
                }
            }
        );
    }
    export const deleteUser = (id, callback) => {
        pool.query(
            `DELETE FROM registration WHERE id =?`,
            [id],
            (error, result) => {
                if (error) {
                    callback(error);
                } else {
                    // Check if any rows were affected by the deletion
                    if (result.affectedRows === 0) {
                        // No rows were affected, user with given id not found
                        callback(null, null);
                    } else {
                        callback(null, result);
                    }
                }
            }
        );
    }
export const getUsersByEmail = (email, callback) => {
    pool.query(
        `SELECT * FROM registration WHERE email =?`,
        [email],
        (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null, result[0]);
            }
        }
    );
}