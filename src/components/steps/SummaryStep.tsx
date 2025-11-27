'use client';

import {
  CalendarBlankIcon,
  UserCircleIcon,
  MapPinIcon,
  CreditCardIcon,
  CircleNotchIcon,
} from '@phosphor-icons/react';
import { paymentMethodLabels } from '@/constants/payment-method-labels';
import { Button } from '@/components/ui/button';
import { useSummaryStep } from '@/hooks/appointment/useSummaryStep';
import { formatDate } from '@/utils/format-date';
import { formatPrice } from '@/utils/format-price';

interface SummaryStepProps {
  onBack: () => void;
}

export const SummaryStep = ({ onBack }: SummaryStepProps) => {
  const { date, time, clinic, doctor, paymentMethod, loading, handleConfirm } =
    useSummaryStep();

  if (!date || !time || !clinic || !doctor || !paymentMethod) return null;

  const { formatted: formattedDate, dayOfWeek } = formatDate(new Date(date));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          John, aqui está o resumo da sua consulta
        </h2>
        <p className="text-muted-foreground">
          Revise com atenção antes de confirmar
        </p>
      </div>

      <div className="space-y-4 max-w-2xl">
        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <CalendarBlankIcon size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              A sua consulta será no dia
            </p>
            <p className="font-semibold text-foreground">
              {formattedDate}, {dayOfWeek} às {time}.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <UserCircleIcon size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Com a pediatra</p>
            <p className="font-semibold text-foreground">{doctor.name}.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPinIcon size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Na {clinic.name}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <CreditCardIcon size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Valor da consulta{' '}
              <span className="font-semibold text-foreground">
                {formatPrice(doctor.price)}
              </span>
              , no {paymentMethodLabels[paymentMethod]}.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          size="lg"
          disabled={loading}
          className="text-muted-foreground hover:bg-muted"
        >
          Voltar
        </Button>
        <Button onClick={handleConfirm} size="lg" disabled={loading}>
          {loading ? (
            <>
              <CircleNotchIcon className="animate-spin mr-2" size={20} />
              Aguarde...
            </>
          ) : (
            'Confirmar'
          )}
        </Button>
      </div>
    </div>
  );
};
