# AI Rules for Dyad App Development

This document outlines the core technologies used in this application and provides guidelines for library usage to ensure consistency, maintainability, and adherence to best practices.

## Tech Stack Overview

*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer experience.
*   **Vite**: A fast build tool that provides a lightning-fast development experience for modern web projects.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs. All styling should be done using Tailwind classes.
*   **shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS. These components are designed to be easily customizable.
*   **React Router DOM**: A library for declarative routing in React applications.
*   **Supabase**: An open-source Firebase alternative providing a PostgreSQL database, authentication, real-time subscriptions, and storage.
*   **Tanstack Query (React Query)**: A powerful library for managing server state, including data fetching, caching, and synchronization.
*   **Sonner**: A modern toast library for displaying notifications to the user.
*   **Lucide React**: A collection of beautiful and customizable SVG icons.
*   **date-fns**: A comprehensive JavaScript utility library for working with dates.

## Library Usage Rules

To maintain a consistent and efficient codebase, please adhere to the following rules when using libraries:

*   **UI Components**:
    *   **Always** use `shadcn/ui` components for all UI elements.
    *   If a required component is not available in `shadcn/ui` or needs significant customization, create a **new component** in `src/components/` and style it using Tailwind CSS. **Do NOT modify existing `shadcn/ui` component files.**
*   **Styling**:
    *   **Exclusively** use Tailwind CSS for all styling. Avoid inline styles or separate CSS files/modules.
    *   Utilize the `cn` utility function (from `src/lib/utils.ts`) for conditionally applying and merging Tailwind classes.
*   **Routing**:
    *   Use `react-router-dom` for all client-side navigation and route management.
    *   All main application routes should be defined within `src/App.tsx`.
*   **Server State Management**:
    *   For all data fetching, caching, and synchronization with the backend, use `Tanstack Query`.
*   **Authentication & Database**:
    *   All authentication and database interactions must be performed using the `supabase` client (from `src/integrations/supabase/client.ts`).
*   **Notifications**:
    *   Use `sonner` for all toast notifications. Utility functions (`showSuccess`, `showError`, `showLoading`, `dismissToast`) are available in `src/utils/toast.ts`.
*   **Icons**:
    *   Integrate icons using the `lucide-react` library.
*   **Date Handling**:
    *   For any date formatting, parsing, or manipulation, use `date-fns`.