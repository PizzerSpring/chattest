import styles from './SideBar.module.css'
import type {RoomType} from "../types";
import {useState} from "react";
import {Room} from "./Room";
import {RoomInputContainer} from "./RoomInputContainer";
import type {JSX} from "react";

type SideBarType = {
    rooms: RoomType[]
    activeRoom: number | null
    setActiveRoom: (roomId: number) => void
    addRoom: (roomName: string) => void
    deleteRoom: (roomId: number) => void
}

export const SideBar = ({rooms, activeRoom, setActiveRoom, addRoom, deleteRoom}: SideBarType): JSX.Element => {

    const [isValueActive, setIsValueActive] = useState(false);


    return (
        <aside className={styles.roomsSidebar}>
            <ul>
                {rooms.map(r =>
                    <Room key={r.id} name={r.name} roomId={r.id} setActiveRoom={setActiveRoom}
                          activeRoom={activeRoom} deleteRoom={deleteRoom}/>)}
            </ul>
            {isValueActive ?
                <RoomInputContainer addRoom={addRoom} onClose={() => {
                    setIsValueActive(false)
                }
                }/>
                :
                <button onClick={() => {
                    setIsValueActive(true)
                }}>Добавить комнату</button>}
        </aside>
    );
};


