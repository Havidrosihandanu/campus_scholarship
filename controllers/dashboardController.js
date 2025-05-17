const db = require("../config/db");

exports.index = (req, res) => {
  res.render("dashboard/index");
};

exports.registratant = (req, res) => {
  res.render("dashboard/registrant");
};

exports.scholarship = (req, res) => {
  res.render("dashboard/scholarchip");
};

exports.setting = (req, res) => {
  res.render("dashboard/setting");
};
