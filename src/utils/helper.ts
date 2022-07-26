import FormatFns from "utils/DateFns";

const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const isArray = function (a: any) {
  return Array.isArray(a);
};

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

export function validateVietnameseName(){
  var firstLetter="[A-EGHIK-VXYÂĐỔÔÚỨ]".normalize("NFC"),
      otherLetters="[a-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫]".normalize("NFC"),
      regexString="^"
                 +firstLetter+otherLetters+"+\\s"
                 +"("+firstLetter+otherLetters+"+\\s)*"
                 +firstLetter+otherLetters+"+$"
  return RegExp(regexString)
  //     regexPattern=RegExp(regexString);
  // return regexPattern.test(value.normalize("NFC"))
}

// export function convertKeysToCamel(o: any) {
//   if (isObject(o)) {
//     const n = {};

//     Object.keys(o).forEach((k: string) => {
//       n[toCamel(k)] = convertKeysToCamel(o[k]);
//     });

//     return n;
//   } else if (isArray(o)) {
//     return o.map((i: any) => {
//       return convertKeysToCamel(i);
//     });
//   }

//   return o;
// }

export function convertCamelCaseKeysToSnakeCase(obj: any) {
  if (typeof obj != "object") return obj;

  for (let oldName in obj) {
    // Camel to underscore
    let newName = oldName.replace(/([A-Z])/g, function ($1) {
      return "_" + $1.toLowerCase();
    });

    // Only process if names are different
    if (newName != oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    // Recursion
    if (typeof obj[newName] == "object") {
      obj[newName] = convertCamelCaseKeysToSnakeCase(obj[newName]);
    }
  }
  return obj;
}

export function convertToQuery(param: any) {
  return (
    "?" +
    Object.keys(param)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(param[key]);
      })
      .join("&")
  );
}

export function dayOfWeekToString(st: number) {
  switch (st) {
    case 1:
      return "Thứ 2";
    case 2:
      return "Thứ 3";
    case 3:
      return "Thứ 4";
    case 4:
      return "Thứ 5";
    case 5:
      return "Thứ 6";
    case 6:
      return "Thứ 7";
    case 7:
      return "Thứ 8";
    default:
      return null;
  }
}

export function getDateFromStringDMY(dateString: string) {
  const regex =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (regex.test(dateString)) {
    const dates = dateString.split("-" || "/");
    return new Date(Number(dates[2]), Number(dates[1]) - 1, Number(dates[0]));
  }
  return null;
}

export const convertDateToString = (date: Date) => {
  const house = FormatFns.format(date, "HH:mm");
  const day = FormatFns.format(date, "dd/MM/yyyy");
  const dateOfWeek = date.getDay();
  return house + " | " + dayOfWeekToString(dateOfWeek) + "," + day;
};

export function currencyFormat(num) {
  if (!num) {
    return;
  }
  return Number(num)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function isValidFileImage(file: any, callback: Function) {
  let _validFileExtensions = [".jpg", ".jpeg", ".png"];

  if (file.length > 0) {
    let blnValid = false;
    for (let j = 0; j < _validFileExtensions.length; j++) {
      let sCurExtension = _validFileExtensions[j];
      if (
        file
          .substr(file.length - sCurExtension.length, sCurExtension.length)
          .toLowerCase() === sCurExtension.toLowerCase()
      ) {
        blnValid = true;
        break;
      }
    }

    if (!blnValid) {
      callback(
        "Sorry, " +
          file +
          " is invalid, allowed extensions are: " +
          _validFileExtensions.join(", ")
      );
      return false;
    }
  }

  callback("");
  return true;
}
