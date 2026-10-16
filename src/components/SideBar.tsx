import styles from './SideBar.module.css'
import type {RoomType} from "../types";
import {useState} from "react";
import {KeyboardEvent, ChangeEvent} from "react";
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
    const [isValueActive, setIsValueActive] = useState(false);


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const addChatHandler = () => {
        const trimmedValue = value.trim();
        if(trimmedValue !== '') {
            addRoom(trimmedValue);
            setIsValueActive(false);
        }
        setValue('');
    }

    const addChatEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addChatHandler();
        }
    }


    return (
        <aside className={styles.roomsSidebar}>
            <ul>
                {rooms.map(r => {
                    return (
                        <Room key={r.id} name={r.name} roomId={r.id} setActiveRoom={setActiveRoom}
                              activeRoom={activeRoom} deleteRoom={deleteRoom}/>
                    )
                })}
            </ul>
            {isValueActive ?
                <div>
                    <input type="text" value={value} onChange={onChangeInputHandler}
                    onKeyPress={addChatEnterHandler}/>
                    <button onClick={addChatHandler}>+</button>
                </div> :
                <button className={styles.roomsSidebar} onClick={() => {
                    setIsValueActive(true);
                }}>Добавить комнату</button>}
        </aside>
    );
};


