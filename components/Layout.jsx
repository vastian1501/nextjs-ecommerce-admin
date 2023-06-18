import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav"

export default function Layout({children}) {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="flex h-screen w-screen  items-center justify-center">
        <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8">
          <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
            <div className="text-left">
              <h2
                className="text-4xl font-extrabold leading-10 tracking-tight text-gray-800 sm:text-5xl sm:leading-none md:text-6xl">
                Admin
                <span className="font-bold text-blue-500">Panel</span>
                <span className="text-xl font-semibold rounded-full text-blueGray-500">2.0</span>
              </h2>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate dignissim augue, Nullam vulputate dignissim augue.
              </p>
              <div className="mt-5 sm:flex md:mt-8">
                <div className="">
                  <button
                    onClick={() => signIn("google")}
                    className="bg-white px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                    <span>Login with Google</span>
                  </button>
                </div>
                
              </div>
            </div>
          </div>
          <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
            <div className="relative w-full p-3 rounded  md:p-8">
              <div className="rounded-lg bg-white text-black w-full">
                <img className="rounded-md" src="https://picsum.photos/400/300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-cyan-800 min-h-screen flex">
      <Nav/>
      <div className="bg-white grow mt-4 mr-4 mb-4 rounded-md p-4 ">
        <div className="p-4 flex-flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}
