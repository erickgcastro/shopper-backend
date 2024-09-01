import { Measure } from "@prisma/client"

export interface IGetMeasureByMonthRepository {
  /**
   * This function retrieves measures from a database for a specific month.
   * @param {number} month - The month number to fetch records for (0 for January, 1 for February, etc.).
   * Note: JavaScript months are zero-based, so January is 0 and December is 11.
   */
  getByMounth: (mounth: number) => IGetMeasureByMonthRepository.Result
}

export namespace IGetMeasureByMonthRepository {
  export type Result = Promise<Measure[]>
}
