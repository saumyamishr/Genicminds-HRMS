import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Download, ArrowLeft } from "lucide-react";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import StatCard from "../../components/StatCard";

const Employees = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    onLeave: 0,
    departments: 0
  });

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // Mock data with status
      const mockEmployees = [
        {
          id: 1,
          employeeId: "EMP001",
          firstName: "Rahul",
          middleName: "Kumar",
          lastName: "Sharma",
          dateOfBirth: "1990-05-15",
          gender: "male",
          maritalStatus: "married",
          nationality: "Indian",
          email: "rahul.sharma@company.com",
          phone: "+91 98765 43210",
          address: "123 MG Road, Bangalore, Karnataka - 560001",
          department: { id: 2, name: "HR" },
          jobTitle: { id: 3, title: "HR Manager" },
          status: "active"
        },
        {
          id: 2,
          employeeId: "EMP002",
          firstName: "Priya",
          middleName: "",
          lastName: "Singh",
          dateOfBirth: "1995-08-22",
          gender: "female",
          maritalStatus: "single",
          nationality: "Indian",
          email: "priya.singh@company.com",
          phone: "+91 87654 32109",
          address: "456 Park Street, Mumbai, Maharashtra - 400001",
          department: { id: 1, name: "IT" },
          jobTitle: { id: 1, title: "Software Engineer" },
          status: "active"
        },
        {
          id: 3,
          employeeId: "EMP003",
          firstName: "Amit",
          middleName: "V",
          lastName: "Verma",
          dateOfBirth: "1988-11-03",
          gender: "male",
          maritalStatus: "married",
          nationality: "Indian",
          email: "amit.verma@company.com",
          phone: "+91 76543 21098",
          address: "789 Lake Road, Pune, Maharashtra - 411001",
          department: { id: 3, name: "Finance" },
          jobTitle: { id: 5, title: "Accountant" },
          status: "onLeave"
        },
      ];
      setEmployees(mockEmployees);
      
      // Calculate stats
      setStats({
        total: mockEmployees.length,
        active: mockEmployees.filter(emp => emp.status === "active").length,
        onLeave: mockEmployees.filter(emp => emp.status === "onLeave").length,
        departments: new Set(mockEmployees.map(emp => emp.department?.id)).size
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditClick = (employee: any) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleFormSuccess = () => {
    fetchEmployees();
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-secondary)]">
            Employees
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {showForm 
              ? (editingEmployee ? 'Edit employee details' : 'Add a new employee to the system')
              : 'Manage your organization\'s employees'
            }
          </p>
        </div>
        <div className="flex gap-3">
          {showForm ? (
            <button
              onClick={handleFormClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to List</span>
            </button>
          ) : (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={handleAddClick}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards - Hide stats when form is open (optional) */}
      {!showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Employees" 
            value={stats.total}
            borderColor="border-[var(--color-primary)]"
          />
          <StatCard 
            title="Active" 
            value={stats.active}
            borderColor="border-green-500"
            subtitle={`${Math.round((stats.active / stats.total) * 100)}% of total`}
          />
          <StatCard 
            title="On Leave" 
            value={stats.onLeave}
            borderColor="border-yellow-500"
          />
          <StatCard 
            title="Departments" 
            value={stats.departments}
            borderColor="border-[var(--color-secondary)]"
          />
        </div>
      )}

      {/* Content Area - Either Table or Form */}
      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      ) : (
        <>
          {showForm ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <EmployeeForm
                employee={editingEmployee}
                onSuccess={handleFormSuccess}
                onCancel={handleFormClose}
                inline={true} // Add this prop to remove modal styling
              />
            </div>
          ) : (
            <EmployeeTable 
              employees={employees} 
              refresh={fetchEmployees}
              onEdit={handleEditClick} // Pass edit handler to table
            />
          )}
        </>
      )}
    </div>
  );
};

export default Employees;