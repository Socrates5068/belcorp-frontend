import api from "@/lib/axios"
import { users } from "../types"
import { isAxiosError } from "axios"

export async function getUsers() {
    try {
        const url = `/users`
        const { data } = await api(url)
        const response = users.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}