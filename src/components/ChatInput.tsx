import {type ChangeEvent,type KeyboardEvent, useState} from "react";
import styles from './ChatInput.module.css';
import type {JSX} from "react";

type ChatInputType = {
    addMessage: (message: string) => void
    activeRoom: number | null
}

export const ChatInput = ({addMessage, activeRoom}: ChatInputType): JSX.Element => {
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
            <input type="text" placeholder='Напишите сообщение...' disabled={disabledSend} value={value}
                   onChange={onChangeHandler} onKeyDown={onEnterKeyPressHandler}/>
            <button disabled={disabledSend} onClick={addMessageHandler}>Отправить</button>
        </div>
    );
};

