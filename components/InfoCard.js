import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon, HeartIcon as Heart } from "@heroicons/react/solid";
import { useState } from "react";

function InfoCard({ img, location, title, description, star, price, total }) {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="flex py-7 px-4 border-b-2 cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t-2">
      <div className="card-zoom ">
        <Image
          src={img}
          className="rounded-2xl card-zoom-image"
          layout="fill"
        />
        <h1 className="card-zoom-text ">{price}</h1>
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          {toggle ? (
            <HeartIcon
              onClick={(e) => setToggle(!toggle)}
              className="h-7 cursor-pointer hover:scale-150 active:scale-20 transition transform duration-500"
            />
          ) : (
            <Heart
              onClick={(e) => setToggle(!toggle)}
              className="h-7 cursor-pointer text-red-400 hover:scale-150 active:scale-20 transition transform duration-500"
            />
          )}
        </div>
        <h4 className="text-xl font-bold">{title}</h4>
        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>

          <div className="">
            <p className="text-lg font-semibold pb-2 lg:text-2xl">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
