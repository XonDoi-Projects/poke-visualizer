import { Column, H5, Row, Small } from "@/components/LayoutComponents";
import { useDarkTheme } from "@/components/Providers";
import { EvolutionType, PokeDetails } from "@/utils";
import clsx from "clsx";
import { FunctionComponent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export interface EvolutionChartProps {
  evolvesFrom?: PokeDetails;
  evolvesTo?: (PokeDetails & {
    evolutionDetails: Omit<EvolutionType, "name">;
  })[];
  showShinies?: boolean;
}

export const EvolutionChart: FunctionComponent<EvolutionChartProps> = ({
  evolvesTo,
  evolvesFrom,
  showShinies,
}) => {
  const { light } = useDarkTheme();
  const router = useRouter();

  const dropShadow = clsx({
    "drop-shadow-no-offset-light": light,
    "drop-shadow-no-offset-dark": !light,
  });

  return (
    <Column className={`flex-1 gap-5 items-start`}>
      <Row className={`flex-1 w-full flex-wrap gap-5 items-start`}>
        {evolvesFrom ? (
          <Column
            className={`flex-1 w-full items-center justify-center gap-5 min-w-[200px]`}
          >
            <H5>Evolves From</H5>
            <Column
              className={
                "relative flex-1 w-full items-center justify-center gap-2 cursor-pointer"
              }
              onClick={() => router.push(`/dex/bases/${evolvesFrom.index}`)}
            >
              <picture>
                <Image
                  src={
                    showShinies && evolvesFrom?.imageLinkHighResShiny
                      ? evolvesFrom?.imageLinkHighResShiny
                      : evolvesFrom.imageLinkHighRes ||
                        evolvesFrom.imageLink ||
                        "/placeholder.png"
                  }
                  alt={`#${evolvesFrom.index} ${evolvesFrom.name} Image`}
                  sizes="100vw"
                  width="0"
                  height="0"
                  loading="lazy"
                  fetchPriority="low"
                  className={`w-auto h-[150px] ${dropShadow}`}
                />
              </picture>

              <Small
                className={` ${light ? "text-blue-900" : "text-slate-300"} `}
              >
                {evolvesFrom.name}
              </Small>
            </Column>
          </Column>
        ) : (
          <></>
        )}

        {evolvesTo?.length ? (
          <Column
            className={
              "flex-1 w-full items-center justify-center gap-5 min-w-[200px]"
            }
          >
            <H5>Evolves Into</H5>
            {evolvesTo.map((evolve) => (
              <Column
                key={evolve.index}
                className={
                  "relative flex-1 w-full items-center justify-center gap-2 cursor-pointer"
                }
                onClick={() => router.push(`/dex/bases/${evolve.index}`)}
              >
                <picture>
                  <Image
                    src={
                      showShinies && evolve?.imageLinkHighResShiny
                        ? evolve?.imageLinkHighResShiny
                        : evolve.imageLinkHighRes ||
                          evolve.imageLink ||
                          "/placeholder.png"
                    }
                    alt={`#${evolve.index} ${evolve.name} Image`}
                    sizes="100vw"
                    width="0"
                    height="0"
                    loading="lazy"
                    fetchPriority="low"
                    className={`w-auto h-[150px] ${dropShadow}`}
                  />
                </picture>

                <Small
                  className={` ${light ? "text-blue-900" : "text-slate-300"} `}
                >
                  {evolve.name}
                </Small>
                {evolve.evolutionDetails && (
                  <Small
                    className={` ${
                      light ? "text-blue-900" : "text-slate-300"
                    } `}
                  >
                    {`Requirement: ${Object.keys(evolve.evolutionDetails)
                      .filter(
                        (objectKey) =>
                          evolve.evolutionDetails[
                            objectKey as keyof Omit<EvolutionType, "name">
                          ].value &&
                          objectKey !== "trigger" &&
                          objectKey !== "name"
                      )
                      .map((validKey, index, array) => {
                        return index < array.length - 1
                          ? `${
                              evolve.evolutionDetails[
                                validKey as keyof Omit<EvolutionType, "name">
                              ].flavorText
                            } ${
                              typeof evolve.evolutionDetails[
                                validKey as keyof Omit<EvolutionType, "name">
                              ].value !== "boolean"
                                ? evolve.evolutionDetails[
                                    validKey as keyof Omit<
                                      EvolutionType,
                                      "name"
                                    >
                                  ].value
                                : ""
                            } and `
                          : `${
                              evolve.evolutionDetails[
                                validKey as keyof Omit<EvolutionType, "name">
                              ].flavorText
                            } ${
                              typeof evolve.evolutionDetails[
                                validKey as keyof Omit<EvolutionType, "name">
                              ].value !== "boolean"
                                ? evolve.evolutionDetails[
                                    validKey as keyof Omit<
                                      EvolutionType,
                                      "name"
                                    >
                                  ].value
                                : ""
                            } `;
                      })
                      .join("")}`}
                  </Small>
                )}
              </Column>
            ))}
          </Column>
        ) : (
          <></>
        )}
      </Row>
    </Column>
  );
};
