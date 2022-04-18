const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopApp')
.then(() => {
    console.log("connection OPEN!");
})
.catch(err => {
    console.log("ERROR" + err);
})

const personSchema = new mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual("fullName").get(function(){
    return `${this.first} ${this.last}`;
});

personSchema.pre("save", async function(){
    console.log("about to save!");
});
personSchema.post("save", async function(){
    console.log("just save!");
});

const Person = mongoose.model("Person", personSchema);

