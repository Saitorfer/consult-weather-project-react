import {ReactNode} from 'react'
import styles from "./Alert.module.css"

function Alert({children} : {children : ReactNode} ) {

  return (
    <div className={styles.alert}>
      {children}
    </div>
  )
}

export default Alert
