import * as chai from 'chai';
import supertest from 'supertest';
import app from '../app/application';

const expect = chai.expect;
const agentInstance = supertest.agent(app);
const originHeaderValue = 'http://localhost:3003';

describe('Express Application Configuration', () => {
  before(() => {
    agentInstance.set('Origin', originHeaderValue); // sets headers before each request to server, to avoid cors error blocking connection
  });
  it('should set up CORS middleware correctly', async () => {
    await agentInstance.get('/');
    expect('Access-Control-Allow-Origin', originHeaderValue);
  });

  it('should parse JSON and handle URL encoding on routes the server endpoints', async () => {
    const response = await agentInstance.post('/api/v1').send({ name: 'Divinefavour David' });
    expect(response.status).to.deep.equal(200);
    expect(response.body).to.deep.equal({ name: 'Divinefavour David' });
  });
});
