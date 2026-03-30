jest.mock('../config/database', () => ({}));
jest.mock('../models/bookCopyModel');
jest.mock('../middleware/authMiddleware', () => ({
    varifyToken: (req, res, next) => next(),
    requireRole: () => (req, res, next) => next()
}));

const request = require('supertest');
const express = require('express');
const bookCopyRoutes = require('../routes/bookCopyRoutes');
const BookCopy = require('../models/bookCopyModel');

const app = express();
app.use(express.json());
app.use('/api/peldanyok', bookCopyRoutes);

describe('BookCopy Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/peldanyok', () => {
        it('should return all book copies', async () => {
            const mockCopies = [{ id: 1, hely: 'A1', konyv_id: 1 }];
            BookCopy.selectAllBookCopy.mockImplementation(cb => cb(null, mockCopies));
            const res = await request(app).get('/api/peldanyok');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockCopies);
        });
        it('should handle server error', async () => {
            BookCopy.selectAllBookCopy.mockImplementation(cb => cb(new Error('DB error')));
            const res = await request(app).get('/api/peldanyok');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('GET /api/peldanyok/:id', () => {
        it('should return a book copy by id', async () => {
            const mockCopy = [{ id: 1, hely: 'A1', konyv_id: 1 }];
            BookCopy.selectBookCopyById.mockImplementation((id, cb) => cb(null, mockCopy));
            const res = await request(app).get('/api/peldanyok/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockCopy);
        });
        it('should return 404 if not found', async () => {
            BookCopy.selectBookCopyById.mockImplementation((id, cb) => cb(null, []));
            const res = await request(app).get('/api/peldanyok/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            BookCopy.selectBookCopyById.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app).get('/api/peldanyok/1');
            expect(res.statusCode).toBe(500);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app).get('/api/peldanyok/0');
            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/peldanyok', () => {
        const validCopy = { hely: 'A1', konyv_id: 1 };
        it('should create a new book copy', async () => {
            BookCopy.insertBookCopy.mockImplementation((hely, konyv_id, cb) => cb(null, { insertId: 2 }));
            const res = await request(app)
                .post('/api/peldanyok')
                .send(validCopy);
            expect(res.statusCode).toBe(201);
            expect(res.body.adatok).toEqual({ id: 2, ...validCopy });
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/peldanyok')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if konyv_id is not positive integer', async () => {
            const res = await request(app)
                .post('/api/peldanyok')
                .send({ hely: 'A1', konyv_id: 0 });
            expect(res.statusCode).toBe(400);
        });
        it('should handle server error', async () => {
            BookCopy.insertBookCopy.mockImplementation((hely, konyv_id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .post('/api/peldanyok')
                .send(validCopy);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/peldanyok/:id', () => {
        const updateCopy = { hely: 'B2', konyv_id: 2 };
        it('should update a book copy', async () => {
            BookCopy.updateBookCopy.mockImplementation((id, hely, konyv_id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .put('/api/peldanyok/1')
                .send(updateCopy);
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual({ id: '1', ...updateCopy });
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .put('/api/peldanyok/1')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .put('/api/peldanyok/0')
                .send(updateCopy);
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            BookCopy.updateBookCopy.mockImplementation((id, hely, konyv_id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .put('/api/peldanyok/999')
                .send(updateCopy);
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            BookCopy.updateBookCopy.mockImplementation((id, hely, konyv_id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .put('/api/peldanyok/1')
                .send(updateCopy);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/peldanyok/:id', () => {
        it('should delete a book copy', async () => {
            BookCopy.deleteBookCopy.mockImplementation((id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .delete('/api/peldanyok/1');
            expect(res.statusCode).toBe(204);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .delete('/api/peldanyok/0');
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            BookCopy.deleteBookCopy.mockImplementation((id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .delete('/api/peldanyok/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            BookCopy.deleteBookCopy.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .delete('/api/peldanyok/1');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('Method Not Allowed', () => {
        it('should return 405 for PATCH', async () => {
            const res = await request(app)
                .patch('/api/peldanyok/1');
            expect(res.statusCode).toBe(405);
        });
    });
});

