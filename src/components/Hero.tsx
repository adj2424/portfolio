export const Hero = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div>pic</div>
        <img src="/public/pfp.jpg" />
        <div className="flex absolute bg-green-600 w-full bottom-[1rem] justify-around">
          <div>SOFTWARE ENGINEER</div>
          <div>SCROLL</div>
          <div>FULL STACK DEVELOPER</div>
        </div>
      </div>
    </>
  );
};
