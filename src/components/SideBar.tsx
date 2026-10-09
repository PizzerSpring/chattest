import styles from './SideBar.module.css'
import type {RoomType} from "../types";
import {useState} from "react";
import {ChangeEvent} from "react";

type SideBarType = {
    rooms: RoomType[]
    setActiveRoom: (roomId: number) => void
    addRoom: (roomName: string) => void
    deleteRoom: (roomId: number) => void
}

export const SideBar = ({rooms, setActiveRoom, addRoom, deleteRoom}: SideBarType) => {

    const [value, setValue] = useState('');

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);

    }

    const addChatHandler = () => {
        addRoom(value);
        setValue('');
    }

    const deleteChatHandler = (roomId: number) => {
        deleteRoom(roomId);
    }

    return (
        <div className={styles.bg}>
            <ul>
                {rooms.map(r => {
                    return (
                        <div key={r.id}>
                        <li onClick={() => {
                            setActiveRoom(r.id);

                        }}>{r.name}</li>
                        <button onClick={() => {
                            deleteChatHandler(r.id);
                        }}>X</button>
                        </div>
                    )
                })}
            </ul>
            <input type="text" value={value} onChange={onChangeInputHandler}/>
            <button onClick={addChatHandler}>New chat</button>
        </div>
    );
};

