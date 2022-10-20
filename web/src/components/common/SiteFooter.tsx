import Logo from './Logo'
import { AppContext } from '../Body';
import { useContext } from 'react';
 
const SiteFooter = () => {
    const { metadata } = useContext(AppContext)
    return ( 
    <footer className=" w-screen h-[10rem] bg-gray-200 px-4 py-6 grid grid-cols-2 grid-rows-[1fr_auto_1fr]">
        
        <a className=' col-start-1 self-start'
         target={"_blank"} 
        href="https://github.com/GustavPernber/APK-systemet-remastered">
            <i className="fa-brands fa-github fa-xl"></i>
        </a>
        <Logo className="  !text-gray-400 !text-sm !leading-3 col-start-2 self-start place-self-end" />

        <span className='w-full h-[1px] bg-gray-300 col-span-2' />

        <p className="text-gray-400 col-span-2  self-end">
            {metadata.lastUpdated && 'Senast uppdaterad: Kl 13:44 Torsdag 13 Oktober 2022.'}
        </p>
        
    </footer> 
    );
}
 
export default SiteFooter;