
export interface Project{
    projID: string;
    projTitle: string;
    projDesc: string;
    projType: string;
    projLand: string;
    projSurface: string;
    projStart: string;
    projStatus: string;
    projLostComment: string
    projNote: string;
    projAddress:{
        addressStreet: string;
        addressHouseNumber: string;
        addressZipCode: string;
        addressCity: string;
        addressCountry: string;
    }
    }

// export interface ProjectWCustomer extends Project{
//     custID: string;
//     custFirstName: string;
//     custLastName: string;
//     custTel: string;
//     custEmail: string;
// }
export interface ProjectWCustomer extends Project{
    projCustomer:{
        custID: string;
        custFirstName: string;
        custLastName: string;
        custTel: string;
        custEmail: string;
        custRegistrationDate: string;
    }
}