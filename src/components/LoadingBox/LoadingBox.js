import styles from './LoadingBox.module.css'

export default function LoadingBox() {
    return (
        <div className={styles.loadingFillerContainer}>
            <div className={styles.loadingBox}>
                Loading
                <span className={styles.loader}></span>
            </div>
        </div>
    )
}