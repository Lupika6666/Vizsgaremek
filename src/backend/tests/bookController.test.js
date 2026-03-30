jest.mock('../config/database', () => ({}));
jest.mock('../models/bookModel');
jest.mock('../middleware/authMiddleware', () => ({
    varifyToken: (req, res, next) => next(),
    requireRole: () => (req, res, next) => next()
}));

const request = require('supertest');
const express = require('express');
const bookRoutes = require('../routes/bookRoutes');
const Book = require('../models/bookModel');

const app = express();
app.use(express.json());
app.use('/api/konyvek', bookRoutes);

describe('Book Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/konyvek', () => {
        it('should return all books', async () => {
            const mockBooks = [{ id: 1, cim: 'Book 1' }];
            Book.selectAllBook.mockImplementation(cb => cb(null, mockBooks));
            const res = await request(app).get('/api/konyvek');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockBooks);
        });
        it('should handle server error', async () => {
            Book.selectAllBook.mockImplementation(cb => cb(new Error('DB error')));
            const res = await request(app).get('/api/konyvek');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('GET /api/konyvek/:id', () => {
        it('should return a book by id', async () => {
            const mockBook = [{ id: 1, cim: 'Book 1' }];
            Book.selectBookById.mockImplementation((id, cb) => cb(null, mockBook));
            const res = await request(app).get('/api/konyvek/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockBook);
        });
        it('should return 404 if not found', async () => {
            Book.selectBookById.mockImplementation((id, cb) => cb(null, []));
            const res = await request(app).get('/api/konyvek/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Book.selectBookById.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app).get('/api/konyvek/1');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('POST /api/konyvek', () => {
        const validBook = {
            cim: 'New Book',
            isbn: '0471958697', // valid ISBN-10
            publikalas_ev: 2020,
            leiras: 'Description',
            nyelv_id: 1,
            szerzo_id: 1,
            mufaj_id: 1
        };
        it('should create a new book', async () => {
            Book.insertBook.mockImplementation((...args) => args[args.length-1](null, { insertId: 2 }));
            const res = await request(app)
                .post('/api/konyvek')
                .send(validBook);
            expect(res.statusCode).toBe(201);
            expect(res.body.adatok).toMatchObject({ id: 2, ...validBook });
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/konyvek')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should handle duplicate ISBN', async () => {
            Book.insertBook.mockImplementation((...args) => args[args.length-1]({ code: 'ER_DUP_ENTRY' }));
            const res = await request(app)
                .post('/api/konyvek')
                .send(validBook);
            expect(res.statusCode).toBe(400);
        });
        it('should handle server error', async () => {
            Book.insertBook.mockImplementation((...args) => args[args.length-1](new Error('DB error')));
            const res = await request(app)
                .post('/api/konyvek')
                .send(validBook);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/konyvek/:id', () => {
        const updateBook = {
            cim: 'Updated Book',
            publikalas_ev: 2021,
            leiras: 'Updated description',
            nyelv_id: 1,
            szerzo_id: 1,
            mufaj_id: 1
        };
        it('should update a book', async () => {
            Book.updateBook.mockImplementation((...args) => args[args.length-1](null, { affectedRows: 1 }));
            const res = await request(app)
                .put('/api/konyvek/1')
                .send(updateBook);
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toMatchObject({ id: '1', ...updateBook });
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .put('/api/konyvek/1')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should return 404 if not found', async () => {
            Book.updateBook.mockImplementation((...args) => args[args.length-1](null, { affectedRows: 0 }));
            const res = await request(app)
                .put('/api/konyvek/999')
                .send(updateBook);
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Book.updateBook.mockImplementation((...args) => args[args.length-1](new Error('DB error')));
            const res = await request(app)
                .put('/api/konyvek/1')
                .send(updateBook);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/konyvek/:id', () => {
        it('should delete a book', async () => {
            Book.deleteBook.mockImplementation((id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .delete('/api/konyvek/1');
            expect(res.statusCode).toBe(204);
        });
        it('should return 404 if not found', async () => {
            Book.deleteBook.mockImplementation((id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .delete('/api/konyvek/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Book.deleteBook.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .delete('/api/konyvek/1');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('Method Not Allowed', () => {
        it('should return 405 for PATCH', async () => {
            const res = await request(app)
                .patch('/api/konyvek/1');
            expect(res.statusCode).toBe(405);
        });
    });
});
