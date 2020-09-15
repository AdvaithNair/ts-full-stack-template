import axios from 'axios';
import { BACKEND_URL } from '@app/common';

export default axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true
});
