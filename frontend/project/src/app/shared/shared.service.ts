import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Financias } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private itemEdit = new BehaviorSubject<Financias | null>(null);

  itemEdit$ = this.itemEdit.asObservable();

  sendItemEdit(item: Financias){
    console.log('Shared', item.id)
    this.itemEdit.next(item);
  }

  cleanItem(){
    this.itemEdit.next(null);
  }
}
