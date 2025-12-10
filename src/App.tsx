import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AddTeacher from "./pages/erp/AddTeacher";
import AddStudent from "./pages/erp/AddStudent";
import ManageUsers from "./pages/erp/ManageUsers";
import MarkAttendance from "./pages/erp/MarkAttendance";
import ViewAttendance from "./pages/erp/ViewAttendance";
import UploadMarks from "./pages/erp/UploadMarks";
import ViewMarks from "./pages/erp/ViewMarks";
import StudentFees from "./pages/erp/StudentFees";
import SuperAdminLogin from "./pages/auth/SuperAdminLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import TeacherLogin from "./pages/auth/TeacherLogin";
import StudentLogin from "./pages/auth/StudentLogin";
import AdminFees from "./pages/erp/AdminFees"; // New import
import ApproveODRequests from "./pages/erp/ApproveODRequests"; // New import
import ManageDepartments from "./pages/erp/ManageDepartments"; // New import
import ManageCourses from "./pages/erp/ManageCourses"; // New import
import ViewAllAttendance from "./pages/erp/ViewAllAttendance"; // New import
import ViewAllMarks from "./pages/erp/ViewAllMarks"; // New import
import ViewMyClasses from "./pages/erp/ViewMyClasses"; // New import
import ViewStudentProfiles from "./pages/erp/ViewStudentProfiles"; // New import
import TeacherChat from "./pages/erp/TeacherChat"; // New import
import StudentChat from "./pages/erp/StudentChat"; // New import
import RequestOD from "./pages/erp/RequestOD"; // New import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Auth Routes */}
          <Route path="/auth/super-admin" element={<SuperAdminLogin />} />
          <Route path="/auth/admin" element={<AdminLogin />} />
          <Route path="/auth/teacher" element={<TeacherLogin />} />
          <Route path="/auth/student" element={<StudentLogin />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />

          {/* ERP User Management Routes */}
          <Route path="/erp/add-teacher" element={<AddTeacher />} />
          <Route path="/erp/add-student" element={<AddStudent />} />
          <Route path="/erp/manage-users" element={<ManageUsers />} />

          {/* ERP Attendance Routes */}
          <Route path="/erp/attendance/mark" element={<MarkAttendance />} />
          <Route path="/erp/attendance/student" element={<ViewAttendance />} />
          <Route path="/erp/attendance/all" element={<ViewAllAttendance />} /> {/* New route */}

          {/* ERP Marks Management Routes */}
          <Route path="/erp/marks/upload" element={<UploadMarks />} />
          <Route path="/erp/marks/student" element={<ViewMarks />} />
          <Route path="/erp/marks/all" element={<ViewAllMarks />} /> {/* New route */}

          {/* ERP Fees Management Routes */}
          <Route path="/erp/fees/student" element={<StudentFees />} />
          <Route path="/erp/fees/admin" element={<AdminFees />} /> {/* New route */}

          {/* ERP Department & Course Management Routes (Super Admin) */}
          <Route path="/erp/manage-departments" element={<ManageDepartments />} /> {/* New route */}
          <Route path="/erp/manage-courses" element={<ManageCourses />} /> {/* New route */}

          {/* ERP OD Request Routes */}
          <Route path="/erp/od/approve" element={<ApproveODRequests />} /> {/* New route */}
          <Route path="/erp/od/request" element={<RequestOD />} /> {/* New route */}

          {/* ERP Teacher Specific Routes */}
          <Route path="/erp/teacher/classes" element={<ViewMyClasses />} /> {/* New route */}
          <Route path="/erp/teacher/student-profiles" element={<ViewStudentProfiles />} /> {/* New route */}
          <Route path="/erp/chat/teacher" element={<TeacherChat />} /> {/* New route */}

          {/* ERP Student Specific Routes */}
          <Route path="/erp/chat/student" element={<StudentChat />} /> {/* New route */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;