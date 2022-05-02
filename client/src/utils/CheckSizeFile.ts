export const CheckSizeFile = (fileSize: number) => {
    let num: number = Math.round(fileSize / 1000)
    let size: String = ''

    if(num >= 1000){
        size = 'мг'
        num = num / 1000
    }else{
        size = 'кб'
    }

    return `${num} ${size}`
}