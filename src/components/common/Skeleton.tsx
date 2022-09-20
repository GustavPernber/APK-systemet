type SkeletonProps = {
    className?: string
    width?: string
    height?: string
}

function Skeleton ({className, width='100%', height='1rem'}: SkeletonProps){
    return(
        <p 
        style={{width:width, height:height}}
        
        className={`${className} bg-gray-200 rounded-md text-md m-2` }></p>
    )
}

export default Skeleton