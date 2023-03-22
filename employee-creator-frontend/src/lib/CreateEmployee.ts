interface CreateEmployee {
    firstName: string
    middleName?: string
    lastName: string
    email: string
    mobile: string
    address: string
    contractType: string
    jobType: string
    weeklyHours: number
    startDate: string
    endDate?: string
    [key: string]: string | number | undefined ;
}

export type {CreateEmployee}