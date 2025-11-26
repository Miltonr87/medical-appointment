'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import doctorImage from '@/assets/doctor-welcome.jpeg';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] rounded-full overflow-hidden bg-primary">
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
          <h1 className="text-2xl font-medium text-foreground max-w-[592px]">
            Agende sua consulta de forma simples
          </h1>
          <p className="text-lg text-muted-foreground max-w-[620px]">
            Escolha a melhor data, horário e clínica disponível e conclua
            <br />
            seu agendamento em poucos passos. Nosso processo é
            <br />
            rápido, intuitivo e feito para facilitar o seu dia a dia.
          </p>
          <Button
            size="lg"
            className="text-base px-8 bg-primary hover:bg-primary/90 rounded-xl text-primary-foreground"
            onClick={() => router.push('/appointment')}
          >
            Agendar
          </Button>
        </div>
      </div>
    </div>
  );
}
