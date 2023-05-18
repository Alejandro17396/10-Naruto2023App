export interface Login {
    mensaje: string;
    user:    User;
    token:   string;
}

export interface User {
    password:              null;
    username:              string;
    authorities:           Authority[];
    accountNonExpired:     boolean;
    accountNonLocked:      boolean;
    credentialsNonExpired: boolean;
    enabled:               boolean;
}

export interface Authority {
    authority: string;
}

export interface Register {
    id?:       null;
    username: string;
    password: string;
    enabled:  boolean;
    mail:     string;
    roles?:    Role[];
}

export interface Role {
    authority: string;
}

export interface ResgisterResponse{
    mensaje:string;
}

