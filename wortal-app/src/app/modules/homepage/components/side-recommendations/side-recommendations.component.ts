import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recommendation } from '../../homepage.model';
import { noop } from "rxjs";


@Component({
  selector: 'app-side-recommendations',
  templateUrl: 'side-recommendations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideRecommendationsComponent {

  @Input() recommendation!: Recommendation;

  @Input() type!: RecommendationType;

  mapRouterLink(): string[] {
    switch (this.type) {
      case "DISCUSSIONS": {
        return ['/discussion'];
      }
      case "ARTISTS": {
        return ['/artist'];
      }
      case "GROUPS": {
        return ['/group'];
      }
      case "MEMBERS": {
        return ['/user'];
      }
      default: {
        return ['/'];
      }
    }
  }

}

type RecommendationType = 'DISCUSSIONS' | 'MEMBERS' | 'ARTISTS' | 'GROUPS';
