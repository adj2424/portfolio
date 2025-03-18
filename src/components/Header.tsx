interface HeaderProps {
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setHover }: HeaderProps) => {
  return (
    <>
      <div className="fixed flex w-screen justify-center text-[1.3rem] z-[3] mt-[1.5rem] mix-blend-difference">
        <div className="flex w-[90%] justify-between align-baseline">
          <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            ALAN JIANG
          </div>
          <div className="flex">
            <div className="mr-[3rem]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              WORKS
            </div>
            <div className="mr-[3rem]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              TECHNOLOGIES
            </div>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              CONTACT
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
