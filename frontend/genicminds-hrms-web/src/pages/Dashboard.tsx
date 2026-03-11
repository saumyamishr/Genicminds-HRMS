import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";
import LeavePieChart from "../components/LeavePieChart";
import AttendanceLineChart from "../components/AttendanceLineChart";
 
interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  pendingLeaves: number;
  todayPresent: number;
  todayAbsent: number;
}
 
interface RecentActivity {
  id: string;
  description: string;
  timestamp: string;
  type: 'leave' | 'attendance' | 'department' | 'hr';
}
 
const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
 
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
       
        // Uncomment for actual API calls
        // const headers = { Authorization: `Bearer ${token}` };
        // const [statsRes, analyticsRes, activitiesRes] = await Promise.all([
        //   axios.get("http://localhost:3000/dashboard", { headers }),
        //   axios.get("http://localhost:3000/dashboard/analytics", { headers }),
        //   axios.get("http://localhost:3000/dashboard/recent-activities", { headers })
        // ]);
       
        // setStats(statsRes.data);
        // setAnalytics(analyticsRes.data);
        // setRecentActivities(activitiesRes.data);
 
        // 🔥 Mock Data with enhanced information
        const mockStats: DashboardStats = {
          totalEmployees: 120,
          totalDepartments: 8,
          pendingLeaves: 5,
          todayPresent: 98,
          todayAbsent: 22,
        };
 
        const mockAnalytics = {
          leaveDistribution: [
            { name: "Approved", value: 20 },
            { name: "Pending", value: 5 },
            { name: "Rejected", value: 3 },
          ],
          monthlyAttendance: [
            { month: "Jan", present: 110, absent: 10 },
            { month: "Feb", present: 105, absent: 15 },
            { month: "Mar", present: 115, absent: 5 },
            { month: "Apr", present: 98, absent: 22 },
          ],
        };
 
        const mockActivities: RecentActivity[] = [
          {
            id: '1',
            description: 'John Doe applied for sick leave',
            timestamp: '2 hours ago',
            type: 'leave'
          },
          {
            id: '2',
            description: 'HR approved 2 leave requests',
            timestamp: '3 hours ago',
            type: 'hr'
          },
          {
            id: '3',
            description: '5 employees checked in today',
            timestamp: '4 hours ago',
            type: 'attendance'
          },
          {
            id: '4',
            description: 'New department "Engineering" created',
            timestamp: '1 day ago',
            type: 'department'
          },
          {
            id: '5',
            description: 'Sarah Johnson requested work from home',
            timestamp: '1 day ago',
            type: 'leave'
          },
          {
            id: '6',
            description: 'Monthly attendance report generated',
            timestamp: '2 days ago',
            type: 'hr'
          },
        ];
 
        setStats(mockStats);
        setAnalytics(mockAnalytics);
        setRecentActivities(mockActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, []);
 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[var(--color-secondary)]">Loading dashboard...</div>
      </div>
    );
  }
 
  if (!stats || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load dashboard data</div>
      </div>
    );
  }
 
  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-secondary)]">
          Welcome to Genic Minds HRMS
        </h1>
        <p className="text-gray-600 mt-1">
          Manage employees, departments, attendance and leave easily.
        </p>
      </div>
 
      {/* Stats Cards - Using the enhanced design from code2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          borderColor="border-[var(--color-primary)]"
        />
        <StatCard
          title="Departments"
          value={stats.totalDepartments}
          borderColor="border-[var(--color-secondary)]"
        />
        <StatCard
          title="Pending Leaves"
          value={stats.pendingLeaves}
          borderColor="border-[var(--color-primary)]"
        />
        <StatCard
          title="Present Today"
          value={stats.todayPresent}
          borderColor="border-[var(--color-secondary)]"
          subtitle={`${Math.round((stats.todayPresent / stats.totalEmployees) * 100)}% attendance`}
        />
        <StatCard
          title="Absent Today"
          value={stats.todayAbsent}
          borderColor="border-red-500"
          subtitle={`${Math.round((stats.todayAbsent / stats.totalEmployees) * 100)}% absent`}
        />
      </div>
 
      {/* Charts Section with improved layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
            Leave Distribution
          </h2>
          <LeavePieChart data={analytics.leaveDistribution} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
            Monthly Attendance Trend
          </h2>
          <AttendanceLineChart data={analytics.monthlyAttendance} />
        </div>
      </div>
 
      {/* Recent Activity Section - Enhanced from code2 */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-secondary)]">
            Recent Activity
          </h2>
          <span className="text-sm text-[var(--color-primary)] cursor-pointer hover:underline">
            View All
          </span>
        </div>
 
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {/* Activity Icon based on type */}
              <div className={`mt-1 w-2 h-2 rounded-full ${
                activity.type === 'leave' ? 'bg-yellow-500' :
                activity.type === 'attendance' ? 'bg-green-500' :
                activity.type === 'department' ? 'bg-blue-500' :
                'bg-purple-500'
              }`} />
             
              <div className="flex-1">
                <p className="text-gray-700 text-sm">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
             
              {/* Type badge */}
              <span className={`text-xs px-2 py-1 rounded-full ${
                activity.type === 'leave' ? 'bg-yellow-100 text-yellow-800' :
                activity.type === 'attendance' ? 'bg-green-100 text-green-800' :
                activity.type === 'department' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </span>
            </div>
          ))}
        </div>
 
        {/* Quick Stats Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-[var(--color-secondary)]">
              {stats.todayPresent}
            </p>
            <p className="text-xs text-gray-500">Today's Present</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--color-secondary)]">
              {stats.pendingLeaves}
            </p>
            <p className="text-xs text-gray-500">Pending Leaves</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--color-secondary)]">
              {stats.totalDepartments}
            </p>
            <p className="text-xs text-gray-500">Departments</p>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Dashboard;
 