import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()

  return (
    <Layout>
      <div className="flex gap-2 ">
        <h1 className="text-2xl p-4 ">Bienvenido {session?.user?.name}</h1>
        <div>
          <img className="w-10" src={session?.user?.image} />
        </div>
      </div>
    </Layout>
  )
}
