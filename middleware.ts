import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/metting(.*)'

])

export default clerkMiddleware((auth,req)=>{
     if(protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};