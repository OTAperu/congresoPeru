load('application');

before(loadArticle, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New article';
    this.article = new Article;
    render();
});

action(function create() {
    Article.create(req.body.Article, function (err, article) {
        if (err) {
            flash('error', 'Article can not be created');
            render('new', {
                article: article,
                title: 'New article'
            });
        } else {
            flash('info', 'Article created');
            redirect(path_to.articles());
        }
    });
});

action(function index() {
    this.title = 'Articles index';
    Article.all(function (err, articles) {
        render({
            articles: articles
        });
    });
});

action(function show() {
    this.title = 'Article show';
    render();
});

action(function edit() {
    this.title = 'Article edit';
    render();
});

action(function update() {
    this.article.updateAttributes(body.Article, function (err) {
        if (!err) {
            flash('info', 'Article updated');
            redirect(path_to.article(this.article));
        } else {
            flash('error', 'Article can not be updated');
            this.title = 'Edit article details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.article.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy article');
        } else {
            flash('info', 'Article successfully removed');
        }
        send("'" + path_to.articles() + "'");
    });
});

function loadArticle() {
    Article.find(params.id, function (err, article) {
        if (err || !article) {
            redirect(path_to.articles());
        } else {
            this.article = article;
            next();
        }
    }.bind(this));
}
