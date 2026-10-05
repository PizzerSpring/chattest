import type {MessageType} from "../types";
import styles from './MessageList.module.css';
import SideBar from "./SideBar";

type MessageListType = {
    messages: MessageType[]
}

export const MessageList = ({messages}: MessageListType) => {
    return (
        <div className={styles.flexContainer}>
            <SideBar/>
            <ul>
                {messages.map((msg) => {
                    return (
                        <li key={msg.id}>{msg.text}</li>
                    )
                })}
            </ul>
        </div>
    );
};

