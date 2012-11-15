require('../test_helper.js').controller('parties', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        name: '',
        review: '',
        image: '',
        founded: '',
        ideology: '',
        website: ''
    };
}

exports['parties controller'] = {

    'GET new': function (test) {
        test.get('/parties/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/parties', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Party.find;
        Party.find = sinon.spy(function (id, callback) {
            callback(null, new Party);
        });
        test.get('/parties/42/edit', function () {
            test.ok(Party.find.calledWith('42'));
            Party.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Party.find;
        Party.find = sinon.spy(function (id, callback) {
            callback(null, new Party);
        });
        test.get('/parties/42', function (req, res) {
            test.ok(Party.find.calledWith('42'));
            Party.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var party = new ValidAttributes;
        var create = Party.create;
        Party.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, party);
            callback(null, party);
        });
        test.post('/parties', {Party: party}, function () {
            test.redirect('/parties');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var party = new ValidAttributes;
        var create = Party.create;
        Party.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, party);
            callback(new Error, party);
        });
        test.post('/parties', {Party: party}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Party.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/parties/1', new ValidAttributes, function () {
            test.redirect('/parties/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Party.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/parties/1', new ValidAttributes, function () {
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

