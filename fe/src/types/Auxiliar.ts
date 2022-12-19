export interface Address{
    addressID: string,
    addressStreet: string,
    addressHouseNumber: string,
    addressZipCode: string,
    addressCity: string,
    addressCountry: string
}

export interface SalesData{
   salesData: [{revenue_date: string, revenue_amount?: number} ]
}
