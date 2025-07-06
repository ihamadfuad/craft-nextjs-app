import { redirect } from "next/navigation";
import { useSession } from "@/context/SessionStorageContext"
import { removeCookie } from "@/lib/cookies-manager"

export async function logout() {

    const { removeItem } = useSession()

    removeItem("token")
    removeCookie("token")

    redirect("/authentication/login");
}