import fs from 'fs'

class FileService {
    createDir(file){
        const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`
        //console.log(file)
        return new Promise(((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                }else{
                    return reject({message: 'File already exist'})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }
}

export default new FileService