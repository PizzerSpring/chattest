import styles from './ChatScreen.module.css';

type ChatScreenType = {
    children: React.ReactNode
}

export const ChatScreen = ({children}: ChatScreenType) => {
    return (
        <div className={styles.mainСontainer}>
            {children}
        </div>
    );
}


