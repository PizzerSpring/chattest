import {useRef} from "react";
import {useEffect} from "react";

type RoomContextMenuPropsType = {
    roomId: number
    deleteRoom: (roomId: number) => void
    onClose: () => void
}

export const RoomContextMenu = ({roomId, deleteRoom, onClose}: RoomContextMenuPropsType) => {

    const menuRef = useRef(null);

    useEffect(() => {
          menuRef.current.focus();
        },
        [])

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteRoom(roomId);
        onClose();
    }

    return (
        <div tabIndex={0} ref={menuRef} onClick={handleDelete} onBlur={onClose}>
            Удалить комнату
        </div>
    );
};

