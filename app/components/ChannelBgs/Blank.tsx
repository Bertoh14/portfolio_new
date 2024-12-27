import React from "react";
import "../css/disc.css";

const discImage = "/assets/Fineas.png";

const StaticDisc: React.FC = () => {
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
          alt="Static Disc"
          className="disc-image"
        />
      </div>
    </div>
  );
};

export default StaticDisc;