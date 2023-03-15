// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { WebSocketClient } from './web-socket-client';
import { combineLatest, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule
  ]
})
export class AppComponent {
  private readonly _client = inject(WebSocketClient);

  public vm$ = combineLatest([
    of([
      "messageType",
      "created"
    ]),
    of([] as any[]),
    this._client.connect$()
  ]).pipe(
    switchMap(([displayedColumns, packets]) => this._client.packet$.pipe(      
      map(packet => {

        packets = [...packets, packet];

        return {
          packets,
          displayedColumns
        }
      }),
      startWith({
        packets: [],
        displayedColumns
      })
    ))
  )
}
