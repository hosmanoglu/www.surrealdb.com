import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class FeedbackFormComponent extends Component {
	@service surreal;
	@service router;

	@tracked show;
	@tracked selectedCategory = 'feedback';
	@tracked text;
	@tracked isSavingFeedback = false;
	@tracked hasSavedFeedback = false;
	@tracked isNewFeedBack = true;
	@tracked hasError = false;

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
		this.isSavingFeedback = false;
		this.isNewFeedBack = true;
		this.hasSavedFeedback = true;
		this.hasError = false;
		this.text = '';
	}

	@action
	setCategory(e) {
		this.selectedCategory = e.target.value;
	}

	@action
	async submitFeedback() {
		if (!this.text) return;

		this.isSavingFeedback = true;

		try {
			await fetch('https://form.surrealdb.com/feedback', {
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
		} catch {
			this.hasError = true;
		} finally {
			this.isSavingFeedback = false;
			this.isNewFeedBack = false;
			this.selectedCategory = 'feedback';
			this.text = '';
		}
	}
}
