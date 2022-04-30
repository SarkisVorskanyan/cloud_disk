import fullFolder from '../assets/homepage/fullFolder.png'
import fileImage from '../assets/homepage/file.png'
import codeImage from '../assets/homepage/code.png'
import excellImage from '../assets/homepage/excell.png'
import pdfImage from '../assets/homepage/pdf.jpg'
import wordImage from '../assets/homepage/word.jpg'


export const FileImage = (type: String) => {
    let image: String = ''
    switch (type) {
        case 'css':
            return image = codeImage
        
        case 'html':
            return image = codeImage

        case 'js':
                return image = codeImage

        case 'docx':
            return image = wordImage

        case 'pdf':
            return image = pdfImage

        case 'xlsx':
            return image = excellImage

    
        default:
            return image = fileImage;
    }
    return image
}