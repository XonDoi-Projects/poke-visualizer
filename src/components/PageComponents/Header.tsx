import {
  Button,
  Column,
  Container,
  Row,
  Small,
  Span,
} from "@/components/LayoutComponents";
import { useDarkTheme, useData } from "..";
import { BiAdjust, BiGroup, BiRefresh } from "react-icons/bi";
import Image from "next/image";
import { PokemonAutocomplete } from "./Dex/PokemonAutocomplete/PokemonAutocomplete";
import { useRouter } from "next/router";
import { Chip } from "../LayoutComponents/Chip";

export const Header = () => {
  const { light, setLight } = useDarkTheme();
  const {
    loadingState,
    syncInBackground,
    setSyncInBackground,
    isRecentlyUpdated,
    isCheckingData,
    isBeingUpdated,
  } = useData();

  const router = useRouter();

  return (
    <Row
      className={`h-[50px] z-10 sticky justify-between items-center transition-all gap-2 ${
        light
          ? "bg-slate-200 shadow-bottom shadow-slate-300"
          : "bg-gray-900 shadow-bottom shadow-gray-800"
      } `}
    >
      <Row className={`flex-1 gap-2`}>
        <Container
          className={`relative min-w-[80px] w-[80px] items-center justify-center pl-5`}
        >
          <picture>
            <Image
              src={light ? "/PokeVis_Logo_Light.png" : "/PokeVis_Logo_Dark.png"}
              alt="Logo"
              sizes="100vw"
              width="0"
              height="0"
              className="w-auto h-full"
              loading="lazy"
              fetchPriority="low"
            />
          </picture>
        </Container>
        <Container className={`min-w-[100px] h-[30px]`}>
          <PokemonAutocomplete
            setPokemon={(value) => router.push(`/dex/${value?.index}`)}
            noDropDownOnClick
            placeHolder="Search . . ."
            label=""
          />
        </Container>
        <Container className="relative flex flex-row">
          <Button
            className={`!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all`}
            type="text"
            tooltip
            tooltipDetails={
              <Container>
                <Small
                  className={` ${
                    light ? "text-blue-900" : "text-slate-300"
                  } text-wrap pointer-events-none`}
                >{`${
                  isRecentlyUpdated
                    ? "Database is up to date!"
                    : isBeingUpdated
                    ? "Database is currently being updated!"
                    : syncInBackground
                    ? `Syncing in Progress ${loadingState}%`
                    : "You can sync data once a day"
                }`}</Small>
                {!isRecentlyUpdated && !syncInBackground && !isBeingUpdated ? (
                  <Chip
                    value="Update"
                    onClick={() => setSyncInBackground(true)}
                    className={`cursor-pointer ${
                      light ? "bg-blue-950" : "bg-yellow-500"
                    } `}
                    contrast={!light}
                  />
                ) : null}
              </Container>
            }
            disable={
              isRecentlyUpdated ||
              isBeingUpdated ||
              isCheckingData ||
              syncInBackground
            }
          >
            <BiRefresh
              className={`${syncInBackground ? "animate-spin-icon" : ""} ${
                light
                  ? "text-blue-950 group-hover:text-blue-800"
                  : "text-yellow-500 group-hover:text-yellow-400"
              }`}
              style={{ fontSize: "20px" }}
            />
          </Button>
        </Container>
      </Row>

      <Container className="flex flex-1 flex-row-reverse z-[3] pr-2 gap-1">
        <Button
          onClick={() => setLight(!light)}
          className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
          type="text"
        >
          <BiAdjust
            className={
              light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-yellow-500 group-hover:text-yellow-400"
            }
            style={{ fontSize: "20px" }}
          />
        </Button>
        <Button
          onClick={() => router.push("/team-planner")}
          className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
          type="text"
        >
          <BiGroup
            className={
              light
                ? "text-blue-950 group-hover:text-blue-800"
                : "text-yellow-500 group-hover:text-yellow-400"
            }
            style={{ fontSize: "20px" }}
          />
        </Button>
      </Container>
    </Row>
  );
};
