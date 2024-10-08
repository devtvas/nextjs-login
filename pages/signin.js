import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Link from 'next/link'

import styles from '../styles/Login.module.css'

import Button from '../src/components/button/button'
import Input from '../src/components/input/input'
import LoginCard from '../src/components/loginCard/login'

export default function Page() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChangeForm = (event, field) => {
    setForm({
      ...form,
      [field]: event.target.value
    })
  }

  const handleForm = async (e) => {
    e.preventDefault()

    if (!form.email) return setError('O e-mail é obrigatório')
    if (!form.password) return setError('A senha é obrigatória')

    setError('')
    try {
      const response = await fetch(`/api/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const json = await response.json()

      if (response.status !== 200) throw new Error(json)
      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Faça seu login">
        <form className={styles.form}>
          <Input type="email" placeholder="Seu e-mail" value={form['email']} onChange={(event) => handleChangeForm(event, 'email')} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Insira um e-mail válido" required />
          <Input type="password" placeholder="Sua senha" value={form['password']} onChange={(event) => handleChangeForm(event, 'password')} />
          <Button onClick={handleForm}>Entrar</Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link href="/signup" className={styles.text}>Não possui uma conta?</Link>
        </form>
      </LoginCard>
    </div>
  )
}