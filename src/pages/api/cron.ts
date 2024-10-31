// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.

import { NextApiRequest, NextApiResponse } from "next";

// export const dynamic = "force-dynamic"; // static by default, unless reading the request
// export const revalidate = 0;

const cronTest = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req);
    console.log("CRON ran successfully");
    return res.status(200).json({ message: "Cron ran successfully" });
  } catch (e: any) {
    console.error(e.message);
    return new Response(`CRON has failed to run:${e.message}`, { status: 500 });
  }
};

export default cronTest;
