
/**
 * Get color based on percentage value
 * @param value - Percentage value (0-100)
 * @returns Tailwind background color class
 */
export const getScoreColor = (value: number): string => {
  if (value >= 85) return 'bg-green-500';
  if (value >= 70) return 'bg-yellow-500/90';
  if (value >= 55) return 'bg-orange-500/90';
  if (value >= 40) return 'bg-orange-600/90';
  return 'bg-red-500';
};

/**
 * Get gradient background based on percentage value
 * @param value - Percentage value (0-100)
 * @returns Tailwind gradient background class
 */
export const getScoreGradient = (value: number): string => {
  if (value >= 85) return 'bg-gradient-to-r from-green-500 to-green-400';
  if (value >= 70) return 'bg-gradient-to-r from-yellow-500 to-yellow-400';
  if (value >= 55) return 'bg-gradient-to-r from-orange-500 to-orange-400';
  if (value >= 40) return 'bg-gradient-to-r from-orange-600 to-orange-500';
  return 'bg-gradient-to-r from-red-600 to-red-500';
};

/**
 * Get badge variant based on percentage value
 * @param value - Percentage value (0-100)
 * @returns Badge variant
 */
export const getScoreBadgeVariant = (value: number): "default" | "secondary" | "destructive" | "outline" => {
  if (value >= 70) return 'default';
  if (value >= 40) return 'secondary';
  return 'destructive';
};
