import { useEffect } from "react";
import { Builder, Page } from "../../components/PageComponents";

const TeamBuilderPage = () => {
  useEffect(() => {
    document.title = "PokePlan - Team Planner";
  }, []);

  return (
    <Page>
      <Builder />
    </Page>
  );
};

export default TeamBuilderPage;
