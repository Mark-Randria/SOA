
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateInsuranceCompanyInput {
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
}

export interface UpdateInsuranceCompanyInput {
    companyName?: Nullable<string>;
    companyAddress?: Nullable<string>;
    companyPhone?: Nullable<string>;
    companyEmail?: Nullable<string>;
}

export interface CreateInsuranceInput {
    idEmployee: string;
    idHRAdvisor: string;
    insurance_end_date: Date;
    insuranceDescription: string;
    beneficiary: string;
    companyID?: Nullable<string>;
}

export interface UpdateInsuranceInput {
    idHRAdvisor?: Nullable<string>;
    insuranceDescription?: Nullable<string>;
    beneficiary?: Nullable<string>;
    companyID?: Nullable<string>;
}

export interface NotificationInput {
    idReceiver: string;
    idSender: string;
    notifTitle: string;
    message: string;
    sendDate: Date;
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

export interface User {
    immatriculation: string;
    email?: Nullable<string>;
    firstname?: Nullable<string>;
    lastname?: Nullable<string>;
    phone?: Nullable<string>;
    role?: Nullable<string>;
}

export interface IQuery {
    allInsurances(): Nullable<Nullable<Insurance>[]> | Promise<Nullable<Nullable<Insurance>[]>>;
    findOneInsurance(idInsurance: string): Nullable<Insurance> | Promise<Nullable<Insurance>>;
    allInsuranceCompanies(): Nullable<Nullable<InsuranceCompany>[]> | Promise<Nullable<Nullable<InsuranceCompany>[]>>;
    findOneInsuranceCompany(companyID: string): Nullable<InsuranceCompany> | Promise<Nullable<InsuranceCompany>>;
    allNotifications(): Nullable<Nullable<Notification>[]> | Promise<Nullable<Nullable<Notification>[]>>;
    findOneNotification(id: string): Notification | Promise<Notification>;
    findNotifications(idReceiver?: Nullable<string>, idSender?: Nullable<string>): Nullable<Nullable<Notification>[]> | Promise<Nullable<Nullable<Notification>[]>>;
    allUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    findUser(immatriculation: string): Nullable<User> | Promise<Nullable<User>>;
    allHRAdvisors(): Nullable<Nullable<HRAdvisor>[]> | Promise<Nullable<Nullable<HRAdvisor>[]>>;
    allEmployees(): Nullable<Nullable<Employee>[]> | Promise<Nullable<Nullable<Employee>[]>>;
}

export interface IMutation {
    createInsurance(insurance: CreateInsuranceInput): Nullable<Insurance> | Promise<Nullable<Insurance>>;
    updateInsurance(idInsurance: string, insurance?: Nullable<UpdateInsuranceInput>): Nullable<Insurance> | Promise<Nullable<Insurance>>;
    deleteInsurance(idInsurance: string): DeletedInsuranceResponse | Promise<DeletedInsuranceResponse>;
    createInsuranceCompany(company: CreateInsuranceCompanyInput): Nullable<InsuranceCompany> | Promise<Nullable<InsuranceCompany>>;
    updateInsuranceCompany(companyID: string, company: UpdateInsuranceCompanyInput): Nullable<InsuranceCompany> | Promise<Nullable<InsuranceCompany>>;
    deleteInsuranceCompany(companyID: string): DeletedInsuranceResponse | Promise<DeletedInsuranceResponse>;
    createNotification(notification: NotificationInput): Nullable<Notification> | Promise<Nullable<Notification>>;
    testMutation(message: string): Nullable<string> | Promise<Nullable<string>>;
    createHRAdvisor(hr: CreateHRAdvisorInput): Nullable<HRAdvisor> | Promise<Nullable<HRAdvisor>>;
    createEmployee(employee: CreateEmployeeInput): Nullable<Employee> | Promise<Nullable<Employee>>;
    updateHRAdvisor(immatriculation: string, hr?: Nullable<UpdateHRAdvisorInput>): Nullable<HRAdvisor> | Promise<Nullable<HRAdvisor>>;
    updateEmployee(immatriculation: string, employee?: Nullable<UpdateEmployeeInput>): Nullable<Employee> | Promise<Nullable<Employee>>;
    deleteUser(immatriculation: string): Nullable<DeletedUserResponse> | Promise<Nullable<DeletedUserResponse>>;
}

export interface Insurance {
    idInsurance: string;
    idEmployee: string;
    idHRAdvisor: string;
    insurance_end_date: Date;
    insuranceDescription: string;
    beneficiary: string;
    company?: Nullable<InsuranceCompany>;
}

export interface InsuranceCompany {
    companyID: string;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
}

export interface DeletedInsuranceResponse {
    success: boolean;
    message?: Nullable<string>;
}

export interface Notification {
    idNotif: string;
    idReceiver: string;
    idSender: string;
    notifTitle: string;
    message: string;
    sendDate: Date;
}

export interface DeletedUserResponse {
    success: boolean;
    message?: Nullable<string>;
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
