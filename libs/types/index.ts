export interface ResponseData<T = any> {
    code: number;
    message: string;
    data: T;
}


export interface DataPage<T = any> {
    data: T;
    totalResult: number;
    totalPage: number;
    page: number;
    pageSize: number;

}

export interface LessonData {
    id: string;
    name: string;
    slug: string;
    lessonContent: string;
    imageThumbnail: string;
    video: boolean;
    duration: string;
    isFree: boolean;
    isImportant: boolean;
    isOutstanding: boolean;
}

export interface LessonItem {
    id: string;
    name: string;
    slug: string
    type: string;
    imageThumbnail: string;
    lessonContent: string;
    video: string;
    description: string;
    duration: string;
    totalView: number;
    isFree: boolean;
    isImportant: boolean;
    isOutstanding: boolean
    courseId: string | null;
}

export interface LessonDataItem {
    id: string;
    name: string;
    lessonContent: string;
    imageThumbnail: string;
    video: string;
    duration: string;
    order: number;
    totalView: number;
}

export interface CourseData {
    id: string;
    name: string;
    slug: string;
    image: string;
    numberOfLessons: number;
    costPrice: number;
    courseType: string;
    totalTimeDuration: string;
    lesson: LessonData[];
}

export interface CourseItem {
    id: string;
    name: string;
    slug: string;
    description: boolean;
    lessonContent: string;
    imageThumbnail: string;
    video: string;
    duration: string;
}

export interface CollapseCourseProps {
    title: string;
    numberOfLessons: number;
    totalTimeDuration: string;
    data: LessonData[];
}

export interface User {
    name?: string;
    email?: string;
    avatar?: string;
    id?: string;
}

export interface Customer {
    id: string;
    email: string;
    role: string;
    avatar: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    yearOfBirth: number;
    city: string;
    fieldOfExpertise: string;
    yearOfExperience: string;
    description: string;
    bankAccountNumber: string;
    accountBankName: string;
    accountBankOwner: string;
    createdAt: string;
    totalMoney: number;
    code: string;
    level_affiliate: number;
    codeRef: string;
    totalRef: number;
    totalCommission: number;
    totalDiscount: number;
    type: string;
}

export interface NotificationItem {
    messId: string;
    messUserId: string;
    status: string;
    sendAt: string;
    readAt: string;
    title: string;
    content: string;
}

export interface SocialLinks {
    key: string;
    value: string;
    label: string;
}

export interface Page {
    id: string;
    title: string;
    slug: string;
    content: string;
    type: string;
    createdAt: number;
}


export interface BannerHeaderTop {
    id: string,
    content: string,
    status: string
}


export interface GoogleAuthResRequest {
    access_token: string,
    expires_in: number,
    scope: string,
    token_type: string,
    id_token: string
}


export interface Seo {
    title: string,
    description: string,
    keywords: string,
    favicon: string,
    logo: string,
}

export interface TemplateMail {
    id: string,
    name: string,
    senderName: string,
    subject: string,
    contentTemplate: string,
    createdAt: number
}

export interface GroupUser {
    key: string;
    id: string,
    name: string,
    numberUser: number,
}

export interface GroupUserItem {
    id: string,
    groupId: string,
    userId: string,
}

export interface GroupUserDetail {
    id: string,
    name: string,
    numberUser: number,
    users: User[]
}


export interface ScriptAutoEmailMarketing {
    id: string,
    name: string,
    description: string,
    sequentially: boolean,
    condition: string,
    listSchedulingEmails: string[],
}

export interface ScriptAutoEmailMarketingView {
    id: string,
    name: string,
    description: string,
    sequentially: boolean,
    condition: any[],
    listSchedulingEmails: ScriptAutoSchedulingEmails[],
}


export interface ScriptAutoSchedulingEmails {
    id: string,
    name: string,
    time: string,
    date: string,
    isActive: boolean,
    condition: string,
    templateMailId: string,
}

export interface Condition {
    id: string,
    label: string,
    conditionListLabel: string,
    conditionType: string,
    conditionKey: string[],
    value: string,
}

export interface ConditionSelected {
    label: string,
    subLabel: string,
    condition: string,
    value: string
}