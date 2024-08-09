import { useEffect } from "react";
import { Dex, Page } from "../../components/PageComponents";

const DexPage = () => {
  useEffect(() => {
    document.title = "Pokemon PokeDex - List";
  }, []);

  return (
    <Page>
      <Dex />
    </Page>
  );
};

export default DexPage;
