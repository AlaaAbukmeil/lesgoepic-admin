import { eventInfo } from "./eventInfo";
export class activePassedEvents {
    constructor(
        public activeEvents: eventInfo[],
        public passedEvents: eventInfo[]

    ) { }
}
