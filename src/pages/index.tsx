import { IndexCard, Landing } from "@/components/PageComponents";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "PokePlan | PokeDex and Team Planner";
  });
  return (
    <Landing>
      <IndexCard />
    </Landing>
  );
};

export default Index;
