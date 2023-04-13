import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import { challenge } from "@/types/challengeTemp"
import DisplayChallenges from "./components/DisplayChallenges"
import FooterNavbar from "./components/FooterNavbar"
function Challenges() {
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedFor, setSelectedFor] = useState("")
  const [challenges, setChallenges] = useState<challenge[]>([])
  const challenge = {
    title: "",
    description: "",
    level: "",
    location: "",
    date: "",
    time: "",
    showFor: "",
  }
  function handleOptionChange(event) {
    setSelectedOption(event.target.value)
  }
  function handleForChange(event) {
    setSelectedFor(event.target.value)
  }

  const handleSubmit = async () => {
    const challenge = {
      title: (document.getElementById("challengeTitle") as HTMLInputElement)
        .value,
      description: (document.getElementById("description") as HTMLInputElement)
        .value,
      level: selectedOption,
      location: (document.getElementById("location") as HTMLInputElement).value,
      time:
        (document.getElementById("time") as HTMLInputElement).value +
        "-" +
        (document.getElementById("finished_time") as HTMLInputElement).value,
      showFor: selectedFor,
    }
    const res = await fetch("/api/challenges", {
      method: "POST",
      body: JSON.stringify(challenge),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    setChallenges([challenge, ...challenges])
  }

  useEffect(() => {
    async function fetchChallenges() {
      const res = await fetch("/api/challenges")
      const data = await res.json()
      setChallenges(data)
    }
    fetchChallenges()
  }, [])
  function hideForm() {
    const challengeForm = document.getElementById("challengeForm")
    const showForm = document.getElementById("show-form-btn")
    const cards = document.getElementById("cards")
    if (challengeForm && showForm && cards) {
      if (
        challengeForm.style.display === "none" ||
        challengeForm.style.display === ""
      ) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
        challengeForm.style.display = "block"
        showForm.style.display = "none"
        cards.style.display = "none"
      } else {
        challengeForm.style.display = "none"
        showForm.style.display = "block"
        cards.style.display = "block"
      }
    }
  }

  return (
    <div className=" bg-white">
      <Head>
        <title>Active-startsida</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Activeicon.ico" />
      </Head>
      <main className="">
        <div>
          <header className=" head fixed top-0 flex justify-center w-full h-30 bg-white border-t ">
            <div className="active flex items-center">
              <Image
                src={"/activelogga.png"}
                alt={"#"}
                width={"170"}
                height={"170"}
              ></Image>
            </div>

            <div className="profil">
              <Image
                src="/user-avatar.png"
                alt="Avatar"
                width={35}
                height={35}
              />
            </div>
          </header>
          <br />
        </div>

        <br />
        <form
          id="challengeForm"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hidden"
        >
          <h1>Skapa aktivitet</h1>
          {/** 
           
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="publisher"
            >
              Publisher
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="publisher"
              type="text"
              placeholder="Author name"
            />
          </div>
          */}
          <div className="mb-4">
            {/*
           
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="challengeTitle"
            >
              Title
            </label>
             */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="challengeTitle"
              type="text"
              placeholder="Namnnge din aktivitet"
            />

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="time"
              >
                Datum och tid
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-40"
                  id="date-active"
                  type="date"
                  placeholder="Time"
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  w-40"
                  id="time"
                  type="time"
                  placeholder="Time"
                />
                _
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  w-40"
                  id="finished_time"
                  type="time"
                  placeholder="Time"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <div className="flex flex-row">
              <Image
                src={"/Location-Icon-Filled.png"}
                alt={"#"}
                width={"20"}
                height={"20"}
              ></Image>
              <input
                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-4"
                id="location"
                type="text"
                placeholder="Årstaskogen Naturreservat 120 59 Årsta"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="level"
            >
              Välj nivå
            </label>
            <div className="flex-row items-center justify-center ">
              <div className="flex items-center pl-4  w-32 h-7">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 2 dark:bg-gray-700 dark:border-gray-600 hidden peer/lätt"
                  type="radio"
                  name="level"
                  id="level"
                  value={"lätt"}
                  checked={selectedOption === "lätt"}
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor="level"
                  className="w-full h-full py-3 ml-2 text-sm font-medium peer-cheaked:text-red-500 text-center peer-checked/lätt:bg-red-500 border border-gray-200 rounded dark:border-gray-700 flex items-center justify-center "
                >
                  Lätt
                </label>
              </div>

              <div className="flex items-center pl-4  w-32 h-7">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 2 dark:bg-gray-700 dark:border-gray-600 hidden peer/medel"
                  type="radio"
                  name="level"
                  id="level2"
                  value={"medel"}
                  checked={selectedOption === "medel"}
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor="level2"
                  className="w-full h-full py-3 ml-2 text-sm font-medium peer-cheaked:text-red-500 text-center peer-checked/medel:bg-red-500 border border-gray-200 rounded dark:border-gray-700 flex items-center justify-center"
                >
                  medel
                </label>
              </div>

              <div className="flex items-center pl-4  w-32 h-7">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 2 dark:bg-gray-700 dark:border-gray-600 hidden peer/test"
                  type="radio"
                  name="leve"
                  id="level3"
                  value={"intensivt"}
                  checked={selectedOption === "intensivt"}
                  onChange={handleOptionChange}
                />

                <label
                  htmlFor="level3"
                  className="w-full h-full py-3 ml-2 text-sm font-medium peer-cheaked:text-red-500 text-center  peer-checked/test:bg-red-500 border border-gray-200 rounded dark:border-gray-700 flex items-center justify-center"
                >
                  intensivt
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Lägg till beskrivning
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              rows={5}
              placeholder="Description"
              maxLength={500}
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="showFor"
            >
              Visas för
            </label>
            <div className="flex-row items-center justify-center content-center">
              <div className="flex items-center pl-4  w-32 h-7">
                {" "}
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 2 dark:bg-gray-700 dark:border-gray-600 hidden peer/vänner"
                  type="radio"
                  name="showFor"
                  id="vänner"
                  value={"Vänner"}
                  checked={selectedFor === "Vänner"}
                  onChange={handleForChange}
                />
                <label
                  htmlFor="vänner"
                  className="w-full h-full py-3 ml-2 text-sm font-medium peer-cheaked:text-red-500 text-center peer-checked/vänner:bg-red-500 border border-gray-200 rounded dark:border-gray-700 flex items-center justify-center"
                >
                  {" "}
                  Vänner{" "}
                </label>
              </div>

              <div className="flex items-center pl-4  w-32 h-7">
                <input
                  className="text-blue-600 bg-gray-100 border-gray-300 2 dark:bg-gray-700 dark:border-gray-600 hidden peer/grupper"
                  type="radio"
                  name="showFor"
                  id="grupper"
                  value={"Grupper"}
                  checked={selectedFor === "Grupper"}
                  onChange={handleForChange}
                />
                <label
                  htmlFor="grupper"
                  className="w-full h-full py-3 ml-2 text-sm font-medium peer-cheaked:text-red-500 text-center peer-checked/grupper:bg-red-500 border border-gray-200 rounded dark:border-gray-700 flex items-center justify-center"
                >
                  Grupper
                </label>
              </div>

              <div className="flex items-center pl-4  w-32 h-7 ">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 2 dark:bg-gray-700 dark:border-gray-600 hidden peer/all"
                  type="radio"
                  name="showFor"
                  id="all"
                  value={"Offentligt"}
                  checked={selectedFor === "Offentligt"}
                  onChange={handleForChange}
                />
                <label
                  htmlFor="all"
                  className="w-full h-full py-3 ml-2 text-sm font-medium peer-cheaked:text-red-500 text-center peer-checked/all:bg-red-500 border border-gray-200 rounded dark:border-gray-700 flex items-center justify-center"
                >
                  Offentligt
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="purple1 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="reset"
              id="button"
              onClick={() => {
                handleSubmit()
                hideForm()
              }}
            >
              Submit challenge
            </button>
            <button
              className="purple1 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block"
              type="button"
              id="hide-form-btn"
              onClick={hideForm}
            >
              return
            </button>
            <button
              className="purple1 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block"
              type="reset"
              id="hide-form-btn"
              onClick={hideForm}
            >
              exit
            </button>
          </div>
        </form>
        {/* Fetch challenges component */}
        <DisplayChallenges />
        <div className="w-full flex justify-end items-center relative bottom-16 right-0">
          <button
            className="purple1 hover:bg-purple-700 text-white w-28 h-28 rounded-full "
            type="button"
            id="show-form-btn"
            onClick={hideForm}
          >
            Create a new challenge
          </button>
        </div>
        <FooterNavbar />
      </main>
    </div>
  )
}

export default Challenges
