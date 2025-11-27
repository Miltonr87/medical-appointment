export interface FormattedDate {
    formatted: string;
    dayOfWeek: string;
}

export const formatDate = (date: Date): FormattedDate => {
    const months = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ];

    const days = [
        'domingo', 'segunda-feira', 'terça-feira',
        'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado',
    ];

    const d = new Date(date);

    return {
        formatted: `${d.getDate()} de ${months[d.getMonth()]}`,
        dayOfWeek: days[d.getDay()],
    };
};
