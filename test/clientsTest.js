// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET clients', () => {
  it('it should GET all clients', (done) => {
    chai.request(app)
      .get('/clients')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(-1);
        done();
      });
  });
});

describe('/GET a especific client', () => {
  it('It should query a client with specific id', (done) => {
    uid = '60db519e672ea451958cce95';
    chai.request(app)
      .get('/clients/' + uid)
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
})

describe('/POST client', () => {
  it('it should POST a client into DB', (done) => {
    const client = {
      cpf : '11111111111',
      name: 'ClientTestador',
      phone: '111111111311',
      address: 'Rua teste',
    }
    chai.request(app)
      .post('/clients/insert')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(client)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/POST client', () => {
  it('it should not POST a client without CPF into DB', (done) => {
    const client = {
      name: 'ClientTestador',
      phone: '111111111311',
      address: 'Rua teste',
    }
    chai.request(app)
      .post('/clients/insert')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(client)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('cpf');
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/PATCH client', () => {
  it('it should Update a client into DB', (done) => {
    const client = {
      oldClientCPF : '11111111111',
      oldInfos : {
        name: 'ClientTestador',
        phone: '111111111311',
        address: 'Rua teste',
      }
    }
    chai.request(app)
      .patch('/clients')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(client)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/REMOVE clients', () => {
  it('it should remove a client from DB', (done) => {
    const client = {
      uid:'1'
    }
    chai.request(app)
      .patch('/clients')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(client)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})
