'use client';

import { useState } from 'react';
import {
  CalendarBlankIcon,
  UserCircleIcon,
  MapPinIcon,
  CreditCardIcon,
  CircleNotchIcon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/appointmentStore';
import { mockApi } from '@/lib/mockApi';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface SummaryStepProps {
  onBack: () => void;
}

const paymentMethodLabels = {
  pix: 'Pix',
  'credit-card': 'cartão de crédito',
  cash: 'dinheiro',
};

export const SummaryStep = ({ onBack }: SummaryStepProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { date, time, clinic, doctor, paymentMethod } = useAppointmentStore();

  const formatPrice = (price: number) =>
    `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const result = await mockApi.confirmAppointment({
        date,
        time,
        clinic,
        doctor,
        paymentMethod,
      });

      if (result.success) {
        router.push('/success');
      }
    } catch (error) {
      toast({
        title: 'Erro ao confirmar agendamento',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!date || !clinic || !doctor || !paymentMethod) return null;

  const formatDate = (date: Date) => {
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const days = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ];
    const d = new Date(date);
    return {
      formatted: `${d.getDate()} de ${months[d.getMonth()]}`,
      dayOfWeek: days[d.getDay()],
    };
  };

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
      <div className="flex justify-between gap-3 pt-6">
        <Button variant="outline" onClick={onBack} size="lg" disabled={loading}>
          Voltar
        </Button>
        <Button onClick={handleConfirm} size="lg" disabled={loading}>
          {loading ? (
            <>
              <CircleNotchIcon className="animate-spin mr-2" size={20} />
              Confirmando...
            </>
          ) : (
            'Confirmar'
          )}
        </Button>
      </div>
    </div>
  );
};
