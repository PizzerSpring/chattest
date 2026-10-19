import styles from './ChatArea.module.css';

type ChatAreaPropsType = {
    children: React.ReactNode
}

export const CharArea = ({children}: ChatAreaPropsType) => {
    return (
        <main className={styles.chatArea}>
            {children}
        </main>
    );
};
