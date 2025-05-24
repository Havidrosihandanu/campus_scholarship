const express = require('express');
const router = express.Router();

const portalController = require("../controllers/portalController");

router.get("/", portalController.portal);
router.get("/scholarship/:id", portalController.scholarshipDetail);
router.get("/scholarship-form/:id", portalController.scholarshipForm);
router.post("/scholarship-form", portalController.submitScholarshipForm);
router.get("/announcement", portalController.announcement);
router.get("/about-us", portalController.aboutUs);

module.exports = router;