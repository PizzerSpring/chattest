import styles from './Room.module.css'
import {useState} from "react";
import {RoomContextMenu} from "./RoomContextMenu";
import type {JSX} from "react";

type RoomPropsType = {
    name: string
    activeRoom: number | null
    setActiveRoom: (roomId: number) => void
    roomId: number
    deleteRoom: (roomId: number) => void
}

export const Room = ({name, activeRoom, setActiveRoom, roomId, deleteRoom}: RoomPropsType): JSX.Element => {
    const [activeMenu, setActiveMenu] = useState(false);

    return (
        <li>
            <button onContextMenu={(e) => {
                e.preventDefault();
                setActiveMenu(true);
            }} onClick={() => {
                setActiveRoom(roomId);
            }} className={`${styles.roomButton} ${roomId === activeRoom ? styles.roomButtonActive : ''}`}>
                <span>{name}</span>
            </button>
            {activeMenu &&
                <RoomContextMenu roomId={roomId} deleteRoom={deleteRoom} onClose={() => {
                    setActiveMenu(false);
                }
                }/>
            }
        </li>
    )

};

