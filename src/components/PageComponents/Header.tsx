import {
  Button,
  Container,
  Menu,
  Row,
  Small,
} from "@/components/LayoutComponents";
import { useDarkTheme, useData } from "..";
import {
  BiAdjust,
  BiGridAlt,
  BiGroup,
  BiMenu,
  BiRefresh,
  BiSearch,
} from "react-icons/bi";
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
        <BiGridAlt
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

  return (
    <Row
      className={`h-[60px] z-20 sticky justify-between items-center transition-all ${
        light
          ? "bg-slate-200 shadow-bottom shadow-slate-300"
          : "bg-gray-900 shadow-bottom shadow-gray-800"
      } `}
    >
      <Row className={`flex-1 gap-2 items-center`}>
        <Container
          className={`relative min-w-[90px] w-[100px] items-center justify-center pl-2`}
        >
          <Link href={"/dex"}>
            <picture>
              <Image
                src={
                  light ? "/PokePlan_Logo_Light.png" : "/PokePlan_Logo_Dark.png"
                }
                alt="Logo"
                sizes="100vw"
                width="0"
                height="0"
                className="w-[85px] h-[25px]"
                loading="lazy"
                fetchPriority="low"
              />
            </picture>
          </Link>
        </Container>
        <Container className={`min-w-[100px] h-[30px] items-center`}>
          <PokemonAutocomplete
            setPokemon={(value) => router.push(`/dex/bases/${value?.index}`)}
            noDropDownOnClick
            placeHolder="Search"
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
        <Container className="relative flex flex-row h-[60px] items-center justify-center">
          <Button
            className={`!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all`}
            type="text"
            tooltip
            tooltipDetails={
              <Container className={`items-center gap-1`}>
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
              style={{ fontSize: "24px" }}
            />
          </Button>
        </Container>
      </Row>

      <Container className="flex flex-1 flex-row-reverse z-[3] pr-2 gap-1">
        <Container
          ref={menuRef}
          className="relative h-[60px] items-center justify-center"
        >
          <Button
            onClick={() => setShow(!show)}
            className="!w-[30px] !h-[30px] rounded-[50%] !p-0 !m-0 transition-all"
            type="text"
          >
            <BiMenu
              className={
                light
                  ? "text-blue-900 group-hover:text-blue-800"
                  : "text-slate-300 group-hover:text-slate-200"
              }
              style={{ fontSize: "24px" }}
            />
          </Button>

          {show ? (
            <Menu menuItems={menuItems} onClose={() => setShow(false)} />
          ) : (
            <></>
          )}
        </Container>
        <Container className="relative h-[60px] items-center justify-center">
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
              style={{ fontSize: "24px" }}
            />
          </Button>
        </Container>
      </Container>
    </Row>
  );
};
