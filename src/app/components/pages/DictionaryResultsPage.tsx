import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import Desktop from "../../../imports/Desktop2";
import ScaledCanvas from "../ScaledCanvas";
import { DICTIONARY_ENTRIES } from "../../../data/dictionary";
import type { DictionarySource } from "../../../data/types";

export default function DictionaryResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const source = (searchParams.get("source") ?? "조선어대사전") as DictionarySource;
  const [pageSize, setPageSize] = useState(10);

  const allResults = useMemo(() => {
    if (!query) return [];
    return DICTIONARY_ENTRIES.filter(
      (e) => e.headword.includes(query) && e.source === source
    );
  }, [query, source]);

  const results = useMemo(() => allResults.slice(0, pageSize), [allResults, pageSize]);

  return (
    <ScaledCanvas>
      <Desktop
        query={query}
        source={source}
        results={results}
        totalCount={allResults.length}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </ScaledCanvas>
  );
}
