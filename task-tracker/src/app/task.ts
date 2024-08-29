import { Status } from "./status";

export class Task {
    id : string;
    title : string;
    description: string;
    assignedTo : string;
    status : Status;
}
