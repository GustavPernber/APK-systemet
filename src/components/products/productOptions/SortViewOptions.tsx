import { FormControl, MenuItem, InputLabel, Select, Button } from "@mui/material";
import { SortByOptions } from "@/utils/types";

type SortViewOptionsProps = {
    sortBy: SortByOptions
    setSortBy: Function
    isCompactProducts: boolean
    setIsCompactProducts: Function
}

function SortViewOptions({ sortBy, setSortBy, setIsCompactProducts, isCompactProducts}: SortViewOptionsProps) {

    const Sort = () => {
        return(
            
            <FormControl sx={{minWidth:100, border: "none"}}  size="small" >

                <InputLabel>Sortera</InputLabel>
                <Select 
                className=" bg-green-100 !rounded-md  "
                label=" Sortera "
                value={sortBy}
                onChange={(e)=>setSortBy(e.target.value)}     
                >
                    <MenuItem dense={true} value={"apk"}>APK</MenuItem>
                    <MenuItem  dense={true} value={"alc_desc"}>Alkoholhalt</MenuItem>
                    <MenuItem  dense={true} value={"price_asc"}>Lägsta pris</MenuItem>
                </Select>

            </FormControl>
  
        )
    }

    const CompactToggle = () => {
        return (
            // <FormControl size="small" sx={{minWidth:100, border: "none"}} className=" bg-green-100 !rounded-md">
                
            // </FormControl>
            <Button size="small" sx={{minWidth:100, border: "none"}} className=" !rounded-md bg-green-200 !hover:bg-slate-400">
                <p>hello</p>
            </Button>
        )
    }

    return(
        <div  className="py-3 flex flex-row justify-between">
            <Sort/>
            <CompactToggle/>
        </div>
    )
}

export default SortViewOptions