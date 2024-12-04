let formData = new FormData();

const form = {
    buildFormData(data, parentKey) {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
            Object.keys(data).forEach(key => {
                this.buildFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    },

    parse(form){
        let result = {};

        for (const [key, value] of form.entries()) {
            result[key] = value;
        }

        return result;
    },

    translate(form) {
        formData = new FormData();

        if(!form)
            return {};

        this.buildFormData(form); // Build new FormData

        return formData;
    }
}
export default form;