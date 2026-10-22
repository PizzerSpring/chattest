import {useRef, useEffect} from "react";
import styles from './RoomContextMenu.module.css';
import type {JSX} from "react";

type RoomContextMenuPropsType = {
    roomId: number
    deleteRoom: (roomId: number) => void
    onClose: () => void
}

export const RoomContextMenu = ({roomId, deleteRoom, onClose}: RoomContextMenuPropsType): JSX.Element => {

    const menuRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const menuElement = menuRef.current;
        if(menuElement) {
            menuElement.focus();
        }
        },
        [])

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        deleteRoom(roomId);
        onClose();
    }

    return (
        <button className={styles.deleteRoomMenu} tabIndex={0} ref={menuRef} onClick={handleDelete} onBlur={onClose}>
            Удалить комнату
        </button>
    );
};

