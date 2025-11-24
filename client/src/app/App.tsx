import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ChatInterface } from "./modules/conversation/components/ChatInterface";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-right" richColors />
      {children}
    </ThemeProvider>
  );
}

function App() {
  return (
    <Providers>
      <ChatInterface />
    </Providers>
  );
}

export default App;
