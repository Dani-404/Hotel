import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './components/App';

const interfaceElement = document.getElementById("interface");

if(interfaceElement) {
  const root = createRoot(interfaceElement);

  root.render(
    <StrictMode>
      <div style={{
        position: "fixed",
        
        left: 0,
        top: 0,

        width: "100%",
        height: "100%",

        pointerEvents: "none",

        color: "white"
      }}>
        <App/>
      </div>
    </StrictMode>
  );
}
