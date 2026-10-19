import type {MessageType} from "../types";
import styles from './MessageList.module.css';
import type {JSX} from "react";

type MessageListType = {
    messages: MessageType[]
    activeRoom: number | null
}

export const MessageList = ({messages, activeRoom}: MessageListType): JSX.Element => {

    const filteredMessages = messages.filter(msg => msg.roomId === activeRoom);

    return (
        <ul className={styles.messagesList}>
            {filteredMessages.map((msg) => {
                return (
                    <li className={styles.messagesList} key={msg.id}>{msg.text}</li>
                )
            })}
        </ul>
    );
};

