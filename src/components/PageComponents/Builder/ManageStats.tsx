import { Column, Row, Span } from "@/components/LayoutComponents";
import { NumberField } from "@/components/LayoutComponents/Inputs";
import { useDarkTheme } from "@/components/Providers";
import { statShortHand } from "@/utils";
import { FunctionComponent } from "react";
import { PokeDetailsWithSelectedMovesStatCalculator } from "./Builder";
import { cloneDeep } from "lodash";

export interface ManageStatsProps {
  item?: { index: number; item: PokeDetailsWithSelectedMovesStatCalculator };
  setItem?: (value: {
    index: number;
    item: PokeDetailsWithSelectedMovesStatCalculator;
  }) => void;
}

export const ManageStats: FunctionComponent<ManageStatsProps> = ({
  item,
  setItem,
}) => {
  const { light } = useDarkTheme();

  const handleLevel = (value?: string) => {
    let level = value ? parseInt(value) : 1;
    if (level > 100) {
      level = 100;
    } else if (level < 1) {
      level = 1;
    }

    let tempItem = cloneDeep(item);
    if (tempItem?.item.stats) {
      Object.keys(statShortHand).forEach((s) => {
        const { calculatedBase, calculatedValue } = handleCalculate(s, level);

        if (tempItem.item.statCalculatorDetails?.stats) {
          let statIndex = tempItem.item.statCalculatorDetails?.stats?.findIndex(
            (stat) => stat.name === s
          );
          if (statIndex !== undefined && statIndex >= 0) {
            tempItem.item.statCalculatorDetails.stats[statIndex] = {
              ...tempItem.item.statCalculatorDetails.stats[statIndex],
              calculatedBase,
              calculatedValue,
            };
          }
        }
      });
      setItem &&
        setItem({
          ...tempItem,
          item: {
            ...tempItem.item,
            statCalculatorDetails: {
              level,
              stats: tempItem.item.statCalculatorDetails?.stats,
            },
          },
        });
    }
  };

  const handleCalculate = (statName: string, level?: number) => {
    let calculatedValue = item?.item.statCalculatorDetails?.stats
      ? item.item.statCalculatorDetails.stats.find((s) => s.name === statName)
          ?.calculatedValue || 0
      : 0;
    let base = item?.item.stats
      ? item.item.stats.find((s) => s.name === statName)?.value || 0
      : 0;
    let iv = item?.item.statCalculatorDetails?.stats
      ? item.item.statCalculatorDetails.stats.find((s) => s.name === statName)
          ?.iv || 0
      : 0;
    let ev = item?.item.statCalculatorDetails?.stats
      ? item.item.statCalculatorDetails.stats.find((s) => s.name === statName)
          ?.ev || 0
      : 0;
    let tempLevel = level || item?.item.statCalculatorDetails?.level || 1;

    if (statName === "hp") {
      calculatedValue = (base + iv + ev / 4 + 100) * (tempLevel / 100) + 10;
    } else {
      calculatedValue = (base + iv + ev / 4) * (tempLevel / 100) + 5;
    }

    const calculatedBase = base + iv + Math.floor(ev / 4);

    return { calculatedValue: Math.floor(calculatedValue), calculatedBase };
  };

  const handleIVStat = (statName: string, statValue?: string) => {
    let stat = statValue ? parseInt(statValue) : 0;

    if (stat > 31) {
      stat = 31;
    } else if (stat < 0) {
      stat = 0;
    }

    const { calculatedValue, calculatedBase } = handleCalculate(statName);

    const tempItem = cloneDeep(item);

    if (tempItem?.item.statCalculatorDetails?.stats) {
      const currentStatIndex =
        tempItem.item.statCalculatorDetails?.stats?.findIndex(
          (s) => s.name === statName
        );

      if (currentStatIndex !== undefined && currentStatIndex >= 0) {
        tempItem.item.statCalculatorDetails.stats[currentStatIndex].iv = stat;
        tempItem.item.statCalculatorDetails.stats[
          currentStatIndex
        ].calculatedBase = calculatedBase;
        tempItem.item.statCalculatorDetails.stats[
          currentStatIndex
        ].calculatedValue = calculatedValue;
      } else {
        tempItem.item.statCalculatorDetails.stats = [
          ...tempItem.item.statCalculatorDetails.stats,
          { name: statName, iv: stat, ev: 0 },
        ];
      }
      setItem && setItem(tempItem);
    } else if (tempItem?.item) {
      tempItem.item = {
        ...tempItem.item,
        statCalculatorDetails: {
          level: tempItem.item.statCalculatorDetails?.level || 1,
          stats: [
            {
              name: statName,
              iv: stat,
              ev: 0,
              calculatedBase,
              calculatedValue,
            },
          ],
        },
      };

      setItem && setItem(tempItem);
    }
  };

  const handleEVStat = (statName: string, statValue?: string) => {
    let stat = statValue ? parseInt(statValue) : 0;

    if (item?.item.statCalculatorDetails?.stats) {
      const totalEVs =
        Object.keys(statShortHand)
          .filter((key) => key !== statName)
          .reduce(
            (prev, curr) =>
              prev +
              ((item.item.statCalculatorDetails?.stats &&
                item.item.statCalculatorDetails.stats.find(
                  (s) => s.name === curr
                )?.ev) ||
                0),
            0
          ) + stat;

      if (item.item.statCalculatorDetails.stats && totalEVs > 510) {
        stat =
          item.item.statCalculatorDetails.stats.find((s) => s.name === statName)
            ?.ev || 0;
      } else if (stat > 252) {
        stat = 252;
      } else if (stat < 0) {
        stat = 0;
      }
    }

    const { calculatedValue, calculatedBase } = handleCalculate(statName);

    const tempItem = cloneDeep(item);

    if (tempItem?.item.statCalculatorDetails?.stats) {
      const currentStatIndex =
        tempItem.item.statCalculatorDetails?.stats?.findIndex(
          (s) => s.name === statName
        );

      if (currentStatIndex !== undefined && currentStatIndex >= 0) {
        tempItem.item.statCalculatorDetails.stats[currentStatIndex].ev = stat;
        tempItem.item.statCalculatorDetails.stats[
          currentStatIndex
        ].calculatedBase = calculatedBase;
        tempItem.item.statCalculatorDetails.stats[
          currentStatIndex
        ].calculatedValue = calculatedValue;
      } else {
        tempItem.item.statCalculatorDetails.stats = [
          ...tempItem.item.statCalculatorDetails.stats,
          { name: statName, ev: stat, iv: 0 },
        ];
      }
      setItem && setItem(tempItem);
    } else if (tempItem?.item) {
      tempItem.item = {
        ...tempItem.item,
        statCalculatorDetails: {
          level: tempItem.item.statCalculatorDetails?.level || 1,
          stats: [
            {
              name: statName,
              iv: 0,
              ev: stat,
              calculatedBase,
              calculatedValue,
            },
          ],
        },
      };

      setItem && setItem(tempItem);
    }
  };

  return (
    <Column
      className={`h-[400px] overflow-y-auto scrollbar ${
        light ? "light" : "dark"
      } gap-5`}
    >
      <Span>{`Manage stats for ${item?.item.name}`}</Span>
      <NumberField
        label="Level (max 100)"
        value={(item?.item.statCalculatorDetails?.level || 0).toString()}
        onValueChange={handleLevel}
      />
      <Column className={`gap-2 flex-1`}>
        <Row className={`gap-2 w-full items-center`}>
          <Span className={`flex w-[50px] justify-center`}>Stat</Span>
          <Row className={`w-full gap-2 justify-end flex-1`}>
            <Span className={`flex w-[50px] justify-center`}>IVs</Span>
            <Span className={`flex w-[50px] justify-center`}>EVs</Span>
            <Span className={`flex w-[50px] justify-center`}>Base</Span>
            <Span className={`flex w-[50px] justify-center`}>Calc</Span>
          </Row>
        </Row>
        {item?.item.stats?.map((o, index) => (
          <Row className={`gap-2 w-full items-center`} key={index}>
            <Span className={`w-[50px]`}>
              {statShortHand[o.name].toLocaleUpperCase()}
            </Span>
            <Row className={`w-full gap-2 justify-end flex-1`}>
              {" "}
              <NumberField
                value={
                  (item.item.statCalculatorDetails?.stats &&
                    item.item.statCalculatorDetails.stats
                      .find((s) => s.name === o.name)
                      ?.iv?.toString()) ||
                  ""
                }
                onValueChange={(value) => handleIVStat(o.name, value)}
                className={`max-w-[50px]`}
              />
              <NumberField
                value={
                  (item.item.statCalculatorDetails?.stats &&
                    item.item.statCalculatorDetails.stats
                      .find((s) => s.name === o.name)
                      ?.ev?.toString()) ||
                  ""
                }
                onValueChange={(value) => handleEVStat(o.name, value)}
                className={`max-w-[50px]`}
              />
              <Span className={`flex w-[50px] justify-center`}>
                {item.item.statCalculatorDetails?.stats?.find(
                  (s) => s.name === o.name
                )?.calculatedBase
                  ? item.item.statCalculatorDetails.stats.find(
                      (s) => s.name === o.name
                    )?.calculatedBase
                  : item.item.stats
                  ? item.item.stats.find((s) => s.name === o.name)?.value
                  : 0}
              </Span>
              <Span className={`flex w-[50px] justify-center`}>
                {item.item.statCalculatorDetails?.stats?.find(
                  (s) => s.name === o.name
                )?.calculatedValue
                  ? item.item.statCalculatorDetails.stats.find(
                      (s) => s.name === o.name
                    )?.calculatedValue
                  : 0}
              </Span>
            </Row>
          </Row>
        ))}
      </Column>
    </Column>
  );
};
