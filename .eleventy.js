module.exports = function(eleventyconfig){

    eleventyconfig.addPassthroughCopy("src/css");
    eleventyconfig.addPassthroughCopy("src/images");
    eleventyconfig.addPassthroughCopy("src/js");
    return {
        dir: {
            input: "src",
            output: "dist",
            data: "./src/js/data"
        }
    };
}