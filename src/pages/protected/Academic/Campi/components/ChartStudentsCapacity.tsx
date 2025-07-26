import { Tooltip } from '@/components/Tooltip';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ChartStudentsCapacityProps {
  chartData: [students: number, capacity: number];
  fillRate: number;
}

export const ChartStudentsCapacity = ({ chartData, fillRate }: ChartStudentsCapacityProps) => {
  const getStatusByFillRate =
    fillRate <= 20
      ? 'Subutilizado'
      : fillRate >= 21 && fillRate <= 85
        ? 'Normal'
        : fillRate >= 86
          ? 'Quase lotado'
          : 'Sem dados';

  const getColorBarByFillRate =
    fillRate <= 50
      ? 'var(--color-orange-400)'
      : fillRate >= 51 && fillRate <= 90
        ? 'var(--color-green-500)'
        : fillRate >= 91
          ? 'var(--color-red-500)'
          : 'var(--color-f-disabled)';

  return (
    <Tooltip
      label={`${chartData[0]}/${chartData[1]} estudantes`}
      description={`${fillRate}% - ${getStatusByFillRate}`}
      placement="top"
    >
      <div className="mt-2 box-content h-1.5 px-4 pt-2 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            style={{ background: 'var(--color-gray-200)', borderRadius: 2 }}
            data={[
              {
                students: chartData[0],
                capacity: chartData[1],
              },
            ]}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap={0}
          >
            <XAxis type="number" domain={[0, chartData[1]]} hide />
            <YAxis type="category" hide />
            <Bar dataKey="students" radius={[4, 4, 4, 4]} fill={getColorBarByFillRate} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Tooltip>
  );
};
