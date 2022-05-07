import File_model from "../models/File_model.js"
import User_model from "../models/User_model.js"
import FileService from "../service/FileService.js"
import fs from 'fs'

class FileController {
    async createDir(req, res){
        try {
            const {name, type, parent} = req.body
            const file = new File_model({name, type, parent, user: req.user.id})
            const parentFile = await File_model.findOne({_id: parent})
            if(!parentFile){
                file.path = name
                await FileService.createDir(file)
            }else{
                file.path = `${parentFile.path}\\${file.name}`
                await FileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            res.json(file)
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async fetchFiles(req, res){
        try {
            const {sort} = req.query

            let files = ''
            switch (sort) {
                case 'name':
                    files = await File_model.find({user: req.user.id, parent: req.query.parent}).sort({name: 1})
                    break;

                case 'type':
                    files = await File_model.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                    break;
                
                case 'date':
                    files = await File_model.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                    break;
            
                default:
                    files = await File_model.find({user: req.user.id, parent: req.query.parent})
                    break;
            }

            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Не удалос найти файлов"})
        }
    }

    async uploadFile(req, res){
        try {
            const file = req.files.file
            const parent = await File_model.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User_model.findOne({_id: req.user.id})
    

            if(file.size + user.usedSpace > user.diskSpace){
                res.status(400).json({message: 'Место на диске не хватает'})
            }

             user.usedSpace = user.usedSpace + file.size

            let path
            if(parent){
                path = `${process.env.FILE_PATH}\\${user._id}\\${parent.path}\\${file.name}`
            }else{
                path = `${process.env.FILE_PATH}\\${user._id}\\${file.name}`
            }

            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Файл с таким названием уже существует!'})
            }

            file.mv(path)

            const type = file.name.split('.').pop()

            let filePath = file.name
            if(parent){
                filePath = `${parent.path}\\${file.name}`
            }
            const dbFile = new File_model({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })
     
            await dbFile.save()  
            await user.save()

            res.json(dbFile)
            
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Ошибка при загрузке"})
        }
    }

    async downloadFile(req, res){
        try {
            const file = await File_model.findOne({_id: req.query.id, user: req.user.id})
            const path = `${process.env.FILE_PATH}\\${req.user.id}\\${file.path}\\${file.name}`
            if(fs.existsSync(path)){
                return res.download(path, file.name)
            }
            return res.status(500).json({message: "Что то пошло не так при скачивании"})

        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Возникла какое то проблема при скачивании"})
        }
    }

    async deleteFile(req, res){
        try {
            const file = await File_model.findOne({_id: req.query.id, user: req.user.id})

            if(!file){
                return res.json(400).res.status({message: 'Файл не найден'})
            }
            FileService.deleteFile(file)
            await file.remove()
            return res.json({message: 'Файл удален успешно'})


        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Файл не пуст'})

        }
    }

    async searchFile(req, res){
        try {
            const searchName = req.query.search
            let files = await File_model.find({user: req.user.id})
            files = files.filter(file => file.name.includes(searchName))
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Ошибка в сервере'})
        }
    }
}

export default new FileController