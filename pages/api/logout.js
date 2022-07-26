import { removeTokenCookie } from '../../lib/cookies';
import { magicAdmin } from '../../lib/magic';
import { verifyToken } from '../../lib/utils';

export default async function logout(req, res){
  try {
    if (!req.cookies.token) {
      return res.status(401).json({message: 'User is not logged in'});
    }
    const token = req.cookies.token;
    const userId = verifyToken(token);
    removeTokenCookie(res);
    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.error(`Error occurred while logging out magic user: ${error.message}`);
    }
    res.redirect('/', 302);
    res.end();
  } catch (error) {
    res.status(401).json({message: 'User is not logged in'});
  }
}
