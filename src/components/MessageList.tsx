import type {MessageType, RoomType} from "../types";
import styles from './MessageList.module.css';
import {SideBar} from "./SideBar";

type MessageListType = {
    messages: MessageType[]
    rooms: RoomType[]
    setActiveRoom: (roomId: number) => void
    activeRoom: number
}

export const MessageList = ({messages, rooms, setActiveRoom, activeRoom}: MessageListType) => {

    const filteredMessages = messages.filter(msg => msg.roomId === activeRoom);

    return (
        <div className={styles.flexContainer}>
            <SideBar setActiveRoom={setActiveRoom} rooms={rooms}/>
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

