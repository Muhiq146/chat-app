import React from "react";
import Attachment from "../svg/Attachment";
import Emoji from "../svg/Emoji";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const MessageForm = ({ sendMessage, text, setText, setImage, emoji, setEmoji }) => {
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
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => setImage(e.target.files[0])}
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
