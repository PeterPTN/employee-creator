import { DefaultBodyType, rest } from 'msw'
import { Employee } from '../lib/Employee'


export const handlers = [

  rest.post('/employees', (req, res, ctx) => {
  }),

  rest.get<DefaultBodyType, any, Employee[]>('http://localhost:8080/employees', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json([
        {
        id: 1,
        firstName: 'Peter',
        middleName: "Thanh",
        lastName: "Nguyen",
        email: "fake@gmail.com",
        mobile: 5555555555,
        address: "123 Fake St",
        contractType: "Full-Time",
        jobType: "Developer",
        weeklyHours: 40,
        startDate: "01-01-2023"
      }
    ]),
    )
  }),
]