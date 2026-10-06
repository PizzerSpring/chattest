import {MessageList} from "./MessageList";
import {ChatInput} from "./ChatInput";
import { useState } from 'react';
import type {MessageType, RoomType} from "../types";
import styles from './Chat.module.css';
import {Header} from "./Header";

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        {id: 1, roomId: 2, text: 'hello'},
        {id: 2, roomId: 1, text: 'how are you'}
    ]);
    const [rooms, setRooms] = useState<RoomType[]>([
        {id: 1, name: 'flud'},
        {id: 2, name: 'it-chat'},
    ]);
    const [activeRoom, setActiveRoom] = useState(1);

    return (
        <div className = {`${styles.brd} ${styles.flexContainer}`}>
            <Header/>
            <MessageList activeRoom={activeRoom} setActiveRoom={setActiveRoom} messages={messages} rooms={rooms}/>
            <ChatInput addMessage={(msg) => {
                setMessages(prev =>[...prev, {id: Date.now(),roomId: activeRoom, text: msg}]);
            }}/>
        </div>
    );
};

