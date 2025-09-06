declare namespace Express {
  export interface Request {
    userId?: string | undefined;
    userEmail?: string | undefined;
    businessId?: string | undefined;
  }
}
