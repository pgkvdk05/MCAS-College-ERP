import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddTeacher from "./pages/erp/AddTeacher";
import AddStudent from "./pages/erp/AddStudent";
import CreateAdmin from "./pages/dev/CreateAdmin";
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
import AuthPage from "./components/auth/AuthPage";
import DashboardPage from "./components/layout/DashboardPage";
import ProfilePage from "./pages/erp/ProfilePage";
import { useSession } from "./components/auth/SessionContextProvider";
import { useEffect } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import ProtectedRoute
import SeedPage from "./pages/dev/SeedPage"; // Import SeedPage
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics

const queryClient = new QueryClient();

const App = () => {
  const { user, userRole, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && userRole) {
      // If user is logged in and role is determined, ensure they are on the correct dashboard
      const expectedDashboardPath = `/dashboard/${userRole.toLowerCase().replace('_', '-')}`;
      if (location.pathname === '/' || location.pathname.startsWith('/auth/')) {
        navigate(expectedDashboardPath, { replace: true });
      } else if (!location.pathname.startsWith('/dashboard/') && !location.pathname.startsWith('/profile/') && !location.pathname.startsWith('/erp/')) {
        // If logged in and on an unexpected non-auth/non-dashboard route, redirect to their dashboard
        navigate(expectedDashboardPath, { replace: true });
      }
    } else if (!loading && !user) {
      // If not logged in, and trying to access a protected route, ProtectedRoute will handle redirection to '/'
      // If on '/', '/auth/*', or NotFound, no redirection needed here.
    }
  }, [user, userRole, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading application...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/auth/super-admin" element={<AuthPage role="SUPER_ADMIN" defaultUsername="superadmin" />} />
          <Route path="/auth/admin" element={<AuthPage role="ADMIN" defaultUsername="admin" />} />
          <Route path="/auth/teacher" element={<AuthPage role="TEACHER" defaultUsername="teacher" />} />
          <Route path="/auth/student" element={<AuthPage role="STUDENT" defaultUsername="student" />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="/dashboard/super-admin" element={<DashboardPage userRole="SUPER_ADMIN" />} />
            <Route path="/profile/super-admin" element={<ProfilePage userRole="SUPER_ADMIN" />} />
            <Route path="/erp/add-teacher" element={<AddTeacher />} />
            <Route path="/erp/add-student" element={<AddStudent />} />
            <Route path="/erp/manage-users" element={<ManageUsers />} />
            <Route path="/erp/manage-departments" element={<ManageDepartments />} />
            <Route path="/erp/manage-courses" element={<ManageCourses />} />
            {/* Super Admin can also access Admin/Teacher routes for management, if needed, but for now, strict roles */}
            <Route path="/erp/fees/admin" element={<AdminFees />} /> {/* Admin/Super Admin */}
            <Route path="/erp/od/approve" element={<ApproveODRequests />} /> {/* Teacher/Admin/Super Admin */}
            <Route path="/erp/attendance/all" element={<ViewAllAttendance />} /> {/* Admin/Super Admin */}
            <Route path="/erp/marks/all" element={<ViewAllMarks />} /> {/* Admin/Super Admin */}
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/dashboard/admin" element={<DashboardPage userRole="ADMIN" />} />
            <Route path="/profile/admin" element={<ProfilePage userRole="ADMIN" />} />
            {/* Admin specific routes, some overlap with Super Admin */}
            <Route path="/erp/attendance/mark" element={<MarkAttendance />} /> {/* Teacher/Admin */}
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['TEACHER', 'ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/dashboard/teacher" element={<DashboardPage userRole="TEACHER" />} />
            <Route path="/profile/teacher" element={<ProfilePage userRole="TEACHER" />} />
            {/* Teacher specific routes */}
            <Route path="/erp/marks/upload" element={<UploadMarks />} />
            <Route path="/erp/teacher/classes" element={<ViewMyClasses />} />
            <Route path="/erp/teacher/student-profiles" element={<ViewStudentProfiles />} />
            <Route path="/erp/chat/teacher" element={<TeacherChat />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['STUDENT', 'TEACHER', 'ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/dashboard/student" element={<DashboardPage userRole="STUDENT" />} />
            <Route path="/profile/student" element={<ProfilePage userRole="STUDENT" />} />
            {/* Student specific routes */}
            <Route path="/erp/attendance/student" element={<ViewAttendance />} />
            <Route path="/erp/marks/student" element={<ViewMarks />} />
            <Route path="/erp/fees/student" element={<StudentFees />} />
            <Route path="/erp/od/request" element={<RequestOD />} />
            <Route path="/erp/chat/student" element={<StudentChat />} />
          </Route>


          {/* Debug Routes */}
          <Route path="/dev/create-admin" element={<CreateAdmin />} />
          <Route path="/dev/seed" element={<SeedPage />} /> {/* New route for SeedPage */}

          {/* Catch-all for 404 - MUST be the last route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics /> {/* Add the Analytics component here */}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;