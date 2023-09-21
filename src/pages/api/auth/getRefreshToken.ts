import { NextApiRequest, NextApiResponse } from "next";

const getRefreshToken = (req: NextApiRequest, res: NextApiResponse) => {
  const { token, type } = req.body;
};

export default getRefreshToken;
