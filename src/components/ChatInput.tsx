import {useState} from "react";

type ChatInputType = {
    addMessage: (value: string) => void
}

export const ChatInput = ({addMessage}: ChatInputType) => {
    const [value, setValue] = useState('');

    const onChangeHandler = (e) => {
        setValue(e.currentTarget.value);
    }

    const addMessageHandler = () => {
        addMessage(value);
    }

    return (
        <div>
            <input type="text" value={value} onChange={onChangeHandler}/>
            <button onClick = {addMessageHandler}>Send</button>
        </div>
    );
};

