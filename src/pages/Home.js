import React, { useEffect, useState } from "react";
import { dataBase, auth, storage } from "../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import BackArrow from "../svg/BackArrow";

const Home = () => {
  const [users, setUsers] = useState("");
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [messages, setMessages] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(dataBase, "users");
    // Creating a query
    const q = query(userRef, where("uid", "not-in", [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => {
      unsub()
      setText("")
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectUser = (user) => {
    setChat(user);
    // console.log(user);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const messageRef = collection(dataBase, "messages");
    const a = collection(messageRef, id, "chat");
    const q = query(a, orderBy("createdAt", "asc"));
    // console.log(q);
    onSnapshot(q, (querySnapshot) => {
      // console.log("🔥🔥🔥");
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
      // console.log(messages);
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    let mt = "";
    if (image) {
      const imageRef = ref(
        storage,
        `images/${new Date().getTime()} - ${image.name}`
      );
      const snap = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      mt = "image";
      url = imageUrl;
      setImage("");
    }
    if (video) {
      const videoRef = ref(
        storage,
        `videos/${new Date().getTime()} - ${video.name}`
      );
      const snap = await uploadBytes(videoRef, video);
      const videoUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      mt = "video";
      url = videoUrl;
      setVideo("");
    }

    await addDoc(collection(dataBase, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      mediaType: mt,
      media: url || "",
    });
    setText("");
  };

  return (
    <div className="home_container">
      <div className={`users_container ${chat ? "users_container_1" : ""}`}>
        {users
          ? users.map((user) => (
            <User
              key={user.uid}
              user={user}
              chat={chat}
              selectUser={selectUser}
            />
          ))
          : null}
      </div>
      <div className={`message_container ${chat ? "" : "home_container_1"}`}>
        {chat ? (
          <>
            <div className="messages_user">
              <label onClick={() => setChat("")} className="symbol"><BackArrow /></label>
              <h3>{chat.name}</h3>
            </div>

            {messages.length
              ? messages.map((message, i) => (
                <Message key={i} message={message} user={user1} />
              ))
              : null}

            <MessageForm
              setEmoji={setEmoji}
              emoji={emoji}
              sendMessage={sendMessage}
              text={text}
              setText={setText}
              setImage={setImage}
              setVideo={setVideo}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start a conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
