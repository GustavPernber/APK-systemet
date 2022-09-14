export default function SiteHeader() {
	return (
		<header className=" flex flex-row justify-between px-3 py-4">
			{/* <img className=" w-24" src={logo} alt="logo" />
			 */}
			 <h1 className=" font-extrabold font-sans  text-green-200 text-[1rem] tracking-tight  leading-4">APK<br></br> SYSTEMET.</h1>

			<button className=" flex flex-row  items-center gap-1 ">
				<span className=" text-gray-400  text-[1.2rem] mb-[0.1rem]  material-icons-outlined ">info</span>
                <p className="text-[0.9rem] text-gray-400">Vad är APK?</p>
			</button>
		</header>
	);
}