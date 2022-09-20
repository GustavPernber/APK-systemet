import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { SortByOptions } from "@/utils/types";

type SortViewOptionsProps = {
    sortBy: SortByOptions
    setSortBy: any
}

function SortViewOptions({ sortBy, setSortBy}: SortViewOptionsProps) {

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

    return(
        <div  className="py-3">
            <Sort/>
        </div>
    )
}

export default SortViewOptions