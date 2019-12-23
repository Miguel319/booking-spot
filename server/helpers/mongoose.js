module.exports = {
    normalizeErrors: (errors) => {
        const errs = [];
        
        for (let prop in errors) {
            if (errors.hasOwnProperty(prop)) {
                errs.push({ title: prop, details: errors[prop].message });
            }
        }
        return errs;
    }
}