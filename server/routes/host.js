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
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

  app.get('/host/trips', async (req, res) => {
    try {
      let username = req.token_data.data.username;

      let data = await hostController.getAllTripsOfUser(username);
      res.send(data)
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

}