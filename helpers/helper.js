export const toLocalCurrency = (price) =>{
        return price.toLocaleString('es', { style: 'currency', currency: 'EUR' });
}