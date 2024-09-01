import { type ICreateMeasureRepository } from "~/domain/repositories/measure/create-measure.repository"
import { prisma } from "../db/prisma"
import { IGetMeasureByIdRepository } from "~/domain/repositories/measure/get-measure-by-id.repository"
import { IUpdateMeasureByIdRepository } from "~/domain/repositories/measure/update-measure-by-id.reposiroty"
import { IGetMeasuresByCustomerCodeRepository } from "~/domain/repositories/measure/get-measures-by-customer-code.repository"
import { IGetMeasureByMonthRepository } from "~/domain/repositories/measure/get-measure-by-month.repository"

export class MeasureRepository
  implements
    ICreateMeasureRepository,
    IGetMeasureByIdRepository,
    IUpdateMeasureByIdRepository,
    IGetMeasuresByCustomerCodeRepository,
    IGetMeasureByMonthRepository
{
  async create(params: ICreateMeasureRepository.Params): ICreateMeasureRepository.Result {
    return await prisma.measure.create({
      data: {
        customer_code: params.customer_code,
        image_url: params.image_url,
        measure_datetime: params.measure_datetime,
        measure_type: params.measure_type,
        value: params.value,
      },
    })
  }

  async getById(id: string): IGetMeasureByIdRepository.Result {
    return await prisma.measure.findUnique({
      where: { id },
    })
  }

  async update({
    id,
    data,
  }: IUpdateMeasureByIdRepository.Params): IUpdateMeasureByIdRepository.Result {
    return await prisma.measure.update({
      where: { id: id },
      data: {
        customer_code: data.customer_code,
        image_url: data.image_url,
        measure_datetime: data.measure_datetime,
        measure_type: data.measure_type,
        value: data.value,
        has_confirmed: data.has_confirmed,
      },
    })
  }

  async getByCustomerCode(
    code: string,
    options: IGetMeasuresByCustomerCodeRepository.Options
  ): IGetMeasuresByCustomerCodeRepository.Result {
    return await prisma.measure.findMany({
      where: {
        customer_code: code,
        measure_type: options?.measure_type,
      },
    })
  }

  async getByMounth(month: number): IGetMeasureByMonthRepository.Result {
    const currentYear = new Date().getFullYear()
    const startOfMonth = new Date(currentYear, month, 1)
    const endOfMonth = new Date(currentYear, month + 1, 1)

    return await prisma.measure.findMany({
      where: {
        measure_datetime: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    })
  }
}
