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
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [activeRoom, setActiveRoom] = useState<number | null>(null);

    useEffect(() => {
        if(activeRoom === null) {
            return;
        } else {
            fetch(`http://localhost:3000/rooms/${activeRoom}/messages`)
                .then(res => res.json())
                .then(data => {
                    setMessages(data);
                })
        }

        },[activeRoom]);


    useEffect(() => {
        fetch('http://localhost:3000/rooms')
            .then(res => res.json())
            .then(data => {
                if(data.length !== 0) {
                    setRooms(data);
                    setActiveRoom(data[0].id)
                } else {
                    setActiveRoom(null)
                }
            });

    }, []);

    const deleteRoom = (roomId: number) => {

        const roomIndex = rooms.findIndex(r => r.id === roomId);

        if(roomId === activeRoom) {
            setActiveRoom(rooms[roomIndex + 1]?.id || rooms[roomIndex - 1]?.id || null);
        }
        const filteredRooms = rooms.filter(r => r.id !== roomId);
        setRooms(filteredRooms);
    }

    return (
        <div className={`${styles.brd} ${styles.flexContainer}`}>
            <Header/>
            <MessageList activeRoom={activeRoom} setActiveRoom={setActiveRoom} messages={messages} rooms={rooms}
                         addRoom={(room) => {
                             setRooms(prev => [...prev, room]);
                         }} deleteRoom={deleteRoom}/>
            <ChatInput activeRoom={activeRoom} addMessage={(msg) => {
                setMessages(prev => [...prev, msg]);
            }}/>
        </div>
    );
};

