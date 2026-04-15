import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TRACKS } from "../../data/music";
import type { Track } from "../../data/types";

const R2_BASE = "https://pub-442c73edbe954e7fa0b162c33f3fc7d8.r2.dev";

/**
 * Fetch the track list from R2. Tries the following endpoints in order:
 *   1. /music/tracks.json  – structured JSON array of Track objects
 *   2. /music/musiclist    – newline-separated lines; each line may be:
 *        "no\ttitle\tartist\talbum\tyear"  (tab-separated)
 *        or just "no" (number-only fallback)
 *
 * Audio:  ${R2_BASE}/music/audio/${no}.mp3
 * Image:  ${R2_BASE}/music/image/${no}.jpg
 */
export async function fetchTracksFromR2(): Promise<Track[]> {
  // 1. Try structured JSON metadata
  try {
    const jsonRes = await fetch(`${R2_BASE}/music/tracks.json`);
    if (jsonRes.ok) {
      const data: Track[] = await jsonRes.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // fall through
  }

  // 2. Try plain musiclist (tab-separated or number-only)
  const res = await fetch(`${R2_BASE}/music/musiclist`);
  if (!res.ok) throw new Error(`Failed to fetch musiclist: ${res.status}`);
  const text = await res.text();
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return lines.map((line, idx) => {
    const parts = line.split("\t");
    const no = Number(parts[0]) || idx + 1;
    const title = parts[1] || `Track ${no}`;
    const artist = parts[2] || "";
    const album = parts[3] || "";
    const year = Number(parts[4]) || new Date().getFullYear();
    return {
      id: `r2-track-${no}`,
      no,
      title,
      artist,
      album,
      year,
      duration: 0,
      imageUrl: `${R2_BASE}/music/image/${no}.jpg`,
      audioUrl: `${R2_BASE}/music/audio/${no}.mp3`,
      lyrics: [],
    };
  });
}

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

  // Real HTML5 Audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Fallback interval for tracks without audioUrl
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialise audio element once
  if (audioRef.current === null) {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";
  }

  // Keep audio volume in sync with state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Wire up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      if (!currentTrack) return;
      const dur = audio.duration;
      if (isFinite(dur) && dur > 0) {
        // Update the track duration in state if it came from R2 with duration=0
        setCurrentTrack((prev) =>
          prev ? { ...prev, duration: Math.round(dur) } : prev
        );
      }
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        // Advance to next track
        nextRef.current();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeat, currentTrack]);

  // Stable ref to next() so the "ended" handler always calls the latest version
  const nextRef = useRef<() => void>(() => {});

  // ── Fallback interval (for tracks with no audioUrl) ──────────────────────
  const startFallbackInterval = (track: Track) => {
    stopFallbackInterval();
    intervalRef.current = setInterval(() => {
      setCurrentTime((t) => {
        if (t >= track.duration) {
          if (repeat) return 0;
          setIsPlaying(false);
          return track.duration;
        }
        return t + 1;
      });
    }, 1000);
  };

  const stopFallbackInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // ── Core actions ─────────────────────────────────────────────────────────

  const play = (track: Track) => {
    const audio = audioRef.current!;
    stopFallbackInterval();

    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);

    if (track.audioUrl) {
      audio.src = track.audioUrl;
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch((err) => {
        console.warn("Audio play failed:", err);
        setIsPlaying(false);
      });
    } else {
      // No real audio – use setInterval fallback
      audio.src = "";
      startFallbackInterval(track);
    }
  };

  const pause = () => {
    const audio = audioRef.current!;
    setIsPlaying(false);
    if (currentTrack?.audioUrl) {
      audio.pause();
    } else {
      stopFallbackInterval();
    }
  };

  const resume = () => {
    const audio = audioRef.current!;
    setIsPlaying(true);
    if (currentTrack?.audioUrl) {
      audio.play().catch((err) => {
        console.warn("Audio resume failed:", err);
        setIsPlaying(false);
      });
    } else if (currentTrack) {
      startFallbackInterval(currentTrack);
    }
  };

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

  // Store next in ref so the ended handler can call it without stale closure
  nextRef.current = next;

  const prev = () => {
    if (!currentTrack) return;
    const audio = audioRef.current!;
    const time = currentTrack.audioUrl ? audio.currentTime : currentTime;
    if (time > 3) {
      if (currentTrack.audioUrl) {
        audio.currentTime = 0;
      }
      setCurrentTime(0);
      return;
    }
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = (idx - 1 + playlist.length) % playlist.length;
    play(playlist[prevIdx]);
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current!;
    setCurrentTime(seconds);
    if (currentTrack?.audioUrl && isFinite(audio.duration)) {
      audio.currentTime = seconds;
    }
  };

  const setVolume = (v: number) => setVolumeState(Math.max(0, Math.min(1, v)));

  const toggleRepeat = () => setRepeat((r) => !r);
  const toggleShuffle = () => setShuffle((s) => !s);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      stopFallbackInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
