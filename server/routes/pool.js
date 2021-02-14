let autho = require('../middleware/auth');
module.exports = (app) => {
  const loopController = require('../controllers/pool.js');

  app.use('/', autho.tokenValidate);

  app.post('/pool/trips', async(req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.username = req.token_data.data.username;

      let data = await loopController.getTripsForPool(body);
      res.send(data);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

  app.post('/pool/request/:rideId', async(req, res) => {
    try {
      let rideId = req.params.rideId;
      let username = req.token_data.data.username;

      let data = await loopController.createRequest(rideId, username);
      res.send(data);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

}