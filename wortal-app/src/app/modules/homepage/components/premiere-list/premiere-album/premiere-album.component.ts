import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { Album } from '../../../homepage.model';

@Component({
  selector: 'app-premiere-album',
  templateUrl: './premiere-album.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiereAlbumComponent {

  @Input() album!: Album;

  isWideScreen: boolean = window.innerWidth > 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 600;
  }

  generateRandomCover(): string {
    const randomCoverSize = Math.floor(Math.random() * 200 + 500); // returns a random number between 500 and 700

    return `https://picsum.photos/${randomCoverSize}/${randomCoverSize}`;
  }

}
