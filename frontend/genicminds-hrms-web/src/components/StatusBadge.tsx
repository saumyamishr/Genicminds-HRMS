interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: 'Active'
        };
      case 'inactive':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'Inactive'
        };
      case 'onleave':
      case 'onLeave':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          label: 'On Leave'
        };
      case 'terminated':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'Terminated'
        };
      case 'suspended':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          label: 'Suspended'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: status || 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;