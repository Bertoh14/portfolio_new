import React from "react";

const ClickSfx = "/assets/click.mp3";
const BackSfx = "/assets/back.mp3";
const EnterSfx = "/assets/enter.mp3";

// Define the type for `ChannelState`
interface ChannelState {
  active: boolean;
  complete: boolean;
  channelNum: number | null;
  channelBg?: string;
  isVideo?: boolean;
  channelLink: string | null;
  channelText?: string; // New property for channel-specific text
}

// Define the props type
interface ChannelViewerProps {
  channelState: ChannelState; // State object for the channel
  changeChannel: (next: boolean) => void; // Function to change channels
  resetChannel: () => void; // Function to reset the channel
}

const ChannelViewer: React.FC<ChannelViewerProps> = ({
  channelState,
  changeChannel,
  resetChannel,
}) => (
  <div
    className={`${
      !channelState.active
        ? "absolute top-0 left-0 opacity-0 -z-20"
        : "absolute top-0 left-0 z-0 h-screen w-screen bg-neutral-950 transition-all ease-in-out delay-300 opacity-100 duration-300"
    }`}
  >
    <div className="flex items-center justify-center h-full">
    <div
  className={`m-auto rounded-lg bg-zinc-200 h-[90%] w-5/6 text-3xl items-center justify-center ${
    !channelState.active
      ? "opacity-0 transition-all ease-in-out duration-200"
      : "opacity-100 transition-all delay-700 ease-in-out duration-500"
  }`}
  style={{ borderRadius: "8rem" }}
>
  <div className="flex flex-row h-3/4 w-full">
    {/* Video Section */}
    <div
      key={channelState.channelNum}
      className="h-full w-2/3 flex bg-gray-800 transition-all ease-in delay-100 duration-300 relative rounded-tl-[8rem] rounded-tr-[8rem]"
    >
      {channelState.isVideo ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: "inset(0 round 8rem 8rem 0 0)", // Remove rounding for bottom-left
        }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
          >
            <source src={channelState.channelBg} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover"
          style={{
            backgroundImage: `url(${channelState.channelBg})`,
            clipPath: "inset(0 round 8rem 8rem 0 0)", // Ensure consistency for static image
          }}
        ></div>
      )}
    </div>

  {/* Text Section */}
  <div className="h-full w-1/3 flex flex-col justify-start items-center p-6 text-neutral-800">
    <h1 className="text-4xl font-bold mb-4">Channel {channelState.channelNum}</h1>
    <p className="text-xl text-center leading-relaxed text-justify"> &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{channelState.channelText}</p>
  </div>

          {/* Right Arrow */}
          <div
            className="size-12 absolute top-[50%] right-4 z-10 animate-pulse"
            onClick={() => {
              const audio = new Audio(ClickSfx);
              audio.play();
              changeChannel(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              style={{ fill: "#38bdf8" }}
            >
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
          </div>
          {/* Left Arrow */}
          <div
            className="size-12 absolute top-[50%] left-4 z-10 animate-pulse"
            onClick={() => {
              const audio = new Audio(ClickSfx);
              audio.play();
              changeChannel(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              style={{ fill: "#38bdf8", transform: "rotate(180deg)" }}
            >
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
          </div>
        </div>

        {/* Bottom Controls */}
        <div
          className="h-1/4 w-full flex space-x-20 items-center justify-center bg-stone-300 border-t-4 border-neutral-500"
          style={{
            borderRadius: "0 0 8rem 8rem",
          }}
        >
          <button
            type="button"
            className="rounded-full bg-gradient-to-b from-zinc-100 to-zinc-200 bg-zinc-200 ring-2 ring-inset ring-zinc-300 border-4 border-cyan-400 w-1/4 h-1/2 text-5xl text-neutral-600 hover:z-30 transform hover:scale-110 transition duration-200 ease-in-out"
            onClick={() => {
              const audio = new Audio(BackSfx);
              audio.play();
              resetChannel();
            }}
          >
            Menu
          </button>
          <button
            type="button"
            className={`${
              channelState.complete
                ? "rounded-full bg-gradient-to-b from-zinc-100 to-zinc-200 bg-zinc-200 ring-2 ring-inset ring-zinc-300 border-4 border-cyan-400 w-1/4 h-1/2 text-5xl text-neutral-600 hover:z-30 transform hover:scale-110 transition duration-200 ease-in-out"
                : "rounded-full bg-gradient-to-b from-zinc-100 to-zinc-200 bg-zinc-200 ring-2 ring-inset ring-zinc-300 border-4 border-neutral-400 w-1/4 h-1/2 text-5xl text-neutral-400 opacity-50 pointer-events-none"
            }`}
          >
            <a
              href={channelState.channelLink || '#'}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                const audio = new Audio(EnterSfx);
                audio.play();
              }}
            >
              Start
            </a>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ChannelViewer;
