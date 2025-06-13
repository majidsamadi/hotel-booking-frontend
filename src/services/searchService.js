import request from './request'
import { SEARCH_API } from '@/apis'

export function searchHotels(params) {
  return request.get(SEARCH_API, { params })
}
