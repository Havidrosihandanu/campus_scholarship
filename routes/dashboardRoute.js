const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard/dashboardController");
const registrantController = require("../controllers/dashboard/registrantController");
const scholarshipController = require("../controllers/dashboard/scholarshipController");
const settingController = require("../controllers/dashboard/settingControlller");
const announcementController = require("../controllers/dashboard/announcementController");

//Route Dashboard
router.get("/", dashboardController.index);

// Route Registrant
router.get("/registrant", registrantController.registrant);
router.put("/registrant/:id", registrantController.updateRegistrant);
router.delete("/registrant/:id", registrantController.deleteRegistrant);

// Route Scholarship
router.get("/scholarship", scholarshipController.scholarship);
router.put("/scholarship/:id", scholarshipController.updateScholarship);
router.delete("/scholarship/:id", scholarshipController.deleteScholarship);

// Router Announcement
router.get("/announcement", announcementController.announcement);
router.put("/announcement/:id", announcementController.updateAnnouncement);
router.delete("/announcement/:id", announcementController.deleteAnnouncement);

// Route Settings
router.get("/setting", settingController.setting);
router.put("/setting", settingController.updateSetting);

module.exports = router;
