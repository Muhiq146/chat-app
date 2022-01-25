import React, { useState, useEffect } from "react";
import defaultImage from "../Doraemon.jpeg";
import Camera from "../svg/Camera";
import { storage, dataBase, auth } from "../firebase-config";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Delete from "../components/Delete";

const Profile = () => {
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    getDoc(doc(dataBase, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (image) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${image.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, image);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(dataBase, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImage("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const deleteImage = async () => {
    await deleteObject(ref(storage, user.avatarPath));
    await updateDoc(doc(dataBase, "users", auth.currentUser.uid), {
      avatar: "",
      avatarPath: "",
    });
  };

  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={user.avatar || defaultImage} alt="Avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
