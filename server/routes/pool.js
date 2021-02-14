let autho = require('../middleware/auth');
module.exports = (app) => {
  const poolController = require('../controllers/pool.js');

  app.use('/', autho.tokenValidate);

  app.post('/pool/trips', async(req, res) => {
    try {
      let body = Object.assign({}, req.body);
      body.username = req.token_data.data.username;

      let data = await poolController.getTripsForPool(body);
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

      let data = await poolController.createRequest(rideId, username);
      res.send(data);
    } catch (error) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

  app.get('/pools', async (req, res) => {
    try {
      let username = req.token_data.data.username;
      let data = await poolController.getAllPools(username);
      res.send(data);
    } catch (err) {
      res.status(400).send({
        error: JSON.stringify(error)
      });
    }
  })

}