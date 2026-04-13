import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TRACKS } from "../../data/music";
import type { Track } from "../../data/types";

interface MusicState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  repeat: boolean;
  shuffle: boolean;
  playlist: Track[];
}

interface MusicContextValue extends MusicState {
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [playlist] = useState<Track[]>(TRACKS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (!currentTrack) return t;
          if (t >= currentTrack.duration) {
            if (repeat) return 0;
            setIsPlaying(false);
            return currentTrack.duration;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentTrack, repeat]);

  const play = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);
  const resume = () => setIsPlaying(true);

  const next = () => {
    if (!currentTrack) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    let nextIdx: number;
    if (shuffle) {
      nextIdx = Math.floor(Math.random() * playlist.length);
    } else {
      nextIdx = (idx + 1) % playlist.length;
    }
    play(playlist[nextIdx]);
  };

  const prev = () => {
    if (!currentTrack) return;
    if (currentTime > 3) {
      setCurrentTime(0);
      return;
    }
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = (idx - 1 + playlist.length) % playlist.length;
    play(playlist[prevIdx]);
  };

  const seek = (seconds: number) => setCurrentTime(seconds);

  const setVolume = (v: number) => setVolumeState(Math.max(0, Math.min(1, v)));

  const toggleRepeat = () => setRepeat((r) => !r);
  const toggleShuffle = () => setShuffle((s) => !s);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        volume,
        repeat,
        shuffle,
        playlist,
        play,
        pause,
        resume,
        next,
        prev,
        seek,
        setVolume,
        toggleRepeat,
        toggleShuffle,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusicContext must be used within MusicProvider");
  return ctx;
}
