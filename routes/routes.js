// ./routes.js
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./../controller/controller');


module.exports = function (app) {

    app.get('/', controller.home);

    app.get('/messages', controller.messages);

    app.get('/profile/:id', controller.profile);

    app.post('/follow/:id', controller.follow);
    app.post('/unfollow/:id', controller.unfollow);

    app.post('/album', multipartMiddleware, controller.album);

    app.get('/user_albums/:id', controller.get_albums);

    app.get('/album/:id', controller.collection);

    app.post('/upload/:id', multipartMiddleware, controller.upload);

    app.get('/discover', controller.discover);

    app.get('/index', controller.index);

    app.get('/new', controller.new);

    app.post('/create', multipartMiddleware, controller.create);

    app.get('/edit/:id', controller.edit);
    
    app.post('/update', controller.update);

    app.post('/destroy', controller.destroy);

    app.get('/account/:id', controller.find);

    app.post('/comment/:id', controller.comment);

    app.post('/comment/toggle-vote/:id', controller.vote);


    /*
    * Admin Routes
    *
    * */
    app.get('/admin', controller.admin.index);
};