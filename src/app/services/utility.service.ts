import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /**
   * Utility method for creating lists of elements from enum types
   * @param definition enum type
   */
  enumSelector(definition) {
    return Object.keys(definition).filter(element =>{ return isNaN(element as any);})
        .map(key => ({ value: definition[key], title: key }));
  }
}
