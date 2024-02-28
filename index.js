import express from 'express';
import { config } from 'dotenv';
import {router} from './users/users.router.js';







const app = express();
config();

app.use(express.json());
app.use("/api/users", router);

app.listen(process.env.APP_PORT, () => {
    console.log('server is up and running on port: ', process.env.APP_PORT);
});
