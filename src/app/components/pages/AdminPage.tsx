import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const DRAWER_WIDTH = 220;
const R2_BASE_DEFAULT = "https://pub-442c73edbe954e7fa0b162c33f3fc7d8.r2.dev";
const MUSIC_LIST_URL = `${R2_BASE_DEFAULT}/music/musiclist`;

const DICT_LIST = ["KK", "GCIDE", "KCCK", "KEEK", "KJJK", "KDDK", "KRRK", "KFFK"];

interface AdminTrack {
  no: number;
  title: string;
}

const NAV_TABS = ["음악 관리", "가사 관리", "사전 관리", "설정"] as const;
type NavTab = (typeof NAV_TABS)[number];

function loadTracks(): AdminTrack[] {
  try {
    return JSON.parse(localStorage.getItem("admin_tracks") ?? "[]");
  } catch {
    return [];
  }
}

function saveTracks(tracks: AdminTrack[]) {
  localStorage.setItem("admin_tracks", JSON.stringify(tracks));
}

// ── Music Management ──────────────────────────────────────────────────────────

function MusicManagement() {
  const [tracks, setTracks] = useState<AdminTrack[]>(loadTracks);
  const [loading, setLoading] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminTrack | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchFromR2 = async () => {
    setLoading(true);
    try {
      const r2Base = localStorage.getItem("admin_r2_base") ?? R2_BASE_DEFAULT;
      const url = `${r2Base}/music/musiclist`;
      const res = await fetch(url);
      const text = await res.text();
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const parsed: AdminTrack[] = lines.map((line, idx) => ({
        no: idx + 1,
        title: line,
      }));
      setTracks(parsed);
      saveTracks(parsed);
    } catch (e) {
      console.error("R2 fetch failed", e);
      alert("R2에서 불러오기 실패: " + String(e));
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (track: AdminTrack) => {
    setEditTarget(track);
    setEditTitle(track.title);
  };

  const saveEdit = () => {
    if (!editTarget) return;
    const updated = tracks.map((t) =>
      t.no === editTarget.no ? { ...t, title: editTitle } : t
    );
    setTracks(updated);
    saveTracks(updated);
    setEditTarget(null);
  };

  const deleteTrack = (no: number) => {
    const updated = tracks.filter((t) => t.no !== no);
    setTracks(updated);
    saveTracks(updated);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Typography variant="h6">음악 관리</Typography>
        <Button
          variant="contained"
          startIcon={<CloudDownloadIcon />}
          onClick={fetchFromR2}
          disabled={loading}
        >
          {loading ? "불러오는 중..." : "R2에서 불러오기"}
        </Button>
      </Box>

      {tracks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }} elevation={0} variant="outlined">
          <Typography color="text.secondary">
            R2에서 트랙 목록을 불러오세요
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: "block" }}>
            {MUSIC_LIST_URL}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={60}>#</TableCell>
                <TableCell>제목</TableCell>
                <TableCell width={100} align="right">
                  관리
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.map((track) => (
                <TableRow key={track.no} hover>
                  <TableCell>{track.no}</TableCell>
                  <TableCell>{track.title}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(track)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteTrack(track.no)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={!!editTarget} onClose={() => setEditTarget(null)} fullWidth maxWidth="sm">
        <DialogTitle>트랙 제목 편집</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="제목"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTarget(null)}>취소</Button>
          <Button variant="contained" onClick={saveEdit}>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ── Lyrics Management ─────────────────────────────────────────────────────────

function LyricsManagement() {
  const [tracks] = useState<AdminTrack[]>(loadTracks);
  const [selectedTrack, setSelectedTrack] = useState<AdminTrack | null>(null);
  const [lyricsText, setLyricsText] = useState("");

  const selectTrack = (track: AdminTrack) => {
    setSelectedTrack(track);
    const stored = localStorage.getItem(`admin_lyrics_${track.no}`) ?? "";
    setLyricsText(stored);
  };

  const saveLyrics = () => {
    if (!selectedTrack) return;
    localStorage.setItem(`admin_lyrics_${selectedTrack.no}`, lyricsText);
    alert("저장되었습니다.");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
      <Box sx={{ width: 240, flexShrink: 0 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          가사 관리
        </Typography>
        {tracks.length === 0 ? (
          <Typography color="text.secondary" variant="body2">
            먼저 음악 관리 탭에서 트랙을 불러오세요.
          </Typography>
        ) : (
          <Paper variant="outlined" sx={{ overflow: "auto", maxHeight: 500 }}>
            <List dense disablePadding>
              {tracks.map((track) => (
                <ListItemButton
                  key={track.no}
                  selected={selectedTrack?.no === track.no}
                  onClick={() => selectTrack(track)}
                >
                  <ListItemText
                    primary={`${track.no}. ${track.title}`}
                    primaryTypographyProps={{ noWrap: true, variant: "body2" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      <Box sx={{ flex: 1 }}>
        {selectedTrack ? (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {selectedTrack.no}. {selectedTrack.title}
            </Typography>
            <TextareaAutosize
              minRows={16}
              style={{
                width: "100%",
                fontFamily: "monospace",
                fontSize: 14,
                padding: 8,
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: 4,
                resize: "vertical",
              }}
              placeholder="가사를 한 줄씩 입력하세요"
              value={lyricsText}
              onChange={(e) => setLyricsText(e.target.value)}
            />
            <Button variant="contained" sx={{ mt: 1 }} onClick={saveLyrics}>
              저장
            </Button>
          </>
        ) : (
          <Typography color="text.secondary">좌측에서 트랙을 선택하세요.</Typography>
        )}
      </Box>
    </Box>
  );
}

// ── Dictionary Management ─────────────────────────────────────────────────────

function DictionaryManagement() {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        사전 데이터베이스 정보
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          사용 중인 사전 목록
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>사전 코드</TableCell>
              <TableCell>다운로드 URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DICT_LIST.map((name) => (
              <TableRow key={name} hover>
                <TableCell>
                  <strong>{name}</strong>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://digitalnk.com/dics/${name}.db`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "monospace", fontSize: 13 }}
                  >
                    {`https://digitalnk.com/dics/${name}.db`}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2">
          상태: <strong>외부 SQLite DB 사용 중</strong>
        </Typography>
      </Paper>
    </Box>
  );
}

// ── Settings ──────────────────────────────────────────────────────────────────

function Settings() {
  const [r2Base, setR2Base] = useState(
    () => localStorage.getItem("admin_r2_base") ?? R2_BASE_DEFAULT
  );

  const save = () => {
    localStorage.setItem("admin_r2_base", r2Base);
    alert("저장되었습니다.");
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        설정
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          R2 Base URL
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            fullWidth
            size="small"
            value={r2Base}
            onChange={(e) => setR2Base(e.target.value)}
            placeholder={R2_BASE_DEFAULT}
          />
          <Button variant="contained" onClick={save}>
            저장
          </Button>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          사이트 안내
        </Typography>
        <Typography variant="body2" color="text.secondary">
          이 관리자 대시보드는 북한 음악 플레이어 사이트의 콘텐츠를 관리합니다.
          트랙 목록과 가사를 로컬 스토리지에 저장하고, R2 버킷에서 음악 파일을
          스트리밍합니다.
        </Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          버전 정보
        </Typography>
        <Typography variant="body2" color="text.secondary">
          버전: 1.0.0
          <br />
          플랫폼: React / Vite / MUI
        </Typography>
      </Paper>
    </Box>
  );
}

// ── Main AdminPage ────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<NavTab>("음악 관리");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ★ 관리자 대시보드
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              position: "relative",
              height: "auto",
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <List disablePadding>
            {NAV_TABS.map((tab) => (
              <ListItem key={tab} disablePadding>
                <ListItemButton
                  selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  <ListItemText primary={tab} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Content */}
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          {activeTab === "음악 관리" && <MusicManagement />}
          {activeTab === "가사 관리" && <LyricsManagement />}
          {activeTab === "사전 관리" && <DictionaryManagement />}
          {activeTab === "설정" && <Settings />}
        </Box>
      </Box>
    </Box>
  );
}
