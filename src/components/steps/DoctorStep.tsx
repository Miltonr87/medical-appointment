'use client';

import { useState, useEffect } from 'react';
import { CircleNotchIcon, CaretRightIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockApi } from '@/lib/mockApi';
import { Doctor, useAppointmentStore } from '@/store/appointmentStore';

interface DoctorStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export const DoctorStep = ({ onContinue, onBack }: DoctorStepProps) => {
  const [searchDoctors, setSearchDoctors] = useState<Doctor[]>([]);
  const [recommendedDoctors, setRecommendedDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();

  const { doctor, setDoctor } = useAppointmentStore();

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      const data = await mockApi.getDoctors();
      setSearchDoctors(data.search);
      setRecommendedDoctors(data.recommended);
      setLoading(false);
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    if (doctor) setSelectedDoctor(doctor);
  }, [doctor]);

  const handleContinue = () => {
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
      onContinue();
    }
  };

  const formatPrice = (price: number) =>
    `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;

  const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
    <button
      onClick={() => setSelectedDoctor(doctor)}
      className={cn(
        'p-4 rounded-lg border-2 transition-all text-left w-full',
        selectedDoctor?.id === doctor.id
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-sm text-muted-foreground">
          A partir de{' '}
          <span className="font-semibold text-primary">
            {formatPrice(doctor.price)}
          </span>
        </p>
      </div>
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <CircleNotchIcon
            className="animate-spin text-primary mx-auto"
            size={40}
          />
          <p className="text-muted-foreground">Carregando médicos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Baseados em sua pesquisa
          </h3>
          <button className="text-sm text-primary hover:underline flex items-center gap-1">
            Ver mais
            <CaretRightIcon size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Médicos recomendados
          </h3>
          <button className="text-sm text-primary hover:underline flex items-center gap-1">
            Ver mais
            <CaretRightIcon size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6">
        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={onBack}
            size="lg"
            className="text-muted-foreground hover:bg-muted"
          >
            Voltar
          </Button>

          <Button onClick={handleContinue} disabled={!selectedDoctor} size="lg">
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};
