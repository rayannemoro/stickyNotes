import { Component, OnInit } from '@angular/core';
import { List } from '../lists';
import { ListService } from '../list.service';
// import { LISTS } from '../mock-lists';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  // selectedList?: List;
  lists: List[] = [];

  // lists = LISTS;
  // getLists(): void {
  //   this.lists = this.listService.getLists();
  // }
  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.listService.getLists()
        .subscribe(lists => this.lists = lists);
  }

  // onSelect(list: List): void {
  //   this.selectedList = list;
  // }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.listService.addList({ title } as List)
      .subscribe(list => {
        this.lists.push(list);
      });
  }

  delete(list: List): void {
    this.lists = this.lists.filter(l => l !== list);
    this.listService.deleteList(list.id).subscribe();
  }

}
