import {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from './RoomInputContainer.module.css';

type RoomInputContainerPropsType = {
    addRoom: (roomName: string) => void
    onClose: () => void
}

export const RoomInputContainer = ({addRoom, onClose}: RoomInputContainerPropsType) => {
    const [value, setValue] = useState('');

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }
    const testCheck: number = "строка";

    const addChatHandler = () => {
        const trimmedValue = value.trim();
        if(trimmedValue !== '') {
            addRoom(trimmedValue);
            onClose();
        }
        setValue('');
    }

    const addChatEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addChatHandler();
        }
    }
    return (
        <div className={styles.roomInputContainer}>
            <input type="text" value={value} onChange={onChangeInputHandler}
                   onKeyDown={addChatEnterHandler}/>
            <button onClick={addChatHandler}>+</button>
        </div>
    );
};

