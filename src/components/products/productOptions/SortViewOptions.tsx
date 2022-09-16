import Select from "@mui/material/Select"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from "@mui/material";
import { SortByOptions } from "../ProductsController";


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