jest.mock('../config/database', () => ({}));
jest.mock('../models/genreModel');
jest.mock('../middleware/authMiddleware', () => ({
    varifyToken: (req, res, next) => next(),
    requireRole: () => (req, res, next) => next()
}));

const request = require('supertest');
const express = require('express');
const genreRoutes = require('../routes/genreRoutes');
const Genre = require('../models/genreModel');

const app = express();
app.use(express.json());
app.use('/api/mufajok', genreRoutes);

describe('Genre Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/mufajok', () => {
        it('should return all genres', async () => {
            const mockGenres = [{ id: 1, nev: 'Genre 1' }];
            Genre.selectAllGenre.mockImplementation(cb => cb(null, mockGenres));
            const res = await request(app).get('/api/mufajok');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockGenres);
        });
        it('should handle server error', async () => {
            Genre.selectAllGenre.mockImplementation(cb => cb(new Error('DB error')));
            const res = await request(app).get('/api/mufajok');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('POST /api/mufajok', () => {
        it('should create a new genre', async () => {
            Genre.insertGenre.mockImplementation((nev, cb) => cb(null, { insertId: 2 }));
            const res = await request(app)
                .post('/api/mufajok')
                .send({ nev: 'New Genre' });
            expect(res.statusCode).toBe(201);
            expect(res.body.adatok).toEqual({ id: 2, nev: 'New Genre' });
        });
        it('should fail validation if nev is missing', async () => {
            const res = await request(app)
                .post('/api/mufajok')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate genre', async () => {
            Genre.insertGenre.mockImplementation((nev, cb) => cb({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .post('/api/mufajok')
                .send({ nev: 'Existing Genre' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle server error', async () => {
            Genre.insertGenre.mockImplementation((nev, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .post('/api/mufajok')
                .send({ nev: 'Any Genre' });
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/mufajok/:id', () => {
        it('should update a genre', async () => {
            Genre.updateGenre.mockImplementation((id, nev, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .put('/api/mufajok/1')
                .send({ nev: 'Updated Genre' });
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual({ id: '1', nev: 'Updated Genre' });
        });
        it('should fail validation if nev is missing', async () => {
            const res = await request(app)
                .put('/api/mufajok/1')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .put('/api/mufajok/0')
                .send({ nev: 'Genre' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate genre', async () => {
            Genre.updateGenre.mockImplementation((id, nev, cb) => cb({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .put('/api/mufajok/1')
                .send({ nev: 'Existing Genre' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Genre.updateGenre.mockImplementation((id, nev, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .put('/api/mufajok/999')
                .send({ nev: 'Nonexistent Genre' });
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Genre.updateGenre.mockImplementation((id, nev, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .put('/api/mufajok/1')
                .send({ nev: 'Any Genre' });
            expect(res.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/mufajok/:id', () => {
        it('should delete a genre', async () => {
            Genre.deleteGenre.mockImplementation((id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .delete('/api/mufajok/1');
            expect(res.statusCode).toBe(204);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .delete('/api/mufajok/0');
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Genre.deleteGenre.mockImplementation((id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .delete('/api/mufajok/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Genre.deleteGenre.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .delete('/api/mufajok/1');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('Method Not Allowed', () => {
        it('should return 405 for PATCH', async () => {
            const res = await request(app)
                .patch('/api/mufajok/1');
            expect(res.statusCode).toBe(405);
        });
    });
});
