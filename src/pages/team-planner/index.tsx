import { useEffect } from "react";
import { Builder, Page } from "../../components/PageComponents";

const TeamBuilderPage = () => {
  useEffect(() => {
    document.title = "PokeVis - Team Builder";
  }, []);

  return (
    <Page>
      <Builder />
    </Page>
  );
};

export default TeamBuilderPage;
