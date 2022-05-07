// export const CheckSizeFile = (fileSize: number) => {
//     let num: number = Math.round(fileSize / 1000)
//     let size: String = ''

//     if(num >= 1000){
//         size = 'мг'
//         num = num / 1000
//     }else{
//         size = 'кб'
//     }

//     return `${num} ${size}`
// }
export const CheckSizeFile = (fileSize: number) => {
    if(fileSize > 1024*1024*1024) {
        return (fileSize/(1024*1024*1024)).toFixed(1)+"Gb"
    }
    if(fileSize > 1024*1024) {
        return (fileSize/(1024*1024)).toFixed(1)+"Mb"
    }
    if(fileSize > 1024) {
        return (fileSize/(1024)).toFixed(1)+"Kb"
    }
    return fileSize+"B"
}