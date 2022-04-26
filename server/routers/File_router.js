import { Router } from "express";
import FileController from "../controller/File_controller.js";
import Auth_middleware from "../middleware/Auth_middleware.js";

const router = new Router

router.post('', Auth_middleware, FileController.createDir)
router.get('', Auth_middleware, FileController.fetchFiles)

export default router