import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recommendation } from '../../homepage.model';


@Component({
  selector: 'app-side-recommendations',
  templateUrl: 'side-recommendations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideRecommendationsComponent {

  @Input() recommendation!: Recommendation;

  @Input() type!: RecommendationType;

}

type RecommendationType = 'DISCUSSIONS' | 'MEMBERS' | 'ARTISTS' | 'GROUPS';
