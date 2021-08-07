import Image from "next/image";

function Banner({ text, button, buttonText, signIn }) {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] ">
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">
          {text || `Not sure where to go? Perfect.`}
        </p>
        {!button && (
          <button className="text-purple-500  bg-white px-10 py-4 shadow-md rounded-full my-3 hover:shadow-xl active:scale-90 transition duration-150">
            I'm Flexible
          </button>
        )}
        {button && (
          <button
            onClick={signIn}
            className="text-purple-500  bg-white px-10 py-4 shadow-md rounded-full my-3 hover:shadow-xl active:scale-90 transition duration-150"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default Banner;
