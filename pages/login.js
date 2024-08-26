import styles from "../styles/Login.module.css"

import Button from '../src/components/button/button'
import Input from '../src/components/input/input'
import LoginCard from "../src/components/loginCard/loginCard"

export default function LoginPage() {
    return (
        <div className={styles.background}>
            <LoginCard title="Entre em sua conta">
              <form className={styles.form}>
              <Input title="email" placeholder="Digite seu e-mail"></Input>
                <Input title="senha" placeholder="Digite sua senha"></Input>
                <Button>Entrar</Button>
              </form>
            </LoginCard>
        </div>
    )
}