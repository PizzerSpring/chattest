import styles from './Room.module.css'

type RoomPropsType = {
    name: string
    activeRoom: number | null
    setActiveRoom: (roomId: number) => void
    roomId: number
}

export const Room = ({name, activeRoom, setActiveRoom ,roomId}: RoomPropsType) => {
    return (
        <button onClick={() => {
            setActiveRoom(roomId);
        }} className={`${styles.roomButton} ${roomId === activeRoom ? styles.roomButtonActive : ''}`}>
            <span>{name}</span>
        </button>
    );
};

