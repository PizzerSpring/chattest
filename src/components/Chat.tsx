import {MessageList} from "./MessageList";
import {ChatInput} from "./ChatInput";
import {useEffect, useState} from 'react';
import type {MessageType, RoomType} from "../types";
import styles from './Chat.module.css';
import {Header} from "./Header";
import {SideBar} from "./SideBar";
import stylesC from './MessageList.module.css';

export const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        {id: 1, roomId: 2, text: 'hello'},
        {id: 2, roomId: 1, text: 'how are you'}
    ]);
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [activeRoom, setActiveRoom] = useState<number | null>(null);

    useEffect(() => {
        if (activeRoom === null) {
            return;
        } else {
            fetch(`http://localhost:3000/rooms/${activeRoom}/messages`)
                .then(res => res.json())
                .then(data => {
                    setMessages(data);
                })
        }

    }, [activeRoom]);


    useEffect(() => {
        fetch('http://localhost:3000/rooms')
            .then(res => res.json())
            .then(data => {
                if (data.length !== 0) {
                    setRooms(data);
                    setActiveRoom(data[0].id)
                } else {
                    setActiveRoom(null)
                }
            });

    }, []);

    const deleteRoom = (roomId: number) => {

        fetch(`http://localhost:3000/rooms/${roomId}`,  {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                const roomIndex = rooms.findIndex(r => r.id === roomId);

                if (roomId === activeRoom) {
                    setActiveRoom(rooms[roomIndex + 1]?.id || rooms[roomIndex - 1]?.id || null);
                }
                const filteredRooms = rooms.filter(r => r.id !== roomId);
                setRooms(filteredRooms);

            })

    }

    const addChatHandler = (roomName: string) => {
        if (roomName.trim() !== '') {
            fetch('http://localhost:3000/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: roomName})
            })
                .then(res => res.json())
                .then(data => {
                    setRooms(prev => [...prev, data])

                })

        }
    }


    return (
        <div className={`${styles.brd} ${styles.flexContainer}`}>
            <Header/>
            <div className={stylesC.flexContainer}>
                <SideBar setActiveRoom={setActiveRoom} rooms={rooms} addRoom={addChatHandler} deleteRoom={deleteRoom}/>
                <MessageList activeRoom={activeRoom}  messages={messages}/>
            </div>
            <ChatInput activeRoom={activeRoom} addMessage={(msg) => {
                setMessages(prev => [...prev, msg]);
            }}/>
        </div>
    );
};

