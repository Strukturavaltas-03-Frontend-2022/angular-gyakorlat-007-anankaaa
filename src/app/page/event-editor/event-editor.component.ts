import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss'],
})
export class EventEditorComponent implements OnInit {
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap((params) => this.eventService.get(params['id']))
  );
  event: Event = new Event();

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.event$.subscribe((event) => (this.event = event));
  }

  onUpdate(form: NgForm): void {
    const event = form.value;
    event.id = this.event.id;
    this.eventService
      .update(event)
      .subscribe((event) => this.router.navigate(['/', 'event']));
  }
}
