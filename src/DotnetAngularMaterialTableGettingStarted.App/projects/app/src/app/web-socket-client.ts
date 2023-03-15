// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
import { from, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketClient {

  private _connect$: Observable<void> | undefined;

  static create(baseUrl:string): WebSocketClient {

    const options: IHttpConnectionOptions = {                    
      logMessageContent: true               
    };

    var hubConnection = new HubConnectionBuilder()
    .withUrl(`${baseUrl}hub`, options)
    .withAutomaticReconnect()
    .build(); 

    return new WebSocketClient(hubConnection);
  }

  constructor(private readonly _hubConnection: HubConnection) { }

  public packet$ = new Subject<any>();

  public connect$(): Observable<void> {
    
    if(this._connect$) return this._connect$;

    this._hubConnection.on("packet", (packet:string) => {
      const json = JSON.parse(packet);
      this.packet$.next(json);
    });

    this._connect$ = from(this._hubConnection.start());

    return this._connect$;
  }
}
