import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SearchVideo-Front');

  url = signal('');
  data = signal<ytdata | null>(null);

  search() {
    //fetch('https://searchvideo-production.up.railway.app/info?url=' + this.url())
    fetch('http://localhost:8080/info?url=' + this.url()) //test
      .then((response) => response.json())
      .then((data) => {
        this.data.set(data);
      });
  }

  download_video(){
    //const api_url = 'http://localhost:8080/download'; //local
    const api_url = 'https://searchvideo-production.up.railway.app/download'
    const params = ({
      url: this.url(),
      format_id: this.data()?.formats[1].format_id, //debe recibir el formato elegido
      dir: 'C:/Users/Gram/Desktop/test' //cambiar
    })
    const fetch_api = `${api_url}?${params.toString()}`

    fetch(fetch_api);
  }

  
  download_test_360() {
    const api_url = 'http://localhost:8080/download';
    const param = new URLSearchParams({
      url: 'https://www.youtube.com/watch?v=q2oGa3AMT_U',
      format_id: '134',
      dir: 'C:/Users/Gram/Desktop/test',
    });
    const link = `${api_url}?${param.toString()}`;
    console.log(param);
    fetch(link)
  }

}
