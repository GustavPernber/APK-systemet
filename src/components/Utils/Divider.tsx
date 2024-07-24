const Divider = ({ className }: { className?: string }) => {
  return (
    <span className={` w-full h-[2px] bg-gray-200 rounded-full ${className}`} />
  );
};

export default Divider;
