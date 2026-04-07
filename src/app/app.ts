import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DecimalPipe } from '@angular/common';

interface ytdata {
  uploader: string;
  title: string;
  url: string;
  thumbnail: string;
  description?: string;
  formats: vFormat[];
}

interface vFormat {
  ext: string;
  filesize: number;
  height: number;
  format_id: string;
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
    fetch('https://searchvideo-production.up.railway.app/info?url=' + this.url())
    //fetch('http://localhost:8080/info?url=' + this.url())
      .then(response => response.json())
      .then(data => {
        this.data.set(data)
      })
  }

}
