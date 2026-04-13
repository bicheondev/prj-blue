import type { Product } from "../data/types";

interface Desktop9Props {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, index, onAddToCart }: { product: Product; index: number; onAddToCart: (p: Product) => void }) {
  const left = 460 + index * 205;
  return (
    <>
      <div className="absolute bg-[#f8fafc] rounded-[12px] size-[181px]" style={{ left, top: 181 }} />
      <div className="absolute flex items-center justify-center" style={{ left: left + 75, top: 214, width: 32, height: 115 }}>
        <img alt={product.name} className="max-w-none object-contain pointer-events-none size-full" src={product.imageUrl} />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic" style={{ left, top: 374 }}>
        <div>
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] text-[#94a3b8] text-[10px]">{product.manufacturer}</p>
          <p className="font-['Pretendard:Bold',sans-serif] leading-[normal] text-[#334155] text-[16px] whitespace-nowrap">{product.name}</p>
          <p className="font-['Pretendard:Bold',sans-serif] leading-[normal] text-[#2563eb] text-[16px]">₩{product.price.toLocaleString()}</p>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-[8px] bg-[#3b82f6] text-white font-['Pretendard:Bold',sans-serif] text-[14px] px-[12px] py-[6px] rounded-[8px] cursor-pointer hover:bg-[#2563eb] transition-colors whitespace-nowrap"
        >
          장바구니 담기
        </button>
      </div>
    </>
  );
}

const CATEGORIES = ["전체", "대동강맥주", "평양소주"];

export default function Desktop({ activeCategory, onCategoryChange, products, onAddToCart }: Desktop9Props) {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 9">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} onAddToCart={onAddToCart} />
      ))}
      {/* Category tabs */}
      <div className="-translate-x-1/2 absolute bg-[#f8fafc] content-stretch flex h-[44px] items-center justify-center left-1/2 p-[4px] rounded-[1000px] top-[102px]">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`content-stretch flex items-center justify-center px-[14px] py-[10px] rounded-[1000px] shrink-0 cursor-pointer transition-colors ${
              activeCategory === cat
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
          >
            <p className={`font-['Pretendard:SemiBold',sans-serif] leading-[normal] not-italic relative text-[17px] ${
              activeCategory === cat ? "text-[#334155]" : "text-[#64748b]"
            }`}>{cat}</p>
          </button>
        ))}
      </div>
      {/* Header */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">★Store</p>
        </div>
      </div>
      {/* Nav items */}
      <div className="-translate-x-1/2 absolute content-stretch flex gap-[25px] items-center leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#475569] text-[15px] top-[23px] whitespace-nowrap">
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">사전</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">음악</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">폰트</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">뉴스</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">번역</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">문헌</p>
        <p className="font-['Pretendard:Bold',sans-serif] relative shrink-0">스토어</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">KCTV</p>
      </div>
    </div>
  );
}
