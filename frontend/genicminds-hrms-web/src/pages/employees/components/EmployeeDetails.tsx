import { X, Mail, Phone, MapPin, Calendar, User, Briefcase, Building2, Globe, Heart, Download, Edit, ChevronDown, FileText } from "lucide-react";
import { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import StatusBadge from "../../../components/StatusBadge";

interface EmployeeDetailsProps {
  employee: any;
  close: () => void;
  onEdit?: () => void;
}

const EmployeeDetails = ({ employee, close, onEdit }: EmployeeDetailsProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  if (!employee) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = () => {
    return `${employee.firstName?.[0] || ''}${employee.lastName?.[0] || ''}`.toUpperCase();
  };

  const getFullName = () => {
    return `${employee.firstName} ${employee.middleName ? employee.middleName + ' ' : ''}${employee.lastName}`;
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      // API call to update status
      // await axios.patch(`http://localhost:3000/employees/${employee.id}/status`, 
      //   { status: newStatus },
      //   { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      // );
      console.log('Status updated to:', newStatus);
      setShowStatusMenu(false);
      if (onEdit) onEdit();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'employment', label: 'Employment', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  if (showEditForm) {
    return (
      <EmployeeForm
        employee={employee}
        close={() => {
          setShowEditForm(false);
          close();
        }}
        refresh={() => {
          if (onEdit) onEdit();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-800">Employee Details</h2>
          <button
            onClick={close}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Employee Header Card */}
        <div className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {getInitials()}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{getFullName()}</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>{employee.jobTitle?.title}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{employee.department?.name}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="font-medium">ID:</span>
                  <span>{employee.employeeId}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StatusBadge status={employee.status || 'active'} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditForm(true)}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 py-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Date of Birth</p>
                <p className="text-sm font-medium text-gray-800">{formatDate(employee.dateOfBirth)}</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Heart className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Marital Status</p>
                <p className="text-sm font-medium text-gray-800 capitalize">{employee.maritalStatus || 'Not provided'}</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Nationality</p>
                <p className="text-sm font-medium text-gray-800">{employee.nationality || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Basic Information</h3>
                  <div className="space-y-3">
                    <InfoRow label="First Name" value={employee.firstName} />
                    <InfoRow label="Middle Name" value={employee.middleName || '-'} />
                    <InfoRow label="Last Name" value={employee.lastName} />
                    <InfoRow label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
                    <InfoRow label="Gender" value={employee.gender ? employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1) : 'Not provided'} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Additional Information</h3>
                  <div className="space-y-3">
                    <InfoRow label="Marital Status" value={employee.maritalStatus ? employee.maritalStatus.charAt(0).toUpperCase() + employee.maritalStatus.slice(1) : 'Not provided'} />
                    <InfoRow label="Nationality" value={employee.nationality || 'Not provided'} />
                    <InfoRow label="Blood Group" value={employee.bloodGroup || 'Not provided'} />
                    <InfoRow label="PAN Number" value={employee.panNumber || 'Not provided'} />
                    <InfoRow label="Aadhar Number" value={employee.aadharNumber ? 'XXXX-XXXX-' + employee.aadharNumber.slice(-4) : 'Not provided'} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Employment Information Tab */}
          {activeTab === 'employment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Job Details</h3>
                  <div className="space-y-3">
                    <InfoRow label="Employee ID" value={employee.employeeId} />
                    <InfoRow label="Status" value={
                      <StatusBadge status={employee.status || 'active'} />
                    } />
                    <InfoRow label="Department" value={employee.department?.name} />
                    <InfoRow label="Job Title" value={employee.jobTitle?.title} />
                    <InfoRow label="Employment Type" value={employee.employmentType || 'Full Time'} />
                    <InfoRow label="Work Location" value={employee.workLocation || 'Not provided'} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Compensation & Dates</h3>
                  <div className="space-y-3">
                    <InfoRow label="Hire Date" value={formatDate(employee.hireDate)} />
                    <InfoRow label="Salary" value={employee.salary ? `₹${Number(employee.salary).toLocaleString()}` : 'Not provided'} />
                    <InfoRow label="Reporting Manager" value={employee.manager?.name || 'Not assigned'} />
                    <InfoRow label="Probation End Date" value={formatDate(employee.probationEndDate)} />
                  </div>
                </div>
              </div>

              {/* Status Update Section */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Update Status</span>
                  <div className="relative">
                    <button
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <StatusBadge status={employee.status || 'active'} />
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    {showStatusMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-30"
                          onClick={() => setShowStatusMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40">
                          {['active', 'inactive', 'onLeave', 'terminated', 'suspended'].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusUpdate(status)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <StatusBadge status={status} />
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="text-sm text-gray-800">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Phone Number</p>
                        <p className="text-sm text-gray-800">{employee.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Emergency Contact</p>
                        <p className="text-sm text-gray-800">{employee.emergencyContact || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Address</h3>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Current Address</p>
                      <p className="text-sm text-gray-800">{employee.address || 'Not provided'}</p>
                    </div>
                  </div>
                  {employee.permanentAddress && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg mt-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Permanent Address</p>
                        <p className="text-sm text-gray-800">{employee.permanentAddress}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentCard
                  title="Resume/CV"
                  fileName={employee.resume || 'Not uploaded'}
                  icon={FileText}
                />
                <DocumentCard
                  title="Offer Letter"
                  fileName={employee.offerLetter || 'Not uploaded'}
                  icon={FileText}
                />
                <DocumentCard
                  title="ID Proof"
                  fileName={employee.idProof || 'Not uploaded'}
                  icon={FileText}
                />
                <DocumentCard
                  title="Address Proof"
                  fileName={employee.addressProof || 'Not uploaded'}
                  icon={FileText}
                />
                <DocumentCard
                  title="Educational Certificates"
                  fileName={employee.educationDocs || 'Not uploaded'}
                  icon={FileText}
                />
                <DocumentCard
                  title="Experience Letters"
                  fileName={employee.experienceDocs || 'Not uploaded'}
                  icon={FileText}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);

const DocumentCard = ({ title, fileName, icon: Icon }: { title: string; fileName: string; icon: any }) => (
  <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors group">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white">
        <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{fileName}</p>
        {fileName !== 'Not uploaded' && (
          <button className="text-xs text-blue-600 hover:text-blue-800 mt-2 flex items-center gap-1">
            <Download className="w-3 h-3" />
            Download
          </button>
        )}
      </div>
    </div>
  </div>
);

export default EmployeeDetails;