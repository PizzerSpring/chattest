import styles from './SideBar.module.css'
import type {RoomType} from "../types";
import {useState} from "react";
import {ChangeEvent} from "react";

type SideBarType = {
    rooms: RoomType[]
    setActiveRoom: (roomId: number) => void
    addRoom: (room: RoomType) => void
}

export const SideBar = ({rooms, setActiveRoom, addRoom}: SideBarType) => {

    const [value, setValue] = useState('');

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);

    }

    const addChatHandler = () => {
        if (value.trim() !== '') {
            fetch('http://localhost:3000/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: value})
            })
                .then(res => res.json())
                .then(data => addRoom(data))
            setValue('');
        }
    }

    const deleteChatHandler = (roomId: number) => {
        fetch(`http://localhost:3000/rooms/${roomId}`,  {
            method: 'DELETE',
        })

    }

    return (
        <div className={styles.bg}>
            <ul>
                {rooms.map(r => {
                    return (
                        <div key={r.id}>
                        <li onClick={() => {
                            setActiveRoom(r.id);

                        }}>{r.name}</li>
                        <button onClick={() => {
                            deleteChatHandler(r.id);
                        }}>X</button>
                        </div>
                    )
                })}
            </ul>
            <input type="text" value={value} onChange={onChangeInputHandler}/>
            <button onClick={addChatHandler}>New chat</button>
        </div>
    );
};

