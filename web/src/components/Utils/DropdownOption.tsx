type DropdownOptionProps = {
    title: string
    value: string
    selectedValue: string
    clickHandler: (value: string) => void
}

const DropdownOption = ({title, selectedValue, clickHandler, value}: DropdownOptionProps) => {

    return(
        <span
            onClick={() => {clickHandler(value)}}
            className={`
            ${selectedValue === value ? "bg-green-200 text-white font-bold" : "text-gray-700  hover:bg-gray-100"}
            flex items-center gap-x-3.5 py-2 px-3 rounded-md
            font-medium cursor-pointer
            text-sm  focus:ring-2 focus:ring-green-400 `}
          >
            {title}
        </span>
    )
}

export default DropdownOption