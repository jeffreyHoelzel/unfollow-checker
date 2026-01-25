import { useState } from "react";
import { useRouter } from "expo-router";
import { ImportScreen } from "../src/components/ImportScreen";
import { importInstagramExportZip } from "../src/instagram";
import { setReport } from "../src/utils/reportStore";
import type { InstagramFollowReport } from "../src/types/instagram";

const IndexScreen = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onImportZip = async () => {
    try {
      setError("");
      setIsLoading(true);

      const res: InstagramFollowReport | null = await importInstagramExportZip();
      console.log("importInstagramExportZip results", res);
      if (!res) {
        console.log("user canceled or import returned null");
        setIsLoading(false);
        return;
      }

      console.log("sotring report with notFollowingBack length", res.notFollowingBack.length);
      setReport(res);
      setIsLoading(false);
      console.log("stored report, navigating to results")
      router.push("/results");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error occured";
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <ImportScreen
      isLoading={isLoading}
      error={error}
      report={null}
      query=""
      filteredUsernames={[]}
      onImportZip={onImportZip}
      onChangeQuery={() => { }}
    />
  );
};

export default IndexScreen;
