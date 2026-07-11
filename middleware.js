// Created a Middleware for it =>

module.exports.isLoggedIn = (req, res, next) => {
  // Before creating the New Listing in the Website , User must have to Login/SignIn
  if (!req.isAuthenticated()) {
    req.flash("error", "You Must Login First");
    return res.redirect("/login");
  }
  next();
};
