import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
interface ytdata {
  uploader: string;
  title: string;
  url: string;
  thumbnail: string;
  description?: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SearchVideo-Front');

  url = signal('')
  data = signal<ytdata | null>(null)


  search() {
    console.log(this.data());

    fetch('http://localhost:8080/info?url=' + this.url())
      .then(response => response.json())
      .then(data => {
        this.data.set(data)
      })

  }


}
