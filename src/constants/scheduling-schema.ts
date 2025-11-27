import { z } from 'zod';

export const schedulingSchema = z.object({
    date: z.string().min(1, 'Selecione uma data'),
    time: z.string().min(1, 'Selecione um horário'),
    clinicId: z.string().min(1, 'Selecione uma clínica'),
});

export type SchedulingSchema = z.infer<typeof schedulingSchema>;
