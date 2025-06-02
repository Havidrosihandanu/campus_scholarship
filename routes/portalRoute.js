const express = require('express');
const router = express.Router();
const portalController = require("../controllers/portal/portalController");
const scholarshipController = require("../controllers/portal/scholarshipController");
const announcementController = require("../controllers/portal/announcementController");
const aboutUsController = require("../controllers/portal/aboutUsController");


router.get("/", portalController.index);
router.get("/scholarship/", scholarshipController.scholarship);
router.get("/scholarship/:id", scholarshipController.scholarshipDetail);
router.get("/scholarship-form/:id", scholarshipController.scholarshipForm);
router.post("/scholarship-form", scholarshipController.submitScholarshipForm);
router.get("/announcement/", announcementController.announcement);
router.get("/announcement/:id", announcementController.announcementDetail);
router.get("/about-us", aboutUsController.aboutUs);

module.exports = router;