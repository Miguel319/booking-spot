import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cameIt"
})
export class CameItPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    const sentences = value.split(",");
    const resultArr = [];

    for (let elem of sentences) {
      let space = elem.lastIndexOf(" ");

      if (space && space !== 0) {
        let str = `${elem.substr(0, space).toLowerCase()}${elem
          .substr(space + 1)[0]
          .toUpperCase()}${elem.substr(space + 2).toLowerCase()}`;
        resultArr.push(str);
      }
    }

    return `${resultArr[0]},${resultArr[1]}`;
  }
}
