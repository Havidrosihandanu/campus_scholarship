// middleware/auth.js
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();  
  }
  res.redirect("/auth/login");  
};

const isNotAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return next();  
  }
  res.redirect("/dashboard");   
};

module.exports = { isAuthenticated, isNotAuthenticated };
