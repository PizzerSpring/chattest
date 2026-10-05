import {ChangeEvent,KeyboardEvent, useState} from "react";

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
        <div>
            <input type="text" value={value} onChange={onChangeHandler} onKeyPress={onEnterKeyPressHandler}/>
            <button onClick = {addMessageHandler}>Send</button>
        </div>
    );
};

