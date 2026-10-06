import styles from './SideBar.module.css'
import type {RoomType} from "../types";

type SideBarType = {
    rooms: RoomType[]
    setActiveRoom: (roomId: number) => void
}

export const SideBar = ({rooms, setActiveRoom}: SideBarType) => {
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
        </div>
    );
};

