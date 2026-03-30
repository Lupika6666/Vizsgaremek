jest.mock('../config/database', () => ({}));
jest.mock('../models/languageModel');
jest.mock('../middleware/authMiddleware', () => ({
    varifyToken: (req, res, next) => next(),
    requireRole: () => (req, res, next) => next()
}));

const request = require('supertest');
const express = require('express');
const languageRoutes = require('../routes/languageRoutes');
const Language = require('../models/languageModel');

const app = express();
app.use(express.json());
app.use('/api/nyelvek', languageRoutes);

describe('Language Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/nyelvek', () => {
        it('should return all languages', async () => {
            const mockLanguages = [{ id: 1, nev: 'Hungarian' }];
            Language.selectAllLanguage.mockImplementation(cb => cb(null, mockLanguages));
            const res = await request(app).get('/api/nyelvek');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockLanguages);
        });
        it('should handle server error', async () => {
            Language.selectAllLanguage.mockImplementation(cb => cb(new Error('DB error')));
            const res = await request(app).get('/api/nyelvek');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('POST /api/nyelvek', () => {
        it('should create a new language', async () => {
            Language.insertLanguage.mockImplementation((nev, cb) => cb(null, { insertId: 2 }));
            const res = await request(app)
                .post('/api/nyelvek')
                .send({ nev: 'English' });
            expect(res.statusCode).toBe(201);
            expect(res.body.adatok).toEqual({ id: 2, nev: 'English' });
        });
        it('should fail validation if nev is missing', async () => {
            const res = await request(app)
                .post('/api/nyelvek')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate language', async () => {
            Language.insertLanguage.mockImplementation((nev, cb) => cb({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .post('/api/nyelvek')
                .send({ nev: 'Hungarian' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle server error', async () => {
            Language.insertLanguage.mockImplementation((nev, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .post('/api/nyelvek')
                .send({ nev: 'Any Language' });
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/nyelvek/:id', () => {
        it('should update a language', async () => {
            Language.updateLanguage.mockImplementation((id, nev, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .put('/api/nyelvek/1')
                .send({ nev: 'Updated Language' });
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual({ id: '1', nev: 'Updated Language' });
        });
        it('should fail validation if nev is missing', async () => {
            const res = await request(app)
                .put('/api/nyelvek/1')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .put('/api/nyelvek/0')
                .send({ nev: 'Language' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate language', async () => {
            Language.updateLanguage.mockImplementation((id, nev, cb) => cb({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .put('/api/nyelvek/1')
                .send({ nev: 'Hungarian' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Language.updateLanguage.mockImplementation((id, nev, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .put('/api/nyelvek/999')
                .send({ nev: 'Nonexistent Language' });
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Language.updateLanguage.mockImplementation((id, nev, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .put('/api/nyelvek/1')
                .send({ nev: 'Any Language' });
            expect(res.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/nyelvek/:id', () => {
        it('should delete a language', async () => {
            Language.deleteLanguage.mockImplementation((id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .delete('/api/nyelvek/1');
            expect(res.statusCode).toBe(204);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .delete('/api/nyelvek/0');
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Language.deleteLanguage.mockImplementation((id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .delete('/api/nyelvek/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Language.deleteLanguage.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .delete('/api/nyelvek/1');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('Method Not Allowed', () => {
        it('should return 405 for PATCH', async () => {
            const res = await request(app)
                .patch('/api/nyelvek/1');
            expect(res.statusCode).toBe(405);
        });
    });
});
