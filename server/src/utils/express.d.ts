// Custom Object for Express Response
declare namespace Express {
  export interface Response {
    locals?: Locals;
  }
}

interface Locals {
  payload: any;
}
