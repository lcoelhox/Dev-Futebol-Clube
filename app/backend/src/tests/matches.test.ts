import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Matches from '../database/models/Matches';

import { App } from '../app';

import { allMatches,
  matchNewBody,
  matchNew,
  loginUser,
  identicalTeams,
  invalidTeams,
  matchEdition, } from './mocks/matchers.mocks';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testando Matches', () => {
  it('testando buscar todas as partidas', async () => {
    sinon.stub(Matches, "findAll").resolves(allMatches as unknown as Matches[]);

    const { body } = await chai.request(app).get('/matches');

      expect(body).to.deep.equal(allMatches);
    });

  it('testando salvar uma partida', async () => {
    sinon.stub(Matches, "create").resolves(matchNew as unknown as Matches);

    const { body: { token } } = await chai.request(app).post('/login').send(loginUser);
    const { body } = await chai.request(app).post('/matches').send(matchNewBody)
    .set({ authorization: token })

    expect(body).to.deep.equal(matchNew)
  });
  
  it('Testando que não é possível salvar uma partida com times iguais', async () => { 
    const { body: { token } } = await chai.request(app).post('/login').send(loginUser);

    const { body } = await chai.request(app).post('/matches').send(identicalTeams)
    .set({ authorization: token });

    expect(body.message).to.equal('It is not possible to create a match with two equal teams');
  });

  it('Testando que não é possível salvar uma partida com token inválido', async () => {
    const { body } = await chai.request(app).post('/matches')
    .send(matchNewBody).set({ authorization: 'tokenInválido' });

    expect(body.message).to.equal('Token must be a valid token');
  });

  it('Testando que não é possível salvar uma partida com algum time que não existe', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send(loginUser);

    const { body } = await chai.request(app).post('/matches').send(invalidTeams)
    .set({ authorization: token });

    expect(body.message).to.equal('There is no team with such id!');
  });

  it('Testando que é possível editar uma partida', async () => {
    sinon.stub(Matches, "update").resolves(undefined);

    const { body } = await chai.request(app).patch('/matches/1').send(matchEdition);

    expect(body.message).to.equal('Edited');
  });

  it('testando que é possível terminar uma partida', async () => {
    sinon.stub(Matches, "update").resolves(undefined);

    const { body } = await chai.request(app).patch('/matches/1/finish');

    expect(body.message).to.equal('Finished');
  });

afterEach(sinon.restore);
});