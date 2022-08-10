import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { List } from '../lists';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  list: List | undefined;

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.listService.getList(id)
      .subscribe(list => this.list = list);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.list) {
      this.listService.updateList(this.list)
        .subscribe(() => this.goBack());
    }
  }
}