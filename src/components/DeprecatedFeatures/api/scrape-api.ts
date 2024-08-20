import { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";
import { TypeComplexion, TypeDetails } from "@/pokemonTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = "https://pokemondb.net/type/dual";

  try {
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const table = document.querySelector("#dualtypechart");

    let data: TypeDetails = {};

    const typeOrder = [
      "",
      "",
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ];

    if (table) {
      const rows = table.querySelectorAll("tr");

      rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll("td, th");

        const primary = cells[0].textContent
          ?.trim()
          .split(" ")[0]
          .toLowerCase();
        const secondary = cells[0].textContent
          ?.trim()
          .split(" ")[1]
          .toLowerCase();

        cells.forEach((cell, cellIndex) => {
          if (
            secondary !== undefined &&
            !secondary.includes("—") &&
            primary !== undefined &&
            !primary.includes("attack")
          ) {
            if (cellIndex === 0 && !data[primary]) {
              data = {
                ...data,
                [primary]: {
                  complexion: {
                    zero: [],
                    double: [],
                    half: [],
                    quadruple: [],
                    quarter: [],
                    strongAgainst: [],
                    weakAgainst: [],
                    neutralAgainst: [],
                  },
                  secondary: {
                    [secondary]: {
                      complexion: {
                        zero: [],
                        double: [],
                        half: [],
                        quadruple: [],
                        quarter: [],
                        strongAgainst: [],
                        weakAgainst: [],
                        neutralAgainst: [],
                      },
                    },
                  },
                },
              };
            } else if (cellIndex >= 2) {
              let currentData = data[primary].secondary[secondary];

              const currentCell = cell.textContent?.trim();
              if (currentData) {
                let complexionData = currentData.complexion;

                if (currentCell === "0") {
                  complexionData.zero.push(typeOrder[cellIndex]);
                  complexionData.strongAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "4") {
                  complexionData.quadruple.push(typeOrder[cellIndex]);
                  complexionData.weakAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "2") {
                  complexionData.double.push(typeOrder[cellIndex]);
                  complexionData.weakAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "½") {
                  complexionData.half.push(typeOrder[cellIndex]);
                  complexionData.strongAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "¼") {
                  complexionData.quarter.push(typeOrder[cellIndex]);
                  complexionData.strongAgainst.push(typeOrder[cellIndex]);
                } else {
                  complexionData.neutralAgainst.push(typeOrder[cellIndex]);
                }
                data[primary].secondary[secondary].complexion = complexionData;
              } else {
                let complexionData: TypeComplexion = {
                  zero: [],
                  double: [],
                  half: [],
                  quadruple: [],
                  quarter: [],
                  strongAgainst: [],
                  weakAgainst: [],
                  neutralAgainst: [],
                };

                if (currentCell === "0") {
                  complexionData.zero.push(typeOrder[cellIndex]);
                  complexionData.strongAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "4") {
                  complexionData.quadruple.push(typeOrder[cellIndex]);
                  complexionData.weakAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "2") {
                  complexionData.double.push(typeOrder[cellIndex]);
                  complexionData.weakAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "½") {
                  complexionData.half.push(typeOrder[cellIndex]);
                  complexionData.strongAgainst.push(typeOrder[cellIndex]);
                } else if (currentCell === "¼") {
                  complexionData.quarter.push(typeOrder[cellIndex]);
                  complexionData.strongAgainst.push(typeOrder[cellIndex]);
                } else {
                  complexionData.neutralAgainst.push(typeOrder[cellIndex]);
                }
                data[primary].secondary[secondary] = {
                  complexion: complexionData,
                };
              }
            }
          }
        });
      });

      res.status(200).json({ data });
    } else {
      res
        .status(404)
        .json({ error: 'Table with ID "dualtypechart" not found.' });
    }
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching the URL: ${error.message}` });
  }
}
