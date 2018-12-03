const express = require("express");
var router = express.Router();

const connection = require("../../helpers/sql.js")

router.post('/signup', function (req, res, next) {
  connection.query("INSERT INTO users(email, password, name, lastname) VALUES(?,?,?,?)", [req.body.email, req.body.password, req.body.name, req.body.lastname], function (error, results, fields) {
    if (error) {
      res.status(500).json({ flash: error.message });
    }
    res.status(200).json({ flash: "User has been signed up !" })

  })
})

module.exports = router;