// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET products', () => {
  it('it should GET all products', (done) => {
    chai.request(app)
      .get('/products')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(-1);
        done();
      });
  });
});

describe('/GET a especific product', () => {
  it('It should query a product with specific id', (done) => {
    uid = '60dc63b6bfa4a17310e6c90e';
    chai.request(app)
      .get('/products/' + uid)
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
})

describe('/PUT product', () => {
  it('it should PUT a product into DB', (done) => {
    const client = {
      price : 20,
      name: 'ProdutoTestador',
      description: '1311',
    }
    chai.request(app)
      .put('/products/insert')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(client)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/PUT product', () => {
  it('it should not PUT a product without price and name into DB', (done) => {
    const client = {
      description: 'teste',
    }
    chai.request(app)
      .put('/products/insert')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(client)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('name');
        res.body.errors.should.have.property('price');
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/PATCH product', () => {
  it('it should Update a product into DB', (done) => {
    const product = {
      uid: "60db5713612083592516eb37",
      newInfos: {
        price : 40,
        name: 'ProdutoTest',
        description: '13113',
      }
    }
    chai.request(app)
      .patch('/products')
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(product)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})

describe('/REMOVE products', () => {
  it('it should remove a product from DB', (done) => {
    const product = {
      uid:'60db5713612083592516eb37'
    }
    chai.request(app)
      .delete('/products/' + product.uid)
      .set({ Authorization: `Bearer ${process.env.API_TOKEN}` })
      .send(product)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  })
})
