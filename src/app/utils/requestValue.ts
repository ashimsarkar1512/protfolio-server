import { Request } from 'express'
import AppError from '../errors/AppError'
import status from 'http-status'

const getSingleStringValue = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}

export const getRequiredParam = (req: Request, key: string): string => {
  const value = getSingleStringValue(req.params?.[key] as string | string[] | undefined)

  if (!value) {
    throw new AppError(
      status.BAD_REQUEST,
      `Missing required route parameter: ${key}`
    )
  }

  return value
}

export const getOptionalUploadedFilePath = (
  req: Request
): string | undefined => {
  const filePath = getSingleStringValue(
    req.file?.path as string | string[] | undefined
  )

  return filePath
}
