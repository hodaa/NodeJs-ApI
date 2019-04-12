//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../app/models/note');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Note', () => {
    beforeEach((done) => { //Before each test we empty the database
        Note.deleteMany((err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET notes', () => {
        it('it should GET all the notes', (done) => {
            chai.request(server)
                .get('/notes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /**
     * test insert note
     */

    describe('/Post Notes',()=>{
        it('it should insert new note',(done)=>{
            let note = {
                title: "The Lord of the Rings",
                content: "J.R.R. Tolkien",
            }

            chai.request(server)
                .post('/notes').send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        })

    });

    describe('/Delete Note ',()=>{
        it("it should delete new note",(done)=>{
            let note=new Note({
                'title':"The Chronicles of Narnia",
                "content":"The Chronicles of Narnia Content"
            });
            note.save((err,note)=>{
                chai.request(server).
                delete('/notes/'+note.id).
                send(note).end((err,res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Note successfully deleted!');
                    done();
                })
            })
        })
    });

    describe('/Update Note',()=>{
        it("it should Update note",(done)=>{
            let note=new Note({
                'title':"The Chronicles of Narnia",
                "content":"The Chronicles of Narnia Content"
            });

            note.save((err,note)=>{
                chai.request(server).
                put('/notes/'+note.id).
                send(note).end((err,res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql('Note successfully deleted!');
                    done();
                })
            })
        });
    });

    describe('/Get/:id Note',()=>{
        it("it should Update note",(done)=>{
            let note=new Note({
                'title':"The Chronicles of Narnia",
                "content":"The Chronicles of Narnia Content"
            });

            note.save((err,note)=>{
                chai.request(server).
                get('/notes/'+note.id).
                send(note).end((err,res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title')
                    res.body.should.have.property('content')
                    res.body.should.have.property('_id').eql(note.id);

                    done();
                })
            })
        });
    });

});