import jwt from "jsonwebtoken";

import { secretKey } from "../credentials.js";
import { DbConnect } from "../dbconnect.js";



export const middleware = async (req, res, next) => {
  const token = req.headers.authorization;

  // console.log(token);
  if (!token) {
    res.status(401).send({ success: false, message: "Unauthorized access" });
    return;
  }
  const user = jwt.verify(token, secretKey);
  if (user.uid) {
    const collection = DbConnect();
    const thisuser = await collection.findOne({uid:user.uid})
    // console.log(thisuser);
    if (thisuser) next();
    else res.send({"error":"user not found"})

  } else {
    res.status(401).send({ success: false, error: "Unauthorized access" });
    return;
  }
};