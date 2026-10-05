import {MessageList} from "./MessageList";
import {ChatInput} from "./ChatInput";
import { useState } from 'react';
import type {MessageType} from "../types";
import styles from './Chat.module.css';
import {Header} from "./Header";

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        {id: 1, text: 'hello'},
        {id: 2, text: 'how are you'}

    ]);
    return (
        <div className = {`${styles.brd} ${styles.flexContainer}`}>
            <Header/>
            <MessageList messages={messages}/>
            <ChatInput addMessage={(msg) => {
                setMessages(prev =>[...prev, {id: Date.now(), text: msg}]);
            }}/>
        </div>
    );
};

