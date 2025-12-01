import request from 'supertest';
import app from '../../src/server';

describe('POST /api/predict', () => {
    it('should return 200 and canDrive: true for unrestricted plate/time', async () => {
        // Tuesday, Plate ending in 1 (Not restricted)
        const response = await request(app)
            .post('/api/predict')
            .send({
                plate: 'PBC-1231',
                date: '2025-12-02',
                time: '08:00'
            });

        expect(response.status).toBe(200);
        expect(response.body.canDrive).toBe(true);
        expect(response.body.message).toContain('allowed to drive');
    });

    it('should return 200 and canDrive: false for restricted plate/time', async () => {
        // Monday, Plate ending in 1 (Restricted 07:00-09:30)
        const response = await request(app)
            .post('/api/predict')
            .send({
                plate: 'PBC-1231',
                date: '2025-12-01',
                time: '08:00'
            });

        expect(response.status).toBe(200);
        expect(response.body.canDrive).toBe(false);
        expect(response.body.message).toContain('Restriction active');
    });

    it('should return 400 if fields are missing', async () => {
        const response = await request(app)
            .post('/api/predict')
            .send({
                plate: 'PBC-1234'
                // missing date and time
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('Missing required fields');
    });

    it('should return 400 for invalid plate format', async () => {
        const response = await request(app)
            .post('/api/predict')
            .send({
                plate: 'INVALID-PLATE',
                date: '2025-12-01',
                time: '08:00'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('Invalid plate format');
    });

    it('should return 200 and canDrive: true for holidays (mock logic check integration)', async () => {
        // Christmas (Restricted plate if it wasn't a holiday)
        // 2025-12-25 is Thursday. Plate ending in 7 is restricted on Thu.
        // But it is a holiday.
        const response = await request(app)
            .post('/api/predict')
            .send({
                plate: 'PBC-1237',
                date: '2025-12-25',
                time: '08:00'
            });

        expect(response.status).toBe(200);
        expect(response.body.canDrive).toBe(true);
    });
});
