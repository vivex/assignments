export const getValidation = (rules = [], value) => {
    const result = {
        isValid: true,
        message: null,
    };

    rules.forEach((rule) => {
        if (rule === 'no_negative' && value < 0) {
            result.isValid = false;
            result.message = 'No Negative Value allowed for this field';
        } else if (rule === 'required' && value === '') {
            result.isValid = false;
            result.message = 'This field is required';
        }
    });
    return result;
};