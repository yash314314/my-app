// src/components/Homepage.jsx
import React from 'react';
import Body from "../image/ss.jpg";
import { Link } from 'react-router-dom';

const Homepage = () => {
  const styles = {
    backgroundImage: `url(${Body})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Full viewport height
    width: '100%', // Full width
  };

  return (
    <div style={styles} className="flex flex-col justify-center items-center text-center">
      <div className="backdrop-blur-md bg-white/40 rounded-xl p-8 font-bold text-5xl shadow-lg mb-4">
        Welcome to Our Site
      </div>
      <p className="text-white text-lg md:text-xl max-w-xl px-4 mb-6">
        Join our community of passionate writers and readers. Share your thoughts, insights, and stories with the world.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/Signin">
          <button className="backdrop-blur-md bg-white/40 rounded-xl p-3 font-bold text-lg shadow transition duration-300 hover:bg-white/50">
            Login
          </button>
        </Link>
        <Link to="/Signup">
          <button className="backdrop-blur-md bg-white/40 rounded-xl p-3 font-bold text-lg shadow transition duration-300 hover:bg-white/50">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
