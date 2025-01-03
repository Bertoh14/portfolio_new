'use client'

import React, { useState, useEffect } from "react";

// Import components
import ChannelGrid from "./components/ChannelGrid";
import ChannelViewer from "./components/ChannelViewer";
import ContactModal from "./components/ContactModal";
import AboutModal from "./components/AboutModal";
import NavigationArrow from "./components/NavigationArrow";
import Footer from "./components/Footer";
import Mobile from "./components/Mobile";
import WelcomeScreen from "./components/Welcome";

// ChannelBg Videos
const Video1 = "/assets/Lil_Fishsticks.mp4";
const Video2 = "/assets/Trojan_Course.mp4";
const Video3 = "/assets/Forest_Foodies.mp4";
const Video4 = "/assets/Sashimi.mp4";
const Video5 = "/assets/QuadTask.mp4"

// ChannelBg Components
import Disc from "./components/ChannelBgs/Disc";
import Fish from "./components/ChannelBgs/Fish";
import Horse from "./components/ChannelBgs/Horse";
import Frog from "./components/ChannelBgs/Frog";
import RainbowFish from "./components/ChannelBgs/RainbowFish";

// Define the type for a single channel
type Channel = {
  title: string;
  complete: boolean;
  component?:  React.ComponentType<Record<string, never>>;
  link?: string;
  channelBg?: string;
  isVideo?: boolean;
  channelName: string;
  channelText: string;
  channelRoles: string;
};

// Define the channels object type
type Channels = {
  [key: number]: Channel;
};

const webChannels: Channels = {
  1: {
    title: "Lil Fishsticks",
    complete: true,
    link: "https://youtu.be/us2F17We7Ek",
    channelBg: Video1,
    isVideo: true,
    component: Fish,
    channelName: "Lil Fishsticks",
    channelText: "What happens when you flush your presumed dead pet fish down the toilet? Of course he'll grow legs from the toxic waste and platform his way back home! Help guide Freddie through the sewer system to solve puzzles, avoid enemies, and find the exit! There are many different ecosystems that Freddie will have to navigate his way through. Will you be able to return him to his owner?",
    channelRoles: "Game Designer, Game Developer, Level Designer, Sound Designer"
  },
  2: {
    title: "The Trojan Course",
    complete: true,
    link: "https://youtu.be/--M5cR13mKU",
    channelBg: Video2,
    isVideo: true,
    component: Horse,
    channelName: "The Trojan Course",
    channelText: "In The Trojan Course, create different-shaped Trojan Horses to withstand the obstacle course ahead of you! With our course preview system, create an optimized horse that'll survive to reach the Gates of Troy! With dozens of different courses, and many different customizable blocks, will you be able to sneak your way behind enemy lines?",
    channelRoles: "Game Designer, Game Developer, Level Designer, Sound Designer",
  },
  3: {
    title: "Forest Foodies",
    complete: true,
    link: "https://geekguy100.itch.io/forest-foodies",
    channelBg: Video3,
    isVideo: true,
    component: Frog,
    channelName: "Forest Foodies",
    channelText: "My team created Forest Foodies for the GMTK Game Jam 2024. As the theme of this game jam was 'Built To Scale', we created a game with a scaling micromanagement system. Control these cute forest animals to gather resources, buy new animals, and complete your dish. Just make sure to finish before night falls! Enjoy playing our game by clicking the 'Start' Button below!",
    channelRoles: "Game Designer, SFX Designer",
  },
  4: {
    title: "Sashimi",
    complete: false,
    channelBg: Video4,
    isVideo: true,
    component: RainbowFish,
    channelName: "Sashimi",
    channelText: "Sashimi is a school project designed as a puzzle-platformer for children. Our school program partnered with a local middle school to collaborate with middle school students. We were able to tailor the gameplay mechanics, artstlye, and sound designs to the children's preferences. Help this Rainbow Fish migrate to the ocean, while obtaining body-altering power-ups along the way!",
    channelRoles: "Game Designer, Level Designer, Art Designer",
  },
  5: {
    title: "QuadTask",
    complete: false,
    channelBg: Video5,
    isVideo: true,
    component: Disc,
    channelName: "QuadTask",
    channelText: "This is one of the first games I've created! For my final project for a computing class, I created a multi-tasking game called QuadTask using p5.js. The goal of the game is to survive as long as you can in all 4 quadrants of the screen. Each quadrant has its own controls (space, left/right, up/down, click). Once you die in even one section, the game is over!",
    channelRoles: "Game Designer, Game Developer, Art Designer",
  },
};

type ChannelState = {
  active: boolean;
  complete: boolean;
  channelNum: number | null;
  channelComponent:  React.ComponentType<Record<string, never>> | null;
  channelLink: string | null; 
  channelBg?: string;
  isVideo?: boolean;
  channelName: string | null;
  channelText: string | null; // New property for channel-specific text
  channelRoles: string | null;
};


function Home() {
  const [page, setPage] = useState<number>(0);
  const [arrow, setArrow] = useState<boolean>(false);
  const [channelState, setChannelState] = useState<ChannelState>({
    active: false,
    complete: false,
    channelNum: null,
    channelComponent: null,
    channelLink: null,
    channelName: null,
    channelText: null,
    channelRoles: null,
  });
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [mainContentVisible, setMainContentVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!showWelcome) {
      setMainContentVisible(true);
    }
  }, [showWelcome]);

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
    setArrow(!arrow);
  };

  const viewChannel = (channelNum: number) => {
    setChannelState((prevState) => ({
      active: !prevState.active,
      channelNum,
      complete: webChannels[channelNum].complete,
      channelComponent: webChannels[channelNum].component || null,
      channelLink: webChannels[channelNum].link || null,
      channelBg: webChannels[channelNum].channelBg,
      isVideo: webChannels[channelNum].isVideo,
      channelName: webChannels[channelNum].channelName || null,
      channelText: webChannels[channelNum].channelText || null,
      channelRoles: webChannels[channelNum].channelRoles || null,
    }));
  };

  const changeChannel = (next: boolean = true) => {
    const channelNumbers = Object.keys(webChannels)
      .map(Number)
      .sort((a, b) => a - b);
    const currentIndex = channelNumbers.indexOf(channelState.channelNum!);
    let nextIndex = next ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= channelNumbers.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = channelNumbers.length - 1;
    }
    const nextChannelNum = channelNumbers[nextIndex];
    setChannelState({
      ...channelState,
      channelNum: nextChannelNum,
      complete: webChannels[nextChannelNum].complete,
      channelComponent: webChannels[nextChannelNum].component || null,
      channelLink: webChannels[nextChannelNum].link || null,
      channelBg: webChannels[nextChannelNum].channelBg,
      isVideo: webChannels[nextChannelNum].isVideo,
      channelName: webChannels[nextChannelNum].channelName,
      channelText: webChannels[nextChannelNum].channelText,
      channelRoles: webChannels[nextChannelNum].channelRoles,
    });
  };

  useEffect(() => {
    console.log("Current channel state: ", channelState);
  }, [channelState]);

  const resetChannel = () => {
    setChannelState({
      active: false,
      complete: false,
      channelNum: null,
      channelComponent: null,
      channelLink: null,
      channelName: null,
      channelText: null,
      channelRoles: null,
    });
  };

  const closeContact = () => {
    setOpenContact(false);
  };

  const closeAbout = () => {
    setOpenAbout(false);
  };

  return (
    <div>
      <Mobile />
      {showWelcome ? (
        <WelcomeScreen onContinue={() => setShowWelcome(false)} 
        logoSrc='/assets/me.png'
        />
      ) : (
        <div
          className={`transition-opacity duration-100 ${
            mainContentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`h-screen overflow-hidden ${
              !channelState.active && !openContact && !openAbout
                ? "transition-all ease-in-out opacity-100 duration-500 z-0 scale-100"
                : "transition-all ease-in-out delay-100 opacity-0 duration-300 -z-20 scale-150"
            }`}
          >
            <div className="flex place-items-center relative h-4/5 w-10/12 m-auto">
              <div
                className={`absolute ${
                  !page
                    ? "transition-all duration-1000 left-[0%] w-[100%] z-0"
                    : "transition-all duration-1000 left-[-100%] w-[100%] -z-10"
                }`}
              >
                <ChannelGrid
                  channels={webChannels}
                  channelLength={Object.keys(webChannels).length}
                  viewChannel={viewChannel}
                />
              </div>
              <div
                className={`absolute ${
                  page === 0
                    ? "transition-all duration-1000 right-[-100%] w-[100%] -z-10"
                    : "transition-all duration-1000 right-[0%] w-[100%] z-0"
                }`}
              >
                <ChannelGrid channels={{}} viewChannel={() => {}} />
              </div>
              <NavigationArrow
                direction="right"
                onClick={() => goToPage(1)}
                hidden={arrow}
              />
              <NavigationArrow
                direction="left"
                onClick={() => goToPage(0)}
                hidden={!arrow}
              />
            </div>
            <Footer openContact={setOpenContact} openAbout={setOpenAbout} />
          </div>
          <ChannelViewer
            channelState={channelState}
            changeChannel={changeChannel}
            resetChannel={resetChannel}
          />
          <ContactModal openContact={openContact} closeContact={closeContact} />
          <AboutModal openAbout={openAbout} closeAbout={closeAbout} />
          <div
            className={`${
              !channelState.active
                ? "crt opacity-100 transition-all ease-in-out duration-500"
                : "opacity-0 transition-all ease-in-out duration-500"
            }`}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Home;
