import {Shop} from "../Shop/shop";
export class User {
    constructor(
        public id: number,
        public socialReason: string,
        public mail: string,
        public lastname: string,
        public firstname: string,
        public shop: Shop,
        public director: User,
        public tva: number,
        public siret: number,
        public adeli: number,
        public nightBox: boolean,
        public financialSociety: Shop,
        public IBAN: number,
        public BIC: number,
        public fiancialMail: number,
        public paymentDate: boolean,
        public deliverShop: Shop,
        public central: string


    ) {  }
}