import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, Calendar, CheckSquare, Building2, ClipboardCheck, DollarSign, Sparkles, Bell, Search, User, Menu, X, TrendingUp, Users, Star, Clock, ChevronRight, Upload, MessageSquare, Gift, Calculator, FileText, LayoutDashboard, Settings, LogOut, CreditCard, AlertCircle, CheckCircle, Image, Camera, Info } from 'lucide-react';

const PetalsOS = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'owner' or 'staff'
  const [userName, setUserName] = useState('');

  const [currentView, setCurrentView] = useState('staff-dashboard');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyDetailTab, setPropertyDetailTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [billFilter, setBillFilter] = useState('all');
  const [showRevenueInfo, setShowRevenueInfo] = useState(false);

  // Dummy Data
  const kpiData = {
    occupancy: 87.5,
    adr: 850,
    revpar: 743.75,
    revenue: 245600,
    cleaningScore: 9.4,
    nps: 82
  };

  const revenueData = [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 195000 },
    { month: 'Mar', revenue: 220000 },
    { month: 'Apr', revenue: 245600 },
    { month: 'May', revenue: 235000 },
    { month: 'Jun', revenue: 258000 }
  ];

  const occupancyData = [
    { name: 'Occupied', value: 87, color: '#D4AF37' },
    { name: 'Vacant', value: 8, color: '#E8DCC4' },
    { name: 'Maintenance', value: 5, color: '#F5F5DC' }
  ];

  const properties = [
    { id: 1, name: 'Marina View 2401', status: 'Occupied', revenue: 12500, occupancy: 95, checkOut: '2025-11-05', address: 'Dubai Marina, Tower A' },
    { id: 2, name: 'Downtown Loft 1502', status: 'Turnover', revenue: 9800, occupancy: 88, checkOut: '2025-11-03', address: 'Downtown Dubai, Burj Views' },
    { id: 3, name: 'Palm Residence 803', status: 'Cleaning', revenue: 15200, occupancy: 92, checkOut: '2025-11-04', address: 'Palm Jumeirah, Golden Mile' },
    { id: 4, name: 'Business Bay 3201', status: 'Vacant', revenue: 8500, occupancy: 78, checkOut: '-', address: 'Business Bay, Executive Tower' },
    { id: 5, name: 'JBR Beach Tower 1201', status: 'Occupied', revenue: 18900, occupancy: 98, checkOut: '2025-11-08', address: 'JBR, Bahar 6' },
    { id: 6, name: 'Dubai Hills 605', status: 'Maintenance', revenue: 10200, occupancy: 85, checkOut: '-', address: 'Dubai Hills Estate' }
  ];

  const bills = [
    { id: 1, propertyId: 1, type: 'DEWA', amount: 850, dueDate: '2025-11-10', status: 'unpaid', description: 'Electricity & Water - October', category: 'Utilities' },
    { id: 2, propertyId: 1, type: 'Empower', amount: 1200, dueDate: '2025-11-05', status: 'paid', paidDate: '2025-11-03', description: 'District Cooling - October', category: 'Utilities' },
    { id: 3, propertyId: 2, type: 'Cleaning Service', amount: 450, dueDate: '2025-11-08', status: 'unpaid', description: 'Deep clean after checkout', category: 'Maintenance' },
    { id: 4, propertyId: 3, type: 'DEWA', amount: 920, dueDate: '2025-11-01', status: 'paid', paidDate: '2025-10-28', description: 'Electricity & Water - October', category: 'Utilities' },
    { id: 5, propertyId: 1, type: 'Property Tax', amount: 2500, dueDate: '2025-11-15', status: 'unpaid', description: 'Annual property tax Q4', category: 'Tax' },
    { id: 6, propertyId: 5, type: 'Maintenance', amount: 650, dueDate: '2025-11-12', status: 'unpaid', description: 'AC filter replacement', category: 'Maintenance' },
    { id: 7, propertyId: 2, type: 'Internet', amount: 350, dueDate: '2025-10-28', status: 'paid', paidDate: '2025-10-25', description: 'Du Internet - October', category: 'Utilities' },
    { id: 8, propertyId: 4, type: 'DEWA', amount: 780, dueDate: '2025-11-06', status: 'unpaid', description: 'Electricity & Water - October', category: 'Utilities' },
    { id: 9, propertyId: 5, type: 'Chiller', amount: 1400, dueDate: '2025-10-30', status: 'paid', paidDate: '2025-10-29', description: 'District cooling - October', category: 'Utilities' },
    { id: 10, propertyId: 3, type: 'Pool Maintenance', amount: 850, dueDate: '2025-11-20', status: 'unpaid', description: 'Monthly pool service', category: 'Maintenance' }
  ];

  const propertyPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', category: 'Living Room', uploadDate: '2025-10-15' },
    { id: 2, url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', category: 'Bedroom', uploadDate: '2025-10-15' },
    { id: 3, url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800', category: 'Kitchen', uploadDate: '2025-10-15' },
    { id: 4, url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800', category: 'Bathroom', uploadDate: '2025-10-15' },
    { id: 5, url: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800', category: 'Balcony', uploadDate: '2025-10-15' },
    { id: 6, url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800', category: 'View', uploadDate: '2025-10-15' }
  ];

  const tasks = [
    { id: 1, title: 'Deep clean Marina View 2401', priority: 'High', assignee: 'Sarah M.', time: '10:00 AM', type: 'cleaning' },
    { id: 2, title: 'AC maintenance Downtown Loft', priority: 'Medium', assignee: 'Ahmed K.', time: '2:00 PM', type: 'maintenance' },
    { id: 3, title: 'Pre-checkout inspection Palm Residence', priority: 'High', assignee: 'Lisa R.', time: '11:30 AM', type: 'inspection' },
    { id: 4, title: 'Restock amenities JBR Tower', priority: 'Low', assignee: 'Mike T.', time: '4:00 PM', type: 'cleaning' }
  ];

  const checkInsToday = [
    { guest: 'James Wilson', property: 'Marina View 2401', time: '3:00 PM', duration: '5 nights' },
    { guest: 'Emma Thompson', property: 'Palm Residence 803', time: '4:30 PM', duration: '3 nights' }
  ];

  const checkOutsToday = [
    { guest: 'Michael Chen', property: 'Downtown Loft 1502', time: '11:00 AM', rating: 4.8 },
    { guest: 'Sophie Martin', property: 'Business Bay 3201', time: '12:00 PM', rating: 4.9 }
  ];

  const ownerData = {
    monthlyEarnings: 45680,
    ytdEarnings: 456800,
    occupancyRate: 89,
    avgNightly: 920,
    upcomingPayouts: 38500,
    propertyCount: 3
  };

  const ownerRevenueData = [
    { month: 'Jun', earnings: 42000 },
    { month: 'Jul', earnings: 45000 },
    { month: 'Aug', earnings: 48000 },
    { month: 'Sep', earnings: 44000 },
    { month: 'Oct', earnings: 45680 }
  ];

  // Booking Data with Sources
  const currentBookings = [
    { id: 1, guest: 'James Wilson', property: 'Marina View 2401', checkIn: '2025-11-03', checkOut: '2025-11-08', nights: 5, revenue: 5850, source: 'Airbnb', status: 'active' },
    { id: 2, guest: 'Emma Thompson', property: 'Palm Residence 803', checkIn: '2025-11-04', checkOut: '2025-11-07', nights: 3, revenue: 4560, source: 'Booking.com', status: 'active' },
    { id: 3, guest: 'Oliver Martinez', property: 'JBR Beach Tower 1201', checkIn: '2025-11-02', checkOut: '2025-11-15', nights: 13, revenue: 24570, source: 'Direct', status: 'active' }
  ];

  const previousBookings = [
    { id: 1, guest: 'Michael Chen', property: 'Downtown Loft 1502', checkIn: '2025-10-28', checkOut: '2025-11-03', nights: 6, revenue: 5880, source: 'Airbnb', status: 'completed', rating: 4.8 },
    { id: 2, guest: 'Sophie Martin', property: 'Business Bay 3201', checkIn: '2025-10-25', checkOut: '2025-11-03', nights: 9, revenue: 7650, source: 'Booking.com', status: 'completed', rating: 4.9 },
    { id: 3, guest: 'David Kumar', property: 'Marina View 2401', checkIn: '2025-10-20', checkOut: '2025-10-27', nights: 7, revenue: 8190, source: 'Expedia', status: 'completed', rating: 5.0 },
    { id: 4, guest: 'Lisa Anderson', property: 'Palm Residence 803', checkIn: '2025-10-15', checkOut: '2025-10-22', nights: 7, revenue: 10640, source: 'Direct', status: 'completed', rating: 4.7 }
  ];

  const bookingSourceStats = [
    { source: 'Airbnb', bookings: 28, revenue: 125600, percentage: 35, color: '#FF5A5F' },
    { source: 'Booking.com', bookings: 22, revenue: 98400, percentage: 30, color: '#003580' },
    { source: 'Direct', bookings: 15, revenue: 89200, percentage: 25, color: '#10B981' },
    { source: 'Expedia', bookings: 8, revenue: 35400, percentage: 10, color: '#FFCC00' }
  ];

  // Financial Reports Data
  const financialReports = [
    { id: 1, month: 'October 2025', revenue: 245600, expenses: 45800, profit: 199800, date: '2025-11-01', properties: 6 },
    { id: 2, month: 'September 2025', revenue: 235000, expenses: 42300, profit: 192700, date: '2025-10-01', properties: 6 },
    { id: 3, month: 'August 2025', revenue: 258000, expenses: 48900, profit: 209100, date: '2025-09-01', properties: 5 },
    { id: 4, month: 'July 2025', revenue: 245000, expenses: 44200, profit: 200800, date: '2025-08-01', properties: 5 },
    { id: 5, month: 'June 2025', revenue: 220000, expenses: 41500, profit: 178500, date: '2025-07-01', properties: 5 },
    { id: 6, month: 'May 2025', revenue: 195000, expenses: 38900, profit: 156100, date: '2025-06-01', properties: 4 }
  ];

  // Tickets State
  const [ownerTickets, setOwnerTickets] = useState([
    { id: 1, title: 'AC not working in Marina View 2401', property: 'Marina View 2401', status: 'open', priority: 'high', date: '2025-11-03', description: 'The air conditioning unit is not cooling properly.' },
    { id: 2, title: 'Request monthly financial report', property: 'All Properties', status: 'in-progress', priority: 'medium', date: '2025-11-02', description: 'Need detailed breakdown of October earnings.' },
    { id: 3, title: 'Internet connectivity issues', property: 'Palm Residence 803', status: 'resolved', priority: 'medium', date: '2025-10-28', description: 'WiFi keeps disconnecting.' }
  ]);

  const [internalTickets, setInternalTickets] = useState([
    { id: 1, title: 'Security deposit refund pending - Marina View 2401', from: 'Finance', to: 'Operations', status: 'open', priority: 'high', date: '2025-11-04', description: 'Awaiting final inspection report to process AED 5,000 security deposit refund for guest checkout on Nov 1st.' },
    { id: 2, title: 'Deep cleaning verification needed - Downtown Loft', from: 'Operations', to: 'Housekeeping', status: 'in-progress', priority: 'high', date: '2025-11-03', description: 'Guest checking in tomorrow. Need confirmation of deep cleaning completion.' },
    { id: 3, title: 'Invoice approval required - DEWA bills', from: 'Finance', to: 'Management', status: 'open', priority: 'medium', date: '2025-11-02', description: 'Multiple DEWA bills totaling AED 8,500 need management approval.' },
    { id: 4, title: 'Maintenance equipment order', from: 'Maintenance', to: 'Finance', status: 'resolved', priority: 'low', date: '2025-10-30', description: 'Need budget approval for new cleaning equipment - AED 3,200.' }
  ]);

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketType, setTicketType] = useState('owner'); // 'owner' or 'internal'

  // Status color mapping
  const statusColors = {
    'Occupied': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Turnover': 'bg-amber-100 text-amber-700 border-amber-200',
    'Cleaning': 'bg-blue-100 text-blue-700 border-blue-200',
    'Vacant': 'bg-gray-100 text-gray-600 border-gray-200',
    'Maintenance': 'bg-red-100 text-red-700 border-red-200'
  };

  const priorityColors = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-amber-100 text-amber-700',
    'Low': 'bg-green-100 text-green-700'
  };

  // Download Financial Report
  const downloadReport = (report) => {
    const reportContent = `
PETALSOS PROPERTY MANAGEMENT
Financial Report - ${report.month}
Generated: ${new Date().toLocaleDateString()}
=====================================

SUMMARY
-------
Total Revenue:    AED ${report.revenue.toLocaleString()}
Total Expenses:   AED ${report.expenses.toLocaleString()}
Net Profit:       AED ${report.profit.toLocaleString()}
Properties:       ${report.properties}

REVENUE BREAKDOWN
-----------------
Rental Income:    AED ${(report.revenue * 0.85).toLocaleString()}
Service Fees:     AED ${(report.revenue * 0.10).toLocaleString()}
Other Income:     AED ${(report.revenue * 0.05).toLocaleString()}

EXPENSE BREAKDOWN
-----------------
Maintenance:      AED ${(report.expenses * 0.35).toLocaleString()}
Utilities:        AED ${(report.expenses * 0.30).toLocaleString()}
Management:       AED ${(report.expenses * 0.20).toLocaleString()}
Insurance:        AED ${(report.expenses * 0.15).toLocaleString()}

=====================================
For questions, contact: finance@petalsos.com
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PetalsOS_Report_${report.month.replace(' ', '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Login handler
  const handleLogin = (email, password, role) => {
    // Simple authentication (in production, this would validate against a backend)
    if (password) {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserName(email.split('@')[0]);

      // Set initial view based on role
      if (role === 'owner') {
        setCurrentView('owner-portal');
        setCurrentPage('owner');
      } else {
        setCurrentView('staff-dashboard');
        setCurrentPage('dashboard');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    setCurrentView('staff-dashboard');
    setCurrentPage('dashboard');
  };

  // Login Page Component
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('staff');

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(email, password, selectedRole);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-white text-3xl">🌸</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PetalsOS</h1>
            <p className="text-gray-600">Property Management System</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Login As</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('staff')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRole === 'staff'
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <LayoutDashboard className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === 'staff' ? 'text-amber-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      selectedRole === 'staff' ? 'text-amber-700' : 'text-gray-600'
                    }`}>
                      Staff Member
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('owner')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedRole === 'owner'
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <User className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === 'owner' ? 'text-amber-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      selectedRole === 'owner' ? 'text-amber-700' : 'text-gray-600'
                    }`}>
                      Property Owner
                    </span>
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'staff' ? 'staff@petalsos.com' : 'owner@example.com'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                  required
                />
              </div>

              {/* Demo Credentials Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs text-amber-800 font-medium mb-2">Demo Credentials:</p>
                <p className="text-xs text-amber-700">
                  <span className="font-semibold">Staff:</span> staff@petalsos.com / any password
                </p>
                <p className="text-xs text-amber-700">
                  <span className="font-semibold">Owner:</span> owner@example.com / any password
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            © 2025 PetalsOS. All rights reserved.
          </p>
        </div>
      </div>
    );
  };

  // Filter bills
  const getFilteredBills = () => {
    let filtered = bills;
    if (selectedProperty) {
      filtered = filtered.filter(b => b.propertyId === selectedProperty.id);
    }
    if (billFilter === 'paid') {
      filtered = filtered.filter(b => b.status === 'paid');
    } else if (billFilter === 'unpaid') {
      filtered = filtered.filter(b => b.status === 'unpaid');
    }
    return filtered;
  };

  const totalUnpaidBills = bills.filter(b => b.status === 'unpaid').reduce((sum, b) => sum + b.amount, 0);
  const totalPaidBills = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0);

  // Financial Reports Page
  const FinancialReportsPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Download monthly financial statements</p>
        </div>
      </div>

      <div className="grid gap-4">
        {financialReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{report.month}</h3>
                  <span className="text-sm text-gray-500">• {report.properties} Properties</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-xl font-bold text-green-600">AED {report.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expenses</p>
                    <p className="text-xl font-bold text-red-600">AED {report.expenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Profit</p>
                    <p className="text-xl font-bold text-amber-600">AED {report.profit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => downloadReport(report)}
                className="ml-6 flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                <Upload className="w-5 h-5" />
                Download Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Ticket Modal Component
  const TicketModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      priority: 'medium',
      property: '',
      from: '',
      to: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newTicket = {
        id: ticketType === 'owner' ? ownerTickets.length + 1 : internalTickets.length + 1,
        ...formData,
        status: 'open',
        date: new Date().toISOString().split('T')[0]
      };

      if (ticketType === 'owner') {
        setOwnerTickets([newTicket, ...ownerTickets]);
      } else {
        setInternalTickets([newTicket, ...internalTickets]);
      }

      setShowTicketModal(false);
      setFormData({ title: '', description: '', priority: 'medium', property: '', from: '', to: '' });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {ticketType === 'owner' ? 'Raise Support Ticket' : 'Create Internal Ticket'}
            </h2>
            <button onClick={() => setShowTicketModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="Provide detailed information about the issue"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {ticketType === 'owner' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                  <select
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  >
                    <option value="">Select property</option>
                    <option value="All Properties">All Properties</option>
                    {properties.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>

            {ticketType === 'internal' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Department</label>
                  <select
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  >
                    <option value="">Select department</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Department</label>
                  <select
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    required
                  >
                    <option value="">Select department</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowTicketModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Owner Tickets Page
  const OwnerTicketsPage = () => {
    const getStatusColor = (status) => {
      const colors = {
        'open': 'bg-blue-100 text-blue-700 border-blue-200',
        'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
        'resolved': 'bg-green-100 text-green-700 border-green-200'
      };
      return colors[status] || colors.open;
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage your support requests</p>
          </div>
          <button
            onClick={() => {
              setTicketType('owner');
              setShowTicketModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            New Ticket
          </button>
        </div>

        <div className="grid gap-4">
          {ownerTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)]}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{ticket.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {ticket.property}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(ticket.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Internal Tickets Page
  const InternalTicketsPage = () => {
    const getStatusColor = (status) => {
      const colors = {
        'open': 'bg-blue-100 text-blue-700 border-blue-200',
        'in-progress': 'bg-amber-100 text-amber-700 border-amber-200',
        'resolved': 'bg-green-100 text-green-700 border-green-200'
      };
      return colors[status] || colors.open;
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Internal Tickets</h1>
            <p className="text-gray-600 mt-1">Inter-department communication and requests</p>
          </div>
          <button
            onClick={() => {
              setTicketType('internal');
              setShowTicketModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            New Internal Ticket
          </button>
        </div>

        <div className="grid gap-4">
          {internalTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)]}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{ticket.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <Users className="w-4 h-4" />
                      From: {ticket.from}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <Users className="w-4 h-4" />
                      To: {ticket.to}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 ml-auto">
                      <Clock className="w-4 h-4" />
                      {new Date(ticket.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Components
  const KPICard = ({ title, value, subtitle, icon: Icon, trend, color = 'gold' }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color === 'gold' ? 'bg-amber-50' : 'bg-beige-50'}`}>
          <Icon className={`w-6 h-6 ${color === 'gold' ? 'text-amber-600' : 'text-gray-600'}`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  const PropertyCard = ({ property, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-amber-700 transition-colors">
            {property.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{property.address}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[property.status]}`}>
          {property.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Revenue</p>
          <p className="font-semibold text-gray-900">AED {property.revenue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Occupancy</p>
          <p className="font-semibold text-gray-900">{property.occupancy}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Next Check-out</p>
          <p className="font-semibold text-gray-900 text-sm">{property.checkOut}</p>
        </div>
      </div>
      <button className="mt-4 w-full py-2 text-sm font-medium text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors flex items-center justify-center group-hover:bg-amber-50">
        View Details <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm mb-2">{task.title}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>{task.assignee}</span>
            <Clock className="w-3 h-3 ml-2" />
            <span>{task.time}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );

  const BillCard = ({ bill }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{bill.type}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              bill.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {bill.status === 'paid' ? '✓ Paid' : '! Unpaid'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{bill.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Due: {bill.dueDate}</span>
            {bill.status === 'paid' && <span className="text-green-600">Paid: {bill.paidDate}</span>}
            <span className="px-2 py-1 bg-gray-100 rounded">{bill.category}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">AED {bill.amount}</p>
        </div>
      </div>
      {bill.status === 'unpaid' && (
        <button className="w-full mt-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">
          Mark as Paid
        </button>
      )}
    </div>
  );

  const AIAssistantPanel = () => (
    <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 shadow-sm border border-amber-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="font-semibold text-gray-900">AI Assistant</h3>
      </div>
      <div className="space-y-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-sm text-gray-700 mb-1">💡 <strong>Pricing Suggestion</strong></p>
          <p className="text-xs text-gray-600">Consider increasing Marina View rates by 8% for New Year's week</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-sm text-gray-700 mb-1">⚠️ <strong>Alert</strong></p>
          <p className="text-xs text-gray-600">You have {bills.filter(b => b.status === 'unpaid').length} unpaid bills totaling AED {totalUnpaidBills.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-sm text-gray-700 mb-1">📋 <strong>SOP Reminder</strong></p>
          <p className="text-xs text-gray-600">Pre-arrival checklist for VIP guest arriving Thursday</p>
        </div>
      </div>
      <button className="mt-4 w-full py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 rounded-lg transition-colors border border-amber-200">
        Ask AI Assistant
      </button>
    </div>
  );

  // Main Views
  const StaffDashboard = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Sarah • Monday, Nov 03, 2025</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentPage('bills')}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 rounded-lg border border-gray-200 transition-colors"
          >
            <CreditCard className="w-5 h-5 text-red-600" />
            <span className="font-medium text-gray-700">{bills.filter(b => b.status === 'unpaid').length} Unpaid</span>
          </button>
          <button 
            onClick={() => setCurrentPage('calendar')}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-50 rounded-lg border border-gray-200 transition-colors"
          >
            <Calendar className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-gray-700">Calendar</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Compact KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-gray-500 font-medium">Occupancy</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{kpiData.occupancy}%</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-gray-500 font-medium">ADR</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">AED {kpiData.adr}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-gray-500 font-medium">RevPAR</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{kpiData.revpar.toFixed(0)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-gray-500 font-medium">Revenue</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{(kpiData.revenue / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-gray-500 font-medium">Cleaning</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{kpiData.cleaningScore}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-gray-500 font-medium">NPS</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{kpiData.nps}</p>
        </div>
      </div>

      {/* Property Grid - MOVED UP */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-xl">All Properties ({properties.length})</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search properties..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property}
              onClick={() => {
                setSelectedProperty(property);
                setCurrentPage('property-detail');
                setPropertyDetailTab('overview');
              }}
            />
          ))}
        </div>
      </div>

      {/* Compact Charts & Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Trend</h3>
              <button 
                onClick={() => setShowRevenueInfo(!showRevenueInfo)}
                className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 mt-1"
              >
                <Info className="w-3 h-3" />
                What is this?
              </button>
            </div>
          </div>

          {showRevenueInfo && (
            <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2 text-sm">Understanding Revenue Trend</h4>
              <p className="text-sm text-amber-800 mb-2">
                This chart shows your <strong>total monthly revenue</strong> across all properties over the last 6 months. 
              </p>
              <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                <li><strong>Upward trend</strong> = Growing bookings and pricing optimization</li>
                <li><strong>April peak</strong> = Highest earning month (AED 245.6K)</li>
                <li><strong>Seasonal patterns</strong> = Helps predict future demand</li>
              </ul>
              <p className="text-xs text-amber-700 mt-2">
                💡 Use this to forecast earnings, adjust pricing, and identify growth opportunities
              </p>
            </div>
          )}

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value) => [`AED ${value.toLocaleString()}`, 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#D4AF37', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <AIAssistantPanel />
      </div>

      {/* Today's Activity - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Check-ins Today ({checkInsToday.length})
          </h3>
          <div className="space-y-2">
            {checkInsToday.map((checkin, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{checkin.guest}</p>
                  <p className="text-xs text-gray-600">{checkin.property}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{checkin.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Check-outs Today ({checkOutsToday.length})
          </h3>
          <div className="space-y-2">
            {checkOutsToday.map((checkout, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{checkout.guest}</p>
                  <p className="text-xs text-gray-600">{checkout.property}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{checkout.time}</p>
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{checkout.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Bills Management Page
  const BillsPage = () => {
    const filteredBills = getFilteredBills();
    const unpaidAmount = filteredBills.filter(b => b.status === 'unpaid').reduce((sum, b) => sum + b.amount, 0);
    const paidAmount = filteredBills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="text-amber-600 hover:text-amber-700 font-medium mb-2 flex items-center gap-1 text-sm"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Bills & Expenses</h1>
            <p className="text-gray-500 mt-1">Manage all property-related bills and payments</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="text-gray-700 text-sm font-medium mb-1">Unpaid Bills</h3>
            <p className="text-3xl font-bold text-red-700">AED {totalUnpaidBills.toLocaleString()}</p>
            <p className="text-sm text-red-600 mt-1">{bills.filter(b => b.status === 'unpaid').length} bills pending</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-gray-700 text-sm font-medium mb-1">Paid This Month</h3>
            <p className="text-3xl font-bold text-green-700">AED {totalPaidBills.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">{bills.filter(b => b.status === 'paid').length} bills paid</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <DollarSign className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-gray-700 text-sm font-medium mb-1">Total Expenses</h3>
            <p className="text-3xl font-bold text-blue-700">AED {(totalUnpaidBills + totalPaidBills).toLocaleString()}</p>
            <p className="text-sm text-blue-600 mt-1">This month</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBillFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  billFilter === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Bills ({bills.length})
              </button>
              <button
                onClick={() => setBillFilter('unpaid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  billFilter === 'unpaid' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Unpaid ({bills.filter(b => b.status === 'unpaid').length})
              </button>
              <button
                onClick={() => setBillFilter('paid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  billFilter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Paid ({bills.filter(b => b.status === 'paid').length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBills.map(bill => (
              <BillCard key={bill.id} bill={bill} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Calendar View Page
  const CalendarPage = () => {
    const calendarBookings = [
      { id: 1, propertyId: 1, property: 'Marina View 2401', guest: 'James Wilson', checkIn: '2025-11-01', checkOut: '2025-11-06', status: 'occupied', color: 'bg-blue-100 border-blue-300 text-blue-800' },
      { id: 2, propertyId: 2, property: 'Downtown Loft 1502', guest: 'Michael Chen', checkIn: '2025-10-30', checkOut: '2025-11-03', status: 'checking-out', color: 'bg-purple-100 border-purple-300 text-purple-800' },
      { id: 3, propertyId: 3, property: 'Palm Residence 803', guest: 'Emma Thompson', checkIn: '2025-11-03', checkOut: '2025-11-06', status: 'checking-in', color: 'bg-green-100 border-green-300 text-green-800' },
      { id: 4, propertyId: 5, property: 'JBR Beach Tower 1201', guest: 'Sophie Martin', checkIn: '2025-11-02', checkOut: '2025-11-09', status: 'occupied', color: 'bg-blue-100 border-blue-300 text-blue-800' },
      { id: 5, propertyId: 1, property: 'Marina View 2401', guest: 'David Kim', checkIn: '2025-11-07', checkOut: '2025-11-12', status: 'confirmed', color: 'bg-amber-100 border-amber-300 text-amber-800' },
      { id: 6, propertyId: 2, property: 'Downtown Loft 1502', guest: 'Sarah Johnson', checkIn: '2025-11-05', checkOut: '2025-11-10', status: 'confirmed', color: 'bg-amber-100 border-amber-300 text-amber-800' },
      { id: 7, propertyId: 4, property: 'Business Bay 3201', guest: 'Robert Lee', checkIn: '2025-11-08', checkOut: '2025-11-15', status: 'confirmed', color: 'bg-amber-100 border-amber-300 text-amber-800' },
      { id: 8, propertyId: 3, property: 'Palm Residence 803', guest: 'Lisa Anderson', checkIn: '2025-11-10', checkOut: '2025-11-18', status: 'confirmed', color: 'bg-amber-100 border-amber-300 text-amber-800' },
      { id: 9, propertyId: 5, property: 'JBR Beach Tower 1201', guest: 'Ahmed Hassan', checkIn: '2025-11-12', checkOut: '2025-11-20', status: 'confirmed', color: 'bg-amber-100 border-amber-300 text-amber-800' },
      { id: 10, propertyId: 6, property: 'Dubai Hills 605', guest: 'Maria Garcia', checkIn: '2025-11-15', checkOut: '2025-11-22', status: 'confirmed', color: 'bg-amber-100 border-amber-300 text-amber-800' }
    ];

    // Generate November 2025 calendar grid
    const daysInMonth = 30;
    const firstDay = 6; // November 1, 2025 is Saturday (0=Sunday, 6=Saturday)
    const calendarDays = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    const getBookingsForDay = (day) => {
      if (!day) return [];
      const dateStr = `2025-11-${day.toString().padStart(2, '0')}`;
      return calendarBookings.filter(booking => {
        return dateStr >= booking.checkIn && dateStr <= booking.checkOut;
      });
    };

    const todayCheckIns = calendarBookings.filter(b => b.checkIn === '2025-11-03');
    const todayCheckOuts = calendarBookings.filter(b => b.checkOut === '2025-11-03');
    const upcomingWeek = calendarBookings.filter(b => b.checkIn >= '2025-11-03' && b.checkIn <= '2025-11-10');

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="text-amber-600 hover:text-amber-700 font-medium mb-2 flex items-center gap-1 text-sm"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Calendar & Bookings</h1>
            <p className="text-gray-500 mt-1">November 2025 • All Properties</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-700 transition-colors">
              Filter Properties
            </button>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
              + New Booking
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <p className="text-sm font-medium text-blue-900">Currently Occupied</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{calendarBookings.filter(b => b.status === 'occupied').length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium text-green-900">Check-ins Today</p>
            </div>
            <p className="text-2xl font-bold text-green-900">{todayCheckIns.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <p className="text-sm font-medium text-purple-900">Check-outs Today</p>
            </div>
            <p className="text-2xl font-bold text-purple-900">{todayCheckOuts.length}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <p className="text-sm font-medium text-amber-900">Upcoming (7 days)</p>
            </div>
            <p className="text-2xl font-bold text-amber-900">{upcomingWeek.length}</p>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">November 2025</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 rotate-180 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-700 px-3">Month View</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              const bookings = getBookingsForDay(day);
              const isToday = day === 3;
              
              return (
                <div 
                  key={idx}
                  className={`min-h-24 p-2 rounded-lg border transition-all ${
                    day ? 'bg-white border-gray-200 hover:border-amber-300 hover:shadow-sm cursor-pointer' : 'bg-gray-50 border-gray-100'
                  } ${isToday ? 'ring-2 ring-amber-400 bg-amber-50' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-amber-700' : 'text-gray-900'}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {bookings.slice(0, 2).map(booking => (
                          <div 
                            key={booking.id}
                            className={`text-xs p-1 rounded border ${booking.color} truncate`}
                            title={`${booking.property} - ${booking.guest}`}
                          >
                            {booking.property.split(' ')[0]}
                          </div>
                        ))}
                        {bookings.length > 2 && (
                          <div className="text-xs text-gray-500 font-medium">
                            +{bookings.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
              <span className="text-sm text-gray-600">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
              <span className="text-sm text-gray-600">Check-in</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-100 border border-purple-300"></div>
              <span className="text-sm text-gray-600">Check-out</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300"></div>
              <span className="text-sm text-gray-600">Confirmed</span>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Check-ins (Next 7 Days)</h3>
          <div className="space-y-3">
            {upcomingWeek.map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{parseInt(booking.checkIn.split('-')[2])}</p>
                    <p className="text-xs text-gray-500">Nov</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{booking.guest}</p>
                    <p className="text-sm text-gray-600">{booking.property}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{booking.checkIn} → {booking.checkOut}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${booking.color} mt-1`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Property Detail Page with Tabs
  const PropertyDetailPage = () => {
    const property = selectedProperty;
    if (!property) return null;

    const propertyBills = bills.filter(b => b.propertyId === property.id);
    const propertyUnpaid = propertyBills.filter(b => b.status === 'unpaid').reduce((sum, b) => sum + b.amount, 0);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="text-amber-600 hover:text-amber-700 font-medium mb-2 flex items-center gap-1 text-sm"
            >
              ← Back to Properties
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
            <p className="text-gray-500 mt-1">{property.address}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${statusColors[property.status]}`}>
            {property.status}
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setPropertyDetailTab('overview')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                propertyDetailTab === 'overview' 
                  ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 inline-block mr-2" />
              Overview
            </button>
            <button
              onClick={() => setPropertyDetailTab('photos')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                propertyDetailTab === 'photos' 
                  ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Camera className="w-5 h-5 inline-block mr-2" />
              Photo Gallery
            </button>
            <button
              onClick={() => setPropertyDetailTab('bills')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                propertyDetailTab === 'bills' 
                  ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5 inline-block mr-2" />
              Bills ({propertyBills.length})
            </button>
            <button
              onClick={() => setPropertyDetailTab('calculator')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                propertyDetailTab === 'calculator' 
                  ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calculator className="w-5 h-5 inline-block mr-2" />
              Revenue Calculator
            </button>
            <button
              onClick={() => setPropertyDetailTab('inspection')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                propertyDetailTab === 'inspection' 
                  ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ClipboardCheck className="w-5 h-5 inline-block mr-2" />
              Inspection
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {propertyDetailTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100">
                    <DollarSign className="w-8 h-8 text-amber-600 mb-3" />
                    <h3 className="text-gray-700 text-sm font-medium mb-1">Monthly Revenue</h3>
                    <p className="text-3xl font-bold text-gray-900">AED {property.revenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                    <Building2 className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-gray-700 text-sm font-medium mb-1">Occupancy Rate</h3>
                    <p className="text-3xl font-bold text-gray-900">{property.occupancy}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                    <Star className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="text-gray-700 text-sm font-medium mb-1">Guest Rating</h3>
                    <p className="text-3xl font-bold text-gray-900">4.8</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Property Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Property Type</p>
                      <p className="font-medium text-gray-900">2 Bedroom Apartment</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Size</p>
                      <p className="font-medium text-gray-900">1,250 sq ft</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Floor</p>
                      <p className="font-medium text-gray-900">24th Floor</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Parking</p>
                      <p className="font-medium text-gray-900">1 Space</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Next Check-out</p>
                      <p className="font-medium text-gray-900">{property.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Amenities</p>
                      <p className="font-medium text-gray-900">Pool, Gym, Concierge</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photo Gallery Tab */}
            {propertyDetailTab === 'photos' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Property Photos</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                    <Upload className="w-5 h-5" />
                    Upload New Photos
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer bg-gray-50">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium mb-1">Drag & Drop or Click to Upload</p>
                  <p className="text-sm text-gray-500">Support for PNG, JPG up to 10MB</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {propertyPhotos.map(photo => (
                    <div key={photo.id} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                      <img 
                        src={photo.url} 
                        alt={photo.category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-medium">{photo.category}</p>
                          <p className="text-white/80 text-xs">Uploaded {photo.uploadDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Photo Guidelines</h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Use high-resolution images (min 1920x1080px)</li>
                    <li>Natural lighting preferred - shoot during golden hour</li>
                    <li>Include wide-angle shots of each room</li>
                    <li>Showcase views, amenities, and unique features</li>
                    <li>Keep photos current - update seasonally</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bills Tab */}
            {propertyDetailTab === 'bills' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
                    <h3 className="text-gray-700 text-sm font-medium mb-1">Unpaid Bills</h3>
                    <p className="text-3xl font-bold text-red-700">AED {propertyUnpaid.toLocaleString()}</p>
                    <p className="text-sm text-red-600 mt-1">{propertyBills.filter(b => b.status === 'unpaid').length} pending</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="text-gray-700 text-sm font-medium mb-1">Paid Bills</h3>
                    <p className="text-3xl font-bold text-green-700">
                      AED {propertyBills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 mt-1">{propertyBills.filter(b => b.status === 'paid').length} paid</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {propertyBills.map(bill => (
                    <BillCard key={bill.id} bill={bill} />
                  ))}
                </div>
              </div>
            )}

            {/* Revenue Calculator Tab */}
            {propertyDetailTab === 'calculator' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Revenue Calculator</h3>
                  <p className="text-gray-600">Calculate potential earnings based on different scenarios</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average Nightly Rate (AED)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="850"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Occupancy Rate (%)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="85"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Management Fee (%)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="15"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Operating Costs (AED)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="3500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Projected Earnings</h4>
                    <div className="space-y-4">
                      <div className="pb-3 border-b border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Gross Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">AED 21,675</p>
                        <p className="text-xs text-gray-500 mt-1">850 × 30 days × 85% occupancy</p>
                      </div>
                      <div className="pb-3 border-b border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Management Fee (15%)</p>
                        <p className="text-lg font-semibold text-red-600">- AED 3,251</p>
                      </div>
                      <div className="pb-3 border-b border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Operating Costs</p>
                        <p className="text-lg font-semibold text-red-600">- AED 3,500</p>
                      </div>
                      <div className="bg-amber-100 rounded-lg p-4 mt-4">
                        <p className="text-sm text-amber-800 mb-1">Net Monthly Income</p>
                        <p className="text-3xl font-bold text-amber-900">AED 14,924</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-800 mb-1">Annual Projection</p>
                        <p className="text-2xl font-bold text-blue-900">AED 179,088</p>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
                      Generate Full Report
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Optimization Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">💰 Increase Rate by 10%</p>
                      <p className="text-xs text-gray-600">Potential +AED 1,900/month</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">📈 Boost Occupancy to 90%</p>
                      <p className="text-xs text-gray-600">Potential +AED 1,275/month</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">⚡ Reduce Costs by 20%</p>
                      <p className="text-xs text-gray-600">Save AED 700/month</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inspection Tab */}
            {propertyDetailTab === 'inspection' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Inspection Checklist</h3>
                  <div className="space-y-3">
                    {[
                      { item: 'Cleanliness - Living Room', status: 'pass', notes: 'Excellent condition' },
                      { item: 'Cleanliness - Bedrooms', status: 'pass', notes: 'All linens fresh' },
                      { item: 'Cleanliness - Bathrooms', status: 'pass', notes: 'Deep cleaned' },
                      { item: 'Appliances - Kitchen', status: 'pass', notes: 'All working' },
                      { item: 'Appliances - AC Units', status: 'attention', notes: 'Filter needs replacement' },
                      { item: 'Furniture & Fixtures', status: 'pass', notes: 'No damage' },
                      { item: 'Amenities Stock', status: 'pass', notes: 'Fully restocked' },
                      { item: 'Safety Equipment', status: 'pass', notes: 'Fire alarm tested' }
                    ].map((check, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            check.status === 'pass' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {check.status === 'pass' ? '✓' : '!'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{check.item}</p>
                            <p className="text-xs text-gray-500">{check.notes}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          check.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {check.status === 'pass' ? 'Pass' : 'Attention'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Inspection Photos</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-1">Upload Inspection Photos</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const OwnerPortal = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Michael</h1>
          <p className="text-gray-500 text-sm">Here's what's happening with your properties</p>
        </div>
        <button 
          onClick={() => setAiChatOpen(!aiChatOpen)}
          className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* Owner KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
          <DollarSign className="w-8 h-8 mb-3 opacity-90" />
          <h3 className="text-white/80 text-sm font-medium mb-1">This Month</h3>
          <p className="text-4xl font-bold">AED {(ownerData.monthlyEarnings / 1000).toFixed(0)}K</p>
          <p className="text-white/70 text-sm mt-2">+12% vs last month</p>
        </div>
        <KPICard 
          title="Year to Date" 
          value={`AED ${(ownerData.ytdEarnings / 1000).toFixed(0)}K`} 
          subtitle="Total earnings"
          icon={TrendingUp}
          trend={8.5}
        />
        <KPICard 
          title="Occupancy Rate" 
          value={`${ownerData.occupancyRate}%`} 
          subtitle="Across all units"
          icon={Building2}
          trend={4.2}
        />
        <KPICard 
          title="Avg Nightly Rate" 
          value={`AED ${ownerData.avgNightly}`} 
          subtitle="Per property"
          icon={Star}
          trend={3.8}
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Earnings Overview</h3>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300">
            <option>Last 5 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ownerRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value) => [`AED ${value.toLocaleString()}`, 'Earnings']}
            />
            <Bar dataKey="earnings" fill="#D4AF37" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Properties & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Your Properties</h3>
          <div className="space-y-3">
            {properties.slice(0, 3).map(prop => (
              <div key={prop.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{prop.name}</p>
                  <p className="text-sm text-gray-500">Occupancy: {prop.occupancy}%</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">AED {prop.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Payouts</h3>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-4">
            <p className="text-sm text-gray-600 mb-1">Next Payout (Nov 15)</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">AED {ownerData.upcomingPayouts.toLocaleString()}</p>
            <div className="flex items-center gap-2 text-sm text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Processing</span>
            </div>
          </div>
          <button className="w-full py-3 border border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700 font-medium rounded-xl transition-colors">
            View Payment History
          </button>
        </div>
      </div>

      {/* Monthly Statement & ROI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            Monthly Statement
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Gross Revenue</span>
              <span className="font-medium">AED 52,400</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Management Fee (15%)</span>
              <span className="font-medium text-red-600">- AED 7,860</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Cleaning & Maintenance</span>
              <span className="font-medium text-red-600">- AED 3,200</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Utilities</span>
              <span className="font-medium text-red-600">- AED 1,500</span>
            </div>
            <div className="flex justify-between py-3 bg-amber-50 rounded-lg px-3 mt-2">
              <span className="font-semibold text-gray-900">Net Earnings</span>
              <span className="font-bold text-amber-700">AED 39,840</span>
            </div>
          </div>
          <button className="w-full mt-4 py-3 border border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700 font-medium rounded-xl transition-colors">
            Download Full Statement
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            ROI Calculator
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Property Value</label>
              <input 
                type="text" 
                placeholder="AED 1,500,000"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Annual Rental Income</label>
              <input 
                type="text" 
                placeholder="AED 180,000"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
              />
            </div>
            <div className="bg-white rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-600 mb-1">Estimated Annual ROI</p>
              <p className="text-3xl font-bold text-blue-600">12.8%</p>
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
              Calculate Full Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Booking Sources Statistics */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-6">Booking Sources Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {bookingSourceStats.map((stat) => (
            <div key={stat.source} className="bg-gray-50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: stat.color }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{stat.source}</span>
                <span className="text-sm font-semibold px-2 py-1 bg-white rounded-full" style={{ color: stat.color }}>
                  {stat.percentage}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">AED {(stat.revenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-600">{stat.bookings} bookings</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current & Previous Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Current Bookings</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              {currentBookings.length} Active
            </span>
          </div>
          <div className="space-y-4">
            {currentBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{booking.guest}</p>
                    <p className="text-sm text-gray-600">{booking.property}</p>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-bold rounded-lg text-white"
                    style={{ backgroundColor: bookingSourceStats.find(s => s.source === booking.source)?.color }}
                  >
                    {booking.source}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Check-in</p>
                    <p className="font-medium text-gray-900">{new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Check-out</p>
                    <p className="font-medium text-gray-900">{new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Revenue</p>
                    <p className="font-medium text-green-600">AED {booking.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600">{booking.nights} nights</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {previousBookings.length} Completed
            </span>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {previousBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all bg-gray-50/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{booking.guest}</p>
                    <p className="text-sm text-gray-600">{booking.property}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-1 text-xs font-bold rounded text-white"
                      style={{ backgroundColor: bookingSourceStats.find(s => s.source === booking.source)?.color }}
                    >
                      {booking.source}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{booking.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Check-in</p>
                    <p className="font-medium text-gray-700">{new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Check-out</p>
                    <p className="font-medium text-gray-700">{new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Revenue</p>
                    <p className="font-medium text-green-600">AED {booking.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">{booking.nights} nights • Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Referral Rewards Program</h3>
            <p className="text-white/90">Earn AED 5,000 for every property owner you refer</p>
          </div>
          <Gift className="w-16 h-16 opacity-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">Referrals Made</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">Rewards Earned</p>
            <p className="text-3xl font-bold">AED 15K</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold">2</p>
          </div>
        </div>
        <button className="w-full py-3 bg-white hover:bg-gray-100 text-purple-600 font-semibold rounded-xl transition-colors shadow-md">
          Invite Property Owners
        </button>
      </div>
    </div>
  );

  // AI Chat Overlay
  const AIChatOverlay = () => (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${aiChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-96 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="font-semibold text-white">AI Assistant</h3>
          </div>
          <button onClick={() => setAiChatOpen(false)} className="text-white hover:bg-white/20 rounded-lg p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 h-96 overflow-y-auto space-y-3">
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm text-gray-700">Hello! I'm your PetalsOS AI assistant. How can I help you today?</p>
          </div>
          <div className="bg-amber-100 rounded-lg p-3 max-w-[80%] ml-auto">
            <p className="text-sm text-gray-700">What's my property performance this month?</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-sm text-gray-700">Great question! Your properties are performing excellently:</p>
            <ul className="text-sm text-gray-700 mt-2 space-y-1 list-disc list-inside">
              <li>89% occupancy (↑ 4% vs last month)</li>
              <li>AED 45,680 earnings this month</li>
              <li>Marina View 2401 is your top performer</li>
            </ul>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
            />
            <button className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation
  const Sidebar = () => (
    <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      {/* Header - Fixed at top */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl">🌸</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-xl text-gray-900 truncate">PetalsOS</h1>
            <p className="text-xs text-gray-500 truncate">Property Management</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Main Navigation */}
        <div className="space-y-2 mb-6">
          {userRole === 'staff' && (
            <button
              onClick={() => {
                setCurrentView('staff-dashboard');
                setCurrentPage('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === 'staff-dashboard' && currentPage === 'dashboard' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Staff Dashboard</span>
            </button>
          )}
          {userRole === 'owner' && (
            <button
              onClick={() => {
                setCurrentView('owner-portal');
                setCurrentPage('owner');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === 'owner-portal' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Owner Portal</span>
            </button>
          )}
        </div>

        {/* Quick Access - Only for staff */}
        {userRole === 'staff' && (
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-3 px-4 uppercase tracking-wider">Quick Access</p>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentView('staff-dashboard');
                  setCurrentPage('bills');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  currentPage === 'bills' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                <span>Bills & Expenses</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('staff-dashboard');
                  setCurrentPage('calendar');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  currentPage === 'calendar' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Calendar</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('staff-dashboard');
                  setCurrentPage('financial-reports');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  currentPage === 'financial-reports' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span>Financial Reports</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('staff-dashboard');
                  setCurrentPage('internal-tickets');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  currentPage === 'internal-tickets' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span>Internal Tickets</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* Owner Portal Menu */}
        {userRole === 'owner' && (
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-3 px-4 uppercase tracking-wider">My Portal</p>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentView('owner-portal');
                  setCurrentPage('financial-reports');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  currentPage === 'financial-reports' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span>Financial Reports</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('owner-portal');
                  setCurrentPage('my-tickets');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                  currentPage === 'my-tickets' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span>Support Tickets</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Profile - Fixed at bottom */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-amber-700 font-semibold text-sm uppercase">
              {userName.substring(0, 2) || 'SM'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 text-sm truncate">{userName || 'Sarah Mitchell'}</p>
            <p className="text-xs text-gray-500 truncate capitalize">{userRole || 'Property Manager'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/20">
      <Sidebar />

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 p-3 lg:p-6 min-h-screen">
        {/* Staff Dashboard Pages */}
        {currentView === 'staff-dashboard' && currentPage === 'dashboard' && <StaffDashboard />}
        {currentView === 'staff-dashboard' && currentPage === 'bills' && <BillsPage />}
        {currentView === 'staff-dashboard' && currentPage === 'calendar' && <CalendarPage />}
        {currentView === 'staff-dashboard' && currentPage === 'property-detail' && <PropertyDetailPage />}
        {currentView === 'staff-dashboard' && currentPage === 'financial-reports' && <FinancialReportsPage />}
        {currentView === 'staff-dashboard' && currentPage === 'internal-tickets' && <InternalTicketsPage />}

        {/* Owner Portal Pages */}
        {currentView === 'owner-portal' && currentPage === 'owner' && <OwnerPortal />}
        {currentView === 'owner-portal' && currentPage === 'financial-reports' && <FinancialReportsPage />}
        {currentView === 'owner-portal' && currentPage === 'my-tickets' && <OwnerTicketsPage />}
      </div>

      {/* AI Chat Overlay for Owner Portal */}
      {currentView === 'owner-portal' && currentPage === 'owner' && <AIChatOverlay />}

      {/* Ticket Modal */}
      {showTicketModal && <TicketModal />}
    </div>
  );
};

export default PetalsOS;