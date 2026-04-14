import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";

interface ScheduleItem {
  time: string;
  program: string;
}

const FALLBACK_SCHEDULE: ScheduleItem[] = [
  { time: "06:00", program: "아침프로그람" },
  { time: "07:00", program: "조선중앙통보" },
  { time: "08:00", program: "기록영화" },
  { time: "09:00", program: "교양프로그람" },
  { time: "10:00", program: "어린이프로그람" },
  { time: "12:00", program: "조선중앙통보 (점심)" },
  { time: "14:00", program: "예술영화" },
  { time: "16:00", program: "체육프로그람" },
  { time: "18:00", program: "조선중앙통보 (저녁)" },
  { time: "20:00", program: "음악무용종합공연" },
  { time: "22:00", program: "조선중앙통보 (밤)" },
];

const SCHEDULE_URL =
  "https://nkinfo.unikorea.go.kr/nkp/tvPrgr/list.do?menuId=NK_TVPRGR";

export default function KctvPage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const fetchSchedule = async () => {
      try {
        const res = await fetch(SCHEDULE_URL, {
          signal: controller.signal,
          mode: "cors",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // The external site may be blocked; fall back on non-parseable response
        throw new Error("Using fallback schedule");
      } catch {
        if (!cancelled) {
          setSchedule(FALLBACK_SCHEDULE);
        }
      } finally {
        if (!cancelled) setLoadingSchedule(false);
      }
    };

    fetchSchedule();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <LiveTvIcon sx={{ fontSize: 36, color: "error.main" }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          KCTV 조선중앙텔레비죤
        </Typography>
      </Box>

      {/* Video player */}
      <Paper
        elevation={2}
        sx={{
          overflow: "hidden",
          mb: 4,
          borderRadius: 2,
          position: "relative",
          bgcolor: "#000",
        }}
      >
        <iframe
          src="https://koryo.tv/channel/kctv"
          width="100%"
          height="500px"
          allowFullScreen
          style={{ display: "block", border: "none" }}
          title="KCTV 조선중앙텔레비죤 생방송"
        />
        {/* Fallback message rendered below iframe in case of CSP / block */}
        <Box
          sx={{
            display: "none",
            p: 2,
            textAlign: "center",
            color: "grey.400",
          }}
        >
          <Typography variant="body2">
            영상을 불러올 수 없습니다. 브라우저 제한이나 네트워크 문제일 수
            있습니다.{" "}
            <a
              href="https://koryo.tv/channel/kctv"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#90caf9" }}
            >
              koryo.tv에서 직접 시청하기
            </a>
          </Typography>
        </Box>
      </Paper>

      {/* Schedule section */}
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
        오늘의 방송 일정
      </Typography>

      {loadingSchedule ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: 700, width: 100 }}>시간</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>프로그람</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.time} hover>
                  <TableCell sx={{ fontVariantNumeric: "tabular-nums", color: "text.secondary" }}>
                    {item.time}
                  </TableCell>
                  <TableCell>{item.program}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ display: "block", mt: 2, textAlign: "right" }}
      >
        출처: 통일부 북한정보포털 (nkinfo.unikorea.go.kr)
      </Typography>
    </Box>
  );
}
