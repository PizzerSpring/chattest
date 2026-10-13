import styles from './ChatArea.module.css';

export const CharArea = ({children}) => {
    return (
        <main className={styles.chatArea}>
            {children}
        </main>
    );
};
