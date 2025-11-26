import { Clinic, Doctor } from '@/store/appointmentStore';

// Simulate API delay (I need to check befor)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock clinic images (we'll use a placeholder for now)
const clinicImage = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop';

export const mockApi = {
  async getClinics(): Promise<Clinic[]> {
    await delay(1500);
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

  async getDoctors(): Promise<{ search: Doctor[]; recommended: Doctor[] }> {
    await delay(1000);

    const searchDoctors = [
      {
        id: '1',
        name: 'Dr. Marcus Hale',
        specialty: 'Cardiologista',
        price: 10000, // in cents
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      },
      {
        id: '2',
        name: 'Dra. Elena Schultz',
        specialty: 'Pediatra',
        price: 7000,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
      },
      {
        id: '3',
        name: 'Dra. Amina Farouk',
        specialty: 'Ortopedista',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
      },
    ];

    const recommendedDoctors = [
      {
        id: '4',
        name: 'Dr. Marcus Hale',
        specialty: 'Cardiologista',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
        recommended: true,
      },
      {
        id: '5',
        name: 'Dra. Elena Schultz',
        specialty: 'Pediatra',
        price: 7000,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
        recommended: true,
      },
      {
        id: '6',
        name: 'Dra. Amina Farouk',
        specialty: 'Ortopedista',
        price: 10000,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
        recommended: true,
      },
    ];

    return { search: searchDoctors, recommended: recommendedDoctors };
  },

  async confirmAppointment(data: any): Promise<{ success: boolean; appointmentId: string }> {
    await delay(1000);
    return {
      success: true,
      appointmentId: Math.random().toString(36).substring(7).toUpperCase(),
    };
  },
};
