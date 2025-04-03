import gsap from 'gsap';
import { useMyContext } from './Context';

export const Works = () => {
  const ctx = useMyContext();
  const { setOnHover, setOnWorksHover } = ctx;
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
  const handleOnMouseOnWorks = (e: string, idx: number) => {
    const width = remToPixels(1) + 50;
    gsap.to(e, { x: -width, ease: 'power2.inOut', duration: 0.5 });
    setOnWorksHover(prev => ({ ...prev, worksImgSrc: worksInfo[idx].src }));
  };
  const handleOnMouseLeaveWorks = (e: string) => {
    gsap.to(e, { x: 0, ease: 'power2.inOut', duration: 0.5 });
  };
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

  const item = (id: string, worksNumber: number, worksName: string, worksTech: string[]) => {
    return (
      <div
        className="grid grid-cols-[.75fr_3.5fr_2.5fr_0fr] w-[90%] h-[160px] hover:w-[85%] items-center transition-all duration-500"
        onMouseEnter={() => handleOnMouseOnWorks(`#${id}`, worksNumber - 1)}
        onMouseLeave={() => handleOnMouseLeaveWorks(`#${id}`)}
      >
        <div className="ml-[2vw] text-md">{`0${worksNumber}/`}</div>
        <div
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
          className="absolute right-[6.5%] w-[6rem] h-[6rem] fill-accent"
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

  return (
    <>
      <div id="works" className="flex flex-col items-center w-full text-light">
        <div className="w-[90%] h-[2px] bg-light opacity-25" />
        {item('nft-id', 1, 'NFT MINTER', ['Web3', 'Blockchain', 'Solidity'])}
        <div className="w-[90%] h-[2px] bg-light opacity-25" />
        {item('algosus-id', 2, 'AI TRADING BOT', ['Alpaca', 'API', 'ChatGPT', 'Google Cloud Platform', 'TypeScript'])}
        <div className="w-[90%] h-[2px] bg-light opacity-25" />
        {item('music-id', 3, 'MUSIC PORTFOLIO', ['Three.js', 'GSAP', 'TypeScript'])}
        <div className="w-[90%] h-[2px] bg-light opacity-25" />
        {item('powow-id', 4, 'POWOW', ['MongoDB', 'Express.js', 'React', 'Node.js', 'Amazon Web Services'])}
        <div className="w-[90%] h-[2px] bg-light opacity-25" />
        {item('nyla-id', 5, 'NYLA', ['React Three Fiber', 'Tailwind CSS', 'GSAP', 'TypeScript'])}
        <div className="w-[90%] h-[2px] bg-light opacity-25 mb-[3rem]" />
      </div>
    </>
  );
};
