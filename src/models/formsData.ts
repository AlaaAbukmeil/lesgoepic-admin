import { eventInfo } from "./eventInfo";
export class formsData {
    constructor(
        public activeForms: eventInfo[],
        public activeCountSignUp: number[],
        public passedForms: eventInfo[],
        public passedCountSignUp: number[]
    ) { }
}
