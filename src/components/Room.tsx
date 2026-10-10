import styles from './Room.module.css'
import {useState} from "react";

type RoomPropsType = {
    name: string
    activeRoom: number | null
    setActiveRoom: (roomId: number) => void
    roomId: number
    deleteRoom: (roomId: number) => void
}

export const Room = ({name, activeRoom, setActiveRoom, roomId, deleteRoom}: RoomPropsType) => {
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <>
            <button onContextMenu={(e) => {
                e.preventDefault();
                setActiveMenu(!activeMenu);
            }} onClick={() => {
                setActiveRoom(roomId);
            }} className={`${styles.roomButton} ${roomId === activeRoom ? styles.roomButtonActive : ''}`}>
                <span>{name}</span>
            </button>
            {
                activeMenu && <div onClick={() => {
                    deleteRoom(roomId)
                }
                }>Удалить комнату</div>
            }
        </>
    )
        ;
};

