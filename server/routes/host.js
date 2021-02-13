let autho = require('../middleware/auth');
module.exports = (app) => {
  const hostController = require('../controllers/host.js');

  app.use('/', autho.tokenValidate);

  app.post('/trip', async(req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.username = req.token_data.data.username;

      let data = await hostController.createTrip(body);
      res.send(data);
    } catch (e) {
      throw e;
    }
  })

}