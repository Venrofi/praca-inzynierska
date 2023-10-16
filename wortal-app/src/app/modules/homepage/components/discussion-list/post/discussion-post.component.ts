import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DiscussionPost } from '../../../homepage.model';

@Component({
  selector: 'app-discussion-post',
  templateUrl: './discussion-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionPostComponent {

  @Input() post!: DiscussionPost;

  @Output() topic = new EventEmitter<string>();
  @Output() authorProfile = new EventEmitter<string>();
  @Output() postModal = new EventEmitter<string>();

  openTopicForum(topic: string) {
    this.topic.emit(topic);
    return `/forum/${topic}`;
  }

  openAuthorProfile(author: string) {
    this.authorProfile.emit(author);
    return `/user/${author}`;
  }

  openPostModal(post: DiscussionPost) {
    this.postModal.emit(post.id);
    return `/forum/${post.topic}/${post.id}`;
  }

}
