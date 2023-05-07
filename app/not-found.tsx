import React from "react";

const StarWars404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-gothic">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">
        This is not the page you're looking for...
      </h2>
      <img
        src="https://lumiere-a.akamaihd.net/v1/images/Death-Star-I-copy_36ad2500.jpeg"
        alt="Death Star"
        className="w-1/3 rounded-lg mb-8"
      />
      <p className="text-lg">
        Move along, move along to the{" "}
        <a href="/" className="text-yellow-400 underline">
          home page
        </a>
        .
      </p>
    </div>
  );
};

export default StarWars404;
