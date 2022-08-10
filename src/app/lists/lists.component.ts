import { Component, OnInit } from '@angular/core';
import { List } from '../lists';
import { ListService } from '../list.service';
import { PoMultiselectOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: List[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.getLists();
  }

  getLists(): void {
    this.listService.getLists()
        .subscribe(lists => this.lists = lists);
  }

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

  options: Array<PoMultiselectOption> = [
    { value: 'poMultiselect1', label: 'Baixa' },
    { value: 'poMultiselect2', label: 'Média' },
    { value: 'poMultiselect3', label: 'Alta' }
  ];

}
