import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocalToNumber'
})
export class VocalToNumberPipe implements PipeTransform {

  transform(value: string): string {

   let arr = value.split('');
   arr.forEach(function(letter, index) {

      switch (letter) {
        case 'a':
          arr[index] = "4"
          break;

          case 'e':
            arr[index] = '3'
          break;

          case 'i':
            arr[index] = '1'
          break;

          case 'o':
            arr[index] = '0'
          break;

          case 'u':
            arr[index] = '8'
          break;

      }
    })

    return arr.join('');
  }

}
