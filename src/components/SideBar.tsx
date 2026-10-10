import styles from './SideBar.module.css'
import type {RoomType} from "../types";
import {useState} from "react";
import {ChangeEvent} from "react";
import {Room} from "./Room";

type SideBarType = {
    rooms: RoomType[]
    activeRoom: number | null
    setActiveRoom: (roomId: number) => void
    addRoom: (roomName: string) => void
    deleteRoom: (roomId: number) => void
}

export const SideBar = ({rooms, setActiveRoom, addRoom, deleteRoom, activeRoom}: SideBarType) => {

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
                            <Room name={r.name} roomId={r.id} setActiveRoom={setActiveRoom} activeRoom={activeRoom}/>
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

