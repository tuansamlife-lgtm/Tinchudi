/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {useEffect, useRef, useState} from 'react';
import {motion, useInView} from 'motion/react';

function AnimatedNumber({
  target,
  prefix = '',
  suffix = '%',
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, {once: true, amount: 0.4});
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 900;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono-tabular">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export default function App() {
  const [imgAError, setImgAError] = useState(false);
  const [imgBError, setImgBError] = useState(false);

  return (
    <main className="chalk-noise min-h-screen overflow-x-clip bg-[#08080A] text-[#F5F5F0]">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Top Wordmark */}
        <motion.div
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="flex items-center border-b border-white/15 pb-4"
        >
          <span className="font-hand text-base sm:text-lg font-bold text-white">
            tinchudi.xyz
          </span>
        </motion.div>

        {/* PART 1: "Đừng tin" -> Curved Arrow -> Ông A (staggered right like the sketch) */}
        <section className="relative mt-10 sm:mt-14">
          <div className="relative flex flex-col">
            {/* Handwritten Headline A */}
            <motion.div
              initial={{opacity: 0, x: -18, rotate: -2}}
              animate={{opacity: 1, x: 0, rotate: -1.5}}
              transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
              className="relative z-10 max-w-md"
            >
              <p className="font-hand text-4xl sm:text-5xl font-extrabold tracking-tight text-[#FB7185]">
                Đừng tin
              </p>
              {/* Hand-drawn underline under "Đừng tin" */}
              <svg
                viewBox="0 0 240 18"
                className="mt-1 h-4 w-48 sm:w-56 overflow-visible"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M 4 12 Q 70 4, 130 11 T 232 8"
                  stroke="#FB7185"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{pathLength: 0}}
                  animate={{pathLength: 1}}
                  transition={{duration: 0.7, delay: 0.25, ease: 'easeOut'}}
                />
              </svg>

              <p className="font-hand mt-2 text-xl sm:text-2xl font-bold leading-snug text-white">
                Ông chú này chém gió. Đừng tin ông này !
              </p>
            </motion.div>

            {/* Staggered Row: Curved Arrow on Left -> Framed Photo Ông A on Right */}
            <div className="mt-4 grid grid-cols-12 items-start gap-2 sm:gap-4">
              {/* Hand-drawn curved arrow pointing down-right into Ông A */}
              <div className="col-span-3 sm:col-span-4 flex justify-end pt-4 sm:pt-8">
                <svg
                  viewBox="0 0 130 140"
                  className="h-24 w-20 sm:h-36 sm:w-32 overflow-visible"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M 18 10 C 12 72, 42 112, 114 114"
                    stroke="#F5F5F0"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{pathLength: 0}}
                    animate={{pathLength: 1}}
                    transition={{duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1]}}
                  />
                  <motion.path
                    d="M 94 98 L 118 114 L 94 129"
                    stroke="#F5F5F0"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{pathLength: 0, opacity: 0}}
                    animate={{pathLength: 1, opacity: 1}}
                    transition={{duration: 0.35, delay: 1.15}}
                  />
                </svg>
              </div>

              {/* Photo Box Ông A (sketch border frame) */}
              <motion.div
                initial={{opacity: 0, y: 24, rotate: 3}}
                animate={{opacity: 1, y: 0, rotate: 1.5}}
                transition={{duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1]}}
                whileHover={{rotate: -1.5, scale: 1.02}}
                className="col-span-9 sm:col-span-8 relative"
              >
                <div className="relative rounded-sm border-2 border-white/85 bg-[#141418] p-2 sm:p-2.5 shadow-[6px_6px_0px_rgba(251,113,133,0.45)]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1D1D22]">
                    {!imgAError ? (
                      <img
                        src="/assets/aistudio/_ng_A_abb04f86.jpg"
                        alt="Ông chú A mặc áo ba lỗ cười giơ hai ngón tay"
                        referrerPolicy="no-referrer"
                        onError={() => setImgAError(true)}
                        className="h-full w-full object-cover object-[50%_38%]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-white/60">
                        Ảnh Ông A
                      </div>
                    )}

                    {/* Automatic Rubber Stamp Slam */}
                    <motion.div
                      initial={{scale: 2.6, opacity: 0, rotate: -28}}
                      animate={{scale: 1, opacity: 1, rotate: -12}}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 18,
                        delay: 1.15,
                      }}
                      className="pointer-events-none absolute right-3 top-3 rounded-sm border-[3px] border-[#FB7185] bg-[#08080A]/85 px-2.5 py-1 font-hand text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#FB7185]"
                    >
                      CHÉM GIÓ!
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PART 2: "Tin ông này" -> Curved Arrow -> Ông B (staggered left like the sketch) */}
        <section className="relative mt-14 sm:mt-20">
          {/* Handwritten Headline B */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="relative z-10"
          >
            <div className="inline-block relative">
              <p className="font-hand text-4xl sm:text-5xl font-extrabold tracking-tight text-[#38BDF8]">
                Tin ông này
              </p>
              {/* Hand-drawn oval highlight around "Tin ông này" */}
              <svg
                viewBox="0 0 280 78"
                className="pointer-events-none absolute -inset-x-4 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+32px)] overflow-visible"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M 18 42 C 12 12, 130 4, 240 16 C 278 21, 278 58, 226 67 C 142 79, 14 70, 14 38"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{pathLength: 0}}
                  whileInView={{pathLength: 1}}
                  viewport={{once: true, amount: 0.5}}
                  transition={{duration: 0.9, delay: 0.2, ease: 'easeOut'}}
                />
              </svg>
            </div>

            <p className="font-hand mt-4 text-xl sm:text-2xl font-bold leading-snug text-white">
              Ông này mặc vest đáng tin hơn
            </p>
          </motion.div>

          {/* Staggered Row: Framed Photo Ông B on Left <- Curved Arrow from Right */}
          <div className="mt-4 grid grid-cols-12 items-start gap-2 sm:gap-4">
            {/* Photo Box Ông B (staggered left, matching sketch bottom box) */}
            <motion.div
              initial={{opacity: 0, y: 26, rotate: -2}}
              whileInView={{opacity: 1, y: 0, rotate: -1}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
              whileHover={{rotate: 1, scale: 1.02}}
              className="col-span-9 sm:col-span-8 relative"
            >
              {/* Soft theatrical spotlight behind Ông B */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-[#38BDF8]/12 blur-2xl"
              />

              <div className="relative rounded-sm border-2 border-white/90 bg-[#141418] p-2 sm:p-2.5 shadow-[6px_6px_0px_rgba(56,189,248,0.45)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1D1D22]">
                  {!imgBError ? (
                    <img
                      src="/assets/aistudio/_ng_B_875b614d.jpg"
                      alt="Ông B mặc vest đen lịch sự cầm micro"
                      referrerPolicy="no-referrer"
                      onError={() => setImgBError(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-white/60">
                      Ảnh Ông B
                    </div>
                  )}

                  {/* Automatic Seal Stamp on Ông B */}
                  <motion.div
                    initial={{scale: 2.4, opacity: 0, rotate: 22}}
                    whileInView={{scale: 1, opacity: 1, rotate: 9}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{
                      type: 'spring',
                      stiffness: 360,
                      damping: 18,
                      delay: 0.65,
                    }}
                    className="pointer-events-none absolute right-3 top-3 rounded-sm border-[3px] border-[#38BDF8] bg-[#08080A]/85 px-2.5 py-1 font-hand text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#38BDF8]"
                  >
                    ĐÁNG TIN HƠN
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Curved Arrow from top-right pointing down-left to Ông B */}
            <div className="col-span-3 sm:col-span-4 flex justify-start pt-2 sm:pt-4">
              <svg
                viewBox="0 0 130 140"
                className="h-24 w-20 sm:h-36 sm:w-32 overflow-visible"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M 96 8 C 118 60, 88 106, 16 114"
                  stroke="#F5F5F0"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{pathLength: 0}}
                  whileInView={{pathLength: 1}}
                  viewport={{once: true, amount: 0.4}}
                  transition={{duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1]}}
                />
                <motion.path
                  d="M 38 97 L 13 114 L 38 130"
                  stroke="#F5F5F0"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{pathLength: 0, opacity: 0}}
                  whileInView={{pathLength: 1, opacity: 1}}
                  viewport={{once: true, amount: 0.4}}
                  transition={{duration: 0.35, delay: 0.95}}
                />
              </svg>
            </div>
          </div>
        </section>

        {/* PART 3: Curved Arrow Down -> The Real Plot-Twist & 3 Statistics */}
        <section className="relative mt-14 sm:mt-20">
          {/* Downward hand-drawn transition arrow */}
          <div className="flex flex-col items-center text-center">
            <svg
              viewBox="0 0 60 88"
              className="h-16 w-12 overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 28 4 C 22 32, 36 52, 30 78"
                stroke="#FACC15"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{pathLength: 0}}
                whileInView={{pathLength: 1}}
                viewport={{once: true, amount: 0.5}}
                transition={{duration: 0.65}}
              />
              <motion.path
                d="M 16 64 L 30 82 L 45 64"
                stroke="#FACC15"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{pathLength: 0, opacity: 0}}
                whileInView={{pathLength: 1, opacity: 1}}
                viewport={{once: true, amount: 0.5}}
                transition={{duration: 0.3, delay: 0.55}}
              />
            </svg>

            <motion.div
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.4}}
              transition={{duration: 0.45}}
              className="mt-3 max-w-xl"
            >
              <p className="font-hand text-2xl sm:text-3xl font-extrabold text-[#FACC15]">
                ...Nhưng trên mạng thì khoan tin vội!
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">
                Đùa chút cho tỉnh, chứ kẻ xấu online cũng biết mặc vest nói lời ngọt ngào. Đây
                mới là những số liệu thật không thể chém gió:
              </p>
            </motion.div>
          </div>

          {/* 3 Statistics Blocks (Pure Info, Automatic Visual Animations, Zero Buttons) */}
          <div className="mt-10 space-y-6">
            {/* STAT 1: 82% */}
            <motion.article
              initial={{opacity: 0, x: -20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.35}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="rounded-xl border border-white/20 bg-[#121216] p-6 sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#38BDF8]">
                    <AnimatedNumber target={82} />
                  </p>
                  <p className="font-hand mt-2 text-xl sm:text-2xl font-bold text-white">
                    trẻ 12–13 tuổi dùng Internet hằng ngày
                  </p>
                </div>

                {/* Auto-filling 10-dot bar */}
                <div className="shrink-0 sm:text-right">
                  <p className="font-mono-tabular text-xs text-white/55 mb-2">
                    82 / 100 em online mỗi ngày
                  </p>
                  <div className="grid grid-cols-10 gap-1.5" aria-hidden="true">
                    {Array.from({length: 20}).map((_, i) => {
                      const active = i < 16;
                      return (
                        <motion.span
                          key={i}
                          initial={{scale: 0.4, opacity: 0.2}}
                          whileInView={{scale: 1, opacity: 1}}
                          viewport={{once: true}}
                          transition={{delay: 0.03 * i, duration: 0.25}}
                          className={`h-2.5 w-2.5 rounded-[2px] ${
                            active ? 'bg-[#38BDF8]' : 'bg-white/15'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.article>

            {/* STAT 2: ~75% */}
            <motion.article
              initial={{opacity: 0, x: 20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.35}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="rounded-xl border border-white/20 bg-[#121216] p-6 sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#FACC15]">
                    <AnimatedNumber target={75} prefix="Khoảng " />
                  </p>
                  <p className="font-hand mt-2 text-xl sm:text-2xl font-bold text-white">
                    không biết đường dây nóng hỗ trợ
                  </p>
                </div>

                {/* 3 out of 4 indicator */}
                <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
                  {[0, 1, 2, 3].map((slot) => (
                    <motion.div
                      key={slot}
                      initial={{y: 8, opacity: 0}}
                      whileInView={{y: 0, opacity: 1}}
                      viewport={{once: true}}
                      transition={{delay: 0.12 * slot, duration: 0.3}}
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border font-mono-tabular text-xs font-bold ${
                        slot < 3
                          ? 'border-[#FACC15]/50 bg-[#FACC15]/15 text-[#FACC15]'
                          : 'border-white/15 bg-white/5 text-white/45'
                      }`}
                    >
                      {slot < 3 ? '???' : '111'}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* STAT 3: > 60% */}
            <motion.article
              initial={{opacity: 0, x: -20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.35}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              className="rounded-xl border border-white/20 bg-[#121216] p-6 sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#FB7185]">
                    <AnimatedNumber target={60} prefix="Hơn " />
                  </p>
                  <p className="font-hand mt-2 text-xl sm:text-2xl font-bold text-white">
                    trẻ bị xâm hại liên quan công nghệ chọn im lặng
                  </p>
                </div>

                {/* Animated Progress Strip */}
                <div className="w-full sm:w-44 shrink-0">
                  <div className="flex justify-between font-mono-tabular text-xs text-white/60 mb-1.5">
                    <span>Chọn im lặng</span>
                    <span>&gt;60%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-sm bg-white/10">
                    <motion.div
                      initial={{scaleX: 0}}
                      whileInView={{scaleX: 0.64}}
                      viewport={{once: true}}
                      transition={{duration: 0.85, ease: [0.16, 1, 0.3, 1]}}
                      style={{transformOrigin: 'left'}}
                      className="h-full w-full bg-[#FB7185]"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* PART 4: Quiet Pure-Info Closing Note (Zero Buttons) */}
        <motion.footer
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.5}}
          className="mt-14 border-t border-dashed border-white/20 pt-8 pb-6 text-center"
        >
          <p className="font-hand text-2xl sm:text-3xl font-extrabold text-white">
            Đừng im lặng — Tổng đài Bảo vệ Trẻ em: <span className="font-mono-tabular text-[#FACC15]">111</span>
          </p>
          <p className="mt-2 text-xs sm:text-sm text-white/60">
            Miễn phí 24/7 trên toàn quốc · Lưu lại tin nhắn làm bằng chứng và kể ngay cho người
            lớn đáng tin cậy.
          </p>
          <p className="mt-6 text-xs text-white/40">
            tinchudi.xyz · Hình ảnh minh họa hài hước nhằm nâng cao nhận thức an toàn mạng.
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
