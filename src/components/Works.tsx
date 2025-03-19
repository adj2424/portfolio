interface WorksProps {
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  setOnWorksHover: React.Dispatch<React.SetStateAction<{ isWorksTitleHover: boolean; worksImgSrc: string }>>;
}

export const Works = ({ setHover, setOnWorksHover }: WorksProps) => {
  const worksInfo = [
    { site: 'https://nft-minter-polygon.vercel.app/', src: 'nft.png' },
    { site: 'https://algosus.vercel.app/', src: 'algosus.png' },
    { site: 'https://music-profile-three.vercel.app/', src: 'music.png' },
    { site: 'https://github.com/adj2424/video-chat-website', src: 'powow.png' },
    { site: 'https://nyla-thiccums.vercel.app/', src: 'nyla.png' }
  ];

  const handleOnMouseEnterOnText = () => {
    setHover(true);
    setOnWorksHover(prev => ({ ...prev, isWorksTitleHover: true }));
  };
  const handleOnMouseLeaveOnText = () => {
    setHover(false);
    setOnWorksHover(prev => ({ ...prev, isWorksTitleHover: false }));
  };
  const handleOpenWorksTab = (idx: number) => {
    window.open(worksInfo[idx].site, '_blank');
  };

  return (
    <>
      <div className="flex flex-col items-center w-full text-light ">
        <div className="w-[90%] h-[2px] bg-light opacity-25"></div>
        <div
          className="grid grid-cols-[.75fr_3.5fr_2.5fr_0fr] w-[90%] h-[10rem] items-center hover:grid-cols-[.75fr_3fr_2fr_.3fr] hover:w-[86.5%] transition-all duration-500"
          onMouseEnter={() => setOnWorksHover(prev => ({ ...prev, worksImgSrc: worksInfo[0].src }))}
        >
          <div className="ml-[2vw]">01/</div>
          <div
            className="text-[5rem] leading-none"
            onMouseEnter={handleOnMouseEnterOnText}
            onMouseLeave={handleOnMouseLeaveOnText}
            onClick={() => handleOpenWorksTab(0)}
          >
            NFT MINTER
          </div>
          <div className="flex flex-col h-[100%] justify-center mr-[2vw] leading-snug bg-dark text-right z-[1]">
            <div>Web3</div>
            <div>Blockchain</div>
            <div>Solidity</div>
          </div>
          <div
            className="absolute right-[6.5%] w-[6rem] h-[6rem] fill-accent"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleOpenWorksTab(0)}
          >
            <svg viewBox="0 0 32 32">
              <g>
                <polygon points="10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6"></polygon>
              </g>
            </svg>
          </div>
        </div>
        <div className="w-[90%] h-[2px] bg-light opacity-25"></div>
        <div
          className="grid grid-cols-[.75fr_3.5fr_2.5fr_0fr] w-[90%] h-[10rem] items-center hover:grid-cols-[.75fr_3fr_2fr_.3fr] hover:w-[86.5%] transition-all duration-500"
          onMouseEnter={() => setOnWorksHover(prev => ({ ...prev, worksImgSrc: worksInfo[1].src }))}
        >
          <div className="ml-[2vw]">02/</div>
          <div
            className="text-[5rem] leading-none"
            onMouseEnter={handleOnMouseEnterOnText}
            onMouseLeave={handleOnMouseLeaveOnText}
            onClick={() => handleOpenWorksTab(1)}
          >
            AI TRADING BOT
          </div>
          <div className="flex flex-col h-[100%] justify-center mr-[2vw] leading-snug bg-dark text-right z-[1]">
            <div>Alpaca</div>
            <div>API</div>
            <div>ChatGPT</div>
            <div>Google Cloud Platform</div>
            <div>TypeScript</div>
          </div>
          <div
            className="absolute right-[6.5%] w-[6rem] h-[6rem] fill-accent"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleOpenWorksTab(1)}
          >
            <svg viewBox="0 0 32 32">
              <g>
                <polygon points="10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6"></polygon>
              </g>
            </svg>
          </div>
        </div>
        <div className="w-[90%] h-[2px] bg-light opacity-25"></div>
        <div
          className="grid grid-cols-[.75fr_3.5fr_2.5fr_0fr] w-[90%] h-[10rem] items-center hover:grid-cols-[.75fr_3fr_2fr_.3fr] hover:w-[86.5%] transition-all duration-500"
          onMouseEnter={() => setOnWorksHover(prev => ({ ...prev, worksImgSrc: worksInfo[2].src }))}
        >
          <div className="ml-[2vw]">03/</div>
          <div
            className="text-[5rem] leading-none"
            onMouseEnter={handleOnMouseEnterOnText}
            onMouseLeave={handleOnMouseLeaveOnText}
            onClick={() => handleOpenWorksTab(2)}
          >
            MUSIC PORTFOLIO
          </div>
          <div className="flex flex-col h-[100%] justify-center mr-[2vw] leading-snug bg-dark text-right z-[1]">
            <div>Three.js</div>
            <div>GSAP</div>
            <div>TypeScript</div>
          </div>
          <div
            className="absolute right-[6.5%] w-[6rem] h-[6rem] fill-accent"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleOpenWorksTab(2)}
          >
            <svg viewBox="0 0 32 32">
              <g>
                <polygon points="10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6"></polygon>
              </g>
            </svg>
          </div>
        </div>
        <div className="w-[90%] h-[2px] bg-light opacity-25"></div>
        <div
          className="grid grid-cols-[.75fr_3.5fr_2.5fr_0fr] w-[90%] h-[10rem] items-center hover:grid-cols-[.75fr_3fr_2fr_.3fr] hover:w-[86.5%] transition-all duration-500"
          onMouseEnter={() => setOnWorksHover(prev => ({ ...prev, worksImgSrc: worksInfo[3].src }))}
        >
          <div className="ml-[2vw]">04/</div>
          <div
            className="text-[5rem] leading-none"
            onMouseEnter={handleOnMouseEnterOnText}
            onMouseLeave={handleOnMouseLeaveOnText}
            onClick={() => handleOpenWorksTab(3)}
          >
            POWOW
          </div>
          <div className="flex flex-col h-[100%] justify-center mr-[2vw] leading-snug bg-dark text-right z-[1]">
            <div>MongoDB</div>
            <div>Express.js</div>
            <div>React</div>
            <div>Node.js</div>
            <div>Amazon Web Services</div>
          </div>
          <div
            className="absolute right-[6.5%] w-[6rem] h-[6rem] fill-accent"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleOpenWorksTab(3)}
          >
            <svg viewBox="0 0 32 32">
              <g>
                <polygon points="10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6"></polygon>
              </g>
            </svg>
          </div>
        </div>
        <div className="w-[90%] h-[2px] bg-light opacity-25"></div>
        <div
          className="grid grid-cols-[.75fr_3.5fr_2.5fr_0fr] w-[90%] h-[10rem] items-center hover:grid-cols-[.75fr_3fr_2fr_.3fr] hover:w-[86.5%] transition-all duration-500"
          onMouseEnter={() => setOnWorksHover(prev => ({ ...prev, worksImgSrc: worksInfo[4].src }))}
        >
          <div className="ml-[2vw]">05/</div>
          <div
            className="text-[5rem] leading-none"
            onMouseEnter={handleOnMouseEnterOnText}
            onMouseLeave={handleOnMouseLeaveOnText}
            onClick={() => handleOpenWorksTab(4)}
          >
            NYLA
          </div>
          <div className="flex flex-col h-[100%] justify-center mr-[2vw] leading-snug bg-dark text-right z-[1]">
            <div>React Three Fiber</div>
            <div>Tailwind CSS</div>
            <div>GSAP</div>
            <div>TypeScript</div>
          </div>
          <div
            className="absolute right-[6.5%] w-[6rem] h-[6rem] fill-accent"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleOpenWorksTab(4)}
          >
            <svg viewBox="0 0 32 32">
              <g>
                <polygon points="10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6"></polygon>
              </g>
            </svg>
          </div>
        </div>
        <div className="w-[90%] h-[2px] bg-light opacity-25 mb-[15rem]"></div>
      </div>
    </>
  );
};
