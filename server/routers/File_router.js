import { Router } from "express";
import FileController from "../controller/File_controller.js";
import Auth_middleware from "../middleware/Auth_middleware.js";

const router = new Router

router.post('', Auth_middleware, FileController.createDir)
router.post('/upload', Auth_middleware, FileController.uploadFile)
router.get('', Auth_middleware, FileController.fetchFiles)
router.get('/download', Auth_middleware, FileController.downloadFile)
router.delete('/', Auth_middleware, FileController.deleteFile)
router.get('/search', Auth_middleware, FileController.searchFile)
router.post('/avatar', Auth_middleware, FileController.uploadAvatar)
router.delete('/avatar', Auth_middleware, FileController.deleteAvatar)

export default router