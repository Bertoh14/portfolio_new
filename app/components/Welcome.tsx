import React, { useState } from "react";

const ClickSfx = "/assets/click.mp3";

// Define the type for props
interface WelcomeScreenProps {
  onContinue: () => void; // Function to handle continuation
  logoSrc: string; // Source URL or path for the logo image
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue, logoSrc }) => {
  const [isTextFading, setIsTextFading] = useState(false);
  const [isBackgroundFading, setIsBackgroundFading] = useState(false);
  logoSrc = "assets/me.png";

  const handleContinue = () => {
    setIsTextFading(true);
    setTimeout(() => {
      setIsBackgroundFading(true);
      setTimeout(onContinue, 500);
    }, 1000);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-black text-white text-center p-4 cursor-pointer transition-opacity duration-500 ${
        isBackgroundFading ? "opacity-0" : "opacity-100"
      }`}
      onClick={() => {
        const audio = new Audio(ClickSfx);
        audio.play();
        handleContinue();
      }}
    >
      {/* Logo Image */}
      <div className="w-full flex justify-center mb-8">
        <img
          src={logoSrc}
          alt="Welcome Logo"
          className="w-32 h-auto rounded-full" // Adjust size as needed
        />
      </div>

      <div
        className={`max-w-5xl transition-opacity duration-500 ${
          isTextFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-5xl font-light mb-24 inline-flex items-center">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="mr-2"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.12 4.623a1 1 0 011.76 0l11.32 20.9A1 1 0 0127.321 27H4.679a1 1 0 01-.88-1.476l11.322-20.9zM16 18v-6"
              ></path>
              <path
                fill="#ffffff"
                d="M17.5 22.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              ></path>
            </g>
          </svg>
          WELCOME-ROBERT OH&apos;S PORTFOLIO
        </h1>
        <p className="text-4xl font-light mb-12 leading-relaxed">
          BEFORE EXPLORING, MAKE SURE YOUR SCREEN IS AT A PROPER RESOLUTION OR
          FULL SCREEN MODE. FOR MORE INFORMATION VISIT MY GITHUB PROFILE.
        </p>
        <p className="text-3xl font-light mb-6">Also online at:</p>
        <div className="text-4xl font-light">
          https://www.linkedin.com/in/robbyoh
        </div>
        <p className="text-5xl font-light mt-12 animate-pulse">
          Click anywhere to continue
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
