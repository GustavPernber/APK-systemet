import Logo from './Logo'
 
const SiteFooter = () => {
    return ( 
    <footer className=" w-screen h-[10rem] bg-gray-200 px-4 py-6 grid grid-cols-2 grid-rows-[1fr_auto]">
        
        <a className=' col-start-1 self-start'
         target={"_blank"} 
        href="https://github.com/GustavPernber/APK-systemet-remastered">
            <i className="fa-brands fa-github fa-xl"></i>
        </a>
        <Logo className="  !text-gray-400 !text-sm !leading-3 col-start-2 self-start place-self-end" />

        <div className='col-span-2 text-sm  h-full flex flex-col gap-2 border-t-[1px] border-gray-300 pt-5'>
            <p className="text-gray-400">Senast uppdaterad: Kl 13:44 Torsdag 13 Oktober 2022.</p>
            <p className="text-gray-400">Nästa uppdatering: Kl 13:44 Torsdag 13 Oktober 2022.</p>
        </div>
    </footer> 
    );
}
 
export default SiteFooter;