import type {FilterQuery, Model, Types} from 'mongoose';

type ValueOf<T> = T[keyof T];
type mongoTypes =
    Types.ObjectId
    | Types.Embedded
    | Types.Array<any>
    | Types.Map<any>
    | Types.Subdocument
    | Types.Decimal128
    | Types.Buffer
    | Types.DocumentArray<any>
    | string
    | number
    | Date;
type accumulator = any;
type expression = any;
type pipeItem = ValueOf<Stages>;


export interface Stages {
    addFields: {
        $addFields: {
            [p: string]: expression | 0 | 1;
        }
    };
    unwind: {
        $unwind: {
            // path to the field to unwind ( start with $ )
            path: string;
            // adds array index to specific field for each array element
            includeArrayIndex?: string;
            //
            preserveNullAndEmptyArrays?: boolean;
        }
    };
    replaceRoot: {
        // replaces root of the document
        $replaceRoot: {
            // new root ( starting with $ )
            newRoot: expression;
        }
    };
    lookup: {
        $lookup: {
            // collection for lookup
            from: string;
            // local field ( from input )
            localField: string;
            // foreign field from specified collection
            foreignField: string;
            // field name to attach
            as: string;
        } | {
            from: string;
            let: KeyValuePair<expression>;
            pipeline: pipeItem[];
            as: string;
        }
    };
    graphLookup: {
        $graphLookup: {
            // collection for graph lookup
            from: string;
            // expression based on input to start lookup
            startWith: expression;
            // field from specified collection
            connectFromField: string;
            // field from specified collection
            connectToField: string;
            // field name in output for matches
            as: string;
            // specifies max depth of graph
            maxDepth?: number;
            // if exists a field will add to each output field ( each array element ) which indicates depth of graph
            depthField?: string;
            // a filter query to filter elements
            restrictSearchWithMatch?: FilterQuery<any>
        }
    };
    project: {
        $project: Stages['addFields']['$addFields']
    };
    sort: {
        $sort: {
            [x: string]: 1 | -1 | { $meta: 'textScore' }
        };
    };
    limit: {
        $limit: number;
    };
    match: {
        $match: FilterQuery<any>;
    };
    skip: {
        $skip: number;
    };
}

export class AggregationChain {
    private pipeline: any[] = [];

    public run(model: Model<any>) {
        return model.aggregate(this.getPipelineInstance());
    }

    replaceUnwind(root: string, appear = true) {
        return this
            .unwind({path: root}, appear)
            .replaceRoot({newRoot: root}, appear);
    }

    unwind(options: Stages['unwind']['$unwind'], appear = true) {
        if (appear)
            this.pipeline.push({$unwind: options});
        return this;
    }

    replaceRoot(options: Stages['replaceRoot']['$replaceRoot'], appear = true) {
        if (appear)
            this.pipeline.push({$replaceRoot: options});
        return this;
    }

    addFields(options: Stages['addFields']['$addFields'], appear = true) {
        if (appear)
            this.pipeline.push({$addFields: options});
        return this;
    }

    lookup(options: Stages['lookup']['$lookup'], appear = true) {
        if (appear)
            this.pipeline.push({$lookup: options});
        return this;
    }

    graphLookup(options: Stages['graphLookup']['$graphLookup'], appear = true) {
        if (appear)
            this.pipeline.push({$graphLookup: options});
        return this;
    }

    project(options: Stages['project']['$project'], appear = true) {
        if (appear)
            this.pipeline.push({$project: options});
        return this;
    }

    sort(options: Stages['sort']['$sort'], appear = true) {
        if (appear)
            this.pipeline.push({$sort: options});
        return this;
    }

    limit(options: Stages['limit']['$limit'], appear = true) {
        if (appear)
            this.pipeline.push({$limit: options});
        return this;
    }

    match(options: Stages['match']['$match'], appear = true) {
        if (appear)
            this.pipeline.push({$match: options});
        return this;
    }

    skip(options: Stages['skip']['$skip'], appear = true) {
        if (appear)
            this.pipeline.push({$skip: options});
        return this;
    }

    public getPipelineInstance() {
        return [...this.pipeline];
    }
}