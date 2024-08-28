import { signup } from "../../../services/user";

export default function handler(req, res) {
    try {
        const newUser = signup(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json(err.message)
    }
}