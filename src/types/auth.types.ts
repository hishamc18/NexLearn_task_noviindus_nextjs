export interface SendOtpRequest {
    mobile: string;
  }
  
  export interface VerifyOtpRequest {
    mobile: string;
    otp: string;
  }
  
  export interface CreateProfileRequest {
    mobile: string;
    name: string;
    email: string;
    qualification: string;
    profile_image: File;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    login?: boolean;
  }
  