import { get } from 'svelte/store'
import { routeStack } from '$lib/store.js'
import { goto } from '$app/navigation'

export function go(route) {
    let value = get(routeStack);

    if (!value) {
        routeStack.set([])
    }

    value.push(route)
    routeStack.set(value)
    goto(route)
}

export function goBack() {
    let value = get(routeStack);

    console.log("val", value)
    if (value.length > 0) {
        let val = value.pop()

        if (value.length > 0) {
            let val2 = value.pop()
            console.log('yo', val, value)

            routeStack.set(value)

            go(val2+"?refresh=true")
        } else {
            console.log('huh')
            goto("/?refresh=true")
        }
    }

}