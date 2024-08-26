import styles from "../styles/Login.module.css"

import LoginCard from "../src/components/loginCard/loginCard"

export default function CadastroPage() {
    return (
        <div className={styles.background}>
        <LoginCard title="Crie sua conta"> 
                Cadastro
                </LoginCard>
        </div>
    )
}