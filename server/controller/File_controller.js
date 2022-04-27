import File_model from "../models/File_model.js"
import FileService from "../service/FileService.js"

class FileController {
    async createDir(req, res){
        try {
            const {name, type, parent} = req.body
            const file = new File_model({name, type, parent, user: req.user.id})
            const parentFile = await File_model.findOne({_id: parent})

            if(!parentFile){
                file.path = name
                console.log(parentFile)
                await FileService.createDir(file)
            }else{
                file.path = `${parentFile.path}\\${file.name}`
                await FileService.createDir(file)
                parentFile.childs.push(file._id)
                console.log('end')
                await parentFile.save()
            }
            await file.save()
            res.json(file)
        } catch (e) {
            //console.log(e)
            return res.status(400).json(e)
        }
    }

    async fetchFiles(req, res){
        //console.log(req.user)
        try {
            const files = await File_model.find({user: req.user.id, parent: req.query.parent})
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can't get files"})
        }
    }
}

export default new FileController