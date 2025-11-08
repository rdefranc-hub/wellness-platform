import { createRoot } from "react-dom/client";
import "./index.css";

function SimpleApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Wellness Platform - Teste</h1>
      <p>Se você está vendo isso, o React está funcionando!</p>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<SimpleApp />);
} else {
  console.error('Root element not found!');
}
