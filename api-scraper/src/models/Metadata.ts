import {Schema, model} from 'mongoose'

const Cat1Schema = new Schema({
    value: {
        type: String,
        required: true
    },
    friendlyUrl: {
        type: String,
        required: true
    },
    cat2: {
        type: [],
        required: true
    }
})

const CategoriesSchema = new Schema({
    cat1: {
        type: [Cat1Schema],
        required: true
    }
})

const MetadataSchema = new Schema({
    categories: {
        type: CategoriesSchema,
        required: true
    }
}, {collection: "metadata"})

export const MetadataModel = model("Metadata", MetadataSchema);
