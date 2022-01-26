import React from "react";
import Attachment from "../svg/Attachment";
import Emoji from "../svg/Emoji";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const MessageForm = ({ sendMessage, text, setText, setImage, setVideo, emoji, setEmoji }) => {

  const media = (e) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].type.includes("image")) {
        setImage(e.target.files[0]);
        // console.log("image");
      } else {
        setVideo(e.target.files[0]);
        // console.log("video");
      }
    }
  }

  return (
    <form className="message_form" onSubmit={sendMessage}>
      <label htmlFor="img">
        <Attachment />
      </label>
      <label htmlFor="emoji" onClick={() => { emoji === true ? setEmoji(false) : setEmoji(true) }}>
        <Emoji />
      </label>
      {emoji &&
        <div style={{ margin: "0" }}>
          <Picker onSelect={emoji => setText(text + emoji.native)} />
        </div>}
      <input
        type="file"
        id="img"
        style={{ display: "none" }}
        onChange={(e) => media(e)}
      />
      <div>
        <input
          type="text"
          placeholder="Enter Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
