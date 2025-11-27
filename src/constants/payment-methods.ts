import { ScanIcon, CreditCardIcon, MoneyIcon } from '@phosphor-icons/react';

export const paymentMethods = [
    { id: 'pix', label: 'Pix', icon: ScanIcon },
    { id: 'credit-card', label: 'Cartão de crédito', icon: CreditCardIcon },
    { id: 'cash', label: 'Dinheiro', icon: MoneyIcon },
] as const;

export type PaymentMethodId = typeof paymentMethods[number]['id'];
