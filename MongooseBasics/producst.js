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

productSchema.methods.greet = function(){
    console.log("Hello!!");
    console.log(`- from ${this.name}`)
};

productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    return this.save();
};

productSchema.methods.addCategory = function(newCategory){
    this.categories.push(newCategory);
    return this.save();
}

const Product = mongoose.model("Product", productSchema);

const findProduct = async()=> {
    const foundProduct = await Product.findOne({name: "Bike Helmet"});
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory("Outdoors")
    console.log(foundProduct);
};



findProduct();








// const bike = new Product({name: "Cycling Jersey", price: 89.99, categories:["Cycling", "Clothing"], size: "S"});
// bike.save()
//     .then(data => {
//         console.log("IT WORKED");
//         console.log(data);
//     })
//     .catch(err =>{
//         console.log("OH NO! Something went wrong!");
//         console.log(err);
//     })

// Product.findOneAndUpdate({name: "Tire Pump"}, {price: 10}, {new: true, runValidators: true})
//     .then(data => {
//                 console.log("IT WORKED");
//                 console.log(data);
//             })
//             .catch(err =>{
//                 console.log("OH NO! Something went wrong!");
//                 console.log(err);
//             })