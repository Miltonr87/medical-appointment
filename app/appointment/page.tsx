'use client';

import { Sidebar } from '@/components/navigation/Sidebar';
import { SchedulingStep } from '@/components/steps/SchedulingStep';
import { DoctorStep } from '@/components/steps/DoctorStep';
import { PaymentStep } from '@/components/steps/PaymentStep';
import { SummaryStep } from '@/components/steps/SummaryStep';

import { useCurrentStep } from '@/hooks/appointment/useCurrentStep';

export default function Appointment() {
  const { currentStep, setCurrentStep } = useCurrentStep();
  const handleContinue = () => setCurrentStep(currentStep + 1);
  const handleBack = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentStep={currentStep} />
      <main className="flex-1 p-8 md:p-12 flex justify-center">
        <div className="w-full max-w-[878px]">
          {currentStep === 1 && <SchedulingStep onContinue={handleContinue} />}
          {currentStep === 2 && (
            <DoctorStep onContinue={handleContinue} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <PaymentStep onContinue={handleContinue} onBack={handleBack} />
          )}
          {currentStep === 4 && <SummaryStep onBack={handleBack} />}
        </div>
      </main>
    </div>
  );
}
