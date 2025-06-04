type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <h1
      className={` font-extrabold font-sans  text-green-200 text-[1rem] md:text-[1.5rem] tracking-tight  leading-4 md:leading-6
        ${className}`}
    >
      APK
      <br /> SYSTEMET.
    </h1>
  );
};

export default Logo;
