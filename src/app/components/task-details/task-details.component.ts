import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorService} from '../../services/error.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnChanges {

  constructor(private _taskService: TasksService, private _toastr: ToastrService, private _errorService: ErrorService) { }

  @Input() task;
  @Output() submit = new EventEmitter();

  // object with all content from inputs. ex. { Comments: 'Test' },
  // where Comments is field from %FormFields property of Task object
  formValues = {};

  // for each new task object we must extract existing formValues to not wipe them by accident
  ngOnChanges(changes) {
    const formValues = changes.task && changes.task.currentValue &&
      changes.task.currentValue.Task && changes.task.currentValue.Task['%FormValues'];
    this.formValues = formValues || {};
  }

  submitTask(action: String) {
    this.task.Task['%Action'] = action; // action that will be consumed by Workflow Engine
    this.task.Task['%FormValues'] = this.formValues;

    this._taskService.submitTask(this.task)
      .then(() => {
        this._toastr.success('', 'Task submitted successfully', {timeOut: 3000, progressBar: true});
        this.submit.emit();
      })
      .catch((err) => this._errorService.handleError(err, '\'Submit task\' operation'));
  }
}
