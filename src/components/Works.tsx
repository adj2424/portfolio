import gsap from 'gsap';
import { useMyContext } from '../useMyContext';
import { memo, useRef } from 'react';
import { useGSAP } from '@gsap/react';

interface ItemProps {
  id: string;
  worksNumber: number;
  worksName: string;
  worksTech: string[];
}

const Item = ({ id, worksNumber, worksName, worksTech }: ItemProps) => {
  const container = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();
  const { setOnHover, setOnWorksHover, isMobile } = ctx;
  const { contextSafe } = useGSAP({ scope: container });
  const worksInfo = [
    { site: 'https://nft-minter-polygon.vercel.app/', src: 'nft.png' },
    { site: 'https://algosus.vercel.app/', src: 'algosus.png' },
    { site: 'https://music-profile-three.vercel.app/', src: 'music.png' },
    { site: 'https://github.com/adj2424/video-chat-website', src: 'powow.png' },
    { site: 'https://nyla-thiccums.vercel.app/', src: 'nyla.png' }
  ];
  const remToPixels = (rem: number) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return rem * rootFontSize;
  };
  const handleOnMouseOnWorks = contextSafe((e: string, idx: number) => {
    if (isMobile) return;
    const width = remToPixels(1) + 50;
    gsap.to(e, { x: -width, ease: 'power2.inOut', duration: 0.5 });
    setOnWorksHover(prev => ({ ...prev, worksImgSrc: worksInfo[idx].src }));
  });
  const handleOnMouseLeaveWorks = contextSafe((e: string) => {
    gsap.to(e, { x: 0, ease: 'power2.inOut', duration: 0.5 });
  });
  const handleOnMouseEnterOnText = () => {
    setOnHover(true);
    setOnWorksHover(prev => ({ ...prev, isWorksTitleHover: true }));
  };
  const handleOnMouseLeaveOnText = () => {
    setOnHover(false);
    setOnWorksHover(prev => ({ ...prev, isWorksTitleHover: false }));
  };
  const handleOpenWorksTab = (idx: number) => {
    window.open(worksInfo[idx].site, '_blank');
  };

  return (
    <div
      ref={container}
      className={`grid ${
        isMobile ? 'grid-cols-[.5fr_3.5fr_1.5fr_0fr]' : 'grid-cols-[.5fr_3.5fr_2.5fr_0fr] hover:w-[85%]'
      } w-[91%] h-[160px] items-center transition-all duration-500`}
      onMouseEnter={() => handleOnMouseOnWorks(`#${id}`, worksNumber - 1)}
      onMouseLeave={() => handleOnMouseLeaveWorks(`#${id}`)}
    >
      <div className="ml-[1.8vw] w-full text-md">{`0${worksNumber}/`}</div>
      <div
        style={{ marginLeft: 'clamp(30px, 3vw, 3vw)' }}
        className="text-xl leading-none z-[2]"
        onMouseEnter={handleOnMouseEnterOnText}
        onMouseLeave={handleOnMouseLeaveOnText}
        onClick={() => handleOpenWorksTab(worksNumber - 1)}
      >
        {worksName}
      </div>
      <div
        id={id}
        className="flex flex-col h-[100%] justify-center mr-[2vw] leading-snug bg-dark text-right z-[1] text-sm"
      >
        {worksTech.map((tech, idx) => (
          <div key={idx}>{tech}</div>
        ))}
      </div>
      <div
        className="absolute flex justify-center items-center right-[6.5%] w-[6rem] h-[6rem] fill-accent"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={() => handleOpenWorksTab(worksNumber - 1)}
      >
        <svg viewBox="0 0 32 32">
          <g>
            <polygon points="10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6"></polygon>
          </g>
        </svg>
      </div>
    </div>
  );
};

export const Works = memo(() => {
  //console.log('Works rendered');
  const { isMobile } = useMyContext();
  return (
    <>
      <div id="works" className="flex flex-col items-center w-full text-light">
        <div className="w-[91%] h-[2px] bg-light opacity-25" />
        <Item id="nft-id" worksNumber={1} worksName="NFT MINTER" worksTech={['Web3', 'Blockchain', 'Solidity']} />
        <div className="w-[91%] h-[2px] bg-light opacity-25" />
        <Item
          id="algosus-id"
          worksNumber={2}
          worksName="AI TRADING BOT"
          worksTech={
            isMobile
              ? ['Alpaca', 'API', 'ChatGPT', 'GCP', 'TypeScript']
              : ['Alpaca', 'API', 'ChatGPT', 'Google Cloud Platform', 'TypeScript']
          }
        />
        <div className="w-[91%] h-[2px] bg-light opacity-25" />
        <Item
          id="music-id"
          worksNumber={3}
          worksName="MUSIC PORTFOLIO"
          worksTech={['Three.js', 'GSAP', 'TypeScript']}
        />
        <div className="w-[91%] h-[2px] bg-light opacity-25" />
        <Item
          id="powow-id"
          worksNumber={4}
          worksName="POWOW"
          worksTech={
            isMobile
              ? ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS']
              : ['MongoDB', 'Express.js', 'React', 'Node.js', 'Amazon Web Services']
          }
        />
        <div className="w-[91%] h-[2px] bg-light opacity-25" />
        <Item
          id="nyla-id"
          worksNumber={5}
          worksName="NYLA"
          worksTech={['React Three Fiber', 'Tailwind CSS', 'GSAP', 'TypeScript']}
        />
        <div className="w-[91%] h-[2px] bg-light opacity-25 mb-[3rem]" />
      </div>
    </>
  );
});
