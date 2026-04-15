import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Desktop from "../../../imports/Desktop5";
import { TRACKS } from "../../../data/music";
import { fetchTracksFromR2 } from "../../contexts/MusicContext";
import { useMusicContext } from "../../contexts/MusicContext";
import type { Track } from "../../../data/types";
import ScaledCanvas from "../ScaledCanvas";

export default function MusicHomePage() {
  const navigate = useNavigate();
  const { play } = useMusicContext();
  const [tracks, setTracks] = useState<Track[]>(TRACKS);

  // Try to load the real track listing from R2 on first render.
  // Falls back to the static TRACKS array if the network request fails.
  useEffect(() => {
    fetchTracksFromR2()
      .then((r2Tracks) => {
        if (r2Tracks.length > 0) setTracks(r2Tracks);
      })
      .catch(() => {});
  }, []);

  const handleTrackSelect = (track: Track) => {
    play(track);
    navigate("/music/player");
  };

  return (
    <ScaledCanvas>
      <Desktop recentTracks={tracks} onTrackSelect={handleTrackSelect} />
    </ScaledCanvas>
  );
}
