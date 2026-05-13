import { getMobiusPoint } from '../utils/mobiusPath';

/**
 * 生成莫比乌斯环路径的关键帧 CSS
 * 使用 12 个点组成闭合路径
 */
function generateMobiusKeyframes(): string {
  const points = [];
  for (let i = 0; i <= 12; i++) {
    const progress = i / 12;
    const point = getMobiusPoint(progress);
    points.push(`${progress * 100}% { left: ${point.x}; top: ${point.y}; }`);
  }
  return points.join('\n');
}

export default function BackgroundEffects() {
  const keyframes = generateMobiusKeyframes();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* 主光晕 - 沿 Mobius 环路径移动 */}
      <div
        className="absolute w-[36rem] h-[36rem] bg-[#22D3EE]/[0.12] rounded-full blur-3xl"
        style={{
          animation: `mobius-glow 20s linear infinite`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* 次光晕 - 反向移动形成层次感 */}
      <div
        className="absolute w-[28rem] h-[28rem] bg-[#A78BFA]/[0.10] rounded-full blur-3xl"
        style={{
          animation: `mobius-glow-reverse 25s linear infinite`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <style>{`
        @keyframes mobius-glow {
          ${keyframes}
        }
        @keyframes mobius-glow-reverse {
          ${generateMobiusReverseKeyframes()}
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="mobius"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/**
 * 生成反向路径的关键帧（从终点到起点）
 */
function generateMobiusReverseKeyframes(): string {
  const points = [];
  for (let i = 12; i >= 0; i--) {
    const progress = i / 12;
    const point = getMobiusPoint(progress);
    points.push(`${(12 - i) / 12 * 100}% { left: ${point.x}; top: ${point.y}; }`);
  }
  return points.join('\n');
}