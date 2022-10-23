import { Component, OnInit } from '@angular/core';
import { DogsService } from './dogs.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {
  dogs: string[] = [];
  constructor(private http: HttpClient) { }
  img_url: string = "";
  name: string = "";

  ngOnInit(): void {
    this.getDogs("https://dog.ceo/api/breeds/list/all");
  }

  capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  decapitalizeFirstLetter(s: string) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  onChange(event: Event){
    const target = event.target as HTMLSelectElement;
    let name = target.value;
    this.renderDog(name);
  }

  getDogs(url: string) {
    this.http.get<any>(url).subscribe(response => {
      const message = response["message"];
      let keys = Object.keys(response["message"]);
      keys.forEach(key => {
        if(message[key].length === 0) {
          this.dogs.push(this.capitalizeFirstLetter(key));
        }
        else {
          for(const element of message[key]) {
            this.dogs.push(key + " " + element);
          }
        }
      });
    })
  }

  renderDog(name: string) {
    const characters = document.querySelector('section');
    characters!.innerText = "";

    const name_div = document.createElement('div');
    const a = document.createElement('a');
    const jpg = document.createElement('img');
    a.href = "x";
    a.innerText = name;
    let a_tag = '<a href="' + "https://en.wikipedia.org/wiki/" + name + '">' + name + '</a>';
    name_div.innerHTML = 'Poczytaj więcej o tej rasie na wikipedii: <br>' +  a_tag;

    this.http.get<any>("https://dog.ceo/api/breed/" + this.decapitalizeFirstLetter(name) + "/images/random").subscribe(response => {
      const message = response["message"];
      console.log(message);
      jpg.src = message;
    })
    jpg.width = 500;
    const details = document.querySelector('section:not(:first-child)');

    details!.append(name_div, jpg);
  }
}
