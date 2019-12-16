export class Task {
    taskId: number;
    parentTaskId: number;
    task: string;
    priority: number;
    startDate: Date;
    endDate: Date;
    isFinished: boolean;
}