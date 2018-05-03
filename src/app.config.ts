import { Injectable } from '@angular/core';
import { IAppConfig } from './app/models/app-config.model';

@Injectable()
export class AppConfig {

  static settings: IAppConfig;

  static load() {
    const jsonFile = `assets/config/config.json`;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType('application/json');
      xhr.open('GET', jsonFile, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.settings = JSON.parse(xhr.responseText);
            resolve();
          } else {
            reject(`Could not load file '${jsonFile}': ${xhr.status}`);
          }
        }
      };
      xhr.send(null);
    });
  }
}
