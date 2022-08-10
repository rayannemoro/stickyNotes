import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { List } from './lists';
import { MessagesService } from './messages.service';
// import { LISTS } from './mock-lists';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listsUrl = 'api/lists';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService) { 
  }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listsUrl)
      .pipe(
        tap(_ => this.log('fetched lists')),
        catchError(this.handleError<List[]>('getLists', []))
      );
  }

  /** GET list by id. Return `undefined` when id not found */
  getListNo404<Data>(id: number): Observable<List> {
    const url = `${this.listsUrl}/?id=${id}`;
    return this.http.get<List[]>(url)
      .pipe(
        map(lists => lists[0]), // returns a {0|1} element array
        tap(l => {
          const outcome = l ? 'fetched' : 'did not find';
          this.log(`${outcome} list id=${id}`);
        }),
        catchError(this.handleError<List>(`getList id=${id}`))
      );
  }

  /** GET list by id. Will 404 if id not found */
  getList(id: number): Observable<List> {
    const url = `${this.listsUrl}/${id}`;
    return this.http.get<List>(url).pipe(
      tap(_ => this.log(`fetched list id=${id}`)),
      catchError(this.handleError<List>(`getList id=${id}`))
    );
  }

  /* GET lists whose name contains search term */
  searchLists(term: string): Observable<List[]> {
    if (!term.trim()) {
      // if not search term, return empty list array.
      return of([]);
    }
    return this.http.get<List[]>(`${this.listsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found lists matching "${term}"`) :
        this.log(`no lists matching "${term}"`)),
      catchError(this.handleError<List[]>('searchLists', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new list to the server */
  addList(list: List): Observable<List> {
    return this.http.post<List>(this.listsUrl, list, this.httpOptions).pipe(
      tap((newList: List) => this.log(`added list w/ id=${newList.id}`)),
      catchError(this.handleError<List>('addList'))
    );
  }

  /** PUT: update the list on the server */
  updateList(list: List): Observable<any> {
    return this.http.put(this.listsUrl, list, this.httpOptions).pipe(
      tap(_ => this.log(`updated list id=${list.id}`)),
      catchError(this.handleError<any>('updateList'))
    );
  }

  /** DELETE: delete the list from the server */
  deleteList(id: number): Observable<List> {
    const url = `${this.listsUrl}/${id}`;

    return this.http.delete<List>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted list id=${id}`)),
      catchError(this.handleError<List>('deleteList'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ListService message with the MessageService */
  private log(message: string) {
    this.messagesService.add(`ListService: ${message}`);
  }


}