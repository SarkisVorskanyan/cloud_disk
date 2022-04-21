import Token_service from "../service/Token_service.js"

export default function (req, res, next) {
    if(req.method === "OPTIONS"){
        req.next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'first '})
        }

        const userData = Token_service.validateToken(token)
        console.log(userData, 'userdata');
        if(!userData){
            return res.status(401).json({message: 'second'})
        }

        req.user = userData
        next()

    } catch (e) {
        return res.status(401).json({message: 'third'})
    }
}