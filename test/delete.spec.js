import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;


describe('delete', () => {

    // Solução B 
    context('quando apago uma tarefa', () => {

        let task = {
            _id: require('mongoose').Types.ObjectId(),
            title: 'Pagar conta de celular',
            owner: 'eu@papito.io',
            done: false
        }

        before((done) => {
            tasksModel.insertMany([task], (error, docs) => {
                request
                    .delete('/task/' + task._id)
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.eql({})
                        done()
                    })
            })

        })

        it('então o retorno deve ser 404', (done) => {
            request
            .get('/task/' + task._id)
            .end((err, res) => {
                expect(res).to.have.status(404)
                done()
            })
        })
    })

    context('quando a tarefa nao existe', () => {
        it('deve retornar 200', (done) => {
            let id = require('mongoose').Types.ObjectId();
            request
                .delete('/task/' + id)
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    expect(res.body).to.eql({})
                    done()
                })
        })
    })
})