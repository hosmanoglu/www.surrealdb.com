import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { drop } from '@ascua/tasks';

export default class FeedbackFormComponent extends Component {
	@service surreal;
	@service router;

	@tracked selectedCategory = 'feedback';
	@tracked isNewFeedBack = true;
	@tracked hasSavedFeedback = false;
	@tracked hasError = false;
	@tracked text;
	@tracked show = false;

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
		this.resetForm();
	}

	@action
	resetForm() {
		this.isNewFeedBack = true;
		this.hasSavedFeedback = true;
		this.hasError = false;
		this.selectedCategory = 'feedback';
		this.text = '';
	}

	@action
	setCategory(e) {
		this.selectedCategory = e.target.value;
	}

	@drop *submitFeedback() {
		if (!this.text) return;

		try {
			yield fetch('https://form.surrealdb.com/feedback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					type: this.selectedCategory,
					text: this.text,
					url: this.router.currentURL,
					date: new Date(),
				}),
			});

			this.hasSavedFeedback = true;
			this.isNewFeedBack = false;
		} catch {
			this.hasError = true;
		}
	}
}
