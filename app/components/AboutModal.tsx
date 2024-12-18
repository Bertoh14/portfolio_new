import React from "react";

const selfImage = "../assets/Profile.jpg";
const BackSfx = "/assets/back.mp3";

// Define the type for props
interface AboutModalProps {
  openAbout: boolean; // Indicates if the modal is open
  closeAbout: () => void; // Function to close the modal
}

const AboutModal: React.FC<AboutModalProps> = ({ openAbout, closeAbout }) => (
  <div
    className={`${
      !openAbout
        ? "fixed top-0 left-0 opacity-0 -z-20"
        : "fixed top-0 left-0 z-0 h-screen w-screen bg-neutral-900 transition-all ease-in-out delay-300 opacity-100 duration-300"
    }`}
  >
    <div className="flex justify-center h-4/5">
      <div
        className={`scrollbar text-neutral-200 my-auto text-3xl container h-4/5 overflow-y-auto ${
          !openAbout
            ? "opacity-0 transition-all ease-in-out duration-200"
            : "opacity-100 transition-all delay-700 ease-in-out duration-500"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/2 w-full p-4">
            <img
              src={selfImage}
              alt="Robert Oh"
              className="w-3/4 lg:w-2/3 mx-auto h-auto object-cover rounded-md shadow-lg"
            />
            {/* <img
              src={selfImage}
              alt="Robert Oh"
              className="w-3/4 lg:w-2/3 mx-auto h-auto object-cover rounded-md shadow-lg"
            /> */}
          </div>
          <div className="lg:w-1/2 w-full p-4">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            {/* Change Text here */}
            <p>Hello! I&apos;m Nathaniel Yu, a data scientist with a strong foundation in business and web development. I hold a B.S. in Business Administration from USC and an M.S. in Information Management from National Taiwan University of Science and Technology. My journey in data science has involved developing advanced machine learning models and implementing innovative data processing techniques. I also work as a freelance web developer, helping clients enhance their online presence with modern web technologies. Let&apos;s connect and explore how we can collaborate on exciting projects!
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      className={`fixed overflow-hidden bottom-0 inset-x-0 h-1/5 transition-all ease-in-out ${
        !openAbout
          ? "opacity-0 transition-all ease-in-out duration-200"
          : "opacity-100 transition-all delay-700 ease-in-out duration-500"
      }`}
    >
      <div className="grid grid-cols-4 items-stretch h-full">
        <div className="col-start-1 col-end-2 flex items-center justify-start">
          <button
            type="button"
            className="relative left-[25%] rounded-full bg-gradient-to-r from-zinc-200 to-zinc-300 bg-zinc-300 ring-2 ring-inset ring-neutral-400 shadow-lg size-1/2 w-2/3 text-5xl hover:scale-110 transition-all ease-in-out duration-300"
            aria-hidden="true"
            onClick={() => {
              const audio = new Audio(BackSfx);
              audio.play();
              closeAbout();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AboutModal;
