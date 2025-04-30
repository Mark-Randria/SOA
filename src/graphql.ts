
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
