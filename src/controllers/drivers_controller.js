const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then((driver) => res.send(driver))
      .catch(next);
  },

  update(req, res, next) {
    const { id } = req.params;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(id, driverProps)
      .then(() => Driver.findById(id))
      .then((driver) => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const { id } = req.params;

    Driver.findByIdAndDelete(id)
      .then((driver) => {
        res.status(204).send(driver);
      })
      .catch(next);
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          maxDistance: 200000,
          spherical: true,
          distanceField: "dist.calculated",
        },
      },
    ])
      .then((drivers) => res.send(drivers))
      .catch(next);
  },
};
