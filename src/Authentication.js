import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Authentication.css";

const Authentication = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        const { email, password, name, rollNo, school } = formData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), { name, rollNo, email, school });
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">{isSignup ? "Signup" : "Login"}</h1>

        {isSignup && (
          <>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 my-2 border rounded" required />
            <input type="text" name="rollNo" placeholder="Roll No" value={formData.rollNo} onChange={handleChange} className="w-full p-2 my-2 border rounded" required />
            <input type="text" name="school" placeholder="School" value={formData.school} onChange={handleChange} className="w-full p-2 my-2 border rounded" required />
          </>
        )}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 my-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 my-2 border rounded" required />

        {isSignup && (
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 my-2 border rounded" required />
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full" disabled={loading}>
          {loading ? "Processing..." : isSignup ? "Signup" : "Login"}
        </button>

        <p className="text-blue-500 cursor-pointer mt-4" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
        </p>
      </form>
    </div>
  );
};

export default Authentication;