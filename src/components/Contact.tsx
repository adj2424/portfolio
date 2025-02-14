export const Contact = () => {
  return (
    <>
      <div className="relative w-full h-screen bg-light text-dark">
        <div className="flex text-[12rem] h-[90vh] items-center text-center bg-blue-100 leading-[15rem]">
          INTERESTED IN WORKING?
        </div>
        <div className="flex justify-center">
          <div className="absolute bottom-[1rem] bg-green-100 w-[90vw] text-[1.3rem] leading-[1.8rem]">
            <div className="flex justify-between">
              <div className="w-[30rem]">ALAN JIANG</div>
              <div className="flex justify-center w-[30rem]">ADJ2424@GMAIL.COM</div>
              <div className="flex justify-end w-[30rem]">DESIGNED & CODED BY ME</div>
            </div>
            <div className="flex justify-between">
              <div className="w-[30rem]">SOFTWARE ENGINEER</div>
              <div className="flex justify-around w-[30rem]">
                <div>LINKEDIN</div>
                <div>INSTAGRAM</div>
                <div>GITHUB</div>
              </div>
              <div className="flex justify-end w-[30rem]">© ALAN JIANG 2023</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
