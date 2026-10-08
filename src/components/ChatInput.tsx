import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import styles from './ChatInput.module.css';
import type {MessageType} from "../types";

type ChatInputType = {
    addMessage: (message: MessageType) => void
    activeRoom: number | null
}

export const ChatInput = ({addMessage, activeRoom}: ChatInputType) => {
    const [value, setValue] = useState('');

    const disabledSend = activeRoom === null;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const addMessageHandler = () => {
        if (activeRoom === null) {
            return;
        } else {
            if (value.trim() !== '') {
                fetch(`http://localhost:3000/rooms/${activeRoom}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({text: value})
                })
                    .then(res => res.json())
                    .then(data => {
                        addMessage(data);
                        setValue('');

                    })
            }
        }

    }

    const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addMessageHandler();
        }

    }

    return (
        <div className={`${styles.flexContainer} ${styles.footer}`}>

            <input className={styles.flexGrowInp} type="text" disabled={disabledSend} value={value}
                   onChange={onChangeHandler} onKeyPress={onEnterKeyPressHandler}/>
            <button className={styles.btn} disabled={disabledSend} onClick={addMessageHandler}>Send</button>
        </div>
    );
};

