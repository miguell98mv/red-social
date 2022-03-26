import { Component, OnInit } from '@angular/core';
import { SelectAmigoService } from '../../core/services/select-amigo/select-amigo.service';

@Component({
  selector: 'app-no-post',
  templateUrl: './no-post.component.html',
  styleUrls: ['./no-post.component.scss'],
})
export class NoPostComponent implements OnInit {
  constructor(public selectAmigo: SelectAmigoService) {}

  ngOnInit(): void {}
}
