import Desktop from "../../../imports/Desktop1";
export default function DictionaryPage() {
  return (
    <div className="size-full overflow-auto">
      <div className="relative w-[1920px] h-[1080px] mx-auto" style={{ minWidth: 1200, transform: "scale(var(--page-scale, 1))", transformOrigin: "top center" }}>
        <Desktop />
      </div>
    </div>
  );
}
