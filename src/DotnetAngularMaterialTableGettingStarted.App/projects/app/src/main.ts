// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { WebSocketClient } from './app/web-socket-client';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'BASE_URL', useValue: 'https://localhost:7047/' },
    { provide: WebSocketClient, useFactory: WebSocketClient.create, deps:['BASE_URL'] },
  ]
}).catch((err) => console.error(err));
