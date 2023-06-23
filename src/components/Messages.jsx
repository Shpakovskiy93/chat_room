import React from 'react';

import styles from '../styles/Messages.module.css';

const Messages = ({messages, name}) => {
  return (
    <div className={styles.messages}>
      {messages.map(({ user, message }, index) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? styles.me : styles.user;

        return (
            <div className={`${styles.message} ${className}`} key={index}>
                <span className={styles.user}>
                    {user.name}
                </span>
                <div className={styles.text}>
                    {message}
                </div>
            </div>
        )
      })}
    </div>
  );
}

export default Messages