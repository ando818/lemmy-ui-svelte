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

export const communities = writable(
	getSafetyParsedJsonFromLocalStorage('communities', [])
);
communities.subscribe((u) => {
	if (browser) {
		localStorage.setItem('communities', JSON.stringify(u));
	}
});

export const sortFilter = writable(
	getSafetyParsedJsonFromLocalStorage('sortFilter', [])
);
sortFilter.subscribe((u) => {
	if (browser) {
		localStorage.setItem('sortFilter', JSON.stringify(u));
	}
});

export const isLoading = writable(
	getSafetyParsedJsonFromLocalStorage('isLoading', false)
);
isLoading.subscribe((u) => {
	if (browser) {
		localStorage.setItem('isLoading', JSON.stringify(u));
	}
});


export const backdropVisible = writable(
	getSafetyParsedJsonFromLocalStorage('backdropVisible', false)
);
backdropVisible.subscribe((u) => {
	if (browser) {
		localStorage.setItem('backdropVisible', JSON.stringify(u));
	}
});
export const backdropImage = writable(
	getSafetyParsedJsonFromLocalStorage('backdropImage', "")
);
isLoading.subscribe((u) => {
	if (browser) {
		localStorage.setItem('backdropImage', JSON.stringify(u));
	}
});

export const routeStack = writable(
	getSafetyParsedJsonFromLocalStorage('routeStack', [])
);
routeStack.subscribe((u) => {
	if (browser) {
		localStorage.setItem('routeStack', JSON.stringify(u));
	}
});

export const instances = writable(
	getSafetyParsedJsonFromLocalStorage('instances', [])
);
instances.subscribe((u) => {
	if (browser) {
		localStorage.setItem('instances', JSON.stringify(u));
	}
});


export const currentCommunity = writable(
	getSafetyParsedJsonFromLocalStorage('currentCommunity', [])
);
currentCommunity.subscribe((u) => {
	if (browser) {
		localStorage.setItem('currentCommunity', JSON.stringify(u));
	}
});

export const currentInstance = writable(
	getSafetyParsedJsonFromLocalStorage('currentInstance', [])
);
currentInstance.subscribe((u) => {
	if (browser) {
		localStorage.setItem('currentInstance', JSON.stringify(u));
	}
});

export const site = writable(
	getSafetyParsedJsonFromLocalStorage('site', [])
);
site.subscribe((u) => {
	if (browser) {
		localStorage.setItem('site', JSON.stringify(u));
	}
});

export const replyModalOpen = writable(
	getSafetyParsedJsonFromLocalStorage('replyModalOpen', false)
);
replyModalOpen.subscribe((u) => {
	if (browser) {
		localStorage.setItem('replyModalOpen', JSON.stringify(u));
	}
});

export const commentToReply = writable(
	getSafetyParsedJsonFromLocalStorage('commentToReply', false)
);
commentToReply.subscribe((u) => {
	if (browser) {
		localStorage.setItem('commentToReply', JSON.stringify(u));
	}
});


export const lastPosts = writable(
	getSafetyParsedJsonFromLocalStorage('lastPosts', false)
);
lastPosts.subscribe((u) => {
	if (browser) {
		localStorage.setItem('lastPosts', JSON.stringify(u));
	}
});