import styles from './ChatScreen.module.css';

export const ChatScreen = ({children}) => {
    return (
        <div className={styles.mainСontainer}>
            {children}
        </div>
    );
};

