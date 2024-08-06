import {
  Button,
  Column,
  Container,
  H3,
  H5,
  Row,
  Span,
} from "@/components/LayoutComponents";
import { total, useDarkTheme } from "@/components/Providers";
import { getMergedPokemon, getPokemonDataID } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { TypeChip } from "./TypeChip";
import {
  BiChevronLeft,
  BiChevronRight,
  BiGridAlt,
  BiMusic,
  BiSignal1,
  BiSignal2,
  BiVolume,
  BiVolumeFull,
} from "react-icons/bi";
import { Chip } from "@/components/LayoutComponents/Chip";
import { InputField } from "@/components/LayoutComponents/Inputs";
import { StatCompareTool } from "./StatCompareTool";

export const DexEntry = () => {
  const router = useRouter();

  const { light } = useDarkTheme();

  const [imageUrl, setImageUrl] = useState("");

  const currentIndex = useMemo(
    () => parseInt(router.query.id as string),
    [router.query]
  );

  const pokemon = useMemo(
    () => getPokemonDataID({ index: currentIndex }),
    [currentIndex]
  );

  const dropShadow = clsx({
    "drop-shadow-no-offset-light": light,
    "drop-shadow-no-offset-dark": !light,
  });

  const pointer = clsx({
    "cursor-auto": currentIndex <= 1 || currentIndex >= total,
    "cursor-pointer": currentIndex > 1 && currentIndex < total,
  });

  const audio = useMemo(
    () => (pokemon?.cry ? new Audio(pokemon.cry) : undefined),
    [pokemon]
  );

  const getImageUrl = async () => {
    const data = await getMergedPokemon(1, 1);

    setImageUrl(data);
  };

  return (
    pokemon && (
      <Column className={`w-full h-full p-5 items-center gap-10`}>
        <Row className={`gap-5 justify-between`}>
          <Row
            className={`relative items-center gap-2 h-[35px] w-[100px] justify-start`}
          >
            <Button
              onClick={() => router.push(`/dex/${currentIndex - 1}`)}
              className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all`}
              disable={currentIndex <= 1}
            >
              <BiChevronLeft
                className={light ? "text-slate-200" : "text-gray-900"}
                style={{ fontSize: "20px" }}
              />
            </Button>
            <Span>Prev</Span>
          </Row>
          <Button
            onClick={() => router.push(`/dex`)}
            className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all`}
          >
            <BiGridAlt
              className={light ? "text-slate-200" : "text-gray-900"}
              style={{ fontSize: "20px" }}
            />
          </Button>
          <Row
            className={`relative items-center gap-2 h-[35px] w-[100px] justify-end`}
          >
            <Span>Next</Span>
            <Button
              onClick={() => router.push(`/dex/${currentIndex + 1}`)}
              className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all `}
              disable={currentIndex >= total}
            >
              <BiChevronRight
                className={light ? "text-slate-200" : "text-gray-900"}
                style={{
                  fontSize: "20px",
                }}
              />
            </Button>
          </Row>
        </Row>

        <Row className={`gap-10 w-full flex-wrap`}>
          <Column className={`flex-[2] items-center justify-center gap-2`}>
            <H3 className={`mb-[7px]`}>{pokemon.name}</H3>
            <Container
              className={"relative flex-1 w-full items-center justify-center"}
            >
              <Container className={`absolute top-0 right-0 cursor-pointer`}>
                <Button
                  onClick={() => audio?.play()}
                  className={`items-center justify-center rounded-full w-[35px] h-[35px] ${pointer} transition-all`}
                >
                  <BiVolumeFull
                    className={light ? "text-slate-200" : "text-gray-900"}
                    style={{
                      fontSize: "24px",
                    }}
                  />
                </Button>
              </Container>

              <Image
                src={pokemon.imageLinkHighRes || pokemon.imageLink}
                alt="Pokemon Image"
                sizes="100vw"
                width="0"
                height="0"
                className={`w-auto h-[250px] ${dropShadow}`}
              />
            </Container>
          </Column>

          <Column className={`flex-1 gap-5`}>
            <Row className={`justify-between`}>
              <Column className={`w-full gap-2`}>
                <H5>Type</H5>
                <Row className={`gap-5`}>
                  {pokemon.types?.map((t) => (
                    <TypeChip key={t} value={t} />
                  ))}
                </Row>
              </Column>
            </Row>

            <Column className={`w-full gap-2`}>
              <H5>Description</H5>
              <Span>{pokemon.description}</Span>
            </Column>
            <Column className={`w-full gap-2`}>
              <H5>Forms</H5>
              <Row className={`gap-5`}>
                {pokemon.forms && pokemon.forms?.length > 1 ? (
                  pokemon.forms
                    .slice(1, pokemon.forms.length)
                    .map((f) => (
                      <Chip
                        key={f}
                        value={f}
                        className={`${
                          light ? "bg-blue-950" : "bg-yellow-500"
                        } `}
                        contrast={!light}
                      />
                    ))
                ) : (
                  <Span>No other forms.</Span>
                )}
              </Row>
            </Column>
          </Column>

          <Column className={`flex-1 gap-5`}>
            <Column className={`w-full gap-2`}>
              <H5>Abilities</H5>
              <Row className={`gap-5 flex-wrap`}>
                {pokemon.abilities?.map((a) => (
                  <Chip
                    key={a}
                    value={a}
                    className={`${light ? "bg-blue-950" : "bg-yellow-500"} `}
                    contrast={!light}
                  />
                ))}
              </Row>
            </Column>
            <Column className={`w-full gap-2`}>
              <H5>Stats</H5>
              <Column className={`gap-1`}>
                {pokemon.stats?.map((s) => (
                  <Row key={s.name}>
                    <Container className={`flex-1`}>
                      <Span>{s.name.toLocaleUpperCase()}</Span>
                    </Container>
                    <Container className={`flex-shrink-1`}>
                      <Span>{s.value.toString()}</Span>
                    </Container>
                  </Row>
                ))}
              </Column>
            </Column>
          </Column>
        </Row>
        <Row className={`flex-1 w-full gap-5`}>
          <StatCompareTool pokemon={pokemon} />
          <Column className={`flex-1`}>
            <Button onClick={() => getImageUrl()}>Get GitLab Project</Button>
            <Container className={`h-[200px] w-[200px]`}>
              <Image
                src={imageUrl}
                alt="Fusion"
                sizes={`100vw`}
                width={0}
                height={0}
                className={`w-auto h-[250px] ${dropShadow}`}
              />
            </Container>
          </Column>
        </Row>
      </Column>
    )
  );
};
