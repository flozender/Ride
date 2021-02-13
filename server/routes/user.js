module.exports = (app) => {
  const userController = require('../controllers/user.js');

  app.post('/signUp', async (req, res) => {
    let body = Object.assign({}, req.body);

    let data = await userController.createUser(body);
    if (data && data.success) {
      res.send({
        success: true,
        message: 'Logged In Successfully',
        username: data.username,
        id: data.id,
        name: data.name,
        token: data.token
      })
    } else {
      res.send({
        success: false,
        message: data.message
      })
    }
  })

  app.post('/signIn', async (req, res) => {
    let body = Object.assign({}, req.body);
    body.username = body.username || null;
    body.email = body.email || null;

    let data = await userController.verifyAndAuthorize(body);
    if (data && data.success) {
      res.send({
        success: true,
        message: 'Logged In Successfully',
        username: data.username,
        id: data.id,
        name: data.name,
        token: data.token
      })
    } else {
      res.send({
        success: false,
        message: data.message
      })
    }
  })
}