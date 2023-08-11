class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }
    serach() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {}

        this.query = this.query.find({ ...keyword });  //same as this.query.find({keyword:"iphone"})
        
        return this
    }
    filter() {
        const queryCopy = { ...this.queryStr }


        //removing some fields for category
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach((key) => delete queryCopy[key])
        this.query = this.query.find(queryCopy)  //same as this.query.find({category:"mobile"})
       
        return this

    }
}

module.exports = ApiFeatures