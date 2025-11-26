'use client';

import { useState, useEffect } from 'react';
import { ScanIcon, CreditCardIcon, MoneyIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePaymentStep } from '@/hooks/appointment/usePaymentStep';

interface PaymentStepProps {
  onContinue: () => void;
  onBack: () => void;
}

const paymentMethods = [
  { id: 'pix', label: 'Pix', icon: ScanIcon },
  { id: 'credit-card', label: 'Cartão de crédito', icon: CreditCardIcon },
  { id: 'cash', label: 'Dinheiro', icon: MoneyIcon },
] as const;

export const PaymentStep = ({ onContinue, onBack }: PaymentStepProps) => {
  const [selected, setSelected] = useState<
    'pix' | 'credit-card' | 'cash' | undefined
  >();
  const { paymentMethod, setPaymentMethod } = usePaymentStep();

  useEffect(() => {
    if (paymentMethod) {
      setSelected(paymentMethod);
    }
  }, [paymentMethod]);

  const handleContinue = () => {
    if (selected) {
      setPaymentMethod(selected);
      onContinue();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Selecione a forma de pagamento
        </h2>
      </div>
      <div className="space-y-3 max-w-md">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={cn(
                'w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3',
                selected === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  selected === method.id
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <Icon size={20} />
              </div>
              <span className="font-medium text-foreground">
                {method.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-end gap-3 pt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          size="lg"
          className="text-muted-foreground hover:bg-muted"
        >
          Voltar
        </Button>
        <Button onClick={handleContinue} disabled={!selected} size="lg">
          Continuar
        </Button>
      </div>
    </div>
  );
};
