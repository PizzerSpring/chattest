import styles from './ChatArea.module.css';
import type {JSX} from "react";

type ChatAreaPropsType = {
    children: React.ReactNode
}

export const CharArea = ({children}: ChatAreaPropsType): JSX.Element => {
    return (
        <main className={styles.chatArea}>
            {children}
        </main>
    );
};
