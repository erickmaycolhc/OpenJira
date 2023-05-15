import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware (req:NextRequest ) {

    if( req.nextUrl.pathname.startsWith('/api/entries/')){
        
        const id = req.nextUrl.pathname.replace('/api/entries/' , ''); 
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if( ! checkMongoIDRegExp.test(id)){ // condicionando cuando no haya un id
            
            const url = req.nextUrl.clone(); // clonando la Url
            url.pathname = '/api/bad-request' // llamando al directorio de bad request
            url.search = `?message= ${id} is not a valid MongoID`; // generando un mejor mensaje de error
            return NextResponse.rewrite(url);
        }
    }

    
    // return NextResponse.next();

}

export const config = {
    matcher:  '/api/entries/:patch*'
}