import { Component, HostListener, OnInit } from '@angular/core';
import { HomepageService } from '../../services/homepage.service';
import { HomepageSideRecommendations } from '../../homepage.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {

  sideRecommendations!: Observable<HomepageSideRecommendations>;

  isWideScreen: boolean = window.innerWidth > 1000;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 1000;
  }

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.sideRecommendations = this.homepageService.getSideRecommendations();
  }

}
