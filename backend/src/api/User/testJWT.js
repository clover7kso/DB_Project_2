import auth from '../modules/auth.js';
export default (app, connection) => {
  app.get('/testJWT', auth, (req, res, next) => {
    res.send('hi');
  });
};
