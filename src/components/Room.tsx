import styles from './Room.module.css'
import {type ChangeEvent,type KeyboardEvent, useState} from "react";
import {RoomContextMenu} from "./RoomContextMenu";
import type {JSX} from "react";

type RoomPropsType = {
    name: string
    activeRoom: number | null
    setActiveRoom: (roomId: number) => void
    roomId: number
    deleteRoom: (roomId: number) => void
    updateRoom: (roomId: number ,roomName: string) => void
}

export const Room = ({name, activeRoom, setActiveRoom, roomId, deleteRoom, updateRoom}: RoomPropsType): JSX.Element => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [inputActive, setInputActive] = useState(false);
    const [value, setValue] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            updateRoom(roomId ,value)
            setInputActive(false)
        }
    }



    return (
        <li>
            {inputActive ?
                <input type="text" onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={value}/>
                :
                    <button onDoubleClick = {() => {
                        setInputActive(true)

                    }} onContextMenu={(e) => {
                        e.preventDefault();
                        setActiveMenu(true);
                    }} onClick={() => {
                        setActiveRoom(roomId);
                    }} className={`${styles.roomButton} ${roomId === activeRoom ? styles.roomButtonActive : ''}`}>
                        <span>{name}</span>
                    </button>}
            {activeMenu &&
                <RoomContextMenu roomId={roomId} deleteRoom={deleteRoom} onClose={() => {
                    setActiveMenu(false);
                }
                }/>
            }
        </li>
    )

}

