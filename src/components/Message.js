import React, { useEffect, useRef } from "react";
import Moment from "react-moment";

const Message = ({ message, user }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  return (
    <div
      className={`message_wrapper ${message.from === user ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={`${message.from === user ? "me" : "friend"}`}>
        {message.media !== '' ?
          message.mediaType === "image" ? (
            <img style={{ height: "200px" }} src={`${message.media}`} alt={`${message.text}`} />
          ) : <video style={{ width: "300px"}} controls> <source src={`${message.media}`} type="video/mp4"></source></video>
          : null}

        {message.text}
        <br />
        <small>
          <Moment fromNow>{message.createdAt.toDate()}</Moment>
          {/* {message.createdAt.toDate().toDateString()} */}
        </small>
      </p>
    </div>
  );
};

export default Message;
