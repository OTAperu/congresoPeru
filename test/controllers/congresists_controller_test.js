require('../test_helper.js').controller('congresists', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        name: '',
        photo: '',
        position: '',
        properties: '',
        stateId: '',
        partyId: '',
        salary: '',
        benefits: '',
        totalVotes: '',
        status: '',
        background: '',
        birthDate: '',
        created_at: '',
        updated_at: ''
    };
}

exports['congresists controller'] = {

    'GET new': function (test) {
        test.get('/congresists/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/congresists', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Congresist.find;
        Congresist.find = sinon.spy(function (id, callback) {
            callback(null, new Congresist);
        });
        test.get('/congresists/42/edit', function () {
            test.ok(Congresist.find.calledWith('42'));
            Congresist.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Congresist.find;
        Congresist.find = sinon.spy(function (id, callback) {
            callback(null, new Congresist);
        });
        test.get('/congresists/42', function (req, res) {
            test.ok(Congresist.find.calledWith('42'));
            Congresist.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var congresist = new ValidAttributes;
        var create = Congresist.create;
        Congresist.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, congresist);
            callback(null, congresist);
        });
        test.post('/congresists', {Congresist: congresist}, function () {
            test.redirect('/congresists');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var congresist = new ValidAttributes;
        var create = Congresist.create;
        Congresist.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, congresist);
            callback(new Error, congresist);
        });
        test.post('/congresists', {Congresist: congresist}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Congresist.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/congresists/1', new ValidAttributes, function () {
            test.redirect('/congresists/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Congresist.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/congresists/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

