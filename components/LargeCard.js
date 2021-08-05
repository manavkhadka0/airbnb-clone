import Image from "next/image";

function LargeCard({ img, title, description, buttonText }) {
  return (
    <section className="py-16 relative cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image src={img} layout="fill" object="cover" className="rounded-2xl" />
      </div>

      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64 text-black">{title}</h3>
        <p className="text-black">{description}</p>
        <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default LargeCard;
