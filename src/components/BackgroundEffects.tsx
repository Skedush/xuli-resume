import { getMobiusPoint } from '../utils/mobiusPath';

/**
 * 背景光晕层（GPU 友好版）
 *
 * 优化要点：
 * 1. 用 CSS radial-gradient 充当"光晕"，避开 `filter: blur()` —— 后者每帧都做高斯模糊，是持续 GPU 占用的大头
 * 2. 用 `transform: translate3d` + `will-change: transform` 把元素提升为单一合成层，动画只走 GPU 合成，不触发 paint
 * 3. 关键帧不再是绝对定位的 left/top（每帧 reflow），而是相对 0,0 的偏移量
 * 4. `prefers-reduced-motion` 下整体隐藏（不光是停动画）
 */
function buildKeyframes(reverse: boolean): string {
  const points: string[] = [];
  const total = 12;
  for (let i = 0; i <= total; i++) {
    const progress = i / total;
    const p = reverse ? 1 - progress : progress;
    const { x, y } = getMobiusPoint(p);
    points.push(`${(i / total) * 100}% { transform: translate3d(${x}, ${y}, 0); }`);
  }
  return points.join('\n');
}

export default function BackgroundEffects() {
  const kfForward = buildKeyframes(false);
  const kfReverse = buildKeyframes(true);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* 主光晕 —— 径向渐变模拟模糊，0 filter 开销 */}
      <div
        className="bg-glow bg-glow-primary"
        style={{
          animation: 'mobius-glow 24s linear infinite',
          willChange: 'transform',
        }}
      />
      {/* 次光晕 —— 反向，叠加层次感 */}
      <div
        className="bg-glow bg-glow-secondary"
        style={{
          animation: 'mobius-glow-reverse 30s linear infinite',
          willChange: 'transform',
        }}
      />
      <style>{`
        .bg-glow {
          position: absolute;
          width: 60vmin;
          height: 60vmin;
          left: 50%;
          top: 50%;
          margin-left: -30vmin;
          margin-top: -30vmin;
          border-radius: 9999px;
          /* 径向渐变模拟"光晕"，浏览器会预栅格化为位图，不再每帧重算高斯模糊 */
          background: radial-gradient(
            circle at center,
            var(--xuli-accent-muted) 0%,
            color-mix(in srgb, var(--xuli-accent-muted) 40%, transparent) 30%,
            transparent 70%
          );
          opacity: 0.55;
          contain: strict;
        }
        .bg-glow-primary {
          filter: blur(0px); /* 显式声明：自身不再做高斯模糊 */
        }
        .bg-glow-secondary {
          opacity: 0.4;
        }
        @keyframes mobius-glow {
          ${kfForward}
        }
        @keyframes mobius-glow-reverse {
          ${kfReverse}
        }
        /* 关键：getMobiusPoint 的坐标是相对 0,0 的偏移量（不是绝对位置），
           元素用 left:50% + margin 居中后，translate 才是相对位移 */
        @media (prefers-reduced-motion: reduce) {
          .bg-glow { display: none; }
        }
      `}</style>
    </div>
  );
}
