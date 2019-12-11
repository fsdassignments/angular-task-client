export class Task {
    taskId: number;
    parentTaskId: number;
    task: string;
    priorityFrom: number;
    priorityTo: number;
    startDate: Date;
    endDate: Date;
    isFinished: boolean;
}