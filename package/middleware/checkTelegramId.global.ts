import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  // Skip login/register pages
  if (to.path.startsWith('/auth')) return

  if (process.client) {
    const employeeRaw = localStorage.getItem('employee')
    console.log('Employee Data from localStorage:', employeeRaw)

    if (employeeRaw) {
      const employee = JSON.parse(employeeRaw)
      if (!employee.teleId) {
        console.log('teleId is missing! Redirecting...')
        useState('teleRedirectAlert').value = true

        return navigateTo('/auth/profile')
      }
    }
  }
})