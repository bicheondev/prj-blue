import { toast } from "sonner";
import Desktop from "../../../imports/Desktop8";
import { ACADEMIC_DOCUMENTS, BREADCRUMB } from "../../../data/papers";
import type { AcademicDocument } from "../../../data/types";

export default function PaperPage() {
  const handleDocumentClick = (doc: AcademicDocument) => {
    if (doc.downloadUrl) {
      window.open(doc.downloadUrl, "_blank");
    } else {
      toast.info("문서를 열 수 없습니다 (데모 버전)", {
        description: doc.title,
      });
    }
  };

  return (
    <div className="size-full overflow-auto">
      <div className="flex justify-end px-4 py-2">
        <a
          href="https://mirror.adversec.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
        >
          문헌 미러 (adversec.com)
        </a>
      </div>
      <div className="relative w-[1920px] h-[1080px] mx-auto">
        <Desktop
          breadcrumb={BREADCRUMB}
          documents={ACADEMIC_DOCUMENTS}
          onDocumentClick={handleDocumentClick}
        />
      </div>
    </div>
  );
}
