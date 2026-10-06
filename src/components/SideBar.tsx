import styles from './SideBar.module.css'
import type {RoomType} from "../types";

type SideBarType = {
    rooms: RoomType[]
    setActiveRoom: (roomId: number) => void
    addRoom: (room: RoomType) => void
}

export const SideBar = ({rooms, setActiveRoom, addRoom}: SideBarType) => {

    const addChatHandler = () => {
        fetch('http://localhost:3000/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: 'gaming'})
        })
            .then(res => res.json())
            .then(data => addRoom(data))

    }

    return (
        <div className={styles.bg}>
            <ul>
                {rooms.map(r => {
                    return (
                        <li key={r.id} onClick={() => {
                            setActiveRoom(r.id);

                        }}>{r.name}</li>
                    )
                })}
            </ul>
            <button onClick={addChatHandler}>New chat</button>
        </div>
    );
};

