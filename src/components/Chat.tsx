import {MessageList} from "./MessageList";
import {ChatInput} from "./ChatInput";
import {useEffect, useState} from 'react';
import type {MessageType, RoomType} from "../types";
import styles from './Chat.module.css';
import {Header} from "./Header";

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        {id: 1, roomId: 2, text: 'hello'},
        {id: 2, roomId: 1, text: 'how are you'}
    ]);
    const [rooms, setRooms] = useState<RoomType[]>([

    ]);
    const [activeRoom, setActiveRoom] = useState(1);

    useEffect(() => {
        fetch('http://localhost:3000/rooms')
            .then(res => res.json())
            .then(data => setRooms(data));

    }, []);

    return (
        <div className = {`${styles.brd} ${styles.flexContainer}`}>
            <Header/>
            <MessageList activeRoom={activeRoom} setActiveRoom={setActiveRoom} messages={messages} rooms={rooms} addRoom={(room) => {
                setRooms(prev =>[...prev, room]);
            }}/>
            <ChatInput addMessage={(msg) => {
                setMessages(prev =>[...prev, {id: Date.now(),roomId: activeRoom, text: msg}]);
            }}/>
        </div>
    );
};

