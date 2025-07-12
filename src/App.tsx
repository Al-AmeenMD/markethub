import { ThemeProvider } from '@/providers/theme-provider';
import { Layout } from '@/components/layout';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="markethub-theme">
      <Layout />
    </ThemeProvider>
  );
}

export default App;