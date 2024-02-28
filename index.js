import express from 'express';
import { config } from 'dotenv';





const app = express();
config();

app.get('/api', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Hello World!'
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log('server is up and running on port: ', process.env.APP_PORT);
});
