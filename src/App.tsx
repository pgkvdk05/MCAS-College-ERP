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
import AdminFees from "./pages/erp/AdminFees";
import ApproveODRequests from "./pages/erp/ApproveODRequests";
import ManageDepartments from "./pages/erp/ManageDepartments";
import ManageCourses from "./pages/erp/ManageCourses";
import ViewAllAttendance from "./pages/erp/ViewAllAttendance";
import ViewAllMarks from "./pages/erp/ViewAllMarks";
import ViewMyClasses from "./pages/erp/ViewMyClasses";
import ViewStudentProfiles from "./pages/erp/ViewStudentProfiles";
import TeacherChat from "./pages/erp/TeacherChat";
import StudentChat from "./pages/erp/StudentChat";
import RequestOD from "./pages/erp/RequestOD";
import AuthPage from "./components/auth/AuthPage"; // New import for generic AuthPage

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
          <Route path="/auth/super-admin" element={<AuthPage role="SUPER_ADMIN" defaultUsername="superadmin" />} />
          <Route path="/auth/admin" element={<AuthPage role="ADMIN" defaultUsername="admin" />} />
          <Route path="/auth/teacher" element={<AuthPage role="TEACHER" defaultUsername="teacher" />} />
          <Route path="/auth/student" element={<AuthPage role="STUDENT" defaultUsername="student" />} />

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
          <Route path="/erp/attendance/all" element={<ViewAllAttendance />} />

          {/* ERP Marks Management Routes */}
          <Route path="/erp/marks/upload" element={<UploadMarks />} />
          <Route path="/erp/marks/student" element={<ViewMarks />} />
          <Route path="/erp/marks/all" element={<ViewAllMarks />} />

          {/* ERP Fees Management Routes */}
          <Route path="/erp/fees/student" element={<StudentFees />} />
          <Route path="/erp/fees/admin" element={<AdminFees />} />

          {/* ERP Department & Course Management Routes (Super Admin) */}
          <Route path="/erp/manage-departments" element={<ManageDepartments />} />
          <Route path="/erp/manage-courses" element={<ManageCourses />} />

          {/* ERP OD Request Routes */}
          <Route path="/erp/od/approve" element={<ApproveODRequests />} />
          <Route path="/erp/od/request" element={<RequestOD />} />

          {/* ERP Teacher Specific Routes */}
          <Route path="/erp/teacher/classes" element={<ViewMyClasses />} />
          <Route path="/erp/teacher/student-profiles" element={<ViewStudentProfiles />} />
          <Route path="/erp/chat/teacher" element={<TeacherChat />} />

          {/* ERP Student Specific Routes */}
          <Route path="/erp/chat/student" element={<StudentChat />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;