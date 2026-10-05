import styles from './SideBar.module.css'

export const SideBar = () => {
    return (
        <div className={styles.bg}>
            <ul>
                <li>Группа 1</li>
                <li>Группа 2</li>
                <li>Группа 3</li>
            </ul>
        </div>
    );
};

export default SideBar;
