import Image from "next/image"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"
import router from "next/router"
import { useEffect } from "react"
import Head from "next/head"
import { useFormik } from "formik"

const Index = () => {
  const { data: session, status } = useSession()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  })
  async function onSubmit(values: any) {
    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    })

    if (result?.error) {
      console.log(result)
    } else {
      router.push("/startsida")
    }
  }
  useEffect(() => {
    if (session) {
      setTimeout(() => {
        router.push("/startsida")
      }, 2000) // Waiting time before redirecting
    }
  }, [session])

  if (status === "loading") {
    return (
      <div className="w-screen h-screen">
        <div className="flex justify-center w-auto animate-bounce h-1/4">
          <div className="w-3 h-3 bg-active-offWHite rounded-full mr-1"></div>
          <div className="w-3 h-3 bg-active-offWHite rounded-full mr-1"></div>
          <div className="w-3 h-3 bg-active-offWHite rounded-full "></div>
        </div>
      </div>
    )
  } else if (session) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex-col">
          <p>
            Välkommen
            <span className="font-extrabold"> {session.user?.fname}</span>
          </p>
          <br />
          <br />
          <div className="flex justify-center w-auto animate-bounce h-1/4">
            <div className="w-3 h-3 bg-active-offWHite rounded-full mr-1"></div>
            <div className="w-3 h-3 bg-active-offWHite rounded-full mr-1"></div>
            <div className="w-3 h-3 bg-active-offWHite rounded-full "></div>
          </div>
        </div>
      </div>
    )
  } else
    return (
      <div className=" flex flex-col h-screen bg-gradient-to-b from-active-bluelight via-active-purplelight to-active-goldlight">
        <Head>
          <title>Active - Logga in</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Activeicon.ico" />
        </Head>

        <div className="flex justify-center absolute inset-x-0 top-20 mb-10 w-full">
          <Image
            src={"/active-logo-medium.png"}
            alt={"#"}
            width={"176"}
            height={"48"}
          />
        </div>

        <form
          id="loginForm"
          className="bg-white rounded px-24 pt-56 pb-8 mb-4 round flex flex-col"
          onSubmit={formik.handleSubmit}
        >
          <input
            className=" mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            type="username"
            id="username"
            placeholder="Användarnamn..."
            required
            {...formik.getFieldProps("username")}
          />

          <input
            className=" mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="password"
            placeholder="Lösenord..."
            required
            {...formik.getFieldProps("password")}
          />
          <Link href="/startsida">Glömt lösenord</Link>

          <div className="flex flex-col justify-center items-center mt-8">
            <button
              className=" mb-16 purple1 hover:bg-purple-700  text-active-offWHite font-bold py-2 px-4 rounded "
              type="submit"
            >
              Logga in
            </button>
            <div>
              <button
                type="button"
                onClick={() =>
                  signIn("google", { callbackUrl: "http://localhost:3000" })
                }
                className="text-white bg-active-offWHite hover:bg-active-white focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <Image
                  src={"/google-icon.svg"}
                  alt={"#"}
                  width={"20"}
                  height={"20"}
                  className="mr-2"
                />
                Logga in med google
              </button>
            </div>
          </div>
        </form>
        <div className="flex justify-center">
          Har du inget konto?{" "}
          <button
            className="text-active-purple px-1 font-bold "
            onClick={() => router.push("/register")}
          >
            Skapa
          </button>
        </div>
      </div>
    )
}

export default Index
