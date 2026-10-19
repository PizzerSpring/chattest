import styles from './ChatScreen.module.css';
import type {JSX} from "react";

type ChatScreenType = {
    children: React.ReactNode
}

export const ChatScreen = ({children}: ChatScreenType): JSX.Element => {
    return (
        <div className={styles.mainContainer}>
            {children}
        </div>
    );
}


