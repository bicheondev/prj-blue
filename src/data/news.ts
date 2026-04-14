import type { NewsArticle } from "./types";

import imgNews1 from "figma:asset/34370a3be1383dad9886e220f71773affb3babd1.png";
import imgNews2 from "figma:asset/a77de02448a9c17068f0f4aa04a1297d0b1d2196.png";
import imgNews3 from "figma:asset/70df2ba76a2cfc797bc2594bcfe10a4c70970796.png";
import imgNews4 from "figma:asset/193fa53385d43edcbf0da22794ed80de63493649.png";
import imgNews5 from "figma:asset/711e5e93f98aabbaa53bf43d9e79daa0569aed3f.png";

export const NEWS_ARTICLES: NewsArticle[] = [
  // 경애하는 김정은동지의 혁명활동소식
  {
    id: "news-1",
    title: "조선로동당 중앙군사위원회 제8기 제8차확대회의 진행",
    date: "2025.05.30.",
    imageUrl: imgNews1,
    category: "경애하는 김정은동지의 혁명활동소식",
  },
  {
    id: "news-2",
    title: "경애하는 김정은동지께서 조선인민군 대련합부대 포병구분대들사이의 포사격경기를 참관하시였다",
    boldWords: ["김정은"],
    date: "2025.05.30.",
    imageUrl: imgNews2,
    category: "경애하는 김정은동지의 혁명활동소식",
  },
  {
    id: "news-3",
    title: "경애하는 김정은동지께서 총련일군들과 재일동포들에게 서한을 보내시였다",
    boldWords: ["김정은"],
    date: "2025.05.25.",
    href: "http://kcna.kp/kp/article/q/1232b69e8b1e482ae2115239f973d0c7.kcmsf",
    category: "경애하는 김정은동지의 혁명활동소식",
  },
  {
    id: "news-4",
    title: "새로 건조한 구축함진수식 진행",
    date: "2025.05.22.",
    category: "경애하는 김정은동지의 혁명활동소식",
  },
  {
    id: "news-5",
    title: "경애하는 김정은동지께서 현철해동지 서거 ３돐에 즈음하여 신미리애국렬사릉을 찾으시였다",
    boldWords: ["김정은"],
    date: "2025.05.19.",
    imageUrl: imgNews3,
    category: "경애하는 김정은동지의 혁명활동소식",
  },
  {
    id: "news-6",
    title: "경애하는 김정은동지께서 조선인민군 근위 제１공군사단관하 비행련대를 방문하시고 훈련을 지도하시였다",
    boldWords: ["김정은"],
    date: "2025.05.17.",
    imageUrl: imgNews4,
    category: "경애하는 김정은동지의 혁명활동소식",
  },
  // 중요소식
  {
    id: "news-7",
    title: "조선로동당 중앙군사위원회 제8기 제8차확대회의 진행",
    date: "2025.05.30.",
    imageUrl: imgNews1,
    category: "중요소식",
  },
  {
    id: "news-8",
    title: "경애하는 김정은동지께서 조선인민군 대련합부대 포병구분대들사이의 포사격경기를 참관하시였다",
    boldWords: ["김정은"],
    date: "2025.05.30.",
    imageUrl: imgNews2,
    category: "중요소식",
  },
  // 혁명일화
  {
    id: "news-9",
    title: "과외교육교양기지에 깃든 다심한 사랑",
    date: "2025.05.31.",
    href: "http://kcna.kp/kp/article/q/f1e68d8804f16b21f60c4e3a18a5c4c9.kcmsf",
    category: "혁명일화",
  },
  {
    id: "news-10",
    title: "친히 보내주도록 하신 발전설비",
    date: "2025.05.30.",
    category: "혁명일화",
  },
  {
    id: "news-11",
    title: "뜨락또르도 운전해보시며",
    date: "2025.05.25.",
    href: "http://kcna.kp/kp/article/q/ffde1aca5dee0053d2fffa43a6a2aaf9.kcmsf",
    category: "혁명일화",
  },
  {
    id: "news-12",
    title: "물고기비린내가 나는 랭장고안에도 들어가보시며",
    date: "2025.05.22.",
    category: "혁명일화",
  },
  {
    id: "news-13",
    title: "누구나 다 하여야 한다",
    date: "2025.05.19.",
    category: "혁명일화",
  },
];
