import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import DictionaryPage from "./components/pages/DictionaryPage";
import DictionaryResultsPage from "./components/pages/DictionaryResultsPage";
import MusicHomePage from "./components/pages/MusicHomePage";
import MusicPlayerPage from "./components/pages/MusicPlayerPage";
import MusicSheetPage from "./components/pages/MusicSheetPage";
import FontPage from "./components/pages/FontPage";
import NewsPage from "./components/pages/NewsPage";
import TranslatePage from "./components/pages/TranslatePage";
import PaperPage from "./components/pages/PaperPage";
import StorePage from "./components/pages/StorePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DictionaryPage },
      { path: "search", Component: DictionaryResultsPage },
      { path: "music", Component: MusicHomePage },
      { path: "music/player", Component: MusicPlayerPage },
      { path: "music/sheet", Component: MusicSheetPage },
      { path: "font", Component: FontPage },
      { path: "news", Component: NewsPage },
      { path: "translate", Component: TranslatePage },
      { path: "paper", Component: PaperPage },
      { path: "store", Component: StorePage },
    ],
  },
]);
