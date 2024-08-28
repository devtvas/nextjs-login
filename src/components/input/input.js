import styles from './input.module.css'

export default function Input(props) {
    return (
     <input style={{color: '#000'}} className={styles.input} {...props}/>
    )
}