import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/Teams';
import { app } from '../app';
import { Response } from 'superagent';

import { teamsMockAll, teamMockOne } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando Teams', () => {
  let chaiResponse: Response;

  before(async () => {
    sinon
     .stub(Teams, 'findAll')
     .resolves(teamsMockAll  as Teams[]);

    sinon
     .stub(Teams, 'findOne')
     .resolves(teamMockOne as Teams);
 });

  it('testando a busca de todos os times', async () => {
    chaiResponse = await chai.request(app).get('/teams').send();

    expect(chaiResponse.body).to.deep.equal(teamsMockAll);
  })

  it('testando a busca de um time', async () => {
    chaiResponse = await chai.request(app).get('/teams/1').send();

    expect(chaiResponse.body).to.deep.equal(teamMockOne);
  })

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findOne as sinon.SinonStub).restore();
 });

})