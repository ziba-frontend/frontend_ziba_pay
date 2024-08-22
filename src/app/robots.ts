import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
    const baseUrl="https://www.zibapay.com"
    return{
        rules:{
            userAgent:"*",
            allow:["/","/about","/contact","/api-docs/*","/blogs"],
            disallow:[],
        },
        sitemap:`${baseUrl}/sitemap.xml`
    }
}