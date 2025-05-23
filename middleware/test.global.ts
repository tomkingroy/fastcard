// Define global middleware. Only middleware with the suffix .global will take effect. No need to introduce it in definePageMeta.middleware. It will take effect globally.
// You can define multiple global middlewares. The execution order is sorted from small to large according to the name asc.
// With global middleware, you can set route guards
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('test.global')
})
