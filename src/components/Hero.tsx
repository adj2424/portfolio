export const Hero = () => {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center">
        <img className="w-[25rem]" src="/pfp.jpg" />
        <div className="absolute flex">
          <div className="mr-[.5rem]">ALAN JIANG</div>
          <div>ALAN JIANG</div>
        </div>

        <div className="flex absolute bg-green-600 w-[90%] bottom-[4rem] justify-between text-[1.3rem]">
          <div>SOFTWARE ENGINEER</div>
          <div>SCROLL</div>
          <div>FULL STACK DEVELOPER</div>
        </div>
      </div>
    </>
  );
};
