module.exports = {
    toLine: (name) => {
        return name.replace(/([A-Z])/g,"_$1").toLowerCase();
    }
}