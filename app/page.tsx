'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import doctorImage from '@/assets/doctor-welcome.jpeg';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden bg-primary/10">
            <Image
              src={doctorImage}
              alt="Doctor"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-foreground">
            Agende sua consulta de forma simples
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Escolha a melhor data, horário e clínica disponível e conclua seu
            agendamento em poucos passos. Nosso processo é rápido, intuitivo e
            feito para facilitar o seu dia a dia.
          </p>
          <Button
            size="lg"
            className="text-lg px-8"
            onClick={() => router.push('/appointment')}
          >
            Agendar
          </Button>
        </div>
      </div>
    </div>
  );
}
