import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  useToast as useToastOriginal,
  ToastActionElement as ToastActionElementOriginal,
} from "@/components/ui/toast"

export const useToast = useToastOriginal

export {
  type ToastProps,
  type ToastActionElement,
  Toast,
}