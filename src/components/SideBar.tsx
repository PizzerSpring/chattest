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
    const [isValueActive, setIsValueActive] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(true);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const addChatHandler = () => {
        addRoom(value);
        setValue('');
        setIsButtonActive(true);
        setIsValueActive(false);
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
            {isValueActive && <div>
                <input type="text" value={value} onChange={onChangeInputHandler}/>
                <button onClick={addChatHandler}>+</button>
            </div>}
            {isButtonActive && <button className={styles.roomsSidebar} onClick={() => {
                setIsValueActive(true);
                setIsButtonActive(false);
            }}>Добавить комнату</button>}
        </aside>
    );
};

