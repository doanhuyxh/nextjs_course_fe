'use client'

import axios from 'axios';

const axiosCustomerNestJsConfig = axios.create({
  baseURL: `${process.env.API_URL_BACKEND_NESTJS}`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});


export default axiosCustomerNestJsConfig;