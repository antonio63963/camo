class Validation {
  string(str: string) {
    let isValid = true;
    let message = "";
    const check = {
      isEmpty() {
        if (!isValid) {
          return this;
        }
        isValid = str.length > 0;
        if (!isValid) message = "Field should be fill in";
        return this;
      },
      minLength(min: number) {
        if (!isValid) {
          return this;
        }
        isValid = str.length >= min;
        if (!isValid) message = `Min length would be more than ${min}`;
        return this;
      },
      maxLength(max: number) {
        if (!isValid) {
          return this;
        }
        isValid = str.length <= max;
        if (!isValid) message = `Min length would  be less than ${max}`;
        return this;
      },
      notEqual(...args: any[]) {
        if (!isValid) {
          return this;
        }
        isValid = !args.filter((arg) => arg === str).length;
        if (!isValid) message = "Not valid value";
        return this;
      },
      email() {
        if (!isValid) {
          return this;
        }
        const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        isValid = EMAIL_REGEXP.test(str);
        if (!isValid) message = "Email is not valid";
        return this;
      },
      url() {
        if (!isValid) {
          return this;
        }
        const URL_REGEXP =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        isValid = URL_REGEXP.test(str);
        if (!isValid) message = "Url is not a valid URL";
        return this;
      },
      // example: 'png', 'jpg', 'jpeg'
      fileFormat(...formats: string[]) {
        if (!isValid || !formats.length) {
          return this;
        }
        const extension = str.split('.').pop();
        isValid = formats.some((format) => format === extension ? true : false);
        if (!isValid) message = "File extention is not a valid";
        return this;
      },
      result() {
        return { isValid, message };
      },
    };
    return check;
  }
}
export default new Validation();
