import express from "express";
import upload from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

import {
  createPandit,
  getPandits,
  getMyPanditProfile,
  updatePanditProfile,
  uploadPanditProfileImage,
  getPanditById,
  deletePandit,
  getPanditByCity
} from "../controllers/panditController.js";

const router = express.Router();

router.get("/", getPandits);
router.post("/create", verifyToken, roleMiddleware("pandit"), createPandit);
router.get("/profile", verifyToken, roleMiddleware("pandit"), getMyPanditProfile);
router.put("/update", verifyToken, roleMiddleware("pandit"), updatePanditProfile);
router.post(
  "/upload-profile-image",
  verifyToken,
  roleMiddleware("pandit"),
  upload.single("profileImage"),
  uploadPanditProfileImage
);
router.get("/city/search", getPanditByCity);
router.get("/:id", getPanditById);
router.delete("/:id", verifyToken, roleMiddleware("pandit"), deletePandit);

export default router;