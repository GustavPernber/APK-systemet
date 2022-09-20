import { Skeleton } from '@mui/material'

function SkeletonProductList(){

    const SkeletonProduct = () => {
        return(
            <div className=" bg-white grid w-full grid-rows-[auto auto auto] grid-cols-1 h-auto px-5 py-3 shadow rounded">
                <div className="  w-full flex flex-row justify-start h-auto  min-h-[8rem] ">
                <div className="   h-28  w-16">
                    <Skeleton animation='wave' variant={'rounded'} className=" h-24 w-16"
                    height={'7rem'} width={'4rem'}
                    />
                </div>
              
                <div className="flex flex-col justify-between w-full pl-5">
                    <div className=" pb-5">
                        <Skeleton animation='wave' className=' text-md'/>
                        <Skeleton animation='wave' className=' text-md' width={'60%'}/>                    
                    </div>

                    <div className="w-full flex flex-row justify-between items-center pb-3">
                        <Skeleton animation='wave' width={'50%'}/>
                        <Skeleton animation='wave' width={'20%'}/>
                    </div>
                </div>
            </div>
           

            
            <Skeleton animation='wave' variant={'rounded'} width={'100%'} height={'3rem'}/>

            <div className=" w-full py-3 ">
                <Skeleton animation='wave' width={'80%'} className=" text-sm"/>
                <Skeleton animation='wave' width={'60%'} className=" text-sm"/>
                <Skeleton animation='wave' width={'50%'} className=" text-sm"/>
            </div>
            
            
            </div>
        )
    }

    return (
        <div className=" w-full flex flex-col justify-center items-center gap-5">
            {[...Array(8)].map((e) => {
                return(
                    <SkeletonProduct key={e}/>
                )
            })}
        </div>
    )
    
}

export default SkeletonProductList