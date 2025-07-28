import type { ReactNode } from 'react';
import { useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;          // Se abre al iniciar si se pasa true
  isOpen?: boolean;               // controlarlo externamente
  onToggle?: (open: boolean) => void; // Callback opcional para detectar cambios
}

export function ExpandableSection({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
}: ExpandableSectionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isOpen = controlledIsOpen ?? internalOpen;

  function toggleSection() {
    const newState = !isOpen;
    if (onToggle) onToggle(newState);
    if (controlledIsOpen === undefined) {
      setInternalOpen(newState);
    }
  }

  return (
    <div className="expandable-section">
      <button onClick={toggleSection} className="expandable-header">
        <span>{title}</span>
        <span className={`arrow ${isOpen ? 'rotate' : ''}`}>◡</span>
      </button>

      <div
        className={`expandable-content ${isOpen ? 'open' : 'closed'}`}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}
