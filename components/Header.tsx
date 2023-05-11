import Image from "next/image"
import Avatar from "./UserAvatar"
import { useSession } from "next-auth/react"
import router from "next/router"
import BackButton from "./BackButton"
import HideForm from "./HideForm"
export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 flex items-end w-full h-24 border-t border-gray-200 bg-active-white z-40">
      <div className="w-1/4 h-1/2">
        <div className=" pl-4 flex space-x-3 ml-3">
          <Image src="/notice.svg" alt="Avatar" width={25} height={25} />

          <Image src="/search.svg" alt="Avatar" width={25} height={25} />
        </div>
      </div>

      <div className="flex justify-center mb-5 w-full">
        <div className="w-1/2 h-1/2 flex justify-center">
          <Image
            src={"/active-logo-medium.png"}
            alt={"#"}
            width={"120"}
            height={"120"}
          />
        </div>
        <div
          className=" w-1/4 h-1/2 flex justify-end cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <Avatar
            src={session?.user?.image}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  )
}
