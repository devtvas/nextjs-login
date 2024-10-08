import jwt from "jsonwebtoken"

let users = []

const SECRET = process.env.JWT_SECRET

function createToken(user) {
    return jwt.sign({ email: user.email, name: user.name }, SECRET)

}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error('Token invalido!')
    }
}

export function signup(body) {

    //usaremos destructions
    const user = users.find(({ email }) => email === body.email)
    if (user) throw new Error('Usuario já cadastrado!')

    users.push(body)

    const token = createToken(body)

    return token

}

export function signin(body) {

    //usaremos destructions
    const user = users.find(({ email }) => email === body.email)

    if (!user) throw new Error('Usuario não encontrado!')

    if (user.password !== body.password) throw new Error('Senha incorreta')

    const token = createToken(user)

    return token

}