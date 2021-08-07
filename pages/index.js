import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";
import Footer from "../components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home({ exploreData, cardsData }) {
  const [session, loading] = useSession();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <Head>
        <title>Chilli Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header session={session} signIn={signIn} signOut={signOut} />
      {/* Banner */}

      {!session && (
        <Banner
          signIn={signIn}
          text={"Not Signed in"}
          button={true}
          buttonText={"Sign In"}
        />
      )}
      {session && (
        <>
          <Banner
            text={`Signed in as ${session.user.email} ${session.user.name}`}
          />
          <main className="max-w-7xl mx-auto px-8 sm:px-16 bg-black text-white">
            <section className="pt-6">
              <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
              {/* Pull data from a server - API */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {exploreData?.map(({ img, distance, location }) => (
                  <SmallCard
                    key={img}
                    img={img}
                    distance={distance}
                    location={location}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

              <div className="">
                <Slider {...settings2}>
                  {cardsData?.map(({ img, title }) => (
                    <div className="">
                      <MediumCard key={img} img={img} title={title} />
                    </div>
                  ))}
                </Slider>
              </div>
            </section>
            <Slider {...settings}>
              <div className="">
                <LargeCard
                  img="https://links.papareact.com/4cj"
                  title="The Greatest Outdoors"
                  description="Wishlists curated by Airbnb"
                  buttonText="Get Inspired"
                />
              </div>
              <div className="">
                <LargeCard
                  img="https://links.papareact.com/0fm"
                  title="The Greatest Outdoors"
                  description="Wishlists curated by Airbnb"
                  buttonText="Get Inspired"
                />
              </div>
              <div className="">
                <LargeCard
                  img="https://links.papareact.com/4cj"
                  title="The Greatest Outdoors"
                  description="Wishlists curated by Airbnb"
                  buttonText="Get Inspired"
                />
              </div>
            </Slider>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );
  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
