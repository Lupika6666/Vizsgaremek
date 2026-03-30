jest.mock('../config/database', () => ({}));
jest.mock('../models/userModel');
jest.mock('../middleware/bcryptHandler', () => ({
    hashPassword: jest.fn(async (pw) => 'hashed_' + pw),
    comparePassword: jest.fn(async (pw, hash) => pw === 'correctpassword')
}));
const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('../routes/userRoutes');
const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../middleware/bcryptHandler');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/felhasznalok', userRoutes);

describe('User Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/felhasznalok/regisztracio', () => {
        const validUser = {
            email: 'test@example.com',
            jelszo: 'correctpassword',
            nev: 'Teszt Elek',
            olvaso_id: 123456
        };
        it('should register a new user', async () => {
            User.insertUser.mockImplementation((email, hash, nev, olvaso_id, cb) => cb(null, { insertId: 1 }));
            const res = await request(app)
                .post('/api/felhasznalok/regisztracio')
                .send(validUser);
            expect(res.statusCode).toBe(201);
            expect(res.body.valasz).toBe('Sikeres regisztráció!');
            expect(hashPassword).toHaveBeenCalledWith(validUser.jelszo);
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/felhasznalok/regisztracio')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate email', async () => {
            User.insertUser.mockImplementation((email, hash, nev, olvaso_id, cb) => cb({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .post('/api/felhasznalok/regisztracio')
                .send(validUser);
            expect(res.statusCode).toBe(400);
            expect(res.body.valasz).toBe('A megadott email címmel már regisztráltak.');
        });
        it('should handle server error', async () => {
            User.insertUser.mockImplementation((email, hash, nev, olvaso_id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .post('/api/felhasznalok/regisztracio')
                .send(validUser);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('POST /api/felhasznalok/bejelentkezes', () => {
        const validLogin = {
            email: 'test@example.com',
            jelszo: 'correctpassword'
        };
        const userFromDb = {
            id: 1,
            email: 'test@example.com',
            nev: 'Teszt Elek',
            szerepkor: 'olvaso',
            olvaso_id: 123456,
            jelszo: 'hashed_correctpassword',
            aktiv: 1
        };
        beforeEach(() => {
            comparePassword.mockClear();
            comparePassword.mockImplementation(async (pw, hash) => pw === 'correctpassword');
        });
        it('should login successfully and return tokens', async () => {
            User.selectUserByEmail.mockImplementation((email, cb) => cb(null, [userFromDb]));
            jwt.sign.mockReturnValueOnce('access.token').mockReturnValueOnce('refresh.token');
            const res = await request(app)
                .post('/api/felhasznalok/bejelentkezes')
                .send(validLogin);
            expect(res.statusCode).toBe(200);
            expect(res.body.valasz).toBe('Sikeres bejelentkezés');
            expect(res.body.accessToken).toBe('access.token');
            expect(res.body.felhasznalo.email).toBe(validLogin.email);
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/felhasznalok/bejelentkezes')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should return 401 for wrong email', async () => {
            User.selectUserByEmail.mockImplementation((email, cb) => cb(null, []));
            const res = await request(app)
                .post('/api/felhasznalok/bejelentkezes')
                .send(validLogin);
            expect(res.statusCode).toBe(401);
            expect(res.body.valasz).toBe('Hibás email cím vagy jelszó!');
        });
        it('should return 403 if account is deactivated', async () => {
            User.selectUserByEmail.mockImplementation((email, cb) => cb(null, [{ ...userFromDb, aktiv: 0 }]));
            const res = await request(app)
                .post('/api/felhasznalok/bejelentkezes')
                .send(validLogin);
            expect(res.statusCode).toBe(403);
            expect(res.body.valasz).toBe('A fiók deaktiválva van!');
        });
        it('should return 401 for wrong password', async () => {
            comparePassword.mockImplementation(async () => false);
            User.selectUserByEmail.mockImplementation((email, cb) => cb(null, [userFromDb]));
            const res = await request(app)
                .post('/api/felhasznalok/bejelentkezes')
                .send({ ...validLogin, jelszo: 'wrongpassword' });
            expect(res.statusCode).toBe(401);
            expect(res.body.valasz).toBe('Hibás email cím vagy jelszó!');
        });
        it('should handle server error', async () => {
            User.selectUserByEmail.mockImplementation((email, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .post('/api/felhasznalok/bejelentkezes')
                .send(validLogin);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('POST /api/felhasznalok/token-frissites', () => {
        it('should refresh access token with valid refresh token', async () => {
            jwt.verify.mockReturnValue({
                id: 1,
                email: 'test@example.com',
                nev: 'Teszt Elek',
                szerepkor: 'olvaso',
                olvaso_id: 123456
            });
            jwt.sign.mockReturnValue('new.access.token');
            const res = await request(app)
                .post('/api/felhasznalok/token-frissites')
                .set('Cookie', ['refreshToken=valid.refresh.token'])
                .send();
            expect(res.statusCode).toBe(200);
            expect(res.body.accessToken).toBe('new.access.token');
        });
        it('should return 401 if no refresh token', async () => {
            const res = await request(app)
                .post('/api/felhasznalok/token-frissites')
                .send();
            expect(res.statusCode).toBe(401);
            expect(res.body.valasz).toBe('Nincs refresh token! Új access token nem generálható!');
        });
        it('should return 403 if refresh token is invalid', async () => {
            jwt.verify.mockImplementation(() => { throw new Error('invalid'); });
            const res = await request(app)
                .post('/api/felhasznalok/token-frissites')
                .set('Cookie', ['refreshToken=invalid.token'])
                .send();
            expect(res.statusCode).toBe(403);
            expect(res.body.valasz).toBe('Érvénytelen vagy lejárt refresh token!');
        });
    });

    describe('POST /api/felhasznalok/kijelentkezes', () => {
        it('should clear refresh token cookie and return success', async () => {
            const res = await request(app)
                .post('/api/felhasznalok/kijelentkezes')
                .send();
            expect(res.statusCode).toBe(200);
            expect(res.body.valasz).toBe('Sikeres kijelentkezés');
        });
    });

    describe('Method Not Allowed', () => {
        const endpoints = [
            '/regisztracio',
            '/bejelentkezes',
            '/token-frissites',
            '/kijelentkezes'
        ];
        endpoints.forEach((ep) => {
            it(`should return 405 for GET ${ep}`, async () => {
                const res = await request(app)
                    .get('/api/felhasznalok' + ep);
                expect(res.statusCode).toBe(405);
            });
            it(`should return 405 for PUT ${ep}`, async () => {
                const res = await request(app)
                    .put('/api/felhasznalok' + ep);
                expect(res.statusCode).toBe(405);
            });
            it(`should return 405 for DELETE ${ep}`, async () => {
                const res = await request(app)
                    .delete('/api/felhasznalok' + ep);
                expect(res.statusCode).toBe(405);
            });
            it(`should return 405 for PATCH ${ep}`, async () => {
                const res = await request(app)
                    .patch('/api/felhasznalok' + ep);
                expect(res.statusCode).toBe(405);
            });
        });
    });
});

