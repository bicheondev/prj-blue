import type { DictionaryEntry, DictionarySource } from "./types";

const ALL_SOURCES: DictionarySource[] = [
  "조선어대사전",
  "비약과학기술용어사전",
  "영조사전",
  "중조사전",
  "불조사전",
  "일조사전",
  "독조사전",
  "로조사전",
];

function makeEntries(base: Omit<DictionaryEntry, "id" | "source">): DictionaryEntry[] {
  return ALL_SOURCES.map((source) => ({
    ...base,
    id: `${base.headword}-${source}`,
    source,
  }));
}

export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  // 력사 group
  ...makeEntries({
    headword: "력사",
    hanja: "[歷史]",
    southKorean: "역사",
    partOfSpeech: "[명]",
    senses: [
      { number: "①", definition: "인물을 포함한 사물의 지나간 일 또는 그것을 기록하고 연구하고 서술하는것." },
      { number: "②", definition: "자연과 사회의 발전과정. 또는 그 발전과정을 기록한것." },
    ],
  }),
  ...makeEntries({
    headword: "력사가",
    hanja: "[歷史家]",
    southKorean: "역사가",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "력사를 전문으로 연구하거나 력사에 관한 저서를 쓴 사람." }],
  }),
  ...makeEntries({
    headword: "력사고고학",
    hanja: "[歷史考古學]",
    southKorean: "역사고고학",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "유물과 유적을 통하여 력사적사실을 연구하는 학문." }],
  }),
  ...makeEntries({
    headword: "력사국",
    hanja: "[歷史局]",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "국가기관에서 력사기록을 관리하는 부서." }],
  }),
  ...makeEntries({
    headword: "력사극",
    hanja: "[歷史劇]",
    southKorean: "역사극",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "력사적사실이나 력사적인물을 소재로 한 연극." }],
  }),
  ...makeEntries({
    headword: "력사기록",
    hanja: "[歷史記錄]",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "력사적사실을 기록한것. 또는 그 기록물." }],
  }),
  ...makeEntries({
    headword: "력사과학",
    hanja: "[歷史科學]",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "인류사회의 발전법칙을 과학적으로 연구하는 학문." }],
  }),
  ...makeEntries({
    headword: "력사관",
    hanja: "[歷史觀]",
    southKorean: "역사관",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "력사의 발전을 보는 근본관점. 세계관의 한 구성부분." }],
  }),
  // 주체 group
  ...makeEntries({
    headword: "주체",
    hanja: "[主體]",
    partOfSpeech: "[명]",
    senses: [
      { number: "①", definition: "자기자신을 중심으로 하여 독자적으로 서는 것." },
      { number: "②", definition: "조선로동당이 창시한 혁명과 건설의 지도적원칙." },
    ],
  }),
  ...makeEntries({
    headword: "주체사상",
    hanja: "[主體思想]",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "사람이 모든것의 주인이며 모든것을 결정한다는 혁명적인 세계관." }],
  }),
  // 동무 group
  ...makeEntries({
    headword: "동무",
    partOfSpeech: "[명]",
    senses: [
      { number: "①", definition: "혁명적리념과 목적을 같이하는 사람들사이에서 서로 부르는 말." },
      { number: "②", definition: "같이 사귀는 사람. 벗." },
    ],
  }),
  ...makeEntries({
    headword: "동무애",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "동무들사이의 정다운 사랑." }],
  }),
  // 선군 group
  ...makeEntries({
    headword: "선군",
    hanja: "[先軍]",
    partOfSpeech: "[명]",
    senses: [
      { number: "①", definition: "군사를 제일로, 군사를 우선으로 한다는 뜻." },
    ],
  }),
  ...makeEntries({
    headword: "선군정치",
    hanja: "[先軍政治]",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "군사를 국사중의 제일국사로 틀어쥐고 혁명과 건설에서 제기되는 모든 문제를 군대를 핵심, 주력으로 하여 풀어나가는 정치방식." }],
  }),
  // 로동 group
  ...makeEntries({
    headword: "로동",
    hanja: "[勞動]",
    southKorean: "노동",
    partOfSpeech: "[명]",
    senses: [
      { number: "①", definition: "목적의식적인 사람의 활동. 사람이 자연을 개조하여 물질적부와 정신적부를 창조하는 합목적적인 활동." },
    ],
  }),
  ...makeEntries({
    headword: "로동자",
    hanja: "[勞動者]",
    southKorean: "노동자",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "생산수단이 없어 로동력을 팔아 생활하는 사람." }],
  }),
  ...makeEntries({
    headword: "로동계급",
    hanja: "[勞動階級]",
    southKorean: "노동계급",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "자본주의사회에서 생산수단을 가지지 못하고 자본가에게 로동력을 팔아 생활하는 계급." }],
  }),
  // 인민 group
  ...makeEntries({
    headword: "인민",
    hanja: "[人民]",
    partOfSpeech: "[명]",
    senses: [
      { number: "①", definition: "국가나 사회의 구성원으로서의 사람들." },
      { number: "②", definition: "혁명과 건설의 주체로서의 근로대중." },
    ],
  }),
  ...makeEntries({
    headword: "인민군",
    hanja: "[人民軍]",
    partOfSpeech: "[명]",
    senses: [{ number: "①", definition: "인민의 리익을 옹호하는 군대. 조선인민군." }],
  }),
  // 조선 group
  ...makeEntries({
    headword: "조선",
    hanja: "[朝鮮]",
    partOfSpeech: "[명]",
    senses: [
      { number: "①", definition: "우리 나라의 국호." },
      { number: "②", definition: "조선민주주의인민공화국." },
    ],
  }),
];
