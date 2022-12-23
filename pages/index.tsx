import { useEffect, useState } from 'react'
let socket: any;
const io = require('Socket.IO-client');

const Home = () => {
    const [input, setInput] = useState('');
    useEffect(() => { socketInitializer() }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io();

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('update-input', (msg: string) => {
            setInput(msg);
        });
    }

    const onChangeHandler = (e: any) => {
        setInput(e.target.value);
        socket.emit('input-change', e.target.value);
    }

    return (
        <input
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
        />
    );
}

export default Home;