import styles from './Header.module.css';
import type {JSX} from "react";

export const Header = (): JSX.Element => {
    return (
        <header className = {styles.header}>
            <h1>CHAT APP</h1>
        </header>
    );
};

