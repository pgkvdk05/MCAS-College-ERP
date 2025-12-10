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
import SuperAdminLogin from "./pages/auth/SuperAdminLogin"; // New import
import AdminLogin from "./pages/auth/AdminLogin";           // New import
import TeacherLogin from "./pages/auth/TeacherLogin";         // New import
import StudentLogin from "./pages/auth/StudentLogin";         // New import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* New Auth Routes */}
          <Route path="/auth/super-admin" element={<SuperAdminLogin />} />
          <Route path="/auth/admin" element={<AdminLogin />} />
          <Route path="/auth/teacher" element={<TeacherLogin />} />
          <Route path="/auth/student" element={<StudentLogin />} />

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
          {/* ERP Marks Management Routes */}
          <Route path="/erp/marks/upload" element={<UploadMarks />} />
          <Route path="/erp/marks/student" element={<ViewMarks />} />
          {/* ERP Fees Management Routes */}
          <Route path="/erp/fees/student" element={<StudentFees />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;