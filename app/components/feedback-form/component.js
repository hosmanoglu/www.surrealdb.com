import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class FeedbackFormComponent extends Component {
	@tracked show;
	@tracked selectedCategory = 'feedback';
	@tracked feedback;
	@service surreal;

	categories = [
		{
			label: 'Feedback',
			value: 'Feedback',
		},
		{
			label: 'Bug',
			value: 'Bug',
		},
		{
			label: 'Idea',
			value: 'Idea',
		},
	];

	@action
	toggleFeedbackForm() {
		this.show = !this.show;
	}

	@action
	setCategory(e) {
		this.selectedCategory = e.target.value;
	}

	@action
	async submitFeedback() {
		if (!this.feedback) return;

		try {
			await this.surreal.create('feedback', {
				category: this.selectedCategory,
				feedback: this.feedback,
			});

			this.show = false;
		} catch {
			// handle error
		}
	}
}
