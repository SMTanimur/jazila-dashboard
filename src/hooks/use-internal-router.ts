import { RouterContext } from "@/shared/providers/router-provider"
import { useContext } from "react"


export const useInternalRouter = () => {
  return useContext(RouterContext)
}
