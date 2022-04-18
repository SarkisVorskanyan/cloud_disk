export class User_dto{
    constructor(model){
        this.id = model._id,
        this.email = model.email,
        this.diskSpace = model.diskSpace,
        this.usedSpace = model.usedSpace,
        this.avatar = model.avatar
    }
}
