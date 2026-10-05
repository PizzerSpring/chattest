import {MessageList} from "./MessageList";
import {ChatInput} from "./ChatInput";
import { useState } from 'react';
import type {MessageType} from "../types";

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        {id: 1, text: 'hello'},
        {id: 2, text: 'how are you'}

    ]);
    return (
        <div>
            <MessageList messages={messages}/>
            <ChatInput addMessage={(msg) => {
                setMessages(prev =>[...prev, {id: Date.now(), text: msg}]);
            }}/>
        </div>
    );
};

