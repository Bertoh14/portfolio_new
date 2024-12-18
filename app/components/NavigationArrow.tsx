import React from "react";

const Click = "/assets/click.mp3";

// Define the props type
interface NavigationArrowProps {
  direction: "left" | "right"; // Direction can only be "left" or "right"
  onClick?: () => void;        // Optional click handler
  hidden?: boolean;            // Optional hidden state
}

const NavigationArrow: React.FC<NavigationArrowProps> = ({
  direction,
  onClick,
  hidden = false, // Default value for hidden
}) => {
  // Play sound effect on click
  const playSound = () => {
    const audio = new Audio(Click);
    audio.play();
  };

  const handleClick = () => {
    playSound();
    if (onClick) onClick();
  };

  const styles =
    direction === "right" ? "right-[-5%]" : "left-[-5%] scale-x-[-1]";

  return (
    <div
      className={`size-12 absolute top-[44.3%] ${styles} z-10 animate-pulse hover:scale-110 hover:animate-none transition ease-in-out duration-200 ${
        hidden ? "hidden" : ""
      }`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
        style={{ fill: "#38bdf8" }}
      >
        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
        </svg>
    </div>
  );
};

export default NavigationArrow;
