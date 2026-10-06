import type {MessageType, RoomType} from "../types";
import styles from './MessageList.module.css';
import {SideBar} from "./SideBar";

type MessageListType = {
    messages: MessageType[]
    rooms: RoomType[]
    setActiveRoom: (roomId: number) => void
    activeRoom: number
    addRoom: (room: RoomType) => void
}

export const MessageList = ({messages, rooms, setActiveRoom, activeRoom, addRoom}: MessageListType) => {

    const filteredMessages = messages.filter(msg => msg.roomId === activeRoom);

    return (
        <div className={styles.flexContainer}>
            <SideBar setActiveRoom={setActiveRoom} rooms={rooms} addRoom={addRoom}/>
            <ul className={styles.flxGrowMsg}>
                {filteredMessages.map((msg) => {
                    return (
                        <li key={msg.id}>{msg.text}</li>
                    )
                })}
            </ul>
        </div>
    );
};

