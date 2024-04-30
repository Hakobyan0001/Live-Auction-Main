import { message } from 'antd';
import { DEFAULT_ERROR_MESSAGE } from '../assets/texts'

const success = (text) => {
  message.success(text);
};

const error = (text = DEFAULT_ERROR_MESSAGE) => {
  message.error(text);
};

const warning = (text) => {
  message.warning(text);
};

export {
  success,
  error,
  warning
}
