import React, { useState, useEffect } from "react";
import "../css/disc.css";

const discImage = "/assets/Fineas.png";

const Disc: React.FC = () => {
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    const interval = 12 * 1000; // 12 seconds for each full 360 degrees

    const toggleRotation = () => {
      setIsRotating((prevState) => !prevState);
    };

    const intervalId = setInterval(() => {
      toggleRotation();
      setTimeout(toggleRotation, 4000); // Stop for 4 seconds after two rotations
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="overflow-hidden p-0 m-0 h-full w-full bg-gradient-to-t from-[#d1d5db] to-white relative flex justify-center items-center"
      style={{
        width: "100%",
        paddingBottom: "50%",
        borderRadius: "1.5rem",
      }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src={discImage}
          alt="Rotating Disc"
          className={`disc-image ${isRotating ? "animate-rotate-y" : ""}`}
        />
      </div>
    </div>
  );
};

export default Disc;
