import {
  Button,
  Column,
  Container,
  Menu,
  Row,
  Small,
  Span,
} from "@/components/LayoutComponents";
import { useDarkTheme, useData } from "..";
import { BiAdjust, BiGroup, BiMenu, BiRefresh, BiSearch } from "react-icons/bi";
import Image from "next/image";
import { PokemonAutocomplete } from "./PageAutocomplete/PokemonAutocomplete";
import { useRouter } from "next/router";
import { Chip } from "../LayoutComponents/Chip";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickOutside } from "../Hooks";

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

  const [show, setShow] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const menuItems = [
    {
      icon: (
        <BiGroup
          className={
            light
              ? "text-blue-900 group-hover:text-blue-800"
              : "text-slate-300 group-hover:text-slate-200"
          }
          style={{ fontSize: "20px" }}
        />
      ),
      label: "Team Planner",
      link: "/team-planner",
    },
    {
      icon: (
        <BiGroup
          className={
            light
              ? "text-blue-900 group-hover:text-blue-800"
              : "text-slate-300 group-hover:text-slate-200"
          }
          style={{ fontSize: "20px" }}
        />
      ),
      label: "PokeDex",
      link: "/dex",
    },
  ];

  useClickOutside(menuRef, () => setShow(false));

  console.log(show);

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
          className={`relative min-w-[80px] w-[80px] items-center justify-center pl-2`}
        >
          <Link href={"/dex"}>
            <picture>
              <Image
                src={
                  light ? "/PokeVis_Logo_Light.png" : "/PokeVis_Logo_Dark.png"
                }
                alt="Logo"
                sizes="100vw"
                width="0"
                height="0"
                className="w-auto h-full"
                loading="lazy"
                fetchPriority="low"
              />
            </picture>
          </Link>
        </Container>
        <Container className={`min-w-[100px] h-[30px]`}>
          <PokemonAutocomplete
            setPokemon={(value) => router.push(`/dex/${value?.index}`)}
            noDropDownOnClick
            elementPrefix={
              <BiSearch
                className={
                  light
                    ? "text-blue-900 group-hover:text-blue-800"
                    : "text-slate-300 group-hover:text-slate-200"
                }
              />
            }
            label=""
          />
        </Container>
        <Container className="relative flex flex-row">
          <Button
            className={`!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all`}
            type="text"
            tooltip
            tooltipDetails={
              <Container className={`items-center`}>
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
                      light ? "bg-blue-900" : "bg-slate-300"
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
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }`}
              style={{ fontSize: "20px" }}
            />
          </Button>
        </Container>
      </Row>

      <Container className="flex flex-1 flex-row-reverse z-[3] pr-2 gap-1">
        <Container ref={menuRef} className="relative">
          <Button
            onClick={() => setShow(true)}
            className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
            type="text"
          >
            <BiMenu
              className={
                light
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "20px" }}
            />
          </Button>

          {show ? (
            <Menu menuItems={menuItems} onClose={() => setShow(false)} />
          ) : (
            <></>
          )}
        </Container>
        <Button
          onClick={() => setLight(!light)}
          className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
          type="text"
        >
          <BiAdjust
            className={
              light
                ? "text-blue-900 group-hover:text-blue-800"
                : "text-slate-300 group-hover:text-slate-200"
            }
            style={{ fontSize: "20px" }}
          />
        </Button>
      </Container>
    </Row>
  );
};
