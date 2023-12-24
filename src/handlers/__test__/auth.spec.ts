import request from 'supertest';
import app from '../../app';


// TODO: Create login endpoint testing using supertest

describe('POST /api/auth/login', () => {
  it('should response with 200 as status code and return login data', async () => {
    // Sesuaikan dengan data yang ada didalam database
    const loginData = {
      email: 'admin@gmail.com',
      password: 'admin12345',
    };

    return request(app)
      .post('/api/auth/login')
      .set('Content-type', 'application/json')
      .send(loginData)
      .then(async (res) => {
        //sesuaikan dengan response yang didapat di postman
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('OK');
        expect(res.body.message).toBe('User logged in succesfully');
        expect(res.body.data).toHaveProperty("access_token");
        console.log(res.body);
      });
      
  });

  
});



