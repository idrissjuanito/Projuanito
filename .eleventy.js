module.exports = function(eleventyconfig){

    eleventyconfig.addPassthroughCopy("src/css");
    // eleventyconfig.addPassthroughCopy("src/images");
    eleventyconfig.addPassthroughCopy("src/js");
    // eleventyconfig.addPassthroughCopy("src/_data");

    return {
        dir: {
            input: "src",
            output: "dist",
        }
    }
}