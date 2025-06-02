const express = require("express");
const router = express.Router();
const multer = require("multer");
const dashboardController = require("../controllers/dashboard/dashboardController");
const registrantController = require("../controllers/dashboard/registrantController");
const scholarshipController = require("../controllers/dashboard/scholarshipController");
const settingController = require("../controllers/dashboard/settingControlller");
const announcementController = require("../controllers/dashboard/announcementController");

const storage = multer.memoryStorage(); 

const upload = multer({
    storage: storage,
});

//Route Dashboard
router.get("/", dashboardController.index);

// Route Registrant
router.get("/registrant", registrantController.registrant);
router.put("/registrant/:id",
    upload.fields([
        { name: "letter_of_recomendation", maxCount: 1 },
        { name: "supporting_file", maxCount: 1 }
    ]),
    registrantController.updateRegistrant
);

router.delete("/registrant/:id", registrantController.deleteRegistrant);

// Route Scholarship
router.post("/scholarship", upload.none(), scholarshipController.createScholarship);
router.get("/scholarship", scholarshipController.scholarship);
router.get("/scholarship/degree/:degree", scholarshipController.scholarshipByDegree);
router.put("/scholarship/:id", scholarshipController.updateScholarship);
router.delete("/scholarship/:id", scholarshipController.deleteScholarship);

// Router Announcement
router.get("/announcement", announcementController.announcement);
router.post("/announcement", upload.single("file"), announcementController.createAnnouncement);
router.put("/announcement/:id", upload.single("file"), announcementController.updateAnnouncement);
router.delete("/announcement/:id", announcementController.deleteAnnouncement);

// Route Settings
router.get("/setting", settingController.setting);
router.post("/setting/change-password", settingController.updateSetting);

module.exports = router;
