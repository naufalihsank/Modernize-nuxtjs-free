import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const employee = localStorage.getItem('employee')

    // Skip login/register pages to avoid infinite redirect
    if (to.path.startsWith('/auth/login') || to.path.startsWith('/auth/register')) {
      return
    }

    // If no employee, force to login
    if (!employee) {
      console.warn('No employee found. Redirecting to login...')
      return navigateTo('/auth/login')
    }
  }
})