export const CompareValueFormat = (value: any, key: string) => {
    if(!value) return 'N/A';
    if(typeof value === 'number'){
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
    return value;
}
