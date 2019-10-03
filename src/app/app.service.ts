import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json;odata=verbose' })
};

@Injectable()
export class AppService {
    private siteURL = '/sites/DMB/DDI';

    RequestDigest: string;

    constructor(
        private _http: HttpClient) { }

    getListItem(url: string): Observable<any> {
        const httpURL = this.siteURL + url;
        return this._http.get(httpURL, httpOptions)
            .pipe(
                tap(data => this.log('fetched Data')),
                catchError(this.handleError('getListItem', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error('Verbose Logging'); // log to console instead
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return Observable.throw(error.message);//of(result as T);
        };
    }

    private log(message: string) {
        console.log('AppService: ' + message);
    }
}
