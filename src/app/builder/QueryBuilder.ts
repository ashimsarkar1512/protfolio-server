// import { FilterQuery, Query } from 'mongoose';

// class QueryBuilder<T> {
//   public modelQuery: Query<T[], T>;
//   public query: Record<string, unknown>;

//   constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
//     this.modelQuery = modelQuery;
//     this.query = query;
//   }

//   search(searchableFields: string[]) {
//     const searchTerm = this?.query?.searchTerm;
//     if (searchTerm) {
//       this.modelQuery = this.modelQuery.find({
//         $or: searchableFields.map(
//           (field) =>
//             ({
//               [field]: { $regex: searchTerm, $options: 'i' },
//             }) as FilterQuery<T>,
//         ),
//       });
//     }

//     return this;
//   }

//   filter() {
//     const queryObj = { ...this.query }; // copy

//     // Filtering
//     const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

//     excludeFields.forEach((el) => delete queryObj[el]);

//     this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

//     return this;
//   }

//   sort() {
//     const sort =
//       (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
//     this.modelQuery = this.modelQuery.sort(sort as string);

//     return this;
//   }

//   paginate() {
//     const page = Number(this?.query?.page) || 1;
//     const limit = Number(this?.query?.limit) || 10;
//     const skip = (page - 1) * limit;

//     this.modelQuery = this.modelQuery.skip(skip).limit(limit);

//     return this;
//   }

//   fields() {
//     const fields =
//       (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

//     this.modelQuery = this.modelQuery.select(fields);
//     return this;
//   }
//   async countTotal() {
//     const totalQueries = this.modelQuery.getFilter();
//     const total = await this.modelQuery.model.countDocuments(totalQueries);
//     const page = Number(this?.query?.page) || 1;
//     const limit = Number(this?.query?.limit) || 10;
//     const totalPage = Math.ceil(total / limit);

//     return {
//       page,
//       limit,
//       total,
//       totalPage,
//     };
//   }
// }

// export default QueryBuilder;


import { Query } from 'mongoose';

class QueryBuilder<T> {
    public query: Record<string, any>;
    public queryModel: Query<T[], T>;

    // define conostructor
    constructor(query: Record<string, any>, queryModel: Query<T[], T>) {
        this.query = query;
        this.queryModel = queryModel;
    }

    // define searching method
    search(searchingFields: string[]) {
        if (this?.query?.search) {
            this.queryModel = this.queryModel.find({
                $or: searchingFields.map((filed) => ({
                    [filed]: { $regex: this.query.search, $options: 'i' },
                })),
            });
        }
        return this;
    }

    // define filltering method
    filter() {
        const filterQuery = this?.query?.filter && { _id: this?.query?.filter }
        this.queryModel = this.queryModel.find(filterQuery);
        return this;
    }

    // define sorting method
    sort() {
        const sortOreder = this?.query?.sortOrder === 'desc' ? -1 : 1;
        const sortValue = this?.query?.sortBy || 'createdAt';
        this.queryModel = this.queryModel.sort({ [sortValue]: sortOreder });
        return this;
    }
}

// export this class
export default QueryBuilder;