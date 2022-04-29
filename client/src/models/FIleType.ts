export interface FileType {
    _id: String,
    name: String,
    type: String,
    size: number,
    path: String,
    date: Date,
    user: String,
    childs: Array<String>
}

