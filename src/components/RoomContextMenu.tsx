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
            const handleClickOutSide = (e: MouseEvent) => {
                if(!menuRef.current?.contains(e.target as Node)) {
                    onClose();
                }
            }

            document.addEventListener('mousedown', handleClickOutSide)
            return () => {
                document.removeEventListener('mousedown', handleClickOutSide);
            }

        },
        [onClose])

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        deleteRoom(roomId);
        onClose();
    }

    return (
        <button className={styles.deleteRoomMenu} ref={menuRef} onClick={handleDelete}>
            Удалить комнату
        </button>
    );
};

