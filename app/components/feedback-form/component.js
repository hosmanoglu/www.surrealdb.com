import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FeedbackFormComponent extends Component {
	@tracked show;

	@action
	toggleFeedbackForm() {
		this.show = !this.show;
	}

	@action
	submitFeedback() {
		//
	}
}
