import { eventInfo } from "./eventInfo";
export class user {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public ageGroup : string,
        public eventIds: string,
        public credit: number,
        public eventsInfo : eventInfo[]
    ) { }
}
