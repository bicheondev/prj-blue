import { useState } from "react";
import Desktop from "../../../imports/Desktop10";
import ScaledCanvas from "../ScaledCanvas";

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    const text = sourceText.trim();
    if (!text) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ko`
      );
      const data = await res.json();
      setTranslatedText(data?.responseData?.translatedText ?? "번역에 실패했습니다.");
    } catch {
      setTranslatedText("번역 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <ScaledCanvas>
      <Desktop
        sourceText={sourceText}
        translatedText={translatedText}
        isLoading={isLoading}
        onSourceTextChange={setSourceText}
        onTranslate={handleTranslate}
        onSwap={handleSwap}
      />
    </ScaledCanvas>
  );
}
