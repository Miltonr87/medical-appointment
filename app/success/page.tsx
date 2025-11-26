'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useAppointmentStore } from '@/store/appointmentStore';

export default function Success() {
  const router = useRouter();
  const reset = useAppointmentStore((state) => state.reset);

  const handleViewAppointments = () => {
    reset();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle size={56} className="text-primary" weight="fill" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            John, sua consulta foi marcada.
          </h1>
          <p className="text-lg text-muted-foreground">
            Para mais informações e detalhes acesse a página{' '}
            <button className="text-primary hover:underline font-medium">
              Minhas Consultas
            </button>{' '}
            para acompanhar o seu agendamento.
          </p>
        </div>

        <div className="pt-4">
          <Button
            size="lg"
            onClick={handleViewAppointments}
            className="text-lg px-8"
          >
            Ver minhas consultas
          </Button>
        </div>
      </div>
    </div>
  );
}
