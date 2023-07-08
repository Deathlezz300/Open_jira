import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    
    if(request.nextUrl.pathname.startsWith('/api/entries/')){
        const id=request.nextUrl.pathname.replace('/api/entries/','');
        
        const checkMongoId=new RegExp("^[0-9a-fA-F]{24}$");

        if(!checkMongoId.test(id)){
            const url=request.nextUrl.clone();
            url.pathname='api/entries/bad-request';
            url.search=`?message=${id} is not a valid MongoId`;
            return NextResponse.rewrite(url);
        }
        

    }

    return NextResponse.next();

}

export const config={
    matcher: 
    [
        '/api/entries/:path/'
    ]
}