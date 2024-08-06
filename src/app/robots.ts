import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
    const baseUrl="https://ziba-frontend.vercel.app"
    return{
        rules:{
            userAgent:"*",
            allow:["/","/about","/contact","/api-docs/*"],
            disallow:[],
        },
        sitemap:`${baseUrl}/sitemap.xml`
    }
}