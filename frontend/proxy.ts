import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {

    //Prüfen, ob Token im Cookie existiert
    const token = request.cookies.get('token')?.value;

    const currentPath = request.nextUrl.pathname;

    //Liste der geschützten Routen
    const protectedPaths = ['/dashboard', '/company', '/product', '/product'];

    //Prüfen, ob die aktuelle URL mit einen der geschützten Routen beginnt
    const isProtectedPath = protectedPaths.some((path) =>
        currentPath.startsWith(path)
    );

    //Falls es ne geschützte Route ist und kein Token existiert -> ab zum Login
    if(isProtectedPath && !token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    //Falls alles passt, normal fortfahren
    return NextResponse.next();
}

//Sagt Next.js, auf welchen Pfaden die Middleware aktiv sein soll
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/product/:path*',
        '/company/:path*',
        '/user/:path*',
    ],
};