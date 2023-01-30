import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/Users';
import JwtToken from '../auth/JWT';

dotenv.config();
chai.use(chaiHttp);

const { expect } = chai;

import { userAdminMock } from './mocks/login.mocks';

describe('testando login', () => {
  let chaiResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userAdminMock as Users);
  });

  it('Testando um login corretamente', async () => {
    chaiResponse = await chai.request(app).post('/login')
    .send({
      email: userAdminMock.email,
      password: 'secret_admin',
    });

    const jwtToken = new JwtToken();
    const token = jwtToken.generateToken(userAdminMock);

    expect(chaiResponse.body).to.deep.equal({ token })
  });
  
  it('Testando requisição de informações de um usuario', async () => {
    const jwtToken = new JwtToken();
    const token = jwtToken.generateToken(userAdminMock);

    chaiResponse = chaiResponse = await chai.request(app).get('/login/validate')
    .set('Authorization', token);

    expect(chaiResponse.body).to.deep.equal({ role: userAdminMock.role })
  });

  it('Testando login com senha invalida', async () => {
    chaiResponse = chaiResponse = await chai.request(app).post('/login')
    .send({
      email: userAdminMock.email,
      password: 'secret_admi',
    });

    expect(chaiResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('Testando login sem a senha', async () => {
    chaiResponse = await chai.request(app).post('/login')
    .send({
      email: userAdminMock.email,
    });

    expect(chaiResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });


  it('Testaando login com email inexistente', async () => {
    (Users.findOne as sinon.SinonStub).restore();
    sinon.stub(Users, "findOne").resolves(null);

    chaiResponse = chaiResponse = await chai.request(app).post('/login')
    .send({
      email: 'body100@admin.com',
      password: 'secret_admin',
    });

    expect(chaiResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  after(()=> {
    (Users.findOne as sinon.SinonStub).restore();
  });

});