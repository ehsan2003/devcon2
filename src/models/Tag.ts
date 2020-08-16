import {Schema, model, Document, Model} from 'mongoose';

export interface ITagDoc extends Document {
    slug: string;
}

export interface ITagModel extends Model<ITagDoc> {
    /**
     * check existence of multiple tags by slug
     * true if all tags are found other wise false
     * @param tags
     */
    tagsExist: (tags: string[]) => Promise<boolean>;
}

const ModelSchema = new Schema({
    slug: {
        type: String,
        index: true,
        unique: true
    }
});
ModelSchema.static('tagsExist', function (this: Model<ITagDoc>, tagsIds: string[]) {
    return new Promise(((resolve, reject) => this.find({_id: {$in: tagsIds}}).select('_id')
        .then(tagsDocs =>
            tagsDocs.length < tagsIds.length ? resolve(true) : resolve(false)
        )))
})
export default model<ITagDoc>('tags', ModelSchema);