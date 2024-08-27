import styles from "../styles/Login.module.css"

import Link from "next/link"
import Button from '../src/components/button/button'
import Input from '../src/components/input/input'
import LoginCard from "../src/components/loginCard/loginCard"


export default function CadastroPage() {
    return (
        <div className={styles.background}>
            <LoginCard title="Crie sua conta">
                <form className={styles.form}>
                    <Input title="text" placeholder="Digite seu nome"></Input>
                    <Input title="email" placeholder="Digite seu e-mail"></Input>
                    <Input title="senha" placeholder="Digite sua senha"></Input>
                    <Button>Cadastrar</Button>
                    <Link href="/login" className={styles.text}>Já uma possui conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}