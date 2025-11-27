export const formatPrice = (priceInCents: number): string => {
    const price = priceInCents / 100;
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
};
