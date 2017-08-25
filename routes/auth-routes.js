module.exports = (app, passport) => {

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    failureRedirect : '/'
    }), function(req, res) {

        res.redirect(`/profile/${req.user._id}`);
    });

    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
    app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
    }));

}

function isLoggedIn (req, res, next) {

    if(req.isAuthenticated()) return next();

    res.redirect("/");

}