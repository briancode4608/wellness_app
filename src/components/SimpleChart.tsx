interface SimpleChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  color?: string;
  height?: number;
}

const SimpleChart = ({ data, maxValue, color = "bg-health-blue", height = 96 }: SimpleChartProps) => {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <span className="text-[0.6rem] font-semibold text-muted-foreground">
            {d.value > 0 ? d.value : ""}
          </span>
          <div
            className={`w-full ${color} rounded-t-sm transition-all duration-500`}
            style={{ height: d.value > 0 ? `${(d.value / max) * 70}%` : "2px" }}
          />
          <span className="text-[0.6rem] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SimpleChart;
