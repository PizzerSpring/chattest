import {type ChangeEvent, type KeyboardEvent, useEffect, useState, useRef} from "react";
import styles from './RoomInputContainer.module.css';
import type {JSX} from "react";

type RoomInputContainerPropsType = {
    addRoom: (roomName: string) => void
    onClose: () => void
}

export const RoomInputContainer = ({addRoom, onClose}: RoomInputContainerPropsType): JSX.Element => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const handleClickOutSide = (e: MouseEvent) => {
            if(!inputRef.current?.contains(e.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutSide)
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        }

    }, [onClose])

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

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
        <div className={styles.roomInputContainer} ref={inputRef}>
            <input type="text" value={value} placeholder="Название комнаты..." autoFocus onChange={onChangeInputHandler}
                   onKeyDown={addChatEnterHandler}/>
            <button onClick={addChatHandler}>+</button>
        </div>
    );
};

