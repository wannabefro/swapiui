import React from "react";
import Image from "next/image";

const StarWars404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-gothic">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">
        This is not the page you&apos;re looking for...
      </h2>
      <Image
        src="https://lumiere-a.akamaihd.net/v1/images/Death-Star-I-copy_36ad2500.jpeg"
        alt="Death Star"
        className="w-1/3 rounded-lg mb-8"
        width={500}
        height={500}
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
