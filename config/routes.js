exports.routes = function (map) {
    map.root('congresists#list');
    map.resources('articles');
    map.resources('projects');
    map.resources('congresists');
    map.resources('parties');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    //map.all(':controller/:action');
    //map.all(':controller/:action/:id');
};