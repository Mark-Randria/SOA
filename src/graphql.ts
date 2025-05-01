
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface NotificationInput {
    idReceiver: string;
    idSender: string;
    notifTitle: string;
    message: string;
    sendDate: string;
}

export interface CreateHRAdvisorInput {
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    role: string;
    department: string;
}

export interface CreateEmployeeInput {
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    role: string;
    jobTitle: string;
    jobDescription: string;
    contractType: string;
}

export interface UpdateHRAdvisorInput {
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    phone?: Nullable<string>;
    role?: Nullable<string>;
    department?: Nullable<string>;
}

export interface UpdateEmployeeInput {
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    phone?: Nullable<string>;
    role?: Nullable<string>;
    jobTitle?: Nullable<string>;
    jobDescription?: Nullable<string>;
    contractType?: Nullable<string>;
}

export interface DeletedUserResponse {
    success: boolean;
    message?: Nullable<string>;
}

export interface User {
    immatriculation: string;
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    phone?: Nullable<string>;
    role?: Nullable<string>;
}

export interface IQuery {
    allNotifications(): Nullable<Nullable<Notification>[]> | Promise<Nullable<Nullable<Notification>[]>>;
    findOneNotification(id: string): Notification | Promise<Notification>;
    findNotifications(idReceiver?: Nullable<string>, idSender?: Nullable<string>): Nullable<Nullable<Notification>[]> | Promise<Nullable<Nullable<Notification>[]>>;
    allUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    allHRAdvisors(): Nullable<Nullable<HRAdvisor>[]> | Promise<Nullable<Nullable<HRAdvisor>[]>>;
    allEmployees(): Nullable<Nullable<Employee>[]> | Promise<Nullable<Nullable<Employee>[]>>;
}

export interface IMutation {
    createNotification(notification: NotificationInput): Nullable<Notification> | Promise<Nullable<Notification>>;
    testMutation(message: string): Nullable<string> | Promise<Nullable<string>>;
    createHRAdvisor(hr: CreateHRAdvisorInput): Nullable<HRAdvisor> | Promise<Nullable<HRAdvisor>>;
    createEmployee(employee: CreateEmployeeInput): Nullable<Employee> | Promise<Nullable<Employee>>;
    updateHRAdvisor(immatriculation: string, hr?: Nullable<UpdateHRAdvisorInput>): Nullable<HRAdvisor> | Promise<Nullable<HRAdvisor>>;
    updateEmployee(immatriculation: string, employee?: Nullable<UpdateEmployeeInput>): Nullable<Employee> | Promise<Nullable<Employee>>;
    deleteUser(immatriculation: string): Nullable<DeletedUserResponse> | Promise<Nullable<DeletedUserResponse>>;
}

export interface Notification {
    idNotif: string;
    idReceiver: string;
    idSender: string;
    notifTitle: string;
    message: string;
    sendDate: string;
}

export interface HRAdvisor extends User {
    immatriculation: string;
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    phone?: Nullable<string>;
    role?: Nullable<string>;
    department?: Nullable<string>;
}

export interface Employee extends User {
    immatriculation: string;
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    phone?: Nullable<string>;
    role?: Nullable<string>;
    jobTitle?: Nullable<string>;
    jobDescription?: Nullable<string>;
    contractType?: Nullable<string>;
}

type Nullable<T> = T | null;
