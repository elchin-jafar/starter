import { Toast } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import AppRoutes from './app/routes';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="h-full w-full">
          <AppRoutes />
        </div>
        <Toast.Provider />
      </QueryClientProvider>
    </>
  );
}

export default App;
