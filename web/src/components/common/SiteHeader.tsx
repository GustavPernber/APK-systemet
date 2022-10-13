import { useContext } from "react";
import { InfoCardContext } from "../Body";
import Logo from "./Logo";

export default function SiteHeader() {
	const {toggleInfoCard, showInfoCard} = useContext(InfoCardContext)

	return (
		<header className=" flex flex-row justify-between px-3 pt-4 pb-2 lg:mx-12 md:px-6 md:pb-0 ">
			<Logo/>
			<button 
			onClick={()=>toggleInfoCard()}
			className=" flex flex-row  items-center gap-1 ">
				<span className=" text-gray-400  text-[1.2rem] mb-[0.1rem]  material-icons-outlined ">info</span>
                <p className="text-[0.9rem] text-gray-400">Vad är APK?</p>
			</button>
		</header>
	);
}