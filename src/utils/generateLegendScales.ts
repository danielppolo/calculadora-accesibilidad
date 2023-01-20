interface LegendItem {
  color: string;
  opacity?: number;
  label: string;
  topValue: number;
}

interface GetLegendParams {
  scales: number[];
  colors: string[];
  unit?: string;
  opacity?: number;
}

export const generateLegendScales = ({
  scales,
  colors,
  unit = '',
  opacity = 1,
}: GetLegendParams) => {
  const reversedColors = [...colors].reverse();
  const generatedScales = scales.reduce(
    (acc: Record<number, LegendItem>, interval, i) => {
      const start = Intl.NumberFormat().format((scales[i - 1] || 0) + 1);
      const end = Intl.NumberFormat().format(interval);
      const isSameNumber = start === end;

      // Exclude duplicates.
      if (!acc[interval]) {
        acc[interval] = {
          color: reversedColors[i],
          opacity,
          label: isSameNumber
            ? `${start} ${unit}`
            : `${start} - ${end} ${unit}`,
          topValue: interval,
        };
      }

      return acc;
    },
    {}
  );

  return Object.values(generatedScales);
};

export default generateLegendScales;
