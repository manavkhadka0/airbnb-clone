import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  UserCircleIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useState, Fragment, useRef } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import { Dialog, Transition } from "@headlessui/react";

function Header({ placeholder, session, signIn, signOut }) {
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  return (
    <header className="sticky  top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-start h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Middle */}
      {session && (
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-md">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="pl-5 bg-transparent outline-none flex-grow"
            placeholder={placeholder || "Start your Search"}
            onClick={(e) => setOpen(true)}
            name=""
            id=""
          />
        </div>
      )}

      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden lg:inline button">Become a Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="hidden md:inline-flex  items-center space-x-2 border-2 p-2  button">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
        {!session && (
          <>
            <button className="button " onClick={signIn}>
              Sign In
            </button>
          </>
        )}
        {session && (
          <>
            <button className="button" onClick={signOut}>
              Sign out
            </button>
          </>
        )}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 "
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75  transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg  text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white w-max px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Search for Places
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex items-center mb-2 md:border-2 rounded-full py-2 md:shadow-md">
                          <input
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text"
                            className="pl-5 min-w-[500px] bg-transparent outline-none flex-grow"
                            placeholder={placeholder || "Start your Search"}
                            onClick={(e) => setOpen(true)}
                            name=""
                            id=""
                          />
                          {searchInput && (
                            <div className="flex items-center ">
                              <XIcon
                                onClick={resetInput}
                                className="hidden lg:inline-flex h-8 bg-red-400 cursor-pointer rounded-full p-2 text-white hover:text-red-400 hover:bg-white transition duration-200 hover:border-2"
                              />
                              <SearchIcon
                                onClick={search}
                                className="hidden  lg:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 hover:text-red-400 hover:bg-white transition duration-200 hover:border-2"
                              />
                            </div>
                          )}
                        </div>
                        {searchInput && (
                          <div className="flex flex-col col-span-3 mx-auto">
                            <DateRangePicker
                              ranges={[selectionRange]}
                              minDate={new Date()}
                              rangeColors={["#fd5b61"]}
                              onChange={handleSelect}
                            />
                            <div className="flex items-center border-b mb-4">
                              <h2 className="text-2xl flex-grow ">
                                Number of Guests
                              </h2>
                              <UsersIcon className="h-5" />
                              <input
                                value={noOfGuests}
                                onChange={(e) => setNoOfGuests(e.target.value)}
                                type="number"
                                min={1}
                                className="w-12 pl-2 text-lg border text-red-400"
                              />
                            </div>
                            <div className="flex">
                              <button
                                onClick={resetInput}
                                className="flex-grow text-gray-500"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={search}
                                className="flex-grow text-red-400"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
}

export default Header;
