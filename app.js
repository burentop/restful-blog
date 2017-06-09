var bodyParser = require("body-parser"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// Index route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err){
            console.log("Error!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// New route
app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});

// Create route
app.post("/blogs", function(req, res) {
   Blog.create(req.body.blog, function(err, newBlog) {
       if(err){
           res.render("new");
       } else {
           res.redirect("/blogs");
       }
   });
});

// Show route
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog) {
       if(err) {
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});  
       }
   });
});

// Edit route
app.get("/blogs/:id/edit", function(req, res) {
   res.render("edit"); 
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running");
});