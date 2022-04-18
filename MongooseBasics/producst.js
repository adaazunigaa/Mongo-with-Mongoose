const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopApp')
.then(() => {
    console.log("connection OPEN!");
})
.catch(err => {
    console.log("ERROR" + err);
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20

    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price MUST be POSITIVE"]
    },
    onSale:{
        type: Boolean,
        default: false
    },
    categories: {
       type: [String]
    },
    qty:{
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size:{
        type: String,
        enum: ["XS", "S", "M", "L", "XL"]
    }

});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({name: "Cycling Jersey", price: 89.99, categories:["Cycling", "Clothing"], size: "S"});
bike.save()
    .then(data => {
        console.log("IT WORKED");
        console.log(data);
    })
    .catch(err =>{
        console.log("OH NO! Something went wrong!");
        console.log(err);
    })

// Product.findOneAndUpdate({name: "Tire Pump"}, {price: 10}, {new: true, runValidators: true})
//     .then(data => {
//                 console.log("IT WORKED");
//                 console.log(data);
//             })
//             .catch(err =>{
//                 console.log("OH NO! Something went wrong!");
//                 console.log(err);
//             })