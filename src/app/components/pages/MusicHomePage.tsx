import { useNavigate } from "react-router";
import Desktop from "../../../imports/Desktop5";
import { TRACKS } from "../../../data/music";
import { useMusicContext } from "../../contexts/MusicContext";
import type { Track } from "../../../data/types";

export default function MusicHomePage() {
  const navigate = useNavigate();
  const { play } = useMusicContext();

  const handleTrackSelect = (track: Track) => {
    play(track);
    navigate("/music/player");
  };

  return (
    <div className="size-full overflow-auto">
      <div className="relative w-[1920px] h-[1080px] mx-auto">
        <Desktop recentTracks={TRACKS} onTrackSelect={handleTrackSelect} />
      </div>
    </div>
  );
}
