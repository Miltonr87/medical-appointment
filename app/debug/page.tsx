'use client';

import { useSchedulingStep } from '@/hooks/appointment/useSchedulingStep';
import { useDoctorStep } from '@/hooks/appointment/useDoctorStep';
import { usePaymentStep } from '@/hooks/appointment/usePaymentStep';
import { useCurrentStep } from '@/hooks/appointment/useCurrentStep';

export default function Debug() {
  // 🔥 Leia cada propriedade individualmente
  const { date, time, clinic } = useSchedulingStep();
  const { doctor } = useDoctorStep();
  const { paymentMethod } = usePaymentStep();
  const { currentStep } = useCurrentStep();

  return (
    <div className="p-10 space-y-8 text-foreground">
      <h1 className="text-2xl font-bold">🔍 Debug Zustand</h1>

      <pre className="p-4 bg-muted rounded-lg">
        {JSON.stringify(
          {
            scheduling: { date, time, clinic },
            doctor,
            paymentMethod,
            currentStep,
          },
          null,
          2
        )}
      </pre>

      <p className="text-muted-foreground">
        A página atualiza automaticamente conforme o Zustand muda.
      </p>
    </div>
  );
}
