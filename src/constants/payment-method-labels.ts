export const paymentMethodLabels = {
    pix: 'Pix',
    'credit-card': 'cartão de crédito',
    cash: 'dinheiro',
} as const;

export type PaymentMethodLabelKey = keyof typeof paymentMethodLabels;
