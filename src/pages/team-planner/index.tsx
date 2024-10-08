import { useEffect } from "react";
import { Builder, Page } from "../../components/PageComponents";

const TeamBuilderPage = () => {
  useEffect(() => {
    document.title = "PokePlan - Team Builder";
  }, []);

  return (
    <Page>
      <Builder />
    </Page>
  );
};

export default TeamBuilderPage;
