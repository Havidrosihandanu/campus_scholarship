const db = require("../config/db");

exports.portal = (req, res) => {
  res.render("portal/index");
};

exports.scholarshipDetail = (res, req) => {
  res.render("portal/detailBeasiswa");
};

exports.scholarshipForm = (res, req) => {
  res.render("portal/formBeasiswa");
};

exports.submitScholarshipForm = (res, req) => {};

exports.announcement = (res, req) => {
  res.render("portal/announcement");
};

exports.aboutUs = (res, req) => {
  res.render("portal/aboutUs");
};
