require('../test_helper.js').controller('articles', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        conId: '',
        proId: '',
        summary: '',
        link: '',
        created_at: '',
        updated_at: ''
    };
}

exports['articles controller'] = {

    'GET new': function (test) {
        test.get('/articles/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/articles', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Article.find;
        Article.find = sinon.spy(function (id, callback) {
            callback(null, new Article);
        });
        test.get('/articles/42/edit', function () {
            test.ok(Article.find.calledWith('42'));
            Article.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Article.find;
        Article.find = sinon.spy(function (id, callback) {
            callback(null, new Article);
        });
        test.get('/articles/42', function (req, res) {
            test.ok(Article.find.calledWith('42'));
            Article.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var article = new ValidAttributes;
        var create = Article.create;
        Article.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, article);
            callback(null, article);
        });
        test.post('/articles', {Article: article}, function () {
            test.redirect('/articles');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var article = new ValidAttributes;
        var create = Article.create;
        Article.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, article);
            callback(new Error, article);
        });
        test.post('/articles', {Article: article}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Article.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/articles/1', new ValidAttributes, function () {
            test.redirect('/articles/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Article.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/articles/1', new ValidAttributes, function () {
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

