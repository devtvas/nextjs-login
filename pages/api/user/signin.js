import { signin } from "../../../services/user";

export default function handler(req, res) {
    try {
        const user = signin(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err.message)
    }
}