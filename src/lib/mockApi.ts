import { Clinic, Doctor, PaymentMethod } from '@/types/appointment.types';

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const randomFail = () => Math.random() < 0.15;

const clinicImage =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop';

export const mockApi = {
  async getClinics(): Promise<Clinic[]> {
    await delay(1200);

    if (randomFail()) {
      throw new Error('Erro ao carregar clínicas.');
    }

    return [
      {
        id: '1',
        name: 'Clínica Médica - Sul',
        address: 'Rua Lorem Ipsum, 123',
        distance: '2.5 km',
        image: clinicImage,
      },
      {
        id: '2',
        name: 'Clínica Médica - Norte',
        address: 'Rua Lorem Ipsum, 123',
        distance: '4 km',
        image: clinicImage,
      },
    ];
  },

  async getDoctors(): Promise<{
    search: Doctor[];
    recommended: Doctor[];
  }> {
    await delay(1000);

    if (randomFail()) {
      throw new Error('Erro ao buscar médicos.');
    }

    const doctors: Doctor[] = [
      {
        id: '1',
        name: 'Dr. Marcus Hale',
        specialty: 'Cardiologista',
        price: 10000,
        image:
          'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      },
      {
        id: '2',
        name: 'Dra. Elena Schultz',
        specialty: 'Pediatra',
        price: 7000,
        image:
          'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
      },
      {
        id: '3',
        name: 'Dra. Amina Farouk',
        specialty: 'Ortopedista',
        price: 10000,
        image:
          'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
      },
    ];

    return {
      search: doctors,
      recommended: doctors.map(d => ({
        ...d,
        id: crypto.randomUUID(),
        recommended: true,
      })),
    };
  },

  async confirmAppointment(data: {
    date: Date;
    time: string;
    clinicId: string;
    doctorId: string;
    paymentMethod: PaymentMethod;
  }): Promise<{
    success: boolean;
    appointmentId: string;
    payload: typeof data;
  }> {
    await delay(800);

    if (randomFail()) {
      throw new Error('Falha ao confirmar agendamento.');
    }

    return {
      success: true,
      appointmentId: crypto.randomUUID().slice(0, 8).toUpperCase(),
      payload: data,
    };
  },
};
