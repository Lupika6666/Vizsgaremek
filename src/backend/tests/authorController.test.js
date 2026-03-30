jest.mock('../config/database', () => ({}));
jest.mock('../models/authorModel');
jest.mock('../middleware/authMiddleware', () => ({
    varifyToken: (req, res, next) => next(),
    requireRole: () => (req, res, next) => next()
}));

const request = require('supertest');
const express = require('express');
const authorRoutes = require('../routes/authorRoutes');
const Szerzo = require('../models/authorModel');

const app = express();
app.use(express.json());
app.use('/api/szerzok', authorRoutes);

describe('Author Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/szerzok', () => {
        it('should return all authors', async () => {
            const mockAuthors = [{ id: 1, nev: 'Author 1' }];
            Szerzo.selectAllAuthor.mockImplementation(cb => cb(null, mockAuthors));
            const res = await request(app).get('/api/szerzok');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockAuthors);
        });
        it('should handle server error', async () => {
            Szerzo.selectAllAuthor.mockImplementation(cb => cb(new Error('DB error')));
            const res = await request(app).get('/api/szerzok');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('POST /api/szerzok', () => {
        it('should create a new author', async () => {
            Szerzo.insertAuthor.mockImplementation((nev, cb) => cb(null, { insertId: 2 }));
            const res = await request(app)
                .post('/api/szerzok')
                .send({ nev: 'New Author' });
            expect(res.statusCode).toBe(201);
            expect(res.body.adatok).toEqual({ id: 2, nev: 'New Author' });
        });
        it('should fail validation if nev is missing', async () => {
            const res = await request(app)
                .post('/api/szerzok')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate author', async () => {
            Szerzo.insertAuthor.mockImplementation((nev, cb) => cb({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .post('/api/szerzok')
                .send({ nev: 'Existing Author' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle server error', async () => {
            Szerzo.insertAuthor.mockImplementation((nev, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .post('/api/szerzok')
                .send({ nev: 'Any Author' });
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/szerzok/:id', () => {
        it('should update an author', async () => {
            Szerzo.updateAuthor.mockImplementation((id, nev, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .put('/api/szerzok/1')
                .send({ nev: 'Updated Author' });
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual({ id: '1', nev: 'Updated Author' });
        });
        it('should fail validation if nev is missing', async () => {
            const res = await request(app)
                .put('/api/szerzok/1')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate author', async () => {
            Szerzo.updateAuthor.mockImplementation((id, nev, cb) => cb({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .put('/api/szerzok/1')
                .send({ nev: 'Existing Author' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Szerzo.updateAuthor.mockImplementation((id, nev, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .put('/api/szerzok/999')
                .send({ nev: 'Nonexistent Author' });
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Szerzo.updateAuthor.mockImplementation((id, nev, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .put('/api/szerzok/1')
                .send({ nev: 'Any Author' });
            expect(res.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/szerzok/:id', () => {
        it('should delete an author', async () => {
            Szerzo.deleteAuthor.mockImplementation((id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .delete('/api/szerzok/1');
            expect(res.statusCode).toBe(204);
        });
        it('should handle not found', async () => {
            Szerzo.deleteAuthor.mockImplementation((id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .delete('/api/szerzok/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Szerzo.deleteAuthor.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .delete('/api/szerzok/1');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('Method Not Allowed', () => {
        it('should return 405 for PATCH', async () => {
            const res = await request(app)
                .patch('/api/szerzok/1');
            expect(res.statusCode).toBe(405);
        });
    });
});
