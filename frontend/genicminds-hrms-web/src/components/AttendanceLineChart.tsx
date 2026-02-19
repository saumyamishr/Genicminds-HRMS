import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { year: string; month: string; presentCount: string }[];
}

const AttendanceLineChart = ({ data }: Props) => {
  const formatted = data.map((item) => ({
    month: `${item.month}/${item.year}`,
    count: Number(item.presentCount),
  }));

  return (
    <div className="bg-white p-5 shadow rounded-xl">
      <h3 className="mb-4 font-semibold">Monthly Attendance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceLineChart;
