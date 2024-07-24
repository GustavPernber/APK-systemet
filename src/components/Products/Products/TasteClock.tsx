import clocks from "@/utils/clocks";

type TasteClockProps = {
  name: string;
  value: number;
};

const TasteClock: React.FC<TasteClockProps> = (props) => {
  function switchName(name: string) {
    switch (name) {
      case "TasteClockBody":
        return "Fyllighet";
      case "TasteClockRoughness":
        return "Strävhet";
      case "TasteClockFruitacid":
        return "Fruktsyra";
      case "TasteClockSweetness":
        return "Sötma";
      case "TasteClockBitter":
        return "Beska";
      case "TasteClockSmokiness":
        return "Rökighet";

      default:
        return `NOT KNOWN ${name}`;
    }
  }

  return (
    <div className=" flex flex-col justify-center items-center gap-1">
      <p className=" font-condensed font-[600]  uppercase text-[0.8rem] tracking-widest">
        {switchName(props.name)}
      </p>
      <img src={clocks[props.value]} alt="" />
    </div>
  );
};

export default TasteClock;
