import {MessageList} from "./MessageList"
import {ChatInput} from "./ChatInput"
import {useEffect, useState} from 'react'
import type {MessageType, RoomType} from "../types"
import styles from './Chat.module.css'
import {Header} from "./Header"
import {SideBar} from "./SideBar"
import {ChatScreen} from "./ChatScreen"
import {CharArea} from "./CharArea"
import type {JSX} from "react"

const API_BASE_URL = "http://localhost:3000"

export const Chat = (): JSX.Element => {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [rooms, setRooms] = useState<RoomType[]>([])
    const [activeRoom, setActiveRoom] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (activeRoom === null) {
            setMessages([])
            return
        }

        const controller = new AbortController()
        setError(null)

        fetch(`${API_BASE_URL}/rooms/${activeRoom}/messages`, {
            signal: controller.signal
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка ответа от сервера')
                return res.json()
            })
            .then(data => {
                setMessages(data)
            })
            .catch(err => {
                if (err.name === 'AbortError') return
                setMessages([])
                setError('Не удалось загрузить сообщения')
                console.error(err)
            })
        return () => {
            controller.abort()
        }

    }, [activeRoom])

    useEffect(() => {
        setError(null)
        fetch(`${API_BASE_URL}/rooms`)
            .then(res => {
                if (!res.ok) throw new Error('Ошибка ответа от сервера')
                return res.json()
            })
            .then(data => {
                setRooms(data)
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

    }, [])

    const deleteRoom = (roomId: number) => {
        setError(null)

        fetch(`${API_BASE_URL}/rooms/${roomId}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка ответа от сервера')
                return res.json()
            })
            .then(() => {
                if (roomId === activeRoom) {
                    // TODO: Handle potential request race when selecting the next active room.
                    const roomIndex = rooms.findIndex(r => r.id === roomId)
                    setActiveRoom(rooms[roomIndex + 1]?.id || rooms[roomIndex - 1]?.id || null)
                }
                setRooms(prev => prev.filter(r => r.id !== roomId))

            })
            .catch(err => {
                setError('Не удалось удалить комнату. Проверьте подключение к серверу')
                console.error(err)
            })

    }

    const addChatHandler = (roomName: string) => {
        const trimmedRoomName = roomName.trim()
        if (!trimmedRoomName) return

        setError(null)
        fetch(`${API_BASE_URL}/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: trimmedRoomName})
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка ответа от сервера')
                return res.json()
            })
            .then(data => {
                setRooms(prev => [...prev, data])

            })
            .catch(err => {
                setError('Не удалось создать комнату. Проверьте подключение к серверу')
                console.error(err)
            })
    }

    const addMessageHandler = (messageText: string) => {
        const trimmedMessageText = messageText.trim()
        if (activeRoom === null || trimmedMessageText === '') return
        fetch(`${API_BASE_URL}/rooms/${activeRoom}/messages`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({text: trimmedMessageText})
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка ответа от сервера')
                return res.json()
            })
            .then(data => {
                setMessages(prev => [...prev, data])
            })
            .catch(err => {
                    setError('Не удалось отправить сообщение. Проверьте подключение к серверу')
                    console.error(err)
                }
            )
    }


    return (
        <div className={styles.chat}>
            <Header/>
            <ChatScreen>
                <SideBar setActiveRoom={setActiveRoom} rooms={rooms} addRoom={addChatHandler} deleteRoom={deleteRoom}
                         activeRoom={activeRoom}/>
                {error && <div>{error}</div>}
                <CharArea>
                    <MessageList activeRoom={activeRoom} messages={messages}/>
                    <ChatInput activeRoom={activeRoom} addMessage={addMessageHandler}/>
                </CharArea>
            </ChatScreen>
        </div>
    )
}

