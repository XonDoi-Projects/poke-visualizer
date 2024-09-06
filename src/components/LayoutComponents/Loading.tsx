import { Container } from "./Container";
import { PokeBall } from "../PageComponents";

export const Loading = () => {
  return (
    <Container
      className={`relative w-[50px] h-[50px] bg-transparent items-center justify-center animate-pokeball-shake`}
    >
      <PokeBall isLoading />
    </Container>
  );
};
