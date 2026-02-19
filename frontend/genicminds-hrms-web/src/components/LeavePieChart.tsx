import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { leaveType: string; count: string }[];
}

const LeavePieChart = ({ data }: Props) => {
  const formattedData = data.map((item) => ({
    name: item.leaveType,
    value: Number(item.count),
  }));

  return (
    <div className="bg-white p-5 shadow rounded-xl">
      <h3 className="mb-4 font-semibold">Leave Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={formattedData} dataKey="value" nameKey="name" outerRadius={100}>
            {formattedData.map((_, index) => (
              <Cell key={index} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeavePieChart;
