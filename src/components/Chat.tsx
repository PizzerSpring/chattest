import {MessageList} from "./MessageList";
import {ChatInput} from "./ChatInput";
import { useState } from 'react';

export const Chat = () => {
    const [messages, setMessages] = useState<string[]>(['hello', 'how are you?']);
    return (
        <div>
            <MessageList messages={messages}/>
            <ChatInput addMessage={(msg) => {
                setMessages([...messages, msg]);
            }}/>
        </div>
    );
};

