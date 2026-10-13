import type {MessageType} from "../types";
import styles from './MessageList.module.css';

type MessageListType = {
    messages: MessageType[]
    activeRoom: number | null
}

export const MessageList = ({messages, activeRoom}: MessageListType) => {

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

