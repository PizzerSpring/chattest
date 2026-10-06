import {ChangeEvent,KeyboardEvent, useState} from "react";
import styles from './ChatInput.module.css';

type ChatInputType = {
    addMessage: (value: string) => void
}

export const ChatInput = ({addMessage}: ChatInputType) => {
    const [value, setValue] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const addMessageHandler = () => {
        if(value.trim() !== '') {
            addMessage(value);
        }
        setValue('');
    }

    const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addMessageHandler();
        }

    }

    return (
        <div className={`${styles.flexContainer} ${styles.footer}`}>
            <input className={styles.flexGrowInp} type="text" value={value} onChange={onChangeHandler} onKeyPress={onEnterKeyPressHandler}/>
            <button className={styles.btn} onClick = {addMessageHandler}>Send</button>
        </div>
    );
};

