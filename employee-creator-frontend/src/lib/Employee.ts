interface Employee {
    id: number
    firstName: string
    middleName?: string
    lastName: string
    email: string
    mobile: number
    address: string
    contractType: string
    jobType: string
    weeklyHours: number
    startDate: string
    endDate?: string
    [key: string]: string | number | undefined;
}

export type {Employee}