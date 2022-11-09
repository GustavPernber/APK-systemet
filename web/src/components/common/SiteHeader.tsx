import { useContext } from "react";
import { AppContext } from "../Body";
import Logo from "./Logo";
import Icons from "@/components/Utils/Icons"

export default function SiteHeader() {
	const {showInfoCard, setShowInfoCard} = useContext(AppContext)

	return (
		<header className=" flex flex-row justify-between px-3 pt-4 pb-2 lg:mx-12 md:px-6 md:pb-0 ">
			<Logo/>
			<button 
			onClick={() => setShowInfoCard((v: boolean) => !v)}
			className=" flex flex-row  items-center gap-1 ">
                <Icons.info
				className=" text-[1.2rem] mb-[0.1rem]"
				/>
				<p className="text-[0.9rem] text-gray-400">Vad är APK?</p>
			</button>
		</header>
	);
}