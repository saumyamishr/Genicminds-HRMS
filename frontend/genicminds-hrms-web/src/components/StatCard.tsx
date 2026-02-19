interface Props {
  title: string;
  value: number;
  borderColor?: string;
  subtitle?: string;
  icon?: React.ReactNode;  // Optional icon
  trend?: {
    value: number;
    isPositive: boolean;
  };  // Optional trend indicator
}

const StatCard = ({ title, value, borderColor = "border-[var(--color-primary)]", subtitle, icon, trend }: Props) => {
  return (
    <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${borderColor} relative overflow-hidden`}>
      {/* Optional icon in top right */}
      {icon && (
        <div className="absolute top-4 right-4 text-gray-300">
          {icon}
        </div>
      )}
      
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-3xl font-bold text-[var(--color-secondary)]">
          {value}
        </p>
        {/* Optional trend indicator */}
        {trend && (
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;