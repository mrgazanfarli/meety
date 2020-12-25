import axios from 'axios';
import { HttpClient } from './httpClient';


const _axiosInstance = axios.create();

export const httpClient = new HttpClient(_axiosInstance);
