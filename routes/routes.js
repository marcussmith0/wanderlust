// ./routes.js
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./../controller/controller');


module.exports = function (app) {

    app.get('/', controller.home);

    app.get('/messages', controller.messages);
    app.get('/browse_users', controller.browse_users);

    app.post('/favorite/:id', controller.favorite);
    app.post('/unfavorite/:id', controller.unfavorite);

    app.get('/profile/:id', controller.profile);
    app.get('/timeline/:id', controller.timeline);

    app.post('/follow/:id', controller.follow);
    app.post('/unfollow/:id', controller.unfollow);

    app.post('/album', multipartMiddleware, controller.album);

    app.get('/user_albums/:id', controller.get_albums);

    app.get('/album/:id', controller.collection);

    app.post('/upload/:id', multipartMiddleware, controller.upload);

    app.get('/discover', controller.discover);

    app.get('/new', controller.new);

    app.post('/create', multipartMiddleware, controller.create);

    app.get('/edit/:id', controller.edit);
    
    app.post('/update', controller.update);

    app.post('/destroy/:id', controller.destroy);

    app.post('/comment/:id', controller.comment);

    app.post('/comment/toggle-vote/:id', controller.vote);

};