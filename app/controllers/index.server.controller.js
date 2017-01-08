exports.render = function(req, res){
  // if (req.session.lastVisit) {
  //   console.log(req.session.lastVisit);
  // }

  // req.session.lastVisit = new Date();

  // res.render('index', {
  //   title: 'meanapp' + req.session.lastVisit
  // });
  res.render('index',{
    title: 'hello sign successful',
    userFullName: req.users ? req.users.fullName: ''
  });
};