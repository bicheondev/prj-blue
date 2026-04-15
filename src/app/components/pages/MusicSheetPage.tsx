import { useMemo } from "react";
import { useNavigate } from "react-router";
import Desktop from "../../../imports/Desktop7";
import { useMusicContext } from "../../contexts/MusicContext";
import ScaledCanvas from "../ScaledCanvas";

export default function MusicSheetPage() {
  const navigate = useNavigate();
  const music = useMusicContext();

  const activeLyricIndex = useMemo(() => {
    const track = music.currentTrack;
    if (!track?.lyrics?.length) return 0;
    return Math.min(
      Math.floor((music.currentTime / track.duration) * track.lyrics.length),
      track.lyrics.length - 1
    );
  }, [music.currentTime, music.currentTrack]);

  return (
    <ScaledCanvas>
      <Desktop
        track={music.currentTrack}
        isPlaying={music.isPlaying}
        currentTime={music.currentTime}
        repeat={music.repeat}
        shuffle={music.shuffle}
        onPlay={music.resume}
        onPause={music.pause}
        onNext={music.next}
        onPrev={music.prev}
        onRepeatToggle={music.toggleRepeat}
        onShuffleToggle={music.toggleShuffle}
        onNavigateToPlayer={() => navigate("/music/player")}
        activeLyricIndex={activeLyricIndex}
      />
    </ScaledCanvas>
  );
}
