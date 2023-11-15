import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { PremiereAlbum } from '../../../homepage.model';

@Component({
  selector: 'app-premiere-album',
  templateUrl: './premiere-album.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiereAlbumComponent {

  @Input() album!: PremiereAlbum;

  @Output() artist = new EventEmitter<string>();
  @Output() albumModal = new EventEmitter<string>();

  isWideScreen: boolean = window.innerWidth > 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 600;
  }

  openArtistForum() {
    this.artist.emit(this.album.artist.id);
  }

  openAlbumModal() {
    this.albumModal.emit(this.album.id);
  }

}
