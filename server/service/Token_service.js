import jwt from 'jsonwebtoken'

class TokenServices{
    generateToken(payload){
        const accessToken = jwt.sign({id: payload.id}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'})
        return accessToken
    }

    validateToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            console.log(token);
            return userData
        } catch (e) {
            
        }
    }
}

export default new TokenServices()