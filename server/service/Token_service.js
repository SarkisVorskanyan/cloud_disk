import jwt from 'jsonwebtoken'

class TokenServices{
    generateToken(payload){
        const accessToken = jwt.sign({id: payload.id}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'})
        return accessToken
    }
}

export default new TokenServices()