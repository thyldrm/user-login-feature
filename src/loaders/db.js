const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
    console.log("DB bağlantısı Başarılı ...")
})

const connectDB = async () => {
    await Mongoose.connect(`mongodb://localhost/digitus`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connectDB
}

