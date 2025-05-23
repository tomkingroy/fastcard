export default defineNuxtRouteMiddleware((to, from) => {
    // Illegal jump
    // if(!['ipv4', 'ipv6', 'isp', 'mobile', 'resident'].includes(to.params.type as string)) {
    //     return navigateTo('/')
    // }
})
