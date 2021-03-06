import { Router } from "express";
import { check } from "express-validator";
import Auth_contriller from "../controller/Auth_contriller.js";
import Auth_middleware from "../middleware/Auth_middleware.js";

const router = new Router

router.post('/registration', [
    check('email', 'It is not a valid email').isEmail(),
    check('password', 'Field must have minimum 4 and maximum 10 symbols').isLength({min: 4, max: 10})
], Auth_contriller.registration)

router.post('/login', Auth_contriller.login)
router.get('/', Auth_middleware, Auth_contriller.auth)

export default router

