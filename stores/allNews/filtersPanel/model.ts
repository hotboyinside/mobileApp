import { createEvent, createStore } from 'effector';

export enum FilterTabVariant {
	sort = 'Sort',
	filters = 'Filters',
	keywords = 'Keywords',
	rating = 'Rating',
}

export enum FilterSubTabVariant {
	keywordsColor = 'Color',
	keywordsIcon = 'Icon',
	editRating = 'EditRating',
}

export const $selectedTabsFilters = createStore<FilterTabVariant[]>([]);
export const $openedFilterTab = createStore<FilterTabVariant | null>(null);
export const $openedFilterSubTab = createStore<FilterSubTabVariant | null>(
	null
);

export const addSelectedTabFilters = createEvent<FilterTabVariant>();
export const removeSelectedTabFilters = createEvent<FilterTabVariant>();

export const openFilterTab = createEvent<FilterTabVariant>();
export const closeFilterTab = createEvent();

export const openFilterSubTab = createEvent<FilterSubTabVariant>();
export const closeFilterSubTab = createEvent();

$selectedTabsFilters.on(addSelectedTabFilters, (state, payload) => {
	if (!state.includes(payload)) {
		return [...state, payload];
	}
	return state;
});

$selectedTabsFilters.on(removeSelectedTabFilters, (state, payload) => {
	return state.filter(tab => tab !== payload);
});

$openedFilterTab.on(openFilterTab, (_, payload) => payload);
$openedFilterTab.on(closeFilterTab, () => null);

$openedFilterSubTab.on(openFilterSubTab, (_, payload) => payload);
$openedFilterSubTab.on(closeFilterSubTab, () => null);
