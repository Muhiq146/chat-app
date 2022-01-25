import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, dataBase } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
      return false;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      await updateDoc(doc(dataBase, "users", result.user.uid), {
        isOnline: true,
      });
      navigate("/");
    } catch (err) {
      setData({ ...data, error: err.message });
    }
  };

  return (
    <section>
      <h3>Login to your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn">
            {loading ? "Logging in ..." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
