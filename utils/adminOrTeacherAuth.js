import jwt from 'jsonwebtoken';

const checkAdminOrTeacher = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123'); // Убедитесь, что 'secret123' совпадает с вашим секретным ключом
            req.userId = decoded._id;
            req.userRole = decoded.role;

            // Проверяем, соответствует ли роль пользователя одной из требуемых ролей
            if (!['admin', 'teacher'].includes(req.userRole)) {
                return res.status(403).json({
                    message: 'Access denied: insufficient role',
                });
            }

            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Access denied',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Access denied',
        });
    }
};

export default checkAdminOrTeacher;