import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from "@vercel/analytics/next"

<Analytics/>
createRoot(document.getElementById("root")!).render(<App />);
