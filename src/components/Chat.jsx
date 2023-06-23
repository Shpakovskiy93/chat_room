import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

import styles from '../styles/Chat.module.css';
import icon from '../img/emoji.svg';
import Messages from './Messages';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const {search} = useLocation();
  const [params, setParams] = useState({room: '', user: ''});
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('')
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const serachParams = Object.fromEntries(new URLSearchParams(search));
    setParams(serachParams);
    socket.emit('join', serachParams);
  }, [search])

  useEffect(() => {
    socket.on('message', ({data}) => {
      setState((_state) => [ ..._state, data ]);
    })
  }, [])

  const leftRoom = () => {

  }

  const handleChange = ({target: {value}}) => setMessage(value);

  const onEmojiClick = ({emoji}) => setMessage(`${message} ${emoji}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!message) return;

    socket.emit('sendMessage', {message, params})

    setMessage('');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>

        <div className={styles.title}>
          {params.room}
        </div>

        <div className={styles.users}>
          0 users in this room
        </div>

        <button 
          className={styles.left}
          onClick={leftRoom}
        >
          Left the room
        </button>
      </div>

      <div className={styles.messages}>
        <Messages
          messages={state}
          name={params.name}
        />
      </div>
     

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
        <input 
          type='text'
          name='message'
          placeholder='to write a message'
          value={message}
          onChange={handleChange}
          autoComplete='off'
          required
        />
        </div>

        <div className={styles.emoji}>
          <img src={icon} alt='emoji' onClick={() => setOpen(!isOpen)} />
          {
            isOpen && (
              <div className={styles.emojies}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )
          }
        </div>

        <div className={styles.button}>
            <input 
              type="submit" 
              value="Seand a message"
              onSubmit={handleSubmit}
            />
        </div>
      </form>

    </div>
  )
}

export default Chat