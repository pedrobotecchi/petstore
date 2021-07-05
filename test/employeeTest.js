// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
chai.use(chaiHttp);

describe('/GET employee', () => {
  it('it should GET all the employees', (done) => {
    chai.request(app)
      .get('/employees')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(-1);
        done();
      });
  });
});

describe('/POST employee', () => {
  it('it should POST a employee into DB', (done) => {
    const employee = {
      user: 'testeEmployee',
      name: 'Jairinho',
      password: 'password',
    }
    chai.request(app)
      .post('/employees/signup')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/POST employee', () => {
  it('it should not POST a employee without user into DB', (done) => {
    const employee = {
      name: 'Jairinho',
      password: 'password',
    }
    chai.request(app)
      .post('/employees/signup')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('user');
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/PATCH employee', () => {
  it('it should Update a employee into DB', (done) => {
    const employee = {
      oldUser: 'testeEmployee',
      newInfos: {
        user: 'teste',
        name: 'Jairo',
      }
    }
    chai.request(app)
      .patch('/employees')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/REMOVE employee', () => {
  it('it should remove a employee into DB', (done) => {
    const employee = {
      uid:'1'
    }
    chai.request(app)
      .patch('/employees')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})
