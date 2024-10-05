import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const updateUpdatedOn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const dbRefresh = client.db("pokemons").collection("refresh");

    const { isBeingUpdated, updatedOn } = req.body;

    let resultRefresh = await dbRefresh.findOne();

    if (updatedOn) {
      resultRefresh = await dbRefresh.findOneAndUpdate(
        {},
        { $set: { ...resultRefresh, updatedOn: new Date() } },
        { returnDocument: "after" }
      );

      if (!resultRefresh) {
        await dbRefresh.insertOne({ updatedOn: new Date() });
      }
    }

    if (isBeingUpdated !== undefined) {
      resultRefresh = await dbRefresh.findOneAndUpdate(
        {},
        { $set: { ...resultRefresh, isBeingUpdated } },
        { returnDocument: "after" }
      );

      if (!resultRefresh) {
        await dbRefresh.insertOne({ isBeingUpdated });
      }
    }

    if (resultRefresh) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (e: any) {
    return res
      .status(404)
      .json({ message: `Failed to update last update: ${e.message}` });
  }
};

export default updateUpdatedOn;
