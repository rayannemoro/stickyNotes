import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { List } from './lists';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      { id: 1, title: 'Lista 01', priority: 'alta', description: 'lista' },
      { id: 2, title: 'Lista 02', priority: 'alta', description: 'lista' },
      { id: 3, title: 'Lista 03', priority: 'alta', description: 'lista' },
      { id: 4, title: 'Lista 04', priority: 'alta', description: 'lista' },
    ];
    return {lists};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(lists => lists.id)) + 1 : 1;
  }
}