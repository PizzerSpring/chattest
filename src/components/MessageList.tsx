import type {MessageType} from "../types";

type MessageListType = {
    messages: MessageType[]
}

export const MessageList = ({messages}: MessageListType) => {
    return (
        <div>
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

