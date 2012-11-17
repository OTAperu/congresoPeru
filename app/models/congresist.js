Congresist.hasMany(Project, {as: 'projects', foreignKey: 'conId'});
Congresist.belongsTo(Party, {as: 'party', foreignKey: 'partyId'});
Congresist.hasMany(Article, {as: 'news', foreignKey: 'conId'});