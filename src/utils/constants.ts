const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// const baseURL="http://192.168.1.49:8082"

const imageUrl = "http://210.245.85.229:1983";

const version = process.env.REACT_APP_VERSION;

const validateLine = {
  regexPassword:
    "Mật khẩu phải chứa 1 chữ hoa, 1 chữ thường , 1 số và không có khoảng trắng",
  required: "Không được để trống",
  trim: "Không được chứa khoảng trắng đầu và cuối",
  email: "Email không hợp lệ",
  confirmPassword: "Mật khẩu nhập lại phải giống với mật khẩu đã nhập mới",
};

const InputProps = {
  style: {
    height: 44,
    borderRadius: 8,
    // background: 'red',
  },
};

export { baseURL, version, validateLine, InputProps, imageUrl };
