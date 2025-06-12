import * as dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

const secretTokens = (id) => {
  return jwt.sign({id}, process.env.TOKEN_KEY,{
    expiresIn: 3 * 24 * 60 * 60,
  })
}
export default secretTokens;

