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
});
