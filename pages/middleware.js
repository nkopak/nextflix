import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';

export async function middleware(req, ev){
  console.log('Works?');
  if (req.nextUrl.pathname.startsWith('/')){

    const token = req ? req.cookies.token : null;
    const userId = await verifyToken(token);

    const {pathname} = req.nextUrl;

    if (token && userId || pathname.include('/api/login')){
      console.log('here');

      return NextResponse.next();
    }

    if (!token && pathname !== 'login'){
      return NextResponse.redirect('/login');
    }
  }

}
