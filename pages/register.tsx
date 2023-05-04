import Head from "next/head"
import Image from "next/image"
import router from "next/router"
import { useFormik } from "formik"
import { newUser } from "@/types/userTemp"

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      fname: "",
      lname: "",
      password: "",
      cpassword: "",
      terms: "",
    },
    onSubmit,
  })
  async function onSubmit(values: any) {
    const newUser: any = {
      username: values.username,
      password: values.password,
      terms: values.terms,
    }
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })

    if (response.ok) {
      router.push("/")
      // Registration successful
    } else {
      alert("Tagga")
      // Registration failed
    }
  }

  return (
    <div className=" flex flex-col h-screen bg-gradient-to-b from-active-bluelight via-active-purplelight to-active-goldlight">
      <Head>
        <title>Active - Skapa konto</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Activeicon.ico" />
      </Head>
      <main>
        <div className="flex-col justify-center  mb-10 mt-20 w-full">
          <div className="flex justify-center  mb-10 mt-20 w-full">
            <Image
              src={"/active-logo-medium.png"}
              alt={"#"}
              width={"176"}
              height={"48"}
            />
          </div>
          <div id="registerFormContainer" className="flex justify-center">
            <form
              className="space-y-4 md:space-y-6 "
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Användarnamn
                </label>
                <input
                  type="username"
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Användarnamn..."
                  {...formik.getFieldProps("username")}
                  required
                  minLength={5}
                  maxLength={15}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Namn
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Förnamn..."
                  {...formik.getFieldProps("fname")}
                  required
                  minLength={3}
                  maxLength={10}
                />
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Efternamn..."
                  {...formik.getFieldProps("lname")}
                  required
                  minLength={3}
                  maxLength={15}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...formik.getFieldProps("email")}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lösenord
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("password")}
                  required
                  minLength={8}
                  maxLength={20}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bekräfta lösenord
                </label>
                <input
                  type="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("cpassword")}
                  required
                  minLength={8}
                  maxLength={20}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...formik.getFieldProps("terms")}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full purple1 hover:bg-purple-700  text-active-offWHite font-bold py-2 px-4 rounded"
              >
                Skapa konto
              </button>
            </form>
          </div>
          <div className="flex justify-center mt-10">
            Har du redan ett konto?
            <button
              className="text-active-purple px-1 font-bold "
              onClick={() => router.push("/")}
            >
              Logga in här!
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Register
