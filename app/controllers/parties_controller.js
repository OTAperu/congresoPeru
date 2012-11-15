load('application');

before(loadParty, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New party';
    this.party = new Party;
    render();
});

action(function create() {
    Party.create(req.body.Party, function (err, party) {
        if (err) {
            flash('error', 'Party can not be created');
            render('new', {
                party: party,
                title: 'New party'
            });
        } else {
            flash('info', 'Party created');
            redirect(path_to.parties());
        }
    });
});

action(function index() {
    this.title = 'Partys index';
    Party.all(function (err, parties) {
        render({
            parties: parties
        });
    });
});

action(function show() {
    this.title = 'Party show';
    render();
});

action(function edit() {
    this.title = 'Party edit';
    render();
});

action(function update() {
    this.party.updateAttributes(body.Party, function (err) {
        if (!err) {
            flash('info', 'Party updated');
            redirect(path_to.party(this.party));
        } else {
            flash('error', 'Party can not be updated');
            this.title = 'Edit party details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.party.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy party');
        } else {
            flash('info', 'Party successfully removed');
        }
        send("'" + path_to.parties() + "'");
    });
});

function loadParty() {
    Party.find(params.id, function (err, party) {
        if (err || !party) {
            redirect(path_to.parties());
        } else {
            this.party = party;
            next();
        }
    }.bind(this));
}
