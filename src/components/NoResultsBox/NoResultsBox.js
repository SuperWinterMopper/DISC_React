import styles from './NoResultsBox.module.css'
export default function NoResultsBox(props) {
    return (
        <div className={styles.noResultsFillerContainer}>
            <div className={styles.noResultsBox}>
                No results for <span className={styles.searchTerm}>{props.search}</span>
            </div>
        </div>
    )
}