import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    if (token) {
        token = token.substring(7);
        verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid token'
                });
            }
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'Access denied unauthorized user'
        });
    }
}
