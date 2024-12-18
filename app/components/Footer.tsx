import React, { useState, useEffect } from "react";

const divider = "/assets/wii-menu.svg";
const EnterSfx = "/assets/enter.mp3";

// Define the type for Footer props
interface FooterProps {
  openContact: (value: boolean) => void;
  openAbout: (value: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ openContact, openAbout }) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [showColon, setShowColon] = useState<boolean>(true);
  const [msgAni, setMsgAni] = useState<boolean>(true);
  const [contact] = useState<boolean>(true);
  const [about] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const dateObject = new Date();
      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const formattedMinute = minute < 10 ? "0" + minute : minute;
      const currentTime = `${hour} ${formattedMinute}`;
      setTime(currentTime);

      // Formatting date
      const dayOfWeek = dateObject.toLocaleString("en-US", {
        weekday: "short",
      });
      const month = dateObject.getMonth() + 1; // getMonth() is zero-indexed
      const day = dateObject.getDate();
      const formattedDate = `${dayOfWeek} ${month}/${day}`;
      setDate(formattedDate);
    };

    // Update time immediately on component mount
    updateTime();

    // Interval to update time every minute and date
    const minuteInterval = setInterval(updateTime, 60000);

    // Interval to toggle colon visibility every second
    const secondInterval = setInterval(() => {
      setShowColon((prevShowColon) => !prevShowColon);
    }, 1000);

    // Clean up intervals on component unmount
    return () => {
      clearInterval(minuteInterval);
      clearInterval(secondInterval);
    };
  }, []);

  // Style for the colon based on showColon state
  const colonStyle: React.CSSProperties = {
    opacity: showColon ? 1 : 0,
    transition: "opacity 0.3s",
  };

  const timeParts = time.split(" ");

  const updateAbout = () => {
    openAbout(about);
  };

  const updateMsg = () => {
    setMsgAni(false);
    openContact(contact);
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 h-1/5"
      style={{
        backgroundImage: `url(${divider})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#e5e5e5",
      }}
    >
      <div className="grid grid-cols-4 items-stretch h-full">
        <div className="col-start-1 col-end-2 flex items-center justify-start group/about">
          <button
            type="button"
            className="relative left-[-25%] rounded-full bg-gradient-to-r from-zinc-200 to-zinc-300 bg-zinc-300 shadow-lg ring-4 ring-inset-4 ring-neutral-400 size-3/4"
            aria-hidden="true"
          ></button>
          <button
            type="button"
            className="absolute left-[4%] rounded-full bg-zinc-300 transform hover:scale-110 transition duration-300 ease-in-out text-gray-600 shadow-lg border-4 border-cyan-400"
            onClick={() => {
              const audio = new Audio(EnterSfx);
              audio.play();
              updateAbout();
            }}
          >
            <div className="h-32 w-32 flex justify-center items-center">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7.00999L12 7M12 17L12 10"
                  stroke="#71717a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          <div className="absolute top-[-12.5%] left-[4%] z-10 rounded-full bg-neutral-50 px-8 py-1 text-3xl font-light text-center text-neutral-500 shadow-sm border-2 border-neutral-400 transition-all delay-0 duration-300 scale-100 pointer-events-none opacity-0 group-hover/about:opacity-100 group-hover/about:delay-300 group-hover/about:duration-300 group-hover/about:scale-105">
            About Me
          </div>
        </div>
        <div className="col-start-2 col-span-2 grid grid-rows-2 h-full">
          <div className="w-full flex items-start justify-center">
            <div className="text-3xl md:text-7xl font-light">
              {timeParts[0]}
              <span style={colonStyle}> : </span>
              {timeParts[1]}
            </div>
          </div>
          <div className="w-full flex items-start justify-center my-auto">
            <div className="text-3xl md:text-5xl font-light">{date}</div>
          </div>
        </div>
        <div className="col-start-4 col-end-5 flex items-center justify-end group/contact">
          <div
            className="relative right-[-25%] rounded-full bg-gradient-to-r from-zinc-200 to-zinc-300 bg-zinc-300 shadow-lg ring-4 ring-inset-8 ring-neutral-400 size-3/4"
            aria-hidden="true"
          ></div>
          <button
            type="button"
            className="absolute right-[4%] rounded-full bg-zinc-300 transform hover:scale-110 transition duration-300 ease-in-out text-gray-600 shadow-lg border-4 border-cyan-400"
            onClick={() => {
              const audio = new Audio(EnterSfx);
              audio.play();
              updateMsg();
            }}
          >
            <div className="h-32 w-32 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#71717a"
                className={`w-2/3 h-2/3 ${msgAni ? "animate-pulse" : ""}`}
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
            </div>
          </button>
          <div className="absolute top-[-12.5%] right-[4%] z-10 rounded-full bg-neutral-50 px-8 py-1 text-3xl font-light text-center text-neutral-500 shadow-sm border-2 border-neutral-400 delay-0 duration-300 scale-100 pointer-events-none opacity-0 group-hover/contact:opacity-100 transition-all group-hover/contact:delay-300 group-hover/contact:duration-300 group-hover/contact:scale-105">
            Contact Me
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
