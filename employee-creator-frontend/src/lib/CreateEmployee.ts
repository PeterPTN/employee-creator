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
    ongoing?: boolean
    [key: string]: string | number | undefined | boolean ;
}

export type {CreateEmployee}