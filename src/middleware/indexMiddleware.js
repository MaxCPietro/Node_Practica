const checkAdmin = (req, res, next) => {
    if (req.session.user.rol_id == 1) {
       
      next();
    } else {
      res.redirect('/logout');
    }
  };
  const checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        console.log(req.session.user)
      next();
    } else {
      res.redirect('/logout');
    }
  };
  module.exports = { checkAdmin , checkAuthenticated };