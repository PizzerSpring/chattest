import styles from './Room.module.css'
import {useEffect, useRef, useState} from "react";

type RoomPropsType = {
    name: string
    activeRoom: number | null
    setActiveRoom: (roomId: number) => void
    roomId: number
    deleteRoom: (roomId: number) => void
}

export const Room = ({name, activeRoom, setActiveRoom, roomId, deleteRoom}: RoomPropsType) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
          if(activeMenu && menuRef.current) {
              menuRef.current.focus();
          }
        },
        [activeMenu])
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
            {
                activeMenu && <div tabIndex={0} ref={menuRef} onClick={(e) => {
                    e.stopPropagation();
                    deleteRoom(roomId);
                    setActiveMenu(false);
                }
                } onBlur={() => {
                    setActiveMenu(false);
                }}>Удалить комнату</div>
            }
        </li>
    )
        ;
};

