// import { Observable, Subscriber } from 'rxjs';
// import { Injectable } from '@angular/core';
// // import { Socket } from 'ngx-socket-io';
// import io from 'socket.io-client';
// import { subscribeOn } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketioService {
  
//   socket: any;
//   readonly uri: string='http://localhost:3000/api';

//   constructor() { 
//     this.socket = io(this.uri);
//   }
  
//   listen(eventeName: string){
//     return new Observable((subscriber) =>{
//       this.socket.on(eventeName, (data:any) =>{
//         subscriber.next(data);
//       })
//     });
//   }

//   emit(eventeName: string, data: any){
//     this.socket.emit(eventeName,data);
//   }


// }
