'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  CircleNotchIcon,
} from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { useSchedulingStep } from '@/hooks/appointment/useSchedulingStep';

const schedulingSchema = z.object({
  date: z.string().min(1, 'Selecione uma data'),
  time: z.string().min(1, 'Selecione um horário'),
  clinicId: z.string().min(1, 'Selecione uma clínica'),
});

interface SchedulingStepProps {
  onContinue: () => void;
  onBack?: () => void;
}

export const SchedulingStep = ({ onContinue }: SchedulingStepProps) => {
  const {
    date,
    time,
    clinics,
    loadingClinics,
    selectedClinic,
    loadClinics,
    updateSelectedClinic,
    handleContinue,
  } = useSchedulingStep();

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schedulingSchema),
    mode: 'onChange',
    defaultValues: {
      date: date ? new Date(date).toISOString().split('T')[0] : '',
      time: time || '',
      clinicId: selectedClinic?.id || '',
    },
  });

  const watchDate = watch('date');
  const watchTime = watch('time');
  const watchClinicId = watch('clinicId');

  useEffect(() => {
    if (watchDate && watchTime) {
      loadClinics(watchDate, watchTime);
    }
  }, [watchDate, watchTime, loadClinics]);

  useEffect(() => {
    if (watchClinicId) {
      updateSelectedClinic(watchClinicId);
    }
  }, [watchClinicId, clinics, updateSelectedClinic]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Escolha o dia e o local de sua consulta
        </h2>
      </div>
      <div className="space-y-6">
        <div>
          <Label htmlFor="date" className="text-sm font-medium mb-2 block">
            Quando será a sua consulta?
          </Label>
          <div className="relative">
            <CalendarBlankIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              id="date"
              type="date"
              {...register('date')}
              className="pl-10"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          {errors.date && (
            <p className="text-sm text-destructive mt-1">
              {errors.date.message}
            </p>
          )}
        </div>
        <div>
          <div className="relative">
            <ClockIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              id="time"
              type="time"
              {...register('time')}
              className="pl-10"
            />
          </div>
          {errors.time && (
            <p className="text-sm text-destructive mt-1">
              {errors.time.message}
            </p>
          )}
        </div>
        <div>
          <Label className="text-sm font-medium mb-3 block">Onde?</Label>
          {!watchDate || !watchTime ? (
            <div className="text-sm text-muted-foreground">
              Selecione data e horário para ver clínicas disponíveis
            </div>
          ) : loadingClinics ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <CircleNotchIcon className="animate-spin" size={20} />
              <span>Aguarde... estamos buscando as clínicas disponíveis</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinics.map((clinic) => (
                <button
                  key={clinic.id}
                  type="button"
                  onClick={() =>
                    setValue('clinicId', clinic.id, { shouldValidate: true })
                  }
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all text-left',
                    watchClinicId === clinic.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-foreground mb-2">
                    {clinic.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon size={16} />
                    <div>
                      <p>{clinic.distance}</p>
                      <p>{clinic.address}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {errors.clinicId && (
            <p className="text-sm text-destructive mt-1">
              {errors.clinicId.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6">
        <Button
          onClick={() =>
            handleContinue(watchDate, watchTime, selectedClinic!, onContinue)
          }
          disabled={!isValid}
          size="lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
