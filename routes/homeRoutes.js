const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const controller = require("../controllers/homeController");

// Project CRUD
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "floorPlans", maxCount: 10 }
  ]),
  controller.createProject
);

router.get("/", controller.getProjects);
router.get("/count", controller.getProjectsCount);
router.get("/:id", controller.getProject);

router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "floorPlans", maxCount: 10 }
  ]),
  controller.updateProject
);

router.delete("/:id", controller.deleteProject);

// House related
router.get("/houses/:projectId", controller.getProjectHouseList);

// Image management
router.delete("/:id/image/:imageId", controller.deleteProjectImage);
router.put(
  "/:id/image/:imageId",
  upload.single("image"),
  controller.updateProjectImage
);

module.exports = router;