load('application');

before(loadCongresist, {only: ['show', 'edit', 'update', 'destroy']});
before(loadParties, {only: 'edit'});
before(loadParty, {only: 'show'});

action('new', function () {
    this.title = 'New congresist';
    this.congresist = new Congresist;
    render();
});

action(function create() {
    Congresist.create(req.body.Congresist, function (err, congresist) {
        if (err) {
            flash('error', 'Congresist can not be created');
            render('new', {
                congresist: congresist,
                title: 'New congresist'
            });
        } else {
            flash('info', 'Congresist created');
            redirect(path_to.congresists());
        }
    });
});

action(function index() {
    this.title = 'Congresists index';
    Congresist.all(function (err, congresists) {
        render({
            congresists: congresists
        });
    });
});

action(function show() {
    this.title = 'Congresist show';
    render();
});

action(function edit() {
    this.title = 'Congresist edit';
    render();
});

action(function update() {
    this.congresist.updateAttributes(body.Congresist, function (err) {
        if (!err) {
            flash('info', 'Congresist updated');
            redirect(path_to.congresist(this.congresist));
        } else {
            flash('error', 'Congresist can not be updated');
            this.title = 'Edit congresist details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.congresist.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy congresist');
        } else {
            flash('info', 'Congresist successfully removed');
        }
        send("'" + path_to.congresists() + "'");
    });
});

function loadCongresist() {
    Congresist.find(params.id, function (err, congresist) {
        if (err || !congresist) {
            redirect(path_to.congresists());
        } else {
            this.congresist = congresist;
            next();
        }
    }.bind(this));
}

function loadParty() {
    Party.find(this.congresist.partyId, function (err, party) {
        if (err || ! party) {
            this.party = {};
        } else {
            this.party = party;
            next();
        }
    }.bind(this));
}

function loadParties() {
    Party.all(function (err, parties) {
        if (err || ! parties) {
            this.parties = {};
        } else {
            this.parties = parties;
            next();
        }
    }.bind(this));
}