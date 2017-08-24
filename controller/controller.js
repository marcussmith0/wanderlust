const cloudinary = require("cloudinary");
const mongoose   = require("mongoose");

const Photo   = require("./../models/Photo");
const Comment = require("./../models/Comment");
const User    = require("./../models/User");
const Album   = require("./../models/Album");


mongoose.Promise = global.Promise;

cloudinary.config({
    cloud_name: 'dnntdd3yr',
    api_key: '866679814414326',
    api_secret: 'SNkNDlmON2FOFROdOopueh57Aig'
});

module.exports = {
    
  home: function (req, res) {

    res.render('pages/index');
  },

  messages: function (req, res) {

    res.render('pages/sign-in-modal');
  },

  browse_users: function (req, res) {

    User.find({}, function (err, users) {
        if (err) res.send(err);

        res.render("pages/browse_users", {user: users, reqUser: req.user});
    }); 
  },

  profile: function (req, res) {

    var id = req.params.id;

    User.findById(id).populate("albums").exec(function (err, user) {
        var newsFeed = [];

        if (err) throw err;

        user.following.forEach(function(person, index) {

            Album.findOne({_creator: person}).then(function(album) {

                if(album){
                    newsFeed.push(album);
                    console.log(album);
                } else {
                    console.log("there is nothing there");
                }

            }).catch(function(err) {
                res.send(err);
            })

        });

        res.render('pages/followers-test', {user: user, reqUser: req.user, newsFeed: newsFeed});
    });
  },

  discover: function (req, res) {

    User.find({}, function(err, users) {
        if (err) throw err;

        res.render("pages/discover", {users});
    });

  },

  new: function (req, res) {
      res.render('pages/new');
  },

  edit: function (req, res) {

      Photo.find({image_id: req.params.id}, function (err, photos) {
          if(err) res.send(err);

          res.render('pages/edit', {photo: photos[0]});
      }); 
  },

  create: function (req, res) {
      cloudinary.v2.uploader.upload(req.files.image.path,
          { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
          function(err, result) {
              
              var newPhoto = new Photo({

                  created_at: new Date(),
                  image: result.url,
                  image_id: result.public_id,
                  _creator: req.user._id

              });

              User.findByIdAndUpdate(req.user._id, {$push: {photos: newPhoto}}, {new : true}, function(err, photo) {
                  if (err) throw err;

                  newPhoto.save().then(function(err, result) {
                    if (err) res.send(err);

                  });

                  res.redirect(`/profile/${req.user._id}`);
              }); 

      });
  },

  get_albums: function (req, res) {

    var id = req.params.id;

    User.findById(id).populate("albums").exec(function (err, user) {
        if (err) res.send(err);

        res.render(`pages/album-test`, {user: user, reqUser: req.user});
    });
  },

  album: function(req, res) {

    cloudinary.v2.uploader.upload(req.files.image.path,
          { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
          function(err, result) {

          var newAlbum = new Album({

            title: req.body.title,
            description: req.body.description,
            _creator: req.user._id,
            featured_image: result.url

          });

        User.findByIdAndUpdate(req.user._id, {$push: {albums: newAlbum}}, {new: true}, function(err, user) {

            newAlbum.save().then(function (err, result) {
                if (err) throw err;

            }).catch(function(reason) {

                res.send(err);
            });

            res.redirect(`/user_albums/${req.user._id}`);
        })
    });
  },

  collection: function (req, res) {

    Album.findById(req.params.id).populate("photos").populate("comments").exec(function (err, album) {
        if (err) res.send(err);

        User.findById(album._creator, function (err, user) {
            if (err) res.send(err);

            res.render('pages/timeline-modal', {album: album, user: user, reqUser: req.user});
        })
    });
  },

  timeline: function (req, res) {
      var id = req.params.id;

      User.findById(id).populate("albums").exec(function (err, user) {
          if (err) res.send(err);

          res.render("pages/timeline-test", {user: user, reqUser: req.user});
      });
  },

  upload: function (req, res) {

      cloudinary.v2.uploader.upload(req.files.image.path,
          { width: 300, height: 300, crop: "limit", moderation:'manual' },
          function(err, result) {

              console.log(result);
              
              var newPhoto = new Photo({

                  created_at: new Date(),
                  image: result.url,
                  image_id: result.public_id,
                  _creator: req.user._id

              });

              Album.findByIdAndUpdate(req.params.id, {$push: {photos: newPhoto}}, {new : true}, function(err, photo) {
                  if (err) throw err;

                  newPhoto.save().then(function(err, result) {
                    if (err) res.send(err);

                  }).catch(function(err) {
                      res.send(err);
                  });

                  res.redirect(`/album/${req.params.id}`);
              }); 
      });
  },

  update: function (req, res) {
      var oldName = req.body.old_id;
      var newName = req.body.image_id;

      cloudinary.v2.uploader.rename(oldName, newName, function(error, result) {

            if (error) res.send(error);

            Photo.findOneAndUpdate({image_id: oldName},
                Object.assign({}, req.body, {image: result.url}),
                function (err) {
                if (err) res.send(err);

                res.redirect('/');
            });
        });

  },

  destroy: function (req, res) {
      var imageId = req.body.image_id;
      var albumId = req.params.id;

      cloudinary.v2.uploader.destroy(imageId, function (error, result) {
              Photo.findOneAndRemove({ image_id: imageId }, function(err) {
                  if (err) res.send(err);

                res.render('pages/post', {album: album, user: user, reqUser: req.user});
              });
          });
  },

    favorite: function (req, res) {
        var id = req.params.id;

        Album.findByIdAndUpdate(id, {$push: {favorites: req.user._id}}, {new: true}, function (err, album) {
            if (err) res.send(err);

            User.findByIdAndUpdate(req.user._id, {$push: {favorites: album}}, {new: true}, function (err, user) {
                if (err) res.send(err);

                res.redirect(`/album/${id}`);
            });
        })
    },

    unfavorite: function (req, res) {
        var id = req.params.id;

        Album.findByIdAndUpdate(id, {$pull: {favorites: req.user._id}}, {new: true}, function (err, album) {
            if (err) res.send(err);

            User.findByIdAndUpdate(req.user._id, {$pull: {favorites: album}}, {new: true}, function (err, user) {
                if (err) res.send(err);

                res.redirect(`/album/${id}`);
            });
        })
    },

    comment: function (req, res) {

        var id = req.params.id;

        var newComment = new Comment({
            text: req.body.comment,
            created_at: Date.now(),
            _creator: req.user.google.name,
            _creator_avatar: req.user.google.profile_image,
            _creator_id: req.user._id
        });

        Album.findByIdAndUpdate(id, { $push: {comments: newComment} }, {new: true}, function(err, album) {
            if (err) res.send(err);

            newComment.save().then(function(err, result) {
                if (err) res.send(err);

            });

            res.redirect(`/album/${id}`);
        });   
    },

    vote: function (req, res) {

        var id = req.params.id;
        var vote = req.body.vote;

        if(vote === "Like") {
            console.log("You liked this comment...");

        } else if (vote === "Dislike") {
            console.log("Disliked this comment...");

        }

        Comment.findById(id, function (err, comment) {
            if (err) throw err;

            console.log("");
            console.log(comment.text);
            console.log("");
            console.log(req.body.vote);

        })
    },

    follow: function (req, res) {

        var id = req.params.id;

        User.findByIdAndUpdate(id, {$push: {followers: req.user}}, {new: true}, function(err, user) {
            if (err) throw err;

            User.findByIdAndUpdate(req.user.id, {$push: {following: id}}, {new: true}, function(err, user) {
                if (err) throw err;

        
                res.redirect(`/profile/${id}`);
            })
        });
    },

    unfollow: function (req, res) {

        var id = req.params.id;

        User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}}, {new: true}, function(err, user) {
            if (err) throw err;

            User.findByIdAndUpdate(req.user.id, {$pull: {following: id}}, {new: true}, function(err, user) {
                if (err) throw err;

        
                res.redirect(`/profile/${id}`);
            })
        });
    }  
};