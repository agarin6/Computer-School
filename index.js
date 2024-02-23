import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {
    userController,
    teacherController,
    scheduleController,
    locationController,
    groupController,
    courseController,
    assignmentController,
    assignmentResultController,
} from './controllers/index.js';

mongoose
    .connect('mongodb+srv://admin:He12345678@cluster0.k6wg7rw.mongodb.net/ComputerSchool?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//media upload pathes
app.post('/upload',  upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

// //auth
// app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
// app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
// app.get('/auth/me', allRolesAuth, UserController.getMe);
// app.get('/user/:userId', allRolesAuth, UserController.getUserById);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});