import { Component, OnInit } from '@angular/core';
import { List } from '../lists';
import { ListService } from '../list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lists: List[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.getlists();
  }

  getlists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists.slice(1, 5));
  }
}