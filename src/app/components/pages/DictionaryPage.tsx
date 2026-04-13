import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Desktop from "../../../imports/Desktop1";
import { DICTIONARY_ENTRIES } from "../../../data/dictionary";
import type { DictionarySource } from "../../../data/types";

export default function DictionaryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeSource, setActiveSource] = useState<DictionarySource>("조선어대사전");
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const autocomplete = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim();
    return [
      ...new Set(
        DICTIONARY_ENTRIES.filter(
          (e) => e.headword.startsWith(q) && e.source === activeSource
        ).map((e) => e.headword)
      ),
    ].slice(0, 8);
  }, [query, activeSource]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setShowAutocomplete(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}&source=${encodeURIComponent(activeSource)}`);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowAutocomplete(value.trim().length > 0);
  };

  const handleAutocompleteSelect = (word: string) => {
    setQuery(word);
    setShowAutocomplete(false);
    navigate(`/search?q=${encodeURIComponent(word)}&source=${encodeURIComponent(activeSource)}`);
  };

  return (
    <div className="size-full overflow-auto" onClick={() => setShowAutocomplete(false)}>
      <div
        className="relative w-[1920px] h-[1080px] mx-auto"
        style={{ minWidth: 1200, transform: "scale(var(--page-scale, 1))", transformOrigin: "top center" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Desktop
          query={query}
          onQueryChange={handleQueryChange}
          onSearch={handleSearch}
          activeSource={activeSource}
          onSourceChange={setActiveSource}
          autocomplete={autocomplete}
          showAutocomplete={showAutocomplete}
          onAutocompleteSelect={handleAutocompleteSelect}
        />
      </div>
    </div>
  );
}
