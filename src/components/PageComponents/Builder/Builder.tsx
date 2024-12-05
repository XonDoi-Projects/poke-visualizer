import {
  Button,
  Card,
  Column,
  Container,
  H2,
  H3,
  InfoButton,
  Row,
  Small,
  Span,
  Tabular,
} from "@/components/LayoutComponents";
import {
  MoveDetailsType,
  PokeDetails,
  PokeRegion,
  pokeRegions,
  PokeTrait,
  pokeTraits,
  PokeType,
  pokeTypes,
  StatCalculatorWithLevelType,
} from "@/utils";
import { useMemo, useState } from "react";
import { PokemonAutocomplete } from "../PageAutocomplete/PokemonAutocomplete";
import { DragArea } from "@/components/LayoutComponents/DragAround";
import { Selector } from "@/components/LayoutComponents/Selector";
import { useDarkTheme } from "@/components/Providers";
import { BiSlider } from "react-icons/bi";
import { Suggester } from "./Suggester";
import Head from "next/head";

export interface PokeDetailsWithSelectedMovesStatCalculator
  extends PokeDetails {
  selectedMoves?: MoveDetailsType[];
  statCalculatorDetails?: StatCalculatorWithLevelType;
}

export interface PlannerDetails {
  my: PokeDetailsWithSelectedMovesStatCalculator[];
  enemy: PokeDetailsWithSelectedMovesStatCalculator[];
}

export const Builder = () => {
  const { light } = useDarkTheme();
  const [plannerDetails, setPlannerDetails] = useState<PlannerDetails>({
    my: [],
    enemy: [],
  });

  const [showTypes, setShowTypes] = useState(true);
  const [activeTab, setActiveTab] = useState("My Team");

  const [expandFilter, setExpandFilter] = useState(false);

  const [region, setRegion] = useState<PokeRegion>("all");
  const [trait, setTrait] = useState<PokeTrait>("all");
  const [types, setTypes] = useState<PokeType[]>(["all"]);

  const pokemons = useMemo(
    () =>
      activeTab === "My Team" ? plannerDetails?.my : plannerDetails?.enemy,
    [activeTab, plannerDetails]
  );

  const helperText = useMemo(() => {
    const filter = [region, trait, ...types]
      .filter((f) => f !== "all")
      .map((f) => f.slice(0, 1).toUpperCase() + f.slice(1));

    if (filter.length > 1) {
      return `${filter.slice(0, -1).join(", ")} and ${filter.slice(-1)}`;
    } else if (filter.length === 1) {
      return filter[0];
    }
    return;
  }, [region, trait, types]);

  const handleReset = () => {
    setRegion("all");
    setTrait("all");
    setTypes(["all"]);
  };

  return (
    <Column className={`relative gap-5`}>
      <Head>
        {/* Page SEO */}
        <title>{`PokePlan - Team Builder and Planner `}</title>
        <meta
          name="description"
          content={`Plan your Pokemon Team by selecting their moves and position. Compare the stats of your team with enemy team to maximize your chances of winning!`}
        />
        <link href={`https://www.pokeplan.com/team-planner`} />
      </Head>
      <H2>Team Planner</H2>
      <Row className={`justify-start items-center gap-3`}>
        <Container className={`min-w-[150px]`}>
          <PokemonAutocomplete
            label={`Select your Pokemon ${pokemons.length}/6`}
            pokemon={undefined}
            setPokemon={(data) => {
              if (data) {
                if (activeTab === "My Team") {
                  setPlannerDetails((prev) => ({
                    ...prev,
                    my: [...prev.my, data],
                  }));
                } else {
                  setPlannerDetails((prev) => ({
                    ...prev,
                    enemy: [...prev.enemy, data],
                  }));
                }
              }
            }}
            disable={pokemons.length >= 6}
            helperText={helperText ? `${`Current Filters: ${helperText}`}` : ""}
            filter={{
              region,
              trait,
              types,
            }}
          />
        </Container>
        {!expandFilter ? (
          <Container className={`mt-[25px]`}>
            <Button
              onClick={() => setExpandFilter(!expandFilter)}
              className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
              type="text"
            >
              <BiSlider
                className={
                  light
                    ? "text-blue-900 group-hover:text-blue-800"
                    : "text-slate-300 group-hover:text-slate-200"
                }
                style={{ fontSize: "24px" }}
              />
            </Button>
          </Container>
        ) : null}
      </Row>

      {expandFilter ? (
        <Column className={`gap-2`}>
          <Row className={`flex-wrap gap-5`}>
            <Container className={`flex-1 min-w-[150px]`}>
              <Selector
                label="Region"
                list={pokeRegions.map((p) => p[0].toUpperCase() + p.slice(1))}
                options={[region[0].toUpperCase() + region.slice(1)]}
                setOptions={(value: PokeRegion[]) => {
                  setRegion(value[0].toLowerCase() as PokeRegion);
                }}
              />
            </Container>

            <Container className={`flex-1 min-w-[150px]`}>
              <Selector
                label="Type"
                list={pokeTypes.map((p) => p[0].toUpperCase() + p.slice(1))}
                options={types.map((t) => t[0].toUpperCase() + t.slice(1))}
                setOptions={(value: PokeType[]) => {
                  if (value[0].toLowerCase() === "all") {
                    setTypes((prev) => [
                      ...prev.filter((p) => p === "all"),
                      ...value.map((v) => v.toLowerCase() as PokeType),
                    ]);
                  } else {
                    setTypes((prev) => [
                      ...prev.filter((p) => p !== "all"),
                      ...value.map((v) => v.toLowerCase() as PokeType),
                    ]);
                  }
                }}
                deleteOptions={(value: PokeType[]) => {
                  if (!value.length) {
                    setTypes(["all"]);
                  } else {
                    setTypes(value.map((v) => v.toLowerCase() as PokeType));
                  }
                }}
                isMultipleOption
                ignoreOptionsWhenMultiple={["all"].map(
                  (p) => p[0].toUpperCase() + p.slice(1)
                )}
                disable={types?.length >= 2}
              />
            </Container>

            <Container className={`flex-1 min-w-[150px]`}>
              <Selector
                label="Special Trait"
                list={pokeTraits.map((p) => p[0].toUpperCase() + p.slice(1))}
                options={[trait[0].toUpperCase() + trait.slice(1)]}
                setOptions={(value: PokeTrait[]) => {
                  setTrait(value[0].toLowerCase() as PokeTrait);
                }}
              />
            </Container>
          </Row>
          <Row className={`gap-2`}>
            <Button className={`h-[30px] rounded-full`} onClick={handleReset}>
              Reset
            </Button>
            <Button
              className={`h-[30px] rounded-full`}
              onClick={() => setExpandFilter(!expandFilter)}
            >
              Hide
            </Button>
          </Row>
        </Column>
      ) : null}
      <Row className={`relative flex-wrap gap-5`}>
        <Column className={`relative flex-1 rounded gap-2 p-3`}>
          <Row className={`justify-between items-center`}>
            <H3>Team</H3>
            <InfoButton
              tooltipDetails={
                <Column className={`w-[150px] gap-2`}>
                  {" "}
                  <Small
                    className={`${light ? "text-blue-900" : "text-slate-300"} `}
                  >
                    STAT Base / Effective.
                  </Small>
                  <Small
                    className={`${light ? "text-blue-900" : "text-slate-300"} `}
                  >
                    Effective stats take into consideration the level you
                    select.
                  </Small>
                  <Small
                    className={`${light ? "text-blue-900" : "text-slate-300"} `}
                  >
                    Base stats simply add the IVs and EVs you select.
                  </Small>
                </Column>
              }
            />
          </Row>

          <Tabular
            tabs={["My Team", "Enemy Team"]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            <DragArea
              list={pokemons}
              setList={(data) => {
                if (activeTab === "My Team") {
                  setPlannerDetails((prev) => ({
                    ...prev,
                    my: data,
                  }));
                } else {
                  setPlannerDetails((prev) => ({
                    ...prev,
                    enemy: data,
                  }));
                }
              }}
              isEnemy={activeTab === "Enemy Team"}
            />{" "}
          </Tabular>
        </Column>
        <Column className={`relative flex-1 rounded gap-2 w-full p-3`}>
          <Row className={`justify-between items-center`}>
            <H3>{showTypes ? "Type Composition" : "Stat Details"}</H3>
            <Button className={`rounded-full`}>
              <Small
                onClick={() => setShowTypes(!showTypes)}
                className={`${!light ? "text-blue-900" : "text-slate-300"}  `}
              >
                {showTypes ? "See Stats" : "See Types"}
              </Small>
            </Button>
          </Row>

          {Object.values(plannerDetails).flatMap((t) => t).length ? (
            <Suggester
              plannerDetails={plannerDetails}
              setShowTypes={setShowTypes}
              showTypes={showTypes}
            />
          ) : (
            <Card
              className={`flex-1 items-center justify-center rounded-md opacity-40 min-h-[200px]`}
              noShadow
            >
              <Span>Start building your team!</Span>
            </Card>
          )}
        </Column>
      </Row>
    </Column>
  );
};
