import { useEffect, useState } from 'react'
import io from 'socket.io-client';

const Home = () => {
    const [input, setInput] = useState('');
    useEffect(() => { socketInitializer() }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket');
        io().on('connect', () => {
            console.log('connected');
        });

        io().on('update-input', (msg: string) => {
            setInput(msg);
        });
    }

    const onChangeHandler = (e: any) => {
        setInput(e.target.value);
        io().emit('input-change', e.target.value);
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