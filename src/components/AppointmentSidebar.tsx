'use client';

import {
  UserIcon,
  CalendarIcon,
  StethoscopeIcon,
  CreditCardIcon,
  FileTextIcon,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface AppointmentSidebarProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Agendamento', icon: CalendarIcon },
  { number: 2, label: 'Médico', icon: StethoscopeIcon },
  { number: 3, label: 'Forma de Pagamento', icon: CreditCardIcon },
  { number: 4, label: 'Resumo', icon: FileTextIcon },
];

export const AppointmentSidebar = ({
  currentStep,
}: AppointmentSidebarProps) => {
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

      <nav className="space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div
              key={step.number}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200',
                isActive && 'bg-primary/10',
                isCompleted && 'opacity-70'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
              </div>
              <span
                className={cn(
                  'text-sm',
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
