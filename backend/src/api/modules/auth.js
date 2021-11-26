import { verify } from './jwt.js'; 
import { MSG, CODE } from '../../config/message.js';
import { fail } from './util.js';``
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default async (req, res, next) => {
  console.log('r1:'+req.headers.token);
  var token = req.headers.token
  // 토큰 없음
  if (!token) return res.json(fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
  // decode
  const user = await verify(token);
  // 유효기간 만료
  if (user === TOKEN_EXPIRED)
    return res.json(fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
  // 유효하지 않는 토큰
  if (user === TOKEN_INVALID)
    return res.json(fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
  if (user === undefined)
    return res.json(fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
  console.log('u1:'+user.id);
  req.query.id = user.id;

  next();
};
