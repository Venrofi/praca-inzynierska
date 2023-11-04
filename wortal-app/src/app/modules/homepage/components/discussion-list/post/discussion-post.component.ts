import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DiscussionPost, DiscussionPostTopic } from '../../../homepage.model';

@Component({
  selector: 'app-discussion-post',
  templateUrl: './discussion-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionPostComponent {

  @Input() post!: DiscussionPost;

  @Output() topic = new EventEmitter<DiscussionPostTopic>();
  @Output() authorProfile = new EventEmitter<string>();
  @Output() postModal = new EventEmitter<string>();
  @Output() postDetails = new EventEmitter<string>();

  isWideScreen: boolean = window.innerWidth > 600;

  dateType: string = 'short';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 600;
    this.dateType = this.isWideScreen ? 'medium' : 'short';
  }

  openTopicForum() {
    const topic = this.post.topic;
    this.topic.emit(topic);
  }

  openAuthorProfile() {
    this.authorProfile.emit(this.post.author.id);
  }

  openPostModal() {
    this.postModal.emit(this.post.id);
  }

  openPostDetails() {
    this.postDetails.emit(this.post.id);
  }
}
