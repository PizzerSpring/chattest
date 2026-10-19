import {type ChangeEvent,type KeyboardEvent, useState} from "react";
import styles from './ChatInput.module.css';

type ChatInputType = {
    addMessage: (message: string) => void
    activeRoom: number | null
}

export const ChatInput = ({addMessage, activeRoom}: ChatInputType) => {
    const [value, setValue] = useState('');

    const disabledSend = activeRoom === null;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const addMessageHandler = () => {
        addMessage(value);
        setValue('');
    }

    const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addMessageHandler();
        }

    }

    return (
        <div className={styles.chatInput}>
            <input className={styles.chatInput} type="text" placeholder='Напишите сообщение...' disabled={disabledSend} value={value}
                   onChange={onChangeHandler} onKeyPress={onEnterKeyPressHandler}/>
            <button className={styles.chatInput} disabled={disabledSend} onClick={addMessageHandler}>Отправить</button>
        </div>
    );
};

