import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateutilService {

  constructor() { }

   /**
   * If the two dates are equal, the result would be 0, 
   * positive integer if date1 gt date2 
   * negative integer if date lt date2  
   * @param date1 
   * @param date2 
   */
  dateCompare(date1 : Date, date2 : Date){
    if(date1.getFullYear() - date2.getFullYear() == 0){
      if(date1.getMonth() - date2.getMonth() == 0){
        return date1.getDate() - date2.getDate();
      }else{
       return date1.getMonth() - date2.getMonth(); 
      }
    }else{
      return date1.getFullYear() - date2.getFullYear();
    }
  }
}
