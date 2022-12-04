type Check = {
  isEmpty: () => Object;
  minLength: (data: number) => Check;
  maxLength: (data: number) => Check;
  email: () => Check;
  url: () => Check;
  fileFormat: (data: string) => Check;
};

type Result = {
  isValid: boolean;
  message: string;
};

class Validation {
  string(stringData: string) {
    const str = stringData;
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
        if (!isValid) message = `Min length would be than ${min}`;
        return this;
      },
      maxLength(max: number) {
        if (!isValid) {
          return this;
        }
        isValid = str.length > max;
        if (!isValid) message = `Min length would be than ${max}`;
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
      fileFormat() {
        if (!isValid || !arguments) {
          return this;
        }
        const reg = Array.from(arguments).reduce(function (acc, item, ind) {
          if (arguments.length - 1 === ind) {
            acc += item;
          } else {
            acc += ` ${item} |`;
          }
          return acc;
        }, "");

        const EXP_REGEXP = new RegExp(`^(?:.*\.(?=(${reg})$))?[^.]*$`, "i");
        const fileExtentionData = str.match(EXP_REGEXP);
        isValid = fileExtentionData ? !!fileExtentionData[1] : false;
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
