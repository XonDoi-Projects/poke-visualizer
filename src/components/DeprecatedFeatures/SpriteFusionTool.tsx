import {
  Column,
  Container,
  H5,
  Row,
  Span,
} from "@/components/LayoutComponents";
import { Autocomplete } from "@/components/LayoutComponents/Autocomplete/Autocomplete";
import {} from "@/components/LayoutComponents/Inputs";
import { useDarkTheme } from "@/components/Providers";
import { PokeDetails, getMergedPokemon } from "@/utils";
import {} from "autoprefixer";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

export interface SpriteFusionToolProps {
  pokemon: PokeDetails;
}

export const SpriteFusionTool: FunctionComponent<SpriteFusionToolProps> = ({
  pokemon,
}) => {
  const { light } = useDarkTheme();

  const [search, setSearch] = useState("");
  const [pokemonTwo, setPokemonTwo] = useState<PokeDetails>();

  const [imageUrl, setImageUrl] = useState("");

  const getData = async () => {
    const data = await fetch("/api/pokemon/get-autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });

    return await data.json();
  };

  const { data, error, isLoading } = useQuery<{
    data: PokeDetails[] | undefined;
    count: number | undefined;
  }>({
    queryKey: ["getData", search],
    queryFn: getData,
    enabled: search ? true : false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const dropShadow = clsx({
    "drop-shadow-no-offset-light": light,
    "drop-shadow-no-offset-dark": !light,
  });

  const getImageUrl = useCallback(async () => {
    if (pokemonTwo) {
      const data = await getMergedPokemon(pokemon.index, pokemonTwo.index);

      setImageUrl(data);
    }
  }, [pokemonTwo, pokemon]);

  useEffect(() => {
    if (pokemon && pokemonTwo) {
      getImageUrl();
    }
  }, [pokemon, pokemonTwo, getImageUrl]);

  return (
    <Column className={`flex-1 gap-5 items-start`}>
      <H5>Sprite Fusion Tool</H5>
      <Row className={`w-full justify-between gap-5 flex-wrap`}>
        <Span
          className={`max-w-[300px]`}
        >{`Select a pokemon to fuse with ${pokemon.name.toLocaleUpperCase()}`}</Span>
        <Autocomplete
          label=""
          list={data?.data || []}
          search={search}
          setSearch={setSearch}
          option={pokemonTwo}
          setOption={(value: PokeDetails) => {
            setPokemonTwo(value);
            setSearch(value.name);
          }}
          getDisplayName={(value: PokeDetails) => value.name}
          className={`max-w-[300px]`}
        />
      </Row>

      <Row className={`w-full flex-wrap gap-5`}>
        <Column className={`flex-1`}>
          <Container className={`h-[200px] w-[200px]`}>
            <picture>
              <Image
                src={imageUrl}
                alt="Fusion"
                sizes={`100vw`}
                width={0}
                height={0}
                className={`w-auto h-[250px] ${dropShadow}`}
              />
            </picture>
          </Container>
        </Column>
      </Row>
    </Column>
  );
};
