/**
 * 莫比乌斯环路径算法
 * 用于 BackgroundEffects 光晕移动路径
 */

/**
 * 根据进度获取莫比乌斯环上的点坐标
 * @param progress 进度 (0 到 1)
 * @returns x, y 为百分比字符串
 */
export function getMobiusPoint(progress: number): { x: string; y: string } {
  const t = progress * 2 * Math.PI;
  // 莫比乌斯环参数方程中的缩放因子
  const scale = 0.5 * Math.cos(progress * 2 * Math.PI);

  // Mobius 环参数方程
  const rawX = (1 + scale) * Math.cos(t);
  const rawY = (1 + scale) * Math.sin(t);

  // 归一化到视口百分比 (x: 30%-70%, y: 20%-80%)
  // rawX, rawY 范围约为 [-1.5, 1.5]
  const normalizedX = 30 + ((rawX + 1.5) * 40) / 3; // 30-70
  const normalizedY = 20 + ((rawY + 1.5) * 60) / 3; // 20-80

  return {
    x: `${normalizedX}%`,
    y: `${normalizedY}%`,
  };
}
