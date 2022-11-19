import { Icon } from "@iconify/react"

const grey = {
    100:"#F9F9F9",
    200:"#EAE9E9",
    300: "#D4D3D3",
    400:"#2D2926A6",
}



const Icons = {
    x: (props: any) => (
        <Icon
        icon={"bi:x"}
        style={{ color: grey[400]}}
        {...props}
        />
    ),
    info: (props: any) => (
        <Icon
        icon={"material-symbols:info-outline" }
        style={{ color: grey[400]}}
        {...props}
        />
    ),
    gitHub: (props: any) => (
        <Icon 
        icon={"bytesize:github"}
        style={{ color: grey[400]}}
        {...props}
        />
    ),
    search: (props: any) => (
        <Icon
        icon={"material-symbols:search"}
        {...props}
        />
    )
    
}

export default Icons