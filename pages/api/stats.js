import { findVideoIdByUser,insertStats,updateStats } from '../../lib/db/hasura';
import { verifyToken } from '../../lib/utils';

export default async function stats(req, res){
  const token = req.cookies.token;

  try {
    if (!token){
      res.status(403).send({});
    } else {
      const inputParams = req.method === 'POST' ? req.body : req.query;
      const {videoId} = inputParams;
      if (videoId){
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decodedToken.issuer;
        const userId = verifyToken(token);
        const findVideo = await findVideoIdByUser( videoId, userId, token);
        // console.log({findVideo});
        const doesStatsExist = findVideo?.length > 0;

        if (req.method === 'POST'){
          const {favourited, watched = true} = req.body;

          if (doesStatsExist){
            const response = await updateStats(token,{
              watched,
              userId,
              videoId,
              favourited
            });
            res.send({data: response});
          } else {
            const response = await insertStats(token,{
              watched,
              userId,
              videoId,
              favourited
            });
            res.send({data: response});
          }
        } else {
          if (doesStatsExist){
            res.send(findVideo);
          } else {
            res.status(404);
            res.send({user: null, msg: 'Video not found'});
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send({done: false, error: error?.message});
  }
}