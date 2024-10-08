import { IndexCard, Landing } from "@/components/PageComponents";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "PokePlan";
  });
  return (
    <Landing>
      <IndexCard />
    </Landing>
  );
};

export default Index;
