// Created a Middleware for it =>

module.exports.isLoggedIn = (req, res, next) => {
  // Before creating the New Listing in the Website , User must have to Login/SignIn
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You Must Login First");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
