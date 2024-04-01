// import config from 'config';
require('dotenv').config();
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import userRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';
import cookieParser from 'cookie-parser';
import config from 'config';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
const requestHandler = request(app);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL as string);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Integration Tests', () => {
    let userId: string | null = null;
    let accessToken: null | string = null;
    const user = {
        username: 'testing-user',
        email: 'testingUser@gmail.com',
        password: '123456789',
    };

    // create new user
    it('POST /api/users => newly created user', async () => {
        const response = await requestHandler
            .post('/api/users')
            .send({
                username: 'testing-user',
                email: 'testingUser@gmail.com',
                password: '123456789',
            })
            .expect('Content-Type', /json/)
            .expect(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                user: expect.any(Object),
            })
        );

        userId = response.body.user._id;
    });

    //login user
    it('POST /api/auth/login  => accessToken', async () => {
        const response = await requestHandler
            .post('/api/auth/login')
            .send({ email: 'testingUser@gmail.com', password: '123456789' })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                userInfo: {
                    _id: userId,
                    email: user.email,
                    username: user.username,
                },
            })
        );
        const match =
            response.headers['set-cookie'][0].match(/accessToken=([^;]+)/);
        accessToken = match ? match[1] : null;
    });

    // get user by id
    it(`GET /api/users/:userID => user with ID : ${userId} `, async () => {
        const response = await requestHandler
            .get(`/api/users/${userId}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                user: expect.any(Object),
            })
        );
        expect(response.body.user._id).toBe(userId);
    });

    //get users list
    it('GET /api/users => list of Users', async () => {
        const response = await requestHandler
            .get('/api/users')
            .set('Cookie', [`accessToken=${accessToken}`])
            .withCredentials(true)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                users: expect.any(Array),
            })
        );
    });

    it(`DELETE /api/users/:userID => delete user with ID : ${userId} `, async () => {
        const response = await requestHandler
            .delete(`/api/users/${userId}`)
            .set('Cookie', [`accessToken=${accessToken}`])
            .withCredentials(true)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                deletedUser: expect.any(Object),
            })
        );
    });
});
