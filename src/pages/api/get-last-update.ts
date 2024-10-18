import clientPromise from "@/lib/mongodb";
import { NextApiResponse } from "next";

const getUpdatedOn = async (res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbRefresh = client.db("pokemons").collection("refresh");

    let result = await dbRefresh.findOne<{
      _id: String;
      updatedOn: string;
      isBeingUpdated: boolean;
    }>();

    if (result?.isBeingUpdated) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to get last update: ${e.message}` });
  }
};

export default getUpdatedOn;
