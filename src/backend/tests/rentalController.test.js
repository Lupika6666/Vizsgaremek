jest.mock('../config/database', () => ({}));
jest.mock('../models/rentalModel');
jest.mock('../middleware/authMiddleware', () => ({
    varifyToken: (req, res, next) => next(),
    requireRole: () => (req, res, next) => next()
}));

const request = require('supertest');
const express = require('express');
const rentalRoutes = require('../routes/rentalRoutes');
const Rental = require('../models/rentalModel');

const app = express();
app.use(express.json());
app.use('/api/kolcsonzesek', rentalRoutes);

describe('Rental Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/kolcsonzesek', () => {
        it('should return all rentals', async () => {
            const mockRentals = [{ id: 1, kolcsonzes_ideje: '2026-03-30', hatarido: '2026-04-10', peldany_id: 1, olvaso_id: 1 }];
            Rental.selectAllRental.mockImplementation(cb => cb(null, mockRentals));
            const res = await request(app).get('/api/kolcsonzesek');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockRentals);
        });
        it('should handle server error', async () => {
            Rental.selectAllRental.mockImplementation(cb => cb(new Error('DB error')));
            const res = await request(app).get('/api/kolcsonzesek');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('GET /api/kolcsonzesek/:id', () => {
        it('should return a rental by id', async () => {
            const mockRental = [{ id: 1, kolcsonzes_ideje: '2026-03-30', hatarido: '2026-04-10', peldany_id: 1, olvaso_id: 1 }];
            Rental.selectRentalById.mockImplementation((id, cb) => cb(null, mockRental));
            const res = await request(app).get('/api/kolcsonzesek/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual(mockRental);
        });
        it('should return 404 if not found', async () => {
            Rental.selectRentalById.mockImplementation((id, cb) => cb(null, []));
            const res = await request(app).get('/api/kolcsonzesek/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Rental.selectRentalById.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app).get('/api/kolcsonzesek/1');
            expect(res.statusCode).toBe(500);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app).get('/api/kolcsonzesek/0');
            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/kolcsonzesek', () => {
        const validRental = { kolcsonzes_ideje: '2026-03-30', hatarido: '2026-04-10', peldany_id: 1, olvaso_id: 1 };
        it('should create a new rental', async () => {
            Rental.insertRental.mockImplementation((...args) => args[args.length-1](null, { insertId: 2 }));
            const res = await request(app)
                .post('/api/kolcsonzesek')
                .send(validRental);
            expect(res.statusCode).toBe(201);
            expect(res.body.adatok).toEqual({ id: 2, ...validRental });
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/kolcsonzesek')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if peldany_id is not positive integer', async () => {
            const res = await request(app)
                .post('/api/kolcsonzesek')
                .send({ ...validRental, peldany_id: 0 });
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if kolcsonzes_ideje is not ISO8601', async () => {
            const res = await request(app)
                .post('/api/kolcsonzesek')
                .send({ ...validRental, kolcsonzes_ideje: 'not-a-date' });
            expect(res.statusCode).toBe(400);
        });
        it('should handle server error', async () => {
            Rental.insertRental.mockImplementation((...args) => args[args.length-1](new Error('DB error')));
            const res = await request(app)
                .post('/api/kolcsonzesek')
                .send(validRental);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/kolcsonzesek/:id', () => {
        const updateRental = { kolcsonzes_ideje: '2026-04-01', hatarido: '2026-04-15', peldany_id: 2, olvaso_id: 2 };
        it('should update a rental', async () => {
            Rental.updateRental.mockImplementation((...args) => args[args.length-1](null, { affectedRows: 1 }));
            const res = await request(app)
                .put('/api/kolcsonzesek/1')
                .send(updateRental);
            expect(res.statusCode).toBe(200);
            expect(res.body.adatok).toEqual({ id: '1', ...updateRental });
        });
        it('should fail validation if required fields are missing', async () => {
            const res = await request(app)
                .put('/api/kolcsonzesek/1')
                .send({});
            expect(res.statusCode).toBe(400);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .put('/api/kolcsonzesek/0')
                .send(updateRental);
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Rental.updateRental.mockImplementation((...args) => args[args.length-1](null, { affectedRows: 0 }));
            const res = await request(app)
                .put('/api/kolcsonzesek/999')
                .send(updateRental);
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Rental.updateRental.mockImplementation((...args) => args[args.length-1](new Error('DB error')));
            const res = await request(app)
                .put('/api/kolcsonzesek/1')
                .send(updateRental);
            expect(res.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/kolcsonzesek/:id', () => {
        it('should delete a rental', async () => {
            Rental.deleteRental.mockImplementation((id, cb) => cb(null, { affectedRows: 1 }));
            const res = await request(app)
                .delete('/api/kolcsonzesek/1');
            expect(res.statusCode).toBe(204);
        });
        it('should fail validation if id is not positive integer', async () => {
            const res = await request(app)
                .delete('/api/kolcsonzesek/0');
            expect(res.statusCode).toBe(400);
        });
        it('should handle not found', async () => {
            Rental.deleteRental.mockImplementation((id, cb) => cb(null, { affectedRows: 0 }));
            const res = await request(app)
                .delete('/api/kolcsonzesek/999');
            expect(res.statusCode).toBe(404);
        });
        it('should handle server error', async () => {
            Rental.deleteRental.mockImplementation((id, cb) => cb(new Error('DB error')));
            const res = await request(app)
                .delete('/api/kolcsonzesek/1');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('Method Not Allowed', () => {
        it('should return 405 for PATCH', async () => {
            const res = await request(app)
                .patch('/api/kolcsonzesek/1');
            expect(res.statusCode).toBe(405);
        });
    });
});

