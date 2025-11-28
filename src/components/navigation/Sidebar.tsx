'use client';

import {
  UserIcon,
  CalendarIcon,
  StethoscopeIcon,
  CreditCardIcon,
  FileTextIcon,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { memo } from 'react';

interface SidebarProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Agendamento', icon: CalendarIcon },
  { number: 2, label: 'Médico', icon: StethoscopeIcon },
  { number: 3, label: 'Forma de Pagamento', icon: CreditCardIcon },
  { number: 4, label: 'Resumo', icon: FileTextIcon },
];

const StepItem = memo(function StepItem({ step, index, currentStep }: any) {
  const Icon = step.icon;
  const isActive = currentStep === step.number;
  const isCompleted = currentStep > step.number;
  const isLast = index === steps.length - 1;

  return (
    <div
      key={step.number}
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 relative',
        isActive && 'bg-primary/10'
      )}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center z-10',
            isActive
              ? 'bg-primary text-primary-foreground'
              : isCompleted
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
        </div>

        {!isLast && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px bg-border"></div>
        )}
      </div>
      <span
        className={cn(
          'text-sm mt-1',
          isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
        )}
      >
        {step.label}
      </span>
    </div>
  );
});

export const Sidebar = memo(function Sidebar({ currentStep }: SidebarProps) {
  return (
    <aside className="w-[337px] bg-card border-r border-border min-h-screen sticky top-0 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <UserIcon size={24} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Bem-vindo</p>
          <p className="font-semibold text-primary">John Doe</p>
        </div>
      </div>
      <nav className="space-y-3 relative">
        {steps.map((step, index) => (
          <StepItem
            key={step.number}
            step={step}
            index={index}
            currentStep={currentStep}
          />
        ))}
      </nav>
    </aside>
  );
});
