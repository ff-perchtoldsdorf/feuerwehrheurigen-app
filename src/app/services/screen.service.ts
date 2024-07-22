import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ScreenTemplate, ScreenTemplateLight } from '../dtos/screen';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private _url = environment.domain.api + 'internal/screen';

  public getTemplate(uuid: string): Observable<ScreenTemplate> {
    return this.httpClient.get<ScreenTemplate>(`${this._url}/template?uuid=${uuid}`, { withCredentials: true });
  }

  public getTemplateList(): Observable<ScreenTemplateLight[]> {
    return this.httpClient.get<ScreenTemplateLight[]>(`${this._url}/template/list`, { withCredentials: true });
  }

  public saveTemplate(template: ScreenTemplate): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this._url}/template`, template, { withCredentials: true });
  }
}
