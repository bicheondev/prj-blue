export type DictionarySource =
  | "조선어대사전"
  | "비약과학기술용어사전"
  | "영조사전"
  | "중조사전"
  | "불조사전"
  | "일조사전"
  | "독조사전"
  | "로조사전";

export interface DictionarySense {
  number: string;
  definition: string;
}

export interface DictionaryEntry {
  id: string;
  headword: string;
  hanja?: string;
  southKorean?: string;
  partOfSpeech: string;
  senses: DictionarySense[];
  source: DictionarySource;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: number;
  imageUrl: string;
  lyrics: string[];
}

export interface KPFont {
  id: string;
  displayName: string;
  fontFamily: string;
  series: "KP계열" | "PK계열";
  preinstalledOnRedStar: boolean;
  downloadUrl: string;
}

export interface Product {
  id: string;
  manufacturer: string;
  name: string;
  price: number;
  imageUrl: string;
  category: "대동강맥주" | "평양소주";
}

export interface AcademicDocument {
  id: string;
  title: string;
  subtype: string;
  size: string;
  downloadUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  boldWords?: string[];
  date: string;
  imageUrl?: string;
  href?: string;
  category: string;
}
