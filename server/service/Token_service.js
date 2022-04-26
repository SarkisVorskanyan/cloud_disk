import jwt from 'jsonwebtoken'

class TokenServices{
    generateToken(payload){
        const accessToken = jwt.sign({id: payload.id}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'})
        return accessToken
    }

    validateToken(token){
        //console.log(process.env.JWT_ACCESS_TOKEN)
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            //console.log(userData)
            return userData
        } catch (e) {
            console.log(e)
        }
    }
}

export default new TokenServices()