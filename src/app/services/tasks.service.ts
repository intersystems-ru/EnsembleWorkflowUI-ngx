import { Injectable } from '@angular/core';
import { WorkflowTask } from '../models/workflow-task.model';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ErrorService} from './error.service';

@Injectable()
export class TasksService {
  protected apiServer = AppConfig.settings.apiServer.appName;

  constructor(private _http: HttpClient, private _toastr: ToastrService, private _errorService: ErrorService) { }

  // retrieves workflow list for user which currently logged in
  getWorkflowTasksForUser(): Observable<WorkflowTask[]> {
      return this._http.get(`${this.apiServer}/tasks`)
        .map((response: Response) => {
          return <WorkflowTask[]>response['children'];
        });
  }

  // get task object by it's ID
  getTask(id): Observable<any> {
    return this._http.get(`${this.apiServer}/tasks/${id}`);
  }

  // submit task object
  submitTask(task): Promise<any> {
    return this._http.post(`${this.apiServer}/tasks/${task._id}`, task)
      .toPromise();
  }

  // submit task with '$Accept' action
  acceptTask(id): Promise<any> {
    return this.getTask(id)
      .toPromise()
      .then(task => {
        task.Task['%Action'] = '$Accept';
        return this.submitTask(task);
      })
      .then(result => this._toastr.success('', 'Task accepted', { timeOut: 2500, progressBar: true }))
      .catch((err) => this._errorService.handleError(err, '\'Accept task\' operation'));
  }

  // submit task with '$Relinquish' action
  declineTask(id): Promise<any> {
    return this.getTask(id)
      .toPromise()
      .then(task => {
        task.Task['%Action'] = '$Relinquish';
        return this.submitTask(task);
      })
      .then(result => this._toastr.warning('', 'Task declined', { timeOut: 2500, progressBar: true }))
      .catch((err) => this._errorService.handleError(err, '\'Decline task\' operation'));
  }
}
