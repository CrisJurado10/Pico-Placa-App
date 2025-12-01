import request from 'supertest';
import app from '../../src/server';

describe('API Integration Tests', () => {
  describe('POST /api/predict', () => {
    it('should return allowed to drive for a valid plate, date, and time (outside restricted hours)', async () => {
      const response = await request(app)
        .post('/api/predict')
        .send({
          plate: 'PBX-1234', // Ends in 4, restriction is Tuesday
          date: '2023-10-23', // Monday
          time: '08:00',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('canDrive', true);
      expect(response.body.message).toContain('You are allowed to drive');
    });

    it('should return restriction active for a restricted plate, date, and time', async () => {
      const response = await request(app)
        .post('/api/predict')
        .send({
          plate: 'PBX-1234', // Ends in 4, restriction is Tuesday
          date: '2023-10-24', // Tuesday
          time: '08:00', // Restricted time (07:00 - 09:30)
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('canDrive', false);
      expect(response.body.message).toContain('Restriction active');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/predict')
        .send({
          plate: 'PBX-1234',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid plate format', async () => {
      const response = await request(app)
        .post('/api/predict')
        .send({
          plate: 'INVALID',
          date: '2023-10-24',
          time: '08:00',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
