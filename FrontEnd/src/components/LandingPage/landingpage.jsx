import React from "react";
import { useNavigate } from "react-router-dom";
import './landingpage.css';

const Landingpage = () => {
  const navigate = useNavigate(); 
  const handleLogin = () => {
    navigate("/login"); 
  };
  const handleRegister = () => {
    navigate("/userregistration"); 
  };

  return (
    <div className="landingpage" >
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start"
      style={{ backgroundColor: "#0F3C6B" ,zIndex:'2'}} 
    >
      <div
        className="flex-1 flex flex-col justify-center items-center text-center p-6 lg:p-12 text-white"
        style={{ zIndex:'2' }}
      >
        
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-gradient-text">
          ReadSphere
              </h1>
          <p className="mt-4 text-xl sm:text-2xl">
            Discover, Review, and Share Your Love for Books
          </p>

          <section className="mt-16 max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose ReadSphere?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold">🌟 Discover New Reads</h3>
            <p className="mt-2 text-gray-200">
              Explore books reviewed by a community of passionate readers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">✍️ Share Your Thoughts</h3>
            <p className="mt-2 text-gray-200">
              Review books you love and help others find their next favorite.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">🤝 Connect with Readers</h3>
            <p className="mt-2 text-gray-200">
              Engage with a vibrant community and discuss your favorite books.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">📚 Personalized Suggestions</h3>
            <p className="mt-2 text-gray-200">
              Get recommendations based on your reviews and preferences.
            </p>
          </div>
        </div>
      </section>
      <div className="flex ">
        <button
          className="flex-1 m-2 mt-5 px-6 py-3 bg-black text-white font-bold rounded-full shadow-md hover:bg-grey hover:text-black transition"
          onClick={handleLogin}
        >
        Login
        </button>
        <button
          className="flex-1 m-2 mt-5 px-6 py-3 bg-black text-white font-bold rounded-full shadow-md hover:bg-grey hover:text-black transition"
          onClick={handleRegister}
        >
        Register
        </button>
        </div>

      </div>

      <div
        className="flex-1"
        style={{
          height: "100%",
          marginRight:'2%',
          zIndex:'2'
        }}
      >
        <img
          src="./images/—Pngtree—library books are stacked_3136674.png" 
          alt="Job Management System"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    </div>
  );
};

export default Landingpage;
