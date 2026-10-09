import type {MessageType} from "../types";
import styles from './MessageList.module.css';

type MessageListType = {
    messages: MessageType[]
    activeRoom: number | null
}

export const MessageList = ({messages, activeRoom}: MessageListType) => {

    const filteredMessages = messages.filter(msg => msg.roomId === activeRoom);

    return (
        <div className={styles.flxGrowMsg}>
            <ul>
                {filteredMessages.map((msg) => {
                    return (
                        <li key={msg.id}>{msg.text}</li>
                    )
                })}
            </ul>
        </div>
    );
};

