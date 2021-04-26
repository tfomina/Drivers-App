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
};
