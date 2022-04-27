import fs from 'fs'

class FileService {
    createDir(file){
        const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`
        //console.log(filePath)
        return new Promise(((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    console.log(filePath);
                    return resolve({message: 'File was created'})
                }else{
                    console.log(filePath);
                    return reject({message: 'File already exist'})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }
}

export default new FileService