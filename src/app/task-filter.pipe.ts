import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[], searchTask: string, selectedParent: number, searchPriorityFrom: number,
    searchPriorityTo: number, searchStartDate: Date, searchToDate: Date): any {
    let filteredResults:Task[] = [];
    if(searchTask) {
      filteredResults = tasks.filter(task => task.task.toLowerCase().indexOf(searchTask.toLowerCase()) !== -1);
    }
    if(selectedParent) {
      filteredResults = filteredResults.length ? filteredResults.filter(task => task.parentTaskId === selectedParent) : 
      tasks.filter(task => task.parentTaskId === selectedParent);
    }
    if(searchPriorityFrom) {
      if(searchPriorityTo) {
        filteredResults = filteredResults.length ? filteredResults.filter(task => task.priority >= searchPriorityFrom && searchPriorityTo <= task.priority) : 
        tasks.filter(task => task.priority >= searchPriorityFrom && searchPriorityTo <= task.priority);  
      }
      filteredResults = filteredResults.length ? filteredResults.filter(task => task.priority >= searchPriorityFrom) : 
      tasks.filter(task => task.priority >= searchPriorityFrom);
    }
    if(searchPriorityTo) {
      filteredResults = filteredResults.length ? filteredResults.filter(task => task.priority <= searchPriorityTo) : 
      tasks.filter(task => task.priority <= searchPriorityTo);
    }
    if(searchStartDate) {
      if(searchToDate) {
        filteredResults = filteredResults.length ? filteredResults.filter(task => task.startDate >= searchStartDate && task.endDate <= searchToDate) : 
        tasks.filter(task => task.startDate >= searchStartDate &&  task.endDate <= searchToDate);
      }
      filteredResults = filteredResults.length ? filteredResults.filter(task => task.startDate >= searchStartDate) : 
        tasks.filter(task => task.startDate >= searchStartDate);
    }
    if(searchToDate) {
      filteredResults = filteredResults.length ? filteredResults.filter(task => task.endDate <= searchToDate) : 
      tasks.filter(task => task.endDate <= searchToDate);
    }
    return filteredResults.length ? filteredResults : tasks;
  }

}
