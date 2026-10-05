import styles from './Header.module.css';

export const Header = () => {
    return (
        <div className = {styles.header}>
            <div>Профиль</div>
            <div>Чаты</div>
            <div>Настройки</div>
            <div>Голосовая связь</div>
        </div>
    );
};

