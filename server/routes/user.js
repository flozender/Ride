let autho = require('../middleware/auth');
module.exports = (app) => {
  const userController = require('../controllers/user.js');

  app.post('/signUp', async (req, res) => {
    try {
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
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }

  })

  app.post('/signIn', async (req, res) => {
    try {
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
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

  app.get('/profile/:username', async (req, res) => {
    try {
      let data = await userController.getProfile(req.params.username);
      res.send({
        success: true,
        profileData: data.data
      })
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

  app.use('/', autho.tokenValidate);
}