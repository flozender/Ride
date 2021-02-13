module.exports = (app) => {
  const userController = require('../controllers/user.js')
  app.post('/signUp', async (req, res) => {
    let body = Object.assign({}, req.body);

    let data = await userController.createUser(body);
    if (data && data.token) {
      res.send({
        success: true,
        message: 'Logged In Successfully',
        username: data.username,
        id: data.id,
        name: data.name,
        token: data.token
      })
    }
  })
}