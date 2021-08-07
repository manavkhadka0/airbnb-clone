import Image from "next/image";

function MediumCard({ img, title }) {
  return (
    <div className="cursor-pointer ">
      <div className="relative card-zoom h-80 w-80">
        <Image
          src={img}
          layout="fill"
          className="rounded-xl card-zoom-image "
        />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
}

export default MediumCard;
