import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function getSafetyParsedJsonFromLocalStorage(key, defaultValue = null) {
	if (browser) {
		const item = localStorage.getItem(key);
		let result = defaultValue;
		try {
			result = JSON.parse(item);
		} catch (e) {
			localStorage.setItem(key, defaultValue);
			return defaultValue;
		}
		return result;
	} else {
		return defaultValue
	}
}

export const currentPost = writable(
	getSafetyParsedJsonFromLocalStorage('currentPost', false)
);
currentPost.subscribe((u) => {
	if (browser) {
		localStorage.setItem('currentPost', JSON.stringify(u));
	}
});

export const user = writable(
	getSafetyParsedJsonFromLocalStorage('user', false)
);
user.subscribe((u) => {
	if (browser) {
		localStorage.setItem('user', JSON.stringify(u));
	}
});

export const instance = writable(
	getSafetyParsedJsonFromLocalStorage('instance', false)
);
instance.subscribe((u) => {
	if (browser) {
		localStorage.setItem('instance', JSON.stringify(u));
	}
});