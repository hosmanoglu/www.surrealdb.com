import Model from '@ascua/surreal/model';
import { any } from '@ascua/surreal/field';
import { string } from '@ascua/surreal/field';

export default class Feedback extends Model {
	@string categoty;
	@any feedback;
}
