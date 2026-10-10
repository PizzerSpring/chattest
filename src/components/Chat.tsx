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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMessages([])
        if (activeRoom === null) {
            return;
        } else {
            const controller = new AbortController();
            setError(null)
            fetch(`http://localhost:3000/rooms/${activeRoom}/messages`, {
                signal: controller.signal
            })
                .then(res => {
                    if(!res.ok) {
                        throw new Error('Ошибка ответа от сервера');
                    } return res.json()
                })
                .then(data => {
                    setMessages(data);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        return;
                    }
                    setMessages([])
                    setError('Не удалось загрузить сообщения')
                    console.error(err)
                })
            return () => {
                controller.abort();
            }
        }

    }, [activeRoom]);


    useEffect(() => {
        setError(null)
        fetch('http://localhost:3000/rooms')
            .then(res => {
                if(!res.ok) {
                    throw new Error('Ошибка ответа от сервера');
                } return res.json()
            })
            .then(data => {
                setRooms(data);
                if (data.length !== 0) {
                    setActiveRoom(data[0].id)
                } else {
                    setActiveRoom(null)
                }
            })
            .catch(err => {
                setRooms([])
                setError('Не удалось загрузить комнаты')
                console.error(err)
            })

    }, []);

    const deleteRoom = (roomId: number) => {
        setError(null)
        fetch(`http://localhost:3000/rooms/${roomId}`,  {
            method: 'DELETE',
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error('Ошибка ответа от сервера');
                } return res.json()
            })
            .then(data => {
                const roomIndex = rooms.findIndex(r => r.id === roomId);

                if (roomId === activeRoom) {
                    setActiveRoom(rooms[roomIndex + 1]?.id || rooms[roomIndex - 1]?.id || null);
                }
                const filteredRooms = rooms.filter(r => r.id !== roomId);
                setRooms(filteredRooms);

            })
            .catch(err => {
                setError('Не удалось удалить комнату. Проверьте подключение к серверу')
                console.error(err)
            })

    }

    const addChatHandler = (roomName: string) => {
        setError(null)
        if (roomName.trim() !== '') {
            fetch('http://localhost:3000/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: roomName})
            })
                .then(res => {
                    if(!res.ok) {
                        throw new Error('Ошибка ответа от сервера');
                    } return res.json()
                })
                .then(data => {
                    setRooms(prev => [...prev, data])

                })
                .catch(err => {
                    setError('Не удалось создать комнату. Проверьте подключение к серверу')
                    console.error(err)
                })

        }
    }


    return (
        <div className={`${styles.brd} ${styles.flexContainer}`}>
            <Header/>
            <div className={stylesC.flexContainer}>
                <SideBar setActiveRoom={setActiveRoom} rooms={rooms} addRoom={addChatHandler} deleteRoom={deleteRoom} activeRoom={activeRoom}/>
                {error && <div>{error}</div>}
                <MessageList activeRoom={activeRoom}  messages={messages}/>
            </div>
            <ChatInput activeRoom={activeRoom} addMessage={(msg) => {
                setMessages(prev => [...prev, msg]);
            }}/>
        </div>
    );
};

