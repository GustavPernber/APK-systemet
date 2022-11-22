import { useEffect, useRef } from "react"

const GoogleAd = () => {
    const googleAdId = "ca-pub-4393081609662358"
    const slot = "-g9-21-2h-dw+19m"
    const googleInit = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        console.log('google ad');
        googleInit.current = setTimeout(() => {
            if (typeof window !== 'undefined')
            // @ts-ignore
              ( window.adsbygoogle = window.adsbygoogle || []).push({});
        }, 200);

        return () => {if (googleInit.current) { clearTimeout(googleInit.current) }}
    }, [])

    return(
        <div>
            <ins
            className="adsbygoogle"

            style={{display:"block"}}

            data-ad-format="fluid"
            data-ad-layout-key="-h0-u+1c-5k+df"
            data-ad-client="ca-pub-4393081609662358"
            data-ad-slot="6089960778"
            ></ins>
        </div>
    )
}

export default GoogleAd