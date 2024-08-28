import { setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from '../styles/Cadastro.module.css'

import Button from '../src/components/button/button'
import Input from '../src/components/input/input'
import LoginCard from '../src/components/loginCard/login'

export default function Page() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (isSuccess) {
      console.log('Redirecionamento iniciado')
      const timer = setTimeout(() => {
        console.log('Tentando redirecionar para /')
        router.push("/")
          .then(() => console.log('Redirecionamento bem-sucedido'))
          .catch((err) => console.error('Erro no redirecionamento:', err))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, router])

  const handleChangeForm = (event, field) => {
    setForm({
      ...form,
      [field]: event.target.value
    })
    if (field === 'email') {
      validateEmail(event.target.value)
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (email.length > 0 && !emailRegex.test(email)) {
      setEmailError('E-mail inválido')
    } else {
      setEmailError('')
    }
  }

  const handleForm = async (e) => {
    e.preventDefault()

    if (!form.name) return setError('O nome é obrigatório')
    if (!form.email) return setError('O e-mail é obrigatório')
    if (emailError) return setError('Por favor, insira um e-mail válido')
    if (!form.password) return setError('A senha é obrigatória')
    if (form.password !== form.confirmPassword) return setError('As senhas não coincidem')

    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.status !== 201) throw new Error(data.message || 'Erro no cadastro')
      
      console.log('Resposta do servidor:', data)
      
      if (typeof data === 'string' && data.startsWith('eyJ')) {
        setToken(data)
        setCookie('authorization', data)
        setIsSuccess(true)
      } else {
        throw new Error('Token inválido recebido do servidor')
      }

    } catch (err) {
      console.error('Erro durante o cadastro:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.background}>
        <LoginCard title="Cadastro realizado com sucesso!">
          <p>Redirecionando para a página inicial...</p>
          <p>Token: {token.substring(0, 20)}...</p>
          <Button onClick={() => router.push("/")}>
            Ir para página inicial
          </Button>
        </LoginCard>
      </div>
    )
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Crie sua conta">
        <form className={styles.form} onSubmit={handleForm}>
          <Input 
            type="text" 
            placeholder="Seu nome" 
            value={form.name} 
            onChange={(event) => handleChangeForm(event, 'name')} 
            required
          />
          <Input 
            type="email" 
            placeholder="Seu e-mail" 
            value={form.email} 
            onChange={(event) => handleChangeForm(event, 'email')} 
            required
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
          <Input 
            type="password" 
            placeholder="Sua senha" 
            value={form.password} 
            onChange={(event) => handleChangeForm(event, 'password')} 
            required
          />
          <Input 
            type="password" 
            placeholder="Confirme sua senha" 
            value={form.confirmPassword} 
            onChange={(event) => handleChangeForm(event, 'confirmPassword')} 
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link href="/signin" className={styles.text}>Já possui uma conta?</Link>
        </form>
      </LoginCard>
    </div>
  )
}