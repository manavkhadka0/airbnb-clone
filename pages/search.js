import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { signIn, signOut, useSession } from "next-auth/client";
import Banner from "../components/Banner";

function Search({ searchResults }) {
  const router = useRouter();
  const [session, loading] = useSession();

  // es6 destructing
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header
        session={session}
        signIn={signIn}
        signOut={signOut}
        placeholder={` ${location} | ${range} | ${noOfGuests} guests`}
      />
      {session && (
        <>
          <main className="flex">
            <section className="flex-grow pt-14 px-6">
              <p className="text-xs">
                300+ Stays -- {range} -- for {noOfGuests} guests
              </p>
              <h1 className="text-3xl font-semibold mb-6 mt-2">
                Stays in {location}
              </h1>
              <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-600 whitespace-nowrap">
                <p className="button">Cancellation Flexibility</p>
                <p className="button">Type of Place</p>
                <p className="button">Price</p>
                <p className="button">Rooms and Beds</p>
                <p className="button">More Filters</p>
              </div>
              <div className="flex flex-col">
                {searchResults?.map(
                  ({
                    img,
                    location,
                    title,
                    description,
                    star,
                    price,
                    total,
                  }) => (
                    <InfoCard
                      key={img}
                      img={img}
                      location={location}
                      title={title}
                      description={description}
                      star={star}
                      price={price}
                      total={total}
                    />
                  )
                )}
              </div>
            </section>
            <section className="hidden xl:inline-flex xl:min-w-[600px]">
              <Map searchResults={searchResults} />
            </section>
          </main>
        </>
      )}
      {!session && (
        <>
          <Banner
            text={"Create an Account or Log in First"}
            buttonText={"Sign In"}
            signIn={signIn}
            signOut={signOut}
            button={true}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
