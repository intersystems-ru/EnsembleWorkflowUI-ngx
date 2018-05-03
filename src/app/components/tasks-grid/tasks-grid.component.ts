import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import {WorkflowTask} from '../../models/workflow-task.model';
import {ErrorService} from '../../services/error.service';

@Component({
  selector: 'app-tasks-grid',
  templateUrl: './tasks-grid.component.html',
  styleUrls: ['./tasks-grid.component.scss']
})
export class TasksGridComponent implements OnInit {
  paginatorSize: Number = 10;
  paginatorOptions: Array<any> = [
    {label: '5', value: 5},
    {label: '10', value: 10},
    {label: '25', value: 25},
    {label: '50', value: 50},
    {label: '100', value: 100}
    ];

  lastRefreshTime: Date = new Date(); // time of last workflow list refresh
  loading: Boolean = true; // loading flag for workflow list

  sidebarLoading: Boolean = true;
  sidebarIsVisible: Boolean = false;

  selectedTask = null; // task object, which will be passed to task-details component

  tasksList: WorkflowTask[] = [];

  constructor (private _tasksService: TasksService, private _errorService: ErrorService) {}

  getWorkflowList(): void {
    this.loading = true;
    this._tasksService.getWorkflowTasksForUser()
      .toPromise()
      .then((tasksList: WorkflowTask[]) => {
        this.tasksList = tasksList;
        this.loading = false;
      })
      .catch((err) => this._errorService.handleError(err, '\'Refresh Worklist\' operation'));
  }

  refreshList(): void {
    this.lastRefreshTime = new Date();
    this.getWorkflowList();
  }

  acceptTask(id): void {
    this._tasksService.acceptTask(id)
      .then(() => this.refreshList());
  }

  declineTask(id): void {
    this._tasksService.declineTask(id)
      .then(() => this.refreshList());
  }

  showTaskDetails(id): void {
    this.sidebarIsVisible = true;
    this.sidebarLoading = true;

    this._tasksService.getTask(id)
      .toPromise()
      .then((task) => {
        this.selectedTask = task;
        this.sidebarLoading = false;
      })
      .catch((err) => this._errorService.handleError(err, '\'Get task\' operation'));
  }

  taskDetailsSubmitHandler() {
    this.sidebarIsVisible = false;
    this.selectedTask = null;
    this.refreshList();
  }

  ngOnInit() {
    this.getWorkflowList();
  }
}
