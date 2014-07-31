//var assert = require('chai').assert;
var expect = require("chai").expect;
var superagent = require('superagent');
var srvurl = 'http://127.0.0.1:8080';

describe('express rest api server',function(){

	var id;

	it('post event',function(done){
		superagent.post(srvurl+'/api/events')
			.send({ name: 'evento01', description: 'testing event', 'author': 'marco'})
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body.length).to.be.above(0);
				expect(res.body[0]._id.length).to.eql(24);
				id = res.body[0]._id;
				done();
			});
	});

	it('retrieves a collection',function(done){
		superagent.get(srvurl+'/api/events')
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(res.body.length).to.be.above(0);
				expect(res.body.map(function(item){ return item._id})).to.contain(id);
				done();
			});
	});

	it('retrieves an event',function(done){
		superagent.get(srvurl+'/api/event/'+id)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body._id.length).to.eql(24);
				expect(res.body._id).to.eql(id);
				done();
			});
	});

	it('delete an event',function(done){
		superagent.del(srvurl+'/api/event/'+id)
			.end(function(e,res){
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.map(function(item){ return item._id})).to.not.contain(id);
				done();
			});
	});

});
