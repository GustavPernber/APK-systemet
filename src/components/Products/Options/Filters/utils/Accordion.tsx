import { useState } from "react";

type AccordionProps = {
  contentComponent: JSX.Element;
  title: String;
};

function Accordion({ contentComponent, title }: AccordionProps) {

  const [show, setShow] = useState<boolean>(false) 

  return (
    <div className="hs-accordion-group ">
      <div
        className="hs-accordion"
        id="hs-basic-with-title-and-arrow-stretched-heading-one"
      >
        <button 
          onClick={() => setShow(!show)}
          className="hs-accordion-toggle  group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500"
          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
        >
          <h2 className={`font-normal ${ show && "font-semibold "} text-lg`}>
            {title}
          </h2>
          <svg
            className={` transition-all ${show && " rotate-180" } m-3 transition hs-accordion-active block w-4 h-3 text-black group-hover:text-gray-500 `}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="black"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div
          id="hs-basic-with-title-and-arrow-stretched-collapse-three"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
        >
            <div>
                {contentComponent}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
