import React, { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchData();
  }, [navigate]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Roll No:</strong> {userData.rollNo}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>School:</strong> {userData.school}</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => { auth.signOut(); navigate("/"); }}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
