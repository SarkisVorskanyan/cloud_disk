import User_model from "../models/User_model.js";
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";
import { User_dto } from "../dto/User_dto.js";
import Token_service from "../service/Token_service.js";
import FileService from "../service/FileService.js";
import File_model from "../models/File_model.js";


class AuthController {
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(422).json({message: 'Error in registration', errors})
            }

            const {email, password} = req.body
            const candidate = await User_model.findOne({email})
            //console.log(req.body)
            if(candidate){
                return res.status(422).json({message: `This email ${email} already used`})
            }

            const hashPassword = await bcrypt.hash(password, 7)
            const user = await new User_model({email, password: hashPassword})
            await user.save()
            await FileService.createDir(new File_model({user: user.id, name: ''}))
            return res.json({message: `You success registered with ${email}`})

        }catch(e){
            console.log(e);
        }
    }

    async login(req, res){
        try {
            const {email, password} = req.body
            const user = await User_model.findOne({email})

            if(!user){
                res.status(400).json({message: 'User not found'})
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if(!isPassValid){
                res.status(404).json({message: 'Password is not valid'})
            }
            const userDto = new User_dto(user)
            const token = Token_service.generateToken({...userDto})

            return res.json({
                token,
                user: userDto
            })

        } catch(e) {
            console.log(e)
        }
    }

    async auth(req, res){
        try {
            const user = await User_model.findOne({_id: req.user.id})

            const userDto = new User_dto(user)
            const token = Token_service.generateToken({...userDto})

            return res.json({
                token,
                user: userDto
            })

        } catch (e) {
            return res.status(401).json({message: 'error controller'})
        }
    }


}

export default new AuthController