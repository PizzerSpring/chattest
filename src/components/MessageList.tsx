
type MessageListType = {
    messages: string[]
}

export const MessageList = ({messages}: MessageListType) => {
    return (
        <div>
            {messages.map(msg => {
                return (
                    <ul>
                        <li>{msg}</li>
                    </ul>
                )
            })}

        </div>
    );
};

