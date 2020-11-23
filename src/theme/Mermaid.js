import React, { useEffect } from 'react';
import mermaid from 'mermaid';

export default function Mermaid({ children }) {
  useEffect(mermaid.contentLoaded, []);
  return <div className="mermaid">{children}</div>;
}
