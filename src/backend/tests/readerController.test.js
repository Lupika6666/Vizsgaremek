jest.mock('../config/database', () => ({}));
jest.mock('../models/readerModel');
jest.mock('../middleware/authMiddleware', () => ({
    varifyToken: (req, res, next) => next(),
    requireRole: () => (req, res, next) => next()
}));

const request = require('supertest');
const express = require('express');
const readerRoutes = require('../routes/readerRoutes');
const Reader = require('../models/readerModel');

const app = express();
app.use(express.json());
app.use('/api/olvasok', readerRoutes);

describe('Reader Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/olvasok', () => {
        it('should return all readers', async () => {
            const mockReaders = [{ kartyaszam: 123456, nev: 'Teszt Elek', email: 'teszt@teszt.hu', tel: '+36301234567' }];
            Reader.selectAllReader.mockImplementation(cb => cb(null, mockReaders));
            const res = await request(app).get('/api/olvasok');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockReaders);
        });
        it('should handle server error', async () => {
            Reader.selectAllReader.mockImplementation(cb => cb(new Error('DB error')));
            const res = await request(app).get('/api/olvasok');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('GET /api/olvasok/:id', () => {
        it('should return a reader by id', async () => {
            const mockReader = [{ kartyaszam: 123456, nev: 'Teszt Elek', email: 'teszt@teszt.hu', tel: '+36301234567' }];
            Reader.selectReaderById.mockImplementation((id, cb) => cb(null, mockReader));
            const res = await request(app).get('/api/olvasok/123456');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockReader);
        });
        it('should return 404 if not found', async () => {
            Reader.selectReaderById.mockImplementation((id, cb) => cb(null, []));
            const res = await request(app).get('/api/olvasok/999999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Reader.selectReaderById.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app).get('/api/olvasok/123456');
            expect(res.statusCode).toBe(500);
        });
        it('should fail validation if id is not 6-digit', async () => {
            const res = await request(app).get('/api/olvasok/1');
            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/olvasok', () => {
        const validReader = { kartyaszam: 123456, nev: 'Teszt Elek', email: 'teszt@teszt.hu', tel: '+36301234567' };
        it('should create a new reader', async () => {
            Reader.insertReader.mockImplementation((kartyaszam, nev, email, tel, cb) => cb(null, { insertId: 123456 }));
            const res = await request(app)
                .post('/api/olvasok')
                .send(validReader);
            expect(res.statusCode).toBe(201);
            expect(res.body.adatok).toEqual(validReader);
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/olvasok')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if kartyaszam is not 6-digit', async () => {
            const res = await request(app)
                .post('/api/olvasok')
                .send({ ...validReader, kartyaszam: 1 });
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if email is invalid', async () => {
            const res = await request(app)
                .post('/api/olvasok')
                .send({ ...validReader, email: 'invalid' });
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if tel is invalid', async () => {
            const res = await request(app)
                .post('/api/olvasok')
                .send({ ...validReader, tel: '123' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle server error', async () => {
            Reader.insertReader.mockImplementation((kartyaszam, nev, email, tel, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .post('/api/olvasok')
                .send(validReader);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/olvasok/:id', () => {
        const updateReader = { nev: 'Teszt Edit', email: 'edit@teszt.hu', tel: '+36301112222' };
        it('should update a reader', async () => {
            Reader.updateReader.mockImplementation((id, nev, email, tel, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .put('/api/olvasok/123456')
                .send(updateReader);
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual({ kartyaszam: '123456', ...updateReader });
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .put('/api/olvasok/123456')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if id is not 6-digit', async () => {
            const res = await request(app)
                .put('/api/olvasok/1')
                .send(updateReader);
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Reader.updateReader.mockImplementation((id, nev, email, tel, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .put('/api/olvasok/999999')
                .send(updateReader);
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Reader.updateReader.mockImplementation((id, nev, email, tel, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .put('/api/olvasok/123456')
                .send(updateReader);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/olvasok/:id', () => {
        it('should delete a reader', async () => {
            Reader.deleteReader.mockImplementation((id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .delete('/api/olvasok/123456');
            expect(res.statusCode).toBe(204);
        });
        it('should fail validation if id is not 6-digit', async () => {
            const res = await request(app)
                .delete('/api/olvasok/1');
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Reader.deleteReader.mockImplementation((id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .delete('/api/olvasok/999999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Reader.deleteReader.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .delete('/api/olvasok/123456');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('Method Not Allowed', () => {
        it('should return 405 for PATCH', async () => {
            const res = await request(app)
                .patch('/api/olvasok/123456');
            expect(res.statusCode).toBe(405);
        });
    });
});

