import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { queryClient } from '@/lib/query-client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster
          position="top-right"
          closeButton
          className="group-[.toaster]:pointer-events-auto"
        />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
