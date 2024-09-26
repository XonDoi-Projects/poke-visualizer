import { IndexCard, Landing } from "@/components/PageComponents";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "PokeVis";
  });
  return (
    <Landing>
      <IndexCard />
    </Landing>
  );
};

export default Index;
