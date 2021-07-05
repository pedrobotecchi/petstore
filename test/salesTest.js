// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET sales', () => {
  it('it should GET all the Sales', (done) => {
    chai.request(app)
      .get('/sales')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(-1);
        done();
      });
  });
});

describe('/GET a especific sale', () => {
  it('It should query a sale with specific id', (done) => {
    uid = '1';
    chai.request(app)
      .get('/sales/' + uid)
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
})

describe('/POST sale', () => {
  it('it should POST a sale into DB', (done) => {
    const sale = {
      amount: 150,
      uid_client: '60db519e672ea451958cce95',
      uid_employee: '60db5826a8461d5b54ba2f4d',
      saleDt: '2021-06-06'
    }
    chai.request(app)
      .post('/sales/sell')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(sale)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/POST sale', () => {
  it('it should not POST a sale without amount, uid_client or uid_client into DB', (done) => {
    const sale = {
      amount: 150,
      uid_employee: '60db5826a8461d5b54ba2f4d',
    }
    chai.request(app)
      .post('/sales/sell')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(sale)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('uid_client');
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/PATCH sale', () => {
  it('it should Update a sale into DB', (done) => {
    const sale = {
      uid: '60dca0c003256144f94aff81',
      newInfo: {
        amount: 500,
      }
    }
    chai.request(app)
      .patch('/sales')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(sale)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/REMOVE sale', () => {
  it('it should remove a sale from the DB', (done) => {
    uid = '60dca0c003256144f94aff81';
    chai.request(app)
      .delete('/sales/' + uid)
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})
