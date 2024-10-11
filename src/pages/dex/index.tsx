import { useEffect } from "react";
import { Dex, Page } from "../../components/PageComponents";

const DexPage = () => {
  useEffect(() => {
    document.title = "PokePlan - PokeDex";
  }, []);

  return (
    <Page>
      <Dex />
    </Page>
  );
};

export default DexPage;
