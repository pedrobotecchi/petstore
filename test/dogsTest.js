// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET dogs', () => {
  it('it should GET all the Dogs', (done) => {
    chai.request(app)
      .get('/dogs')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(-1);
        done();
      });
  });
});

describe('/GET a especific dog', () => {
  it('It should query a dog with specific id', (done) => {
    uid = '1';
    chai.request(app)
      .get('/dogs/' + uid)
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
})

describe('/POST dogs', () => {
  it('it should POST a dog into DB', (done) => {
    const dog = {
      cpf: '11111111111',
      dog: {
        name: 'renatinho',
        breed: 'Chowchow',
        furr: 'longo',
        size: 'grande'
      }
    }
    chai.request(app)
      .post('/dogs/insert')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(dog)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/POST dogs', () => {
  it('it should not POST a dog without name into DB', (done) => {
    const dog = {
      cpf: '11111111111',
      dog: {
        breed: 'Chowchow',
        furr: 'longo',
        size: 'grande'
      }
    }
    chai.request(app)
      .post('/dogs/insert')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(dog)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('name');
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/PATCH dogs', () => {
  it('it should Update a dog into DB', (done) => {
    const dog = {
      clienteCPF: '11111111111',
      newInfos: {
        name: 'Jairinhosss',
        breed: 'Chowchow',
        furr: 'longo',
        uid_client: '1',
        size: 'grande'
      }
    }
    chai.request(app)
      .patch('/dogs')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(dog)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/REMOVE dogs', () => {
  it('it should remove a dog into DB', (done) => {
    const dog = {
      uid:'1'
    }
    chai.request(app)
      .patch('/dogs')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(dog)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})
