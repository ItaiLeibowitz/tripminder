"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('tripmind/adapters/application', ['exports', 'ember-localforage-adapter/adapters/localforage'], function (exports, _emberLocalforageAdapterAdaptersLocalforage) {
  exports['default'] = _emberLocalforageAdapterAdaptersLocalforage['default'];
});
define('tripmind/app', ['exports', 'ember', 'ember-resolver', 'ember/load-initializers', 'tripmind/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _tripmindConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;
  _ember['default'].run.backburner.DEBUG = true; // Added for debugging - should be removed in production

  App = _ember['default'].Application.extend({
    modulePrefix: _tripmindConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _tripmindConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _tripmindConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('tripmind/appconfig/better_sanitize', ['exports', 'ember', 'npm:sanitize-html'], function (exports, _ember, _npmSanitizeHtml) {
	exports['default'] = function (dirty) {
		return (0, _npmSanitizeHtml['default'])(dirty, {
			allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img'],
			allowedAttributes: {
				a: ['href', 'name', 'target'],
				// We don't currently allow img itself by default, but this
				// would make sense if we did
				img: ['src']
			},
			// Lots of these won't come up by default because we don't allow them
			selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
			// URL schemes we permit
			allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
			allowedSchemesByTag: {},
			transformTags: {
				'a': _npmSanitizeHtml['default'].simpleTransform('a', { target: '_blank' })
			}
		});
	};
});
define('tripmind/appconfig/color_generation', ['exports', 'ember'], function (exports, _ember) {

	var hue = Math.random(),
	    goldenRatio = 0.618033988749895,
	    hexwidth = 2;

	var hsvToRgb = function hsvToRgb(h, s, v) {
		var h_i = Math.floor(h * 6),
		    f = h * 6 - h_i,
		    p = v * (1 - s),
		    q = v * (1 - f * s),
		    t = v * (1 - (1 - f) * s),
		    r = 255,
		    g = 255,
		    b = 255;
		switch (h_i) {
			case 0:
				r = v, g = t, b = p;break;
			case 1:
				r = q, g = v, b = p;break;
			case 2:
				r = p, g = v, b = t;break;
			case 3:
				r = p, g = q, b = v;break;
			case 4:
				r = t, g = p, b = v;break;
			case 5:
				r = v, g = p, b = q;break;
		}
		return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)];
	};

	var padHex = function padHex(str) {
		if (str.length > hexwidth) return str;
		return new Array(hexwidth - str.length + 1).join('0') + str;
	};

	var generateColor = function generateColor(hex, saturation, value) {
		hue += goldenRatio;
		hue %= 1;
		if (typeof saturation !== "number") saturation = 0.5;
		if (typeof value !== "number") value = 0.95;
		var rgb = hsvToRgb(hue, saturation, value);
		if (hex) return "#" + padHex(rgb[0].toString(16)) + padHex(rgb[1].toString(16)) + padHex(rgb[2].toString(16));else return rgb;
	};

	exports['default'] = generateColor;
});
define('tripmind/appconfig/constants', ['exports', 'ember', 'tripmind/config/environment'], function (exports, _ember, _tripmindConfigEnvironment) {

	var Constants = _ember['default'].Object.create({
		ITEM_TYPES_BY_NAME: { "COUNTRY": 3,
			"REGION": 4,
			"NEIGHBORHOOD": 90,
			"ATTRACTION": 100
		},
		PER_PAGE: 15,
		CDN_PATH_1: 'https://da37ts4zp7h49.cloudfront.net/photos/',
		CDN_PATH_2: 'https://d6fva57a21sq7.cloudfront.net/photos/',
		MAX_PAGE_TITLE_LENGTH: 55,
		MAX_ITEM_WITH_TYPE_IN_PARENT_LENGTH: 41,
		PAGE_TITLE_MAPPINGS: ["Don't miss these top %s | Wanderant", "Our favorite %s | Wanderant guides", "Our favorite %s | Wanderant", "Top 10 %s | Wanderant", "Top %s | Wanderant", "%s | Wanderant"],
		WANDERANT_IMAGES: 0,
		GOOGLE_IMAGES: 1,
		FLICKR_IMAGES: 2,
		PANORAMIO_IMAGES: 3,
		WIKIPEDIA_IMAGES: 5,
		ARBITRARY_IMAGES: 7,
		IMAGE_PROVIDERS: [{
			provider_id: 0,
			provider_name: "Wanderant",
			sizes: [{ name: "small", token: "small", max_width: 200 }, { name: "medium", token: "medium", max_width: 400 }, { name: "large", token: "large", max_width: 1200 }]
		}, {
			provider_id: 1,
			provider_name: "Google",
			sizes: [{ name: "small", token: "w100", max_width: 100 }, { name: "medium", token: "w500", max_width: 500 }, { name: "large", token: "w3000", max_width: 3000 }]
		}, {
			provider_id: 2,
			provider_name: "Flickr",
			sizes: [{ name: "small", token: "m", max_width: 240 }, { name: "medium", token: "z", max_width: 640 }, { name: "large", token: "b", max_width: 1024 }]
		}, {
			provider_id: 3,
			provider_name: "Panoramio",
			sizes: [{ name: "small", token: "small", max_width: 240 }, { name: "medium", token: "medium", max_width: 640 }, { name: "large", token: "original", max_width: 1024 }]
		}, {
			provider_id: 4,
			provider_name: "Google_street_view",
			sizes: [{ name: "small", token: "200x125", max_width: 240 }, { name: "medium", token: "320x200", max_width: 640 }, { name: "large", token: "640x400", max_width: 1024 }]
		}, {
			provider_id: 5,
			provider_name: "Wikipedia",
			sizes: [{ name: "small", token: "150", max_width: 150 }, { name: "medium", token: "500", max_width: 500 }, { name: "large", token: "1024", max_width: 1024 }]
		}, {
			provider_id: 6,
			provider_name: "Twobits",
			sizes: [{ name: "small", token: "200x125", max_width: 240 }, { name: "medium", token: "320x200", max_width: 640 }, { name: "large", token: "1000x1000", max_width: 1024 }]
		}, {
			provider_id: 7,
			provider_name: "Arbitrary",
			sizes: [{ name: "small", token: "a", max_width: 240 }, { name: "medium", token: "a", max_width: 640 }, { name: "large", token: "a", max_width: 1024 }]
		}],
		FLAT_DESIGN_COLORS: ['#D24D57', '#9A12B3', '#22A7F0', '#1F3A93', '#1BBC9B', '#87D37C', '#2ECC71', '#F89406', '#F9BF3B', '#F62459'],
		ITEM_TYPES_ARRAY: [],
		GOOGLE_PLACES_TYPE_CONVERSION: {
			administrative_area_level_1: 'region',
			administrative_area_level_2: 'region',
			administrative_area_level_3: 'region',
			administrative_area_level_4: 'region',
			administrative_area_level_5: 'region',
			locality: 'city',
			colloquial_area: 'region',
			sublocality_level_4: 'sublocality',
			sublocality_level_5: 'sublocality',
			sublocality_level_3: 'sublocality',
			sublocality_level_2: 'sublocality',
			sublocality_level_1: 'sublocality',
			establishment: 'attraction'
		},
		allowedLocationTypes: ["country", "locality", "administrative_area_level_1", "administrative_area_level_2", "administrative_area_level_3", "administrative_area_level_4", "administrative_area_level_5", "colloquial_area", "sublocality"],
		allowedLocationTypesLimited: ["country", "locality", "administrative_area_level_1"],
		GOOGLE_PLACE_DESTINATION_TYPES: ["country", "locality", "administrative_area_level_1", "administrative_area_level_2", "administrative_area_level_3", "administrative_area_level_4", "administrative_area_level_5", "colloquial_area", "sublocality"],
		GOOGLE_PLACE_RESTAURANT_TYPES: ["restaurant", "cafe", "bakery"],
		GOOGLE_PLACE_NIGHTLIFE_TYPES: ["bar", "casino", "movie_theater", "night_club"],
		GOOGLE_PLACE_HOTEL_TYPES: ["lodging"],
		DAY_NAMES: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		GOOGLE_TYPE_FILTER_CATEGORIES: [{ type: "art_gallery", filterOption: "Art", duration: 1800 }, { type: 'art work', filterOption: "Art", duration: 1800 }, { type: 'gallery', filterOption: "Art", duration: 5400 }, { type: 'Art Museum', filterOption: "Art", duration: 5400 }, { type: "administrative_area_level_1", filterOption: "Destination", duration: 1800 }, { type: "administrative_area_level_2", filterOption: "Destination", duration: 1800 }, { type: "administrative_area_level_3", filterOption: "Destination", duration: 1800 }, { type: "administrative_area_level_4", filterOption: "Destination", duration: 1800 }, { type: "administrative_area_level_5", filterOption: "Destination", duration: 1800 }, { type: "colloquial_area", filterOption: "Destination", duration: 1800 }, { type: "country", filterOption: "Destination", duration: 1800 }, { type: "geocode", filterOption: "Destination", duration: 1800 }, { type: "intersection", filterOption: "Destination", duration: 1800 }, { type: "locality", filterOption: "Destination", duration: 1800 }, { type: "neighborhood", filterOption: "Destination", duration: 1800 }, { type: "political", filterOption: "Destination", duration: 1800 }, { type: "post_box", filterOption: "Destination", duration: 1800 }, { type: "postal_code", filterOption: "Destination", duration: 1800 }, { type: "postal_code_prefix", filterOption: "Destination", duration: 1800 }, { type: "postal_code_suffix", filterOption: "Destination", duration: 1800 }, { type: "postal_town", filterOption: "Destination", duration: 1800 }, { type: "route", filterOption: "Destination", duration: 1800 }, { type: "street_address", filterOption: "Destination", duration: 1800 }, { type: "street_number", filterOption: "Destination", duration: 1800 }, { type: "sublocality", filterOption: "Destination", duration: 1800 }, { type: "sublocality_level_1", filterOption: "Destination", duration: 1800 }, { type: "sublocality_level_2", filterOption: "Destination", duration: 1800 }, { type: "sublocality_level_3", filterOption: "Destination", duration: 1800 }, { type: "sublocality_level_4", filterOption: "Destination", duration: 1800 }, { type: "sublocality_level_5", filterOption: "Destination", duration: 1800 }, { type: 'continent', filterOption: "Destination", duration: 1209600 }, { type: 'world region', filterOption: "Destination", duration: 1209600 }, { type: 'region', filterOption: "Destination", duration: 259200 }, { type: 'state', filterOption: "Destination", duration: 432000 }, { type: 'province', filterOption: "Destination", duration: 172800 }, { type: 'department', filterOption: "Destination", duration: 172800 }, { type: 'area', filterOption: "Destination", duration: 86400 }, { type: 'archipelago', filterOption: "Destination", duration: 86400 }, { type: 'islands', filterOption: "Destination", duration: 86400 }, { type: 'island', filterOption: "Destination", duration: 86400 }, { type: 'cape', filterOption: "Destination", duration: 14400 }, { type: 'county', filterOption: "Destination", duration: 14400 }, { type: 'district', filterOption: "Destination", duration: 14400 }, { type: 'peninsula', filterOption: "Destination", duration: 14400 }, { type: 'valley', filterOption: "Destination", duration: 14400 }, { type: 'city', filterOption: "Destination", duration: 172800 }, { type: 'capital city', filterOption: "Destination", duration: 172800 }, { type: 'municipality', filterOption: "Destination", duration: 172800 }, { type: 'town', filterOption: "Destination", duration: 14400 }, { type: 'township', filterOption: "Destination", duration: 14400 }, { type: 'village', filterOption: "Destination", duration: 14400 }, { type: 'resort', filterOption: "Destination", duration: 14400 }, { type: 'beach resort', filterOption: "Destination", duration: 14400 }, { type: 'ski resort', filterOption: "Destination", duration: 14400 }, { type: 'commune', filterOption: "Destination", duration: 7200 }, { type: 'suburb', filterOption: "Destination", duration: 7200 }, { type: 'hamlet', filterOption: "Destination", duration: 1800 }, { type: 'borough', filterOption: "Destination", duration: 1800 }, { type: 'red light district', filterOption: "Destination", duration: 7200 }, { type: 'street', filterOption: "Destination", duration: 3600 }, { type: 'passage', filterOption: "Destination", duration: 1800 }, { type: "casino", filterOption: "Entertainment", duration: 7200 }, { type: "movie_theater", filterOption: "Entertainment", duration: 9000 }, { type: "stadium", filterOption: "Entertainment", duration: 9000 }, { type: 'entertainment', filterOption: "Entertainment", duration: 3600 }, { type: 'bowling alley', filterOption: "Entertainment", duration: 5400 }, { type: 'casino', filterOption: "Entertainment", duration: 5400 }, { type: 'movie theater', filterOption: "Entertainment", duration: 9000 }, { type: 'performance venue', filterOption: "Entertainment", duration: 7200 }, { type: 'sport venue', filterOption: "Entertainment", duration: 7200 }, { type: 'stadium', filterOption: "Entertainment", duration: 1800 }, { type: 'Race Car Track', filterOption: "Entertainment", duration: 5400 }, { type: 'Theater', filterOption: "Entertainment", duration: 9000 }, { type: 'Water sports', filterOption: "Entertainment", duration: 7200 }, { type: 'Opera house', filterOption: "Entertainment", duration: 7200 }, { type: 'festival', filterOption: "Entertainment", duration: 10800 }, { type: 'race track', filterOption: "Entertainment", duration: 7200 }, { type: 'amphitheater', filterOption: "Entertainment", duration: 5400 }, { type: 'arena', filterOption: "Entertainment", duration: 3600 }, { type: 'arcade', filterOption: "Entertainment", duration: 3600 }, { type: 'ice skating', filterOption: "Entertainment", duration: 5400 }, { type: "amusement_park", filterOption: "Family", duration: 14400 }, { type: 'amusement park', filterOption: "Family", duration: 7200 }, { type: 'Water Park', filterOption: "Family", duration: 7200 }, { type: 'theme park', filterOption: "Family", duration: 10800 }, { type: 'roller coaster', filterOption: "Family", duration: 1800 }, { type: 'archaeological site', filterOption: "History", duration: 1800 }, { type: 'world heritage site', filterOption: "History", duration: 1800 }, { type: 'historic site', filterOption: "History", duration: 3600 }, { type: 'reservation', filterOption: "Nature", duration: 3600 }, { type: 'concentration camp', filterOption: "History", duration: 5400 }, { type: 'historic building', filterOption: "History", duration: 5400 }, { type: "lodging", filterOption: "Hotels", duration: 0 }, { type: 'accommodation', filterOption: "Hotels", duration: 0 }, { type: 'hotel', filterOption: "Hotels", duration: 0 }, { type: 'motel', filterOption: "Hotels", duration: 0 }, { type: "city_hall", filterOption: "Landmark", duration: 1800 }, { type: "library", filterOption: "Landmark", duration: 1800 }, { type: "local_government_office", filterOption: "Landmark", duration: 1800 }, { type: 'landmark', filterOption: "Landmark", duration: 1800 }, { type: 'monument', filterOption: "Landmark", duration: 1800 }, { type: 'gate', filterOption: "Landmark", duration: 1800 }, { type: 'bridge', filterOption: "Landmark", duration: 1800 }, { type: 'dam', filterOption: "Landmark", duration: 1800 }, { type: 'statue', filterOption: "Landmark", duration: 1800 }, { type: 'memorial', filterOption: "Landmark", duration: 1800 }, { type: 'fountain', filterOption: "Landmark", duration: 1800 }, { type: 'sculpture', filterOption: "Landmark", duration: 1800 }, { type: 'aqueduct', filterOption: "Landmark", duration: 1800 }, { type: 'lighthouse', filterOption: "Landmark", duration: 1800 }, { type: 'mausoleum', filterOption: "Landmark", duration: 1800 }, { type: 'pier', filterOption: "Landmark", duration: 3600 }, { type: 'port', filterOption: "Landmark", duration: 3600 }, { type: 'canal', filterOption: "Landmark", duration: 3600 }, { type: 'square', filterOption: "Landmark", duration: 1800 }, { type: 'viewpoint', filterOption: "Landmark", duration: 1800 }, { type: "beauty_salon", filterOption: "Lifestyle", duration: 1800 }, { type: "gym", filterOption: "Lifestyle", duration: 5400 }, { type: "spa", filterOption: "Lifestyle", duration: 1800 }, { type: 'bath house', filterOption: "Lifestyle", duration: 3600 }, { type: 'pool', filterOption: "Lifestyle", duration: 3600 }, { type: "museum", filterOption: "Museum", duration: 3600 }, { type: 'History Museum', filterOption: "Museum", duration: 5400 }, { type: 'Military Museum', filterOption: "Museum", duration: 5400 }, { type: 'Natural History Museum', filterOption: "Museum", duration: 5400 }, { type: 'Science Museum', filterOption: "Museum", duration: 5400 }, { type: 'Specialty Museum', filterOption: "Museum", duration: 5400 }, { type: "aquarium", filterOption: "Nature", duration: 3600 }, { type: "natural_feature", filterOption: "Nature", duration: 3600 }, { type: 'reservoir', filterOption: "Nature", duration: 1800 }, { type: 'natural feature', filterOption: "Nature", duration: 3600 }, { type: 'garden', filterOption: "Nature", duration: 3600 }, { type: 'body of water', filterOption: "Nature", duration: 1800 }, { type: 'canyon', filterOption: "Nature", duration: 1800 }, { type: 'cave', filterOption: "Nature", duration: 1800 }, { type: 'desert', filterOption: "Nature", duration: 3600 }, { type: 'forest', filterOption: "Nature", duration: 3600 }, { type: 'hill', filterOption: "Nature", duration: 5400 }, { type: 'lake', filterOption: "Nature", duration: 5400 }, { type: 'mountain', filterOption: "Nature", duration: 14400 }, { type: 'river', filterOption: "Nature", duration: 1800 }, { type: 'volcano', filterOption: "Nature", duration: 14400 }, { type: 'waterfall', filterOption: "Nature", duration: 3600 }, { type: 'waterfront', filterOption: "Nature", duration: 3600 }, { type: 'park', filterOption: "Nature", duration: 3600 }, { type: 'bird watching', filterOption: "Nature", duration: 5400 }, { type: 'outdoors', filterOption: "Nature", duration: 3600 }, { type: 'zoo', filterOption: "Nature", duration: 5400 }, { type: 'aquarium', filterOption: "Nature", duration: 5400 }, { type: 'Geologic Formation', filterOption: "Nature", duration: 1800 }, { type: 'Hot Spring', filterOption: "Nature", duration: 3600 }, { type: 'National Park', filterOption: "Nature", duration: 7200 }, { type: 'Scenic Drive', filterOption: "Nature", duration: 5400 }, { type: 'Trail', filterOption: "Nature", duration: 5400 }, { type: 'Safari', filterOption: "Nature", duration: 10800 }, { type: 'Marine park', filterOption: "Nature", duration: 7200 }, { type: 'Botanical garden', filterOption: "Nature", duration: 7200 }, { type: 'Tree', filterOption: "Nature", duration: 1800 }, { type: 'summit', filterOption: "Nature", duration: 1800 }, { type: 'peak', filterOption: "Nature", duration: 1800 }, { type: 'mountain range', filterOption: "Nature", duration: 14400 }, { type: 'glacier', filterOption: "Nature", duration: 7200 }, { type: 'pinnacle', filterOption: "Nature", duration: 1800 }, { type: 'pass', filterOption: "Nature", duration: 5400 }, { type: 'pond', filterOption: "Nature", duration: 1800 }, { type: 'bay', filterOption: "Nature", duration: 3600 }, { type: 'fjord', filterOption: "Nature", duration: 7200 }, { type: 'jungle', filterOption: "Nature", duration: 10800 }, { type: 'lagoon', filterOption: "Nature", duration: 5400 }, { type: 'crater', filterOption: "Nature", duration: 5400 }, { type: 'nature reserve', filterOption: "Nature", duration: 7200 }, { type: 'swamp', filterOption: "Nature", duration: 5400 }, { type: 'wildlife reserve', filterOption: "Nature", duration: 7200 }, { type: 'stream', filterOption: "Nature", duration: 3600 }, { type: 'reef', filterOption: "Nature", duration: 10800 }, { type: 'ice field', filterOption: "Nature", duration: 7200 }, { type: 'estuary', filterOption: "Nature", duration: 1800 }, { type: 'strait', filterOption: "Nature", duration: 3600 }, { type: 'cliff', filterOption: "Nature", duration: 3600 }, { type: 'hiking', filterOption: "Nature", duration: 10800 }, { type: 'diving', filterOption: "Nature", duration: 21600 }, { type: 'fishing', filterOption: "Nature", duration: 5400 }, { type: 'animal rides', filterOption: "Nature", duration: 5400 }, { type: 'beach', filterOption: "Nature", duration: 5400 }, { type: 'farm', filterOption: "Nature", duration: 1800 }, { type: "bar", filterOption: "Nightlife", duration: 3600 }, { type: "night_club", filterOption: "Nightlife", duration: 1800 }, { type: 'nightlife', filterOption: "Nightlife", duration: 7200 }, { type: 'night club', filterOption: "Nightlife", duration: 7200 }, { type: 'dance club', filterOption: "Nightlife", duration: 7200 }, { type: 'gay bar', filterOption: "Nightlife", duration: 5400 }, { type: "accounting", filterOption: "Other", duration: 1800 }, { type: "airport", filterOption: "Other", duration: 3600 }, { type: "atm", filterOption: "Other", duration: 1800 }, { type: "bank", filterOption: "Other", duration: 1800 }, { type: "bicycle_store", filterOption: "Other", duration: 1800 }, { type: "bowling_alley", filterOption: "Other", duration: 1800 }, { type: "bus_station", filterOption: "Other", duration: 1800 }, { type: "campground", filterOption: "Other", duration: 1800 }, { type: "car_dealer", filterOption: "Other", duration: 1800 }, { type: "car_rental", filterOption: "Other", duration: 1800 }, { type: "car_repair", filterOption: "Other", duration: 1800 }, { type: "car_wash", filterOption: "Other", duration: 1800 }, { type: "cemetery", filterOption: "Other", duration: 1800 }, { type: "courthouse", filterOption: "Other", duration: 1800 }, { type: "dentist", filterOption: "Other", duration: 1800 }, { type: "doctor", filterOption: "Other", duration: 1800 }, { type: "electrician", filterOption: "Other", duration: 1800 }, { type: "embassy", filterOption: "Other", duration: 1800 }, { type: "establishment", filterOption: "Other", duration: 1800 }, { type: "finance", filterOption: "Other", duration: 1800 }, { type: "fire_station", filterOption: "Other", duration: 1800 }, { type: "floor", filterOption: "Other", duration: 1800 }, { type: "food", filterOption: "Other", duration: 3600 }, { type: "funeral_home", filterOption: "Other", duration: 1800 }, { type: "gas_station", filterOption: "Other", duration: 1800 }, { type: "general_contractor", filterOption: "Other", duration: 1800 }, { type: "grocery_or_supermarket", filterOption: "Other", duration: 1800 }, { type: "hair_care", filterOption: "Other", duration: 1800 }, { type: "health", filterOption: "Other", duration: 1800 }, { type: "hospital", filterOption: "Other", duration: 1800 }, { type: "insurance_agency", filterOption: "Other", duration: 1800 }, { type: "laundry", filterOption: "Other", duration: 1800 }, { type: "lawyer", filterOption: "Other", duration: 1800 }, { type: "locksmith", filterOption: "Other", duration: 1800 }, { type: "meal_delivery", filterOption: "Other", duration: 1800 }, { type: "meal_takeaway", filterOption: "Other", duration: 1800 }, { type: "movie_rental", filterOption: "Other", duration: 1800 }, { type: "moving_company", filterOption: "Other", duration: 1800 }, { type: "painter", filterOption: "Other", duration: 1800 }, { type: "parking", filterOption: "Other", duration: 1800 }, { type: "pharmacy", filterOption: "Other", duration: 1800 }, { type: "physiotherapist", filterOption: "Other", duration: 1800 }, { type: "plumber", filterOption: "Other", duration: 1800 }, { type: "point_of_interest", filterOption: "Other", duration: 1800 }, { type: "point of interest", filterOption: "Other", duration: 1800 }, { type: "police", filterOption: "Other", duration: 1800 }, { type: "post_office", filterOption: "Other", duration: 1800 }, { type: "premise", filterOption: "Other", duration: 1800 }, { type: "real_estate_agency", filterOption: "Other", duration: 1800 }, { type: "roofing_contractor", filterOption: "Other", duration: 1800 }, { type: "room", filterOption: "Other", duration: 1800 }, { type: "rv_park", filterOption: "Other", duration: 1800 }, { type: "school", filterOption: "Other", duration: 1800 }, { type: "storage", filterOption: "Other", duration: 1800 }, { type: "subpremise", filterOption: "Other", duration: 1800 }, { type: "subway_station", filterOption: "Other", duration: 1800 }, { type: "taxi_stand", filterOption: "Other", duration: 1800 }, { type: "train_station", filterOption: "Other", duration: 1800 }, { type: "transit_station", filterOption: "Other", duration: 1800 }, { type: "travel_agency", filterOption: "Other", duration: 1800 }, { type: "university", filterOption: "Other", duration: 1800 }, { type: "veterinary_care", filterOption: "Other", duration: 1800 }, { type: "attraction", filterOption: "Other", duration: 1800 }, { type: 'mine', filterOption: "Other", duration: 3600 }, { type: 'cultural', filterOption: "Other", duration: 3600 }, { type: 'cultural site', filterOption: "Other", duration: 1800 }, { type: 'educational institution', filterOption: "Other", duration: 1800 }, { type: 'observatory', filterOption: "Other", duration: 3600 }, { type: 'science', filterOption: "Other", duration: 3600 }, { type: 'activity', filterOption: "Other", duration: 5400 }, { type: 'tour', filterOption: "Other", duration: 7200 }, { type: 'classes', filterOption: "Other", duration: 5400 }, { type: 'adventure', filterOption: "Other", duration: 10800 }, { type: 'boat tour', filterOption: "Other", duration: 10800 }, { type: 'golf', filterOption: "Other", duration: 10800 }, { type: 'private tour', filterOption: "Other", duration: 10800 }, { type: 'sightseeing tour', filterOption: "Other", duration: 5400 }, { type: 'swimming', filterOption: "Other", duration: 5400 }, { type: 'walking tour', filterOption: "Other", duration: 5400 }, { type: 'Marina', filterOption: "Other", duration: 7200 }, { type: 'Scenic/ Historic Walking Area', filterOption: "Other", duration: 5400 }, { type: 'Surf Camp', filterOption: "Other", duration: 7200 }, { type: 'climbing', filterOption: "Other", duration: 5400 }, { type: 'water sports', filterOption: "Other", duration: 5400 }, { type: 'cycling', filterOption: "Other", duration: 5400 }, { type: 'extreme sports', filterOption: "Other", duration: 5400 }, { type: 'scenic flight', filterOption: "Other", duration: 5400 }, { type: 'driving', filterOption: "Other", duration: 5400 }, { type: 'sports activity', filterOption: "Other", duration: 5400 }, { type: 'building', filterOption: "Other", duration: 1800 }, { type: 'cultural building', filterOption: "Other", duration: 1800 }, { type: 'government building', filterOption: "Other", duration: 1800 }, { type: 'mansion', filterOption: "Other", duration: 3600 }, { type: 'tower', filterOption: "Other", duration: 1800 }, { type: 'windmill', filterOption: "Other", duration: 1800 }, { type: 'architecture', filterOption: "Other", duration: 1800 }, { type: 'castle', filterOption: "Other", duration: 3600 }, { type: 'fortress', filterOption: "Other", duration: 3600 }, { type: 'library', filterOption: "Other", duration: 1800 }, { type: 'palace', filterOption: "Other", duration: 3600 }, { type: 'villa', filterOption: "Other", duration: 3600 }, { type: 'fortification', filterOption: "Other", duration: 1800 }, { type: 'fort', filterOption: "Other", duration: 3600 }, { type: 'edifice', filterOption: "Other", duration: 3600 }, { type: 'official residence', filterOption: "Other", duration: 5400 }, { type: 'royal residence', filterOption: "Other", duration: 5400 }, { type: 'prison', filterOption: "Other", duration: 5400 }, { type: 'apartment', filterOption: "Other", duration: 3600 }, { type: 'health', filterOption: "Other", duration: 1800 }, { type: 'dentist', filterOption: "Other", duration: 3600 }, { type: 'doctor', filterOption: "Other", duration: 1800 }, { type: 'hospital', filterOption: "Other", duration: 3600 }, { type: 'pharmacy', filterOption: "Other", duration: 1800 }, { type: 'physiotherapist', filterOption: "Other", duration: 1800 }, { type: 'business', filterOption: "Other", duration: 1800 }, { type: 'accounting', filterOption: "Other", duration: 1800 }, { type: 'industrial site', filterOption: "Other", duration: 1800 }, { type: 'Convention Center', filterOption: "Other", duration: 1800 }, { type: 'Factory Tour', filterOption: "Other", duration: 3600 }, { type: 'airport', filterOption: "Other", duration: 1800 }, { type: 'bus station', filterOption: "Other", duration: 1800 }, { type: 'car rental', filterOption: "Other", duration: 1800 }, { type: 'parking', filterOption: "Other", duration: 1800 }, { type: 'subway station', filterOption: "Other", duration: 1800 }, { type: 'taxi stand', filterOption: "Other", duration: 1800 }, { type: 'train station', filterOption: "Other", duration: 1800 }, { type: 'transit station', filterOption: "Other", duration: 1800 }, { type: 'ship', filterOption: "Other", duration: 5400 }, { type: 'railway', filterOption: "Other", duration: 5400 }, { type: 'submarine', filterOption: "Other", duration: 5400 }, { type: 'ferry', filterOption: "Other", duration: 3600 }, { type: 'floor', filterOption: "Other", duration: 1800 }, { type: 'geocode', filterOption: "Other", duration: 1800 }, { type: 'intersection', filterOption: "Other", duration: 1800 }, { type: 'atm', filterOption: "Other", duration: 1800 }, { type: 'bank', filterOption: "Other", duration: 1800 }, { type: 'beauty salon', filterOption: "Other", duration: 1800 }, { type: 'campground', filterOption: "Other", duration: 1800 }, { type: 'car dealer', filterOption: "Other", duration: 1800 }, { type: 'car repair', filterOption: "Other", duration: 1800 }, { type: 'car wash', filterOption: "Other", duration: 1800 }, { type: 'courthouse', filterOption: "Other", duration: 1800 }, { type: 'electrician', filterOption: "Other", duration: 1800 }, { type: 'embassy', filterOption: "Other", duration: 1800 }, { type: 'finance', filterOption: "Other", duration: 1800 }, { type: 'financial institution', filterOption: "Other", duration: 1800 }, { type: 'fire station', filterOption: "Other", duration: 1800 }, { type: 'funeral home', filterOption: "Other", duration: 1800 }, { type: 'gas station', filterOption: "Other", duration: 1800 }, { type: 'gear rentals', filterOption: "Other", duration: 1800 }, { type: 'general contractor', filterOption: "Other", duration: 1800 }, { type: 'hair care', filterOption: "Other", duration: 1800 }, { type: 'insurance agency', filterOption: "Other", duration: 1800 }, { type: 'laundry', filterOption: "Other", duration: 1800 }, { type: 'lawyer', filterOption: "Other", duration: 1800 }, { type: 'locksmith', filterOption: "Other", duration: 1800 }, { type: 'movie rental', filterOption: "Other", duration: 1800 }, { type: 'moving company', filterOption: "Other", duration: 1800 }, { type: 'painter', filterOption: "Other", duration: 1800 }, { type: 'plumber', filterOption: "Other", duration: 1800 }, { type: 'police', filterOption: "Other", duration: 1800 }, { type: 'post office', filterOption: "Other", duration: 1800 }, { type: 'real estate agency', filterOption: "Other", duration: 1800 }, { type: 'roofing contractor', filterOption: "Other", duration: 1800 }, { type: 'rv park', filterOption: "Other", duration: 1800 }, { type: 'school', filterOption: "Other", duration: 1800 }, { type: 'storage', filterOption: "Other", duration: 1800 }, { type: 'travel agency', filterOption: "Other", duration: 1800 }, { type: 'university', filterOption: "Other", duration: 1800 }, { type: 'veterinary care', filterOption: "Other", duration: 1800 }, { type: 'Military Base', filterOption: "Other", duration: 3600 }, { type: 'Visitor Center', filterOption: "Other", duration: 1800 }, { type: 'college', filterOption: "Other", duration: 1800 }, { type: 'community center', filterOption: "Other", duration: 1800 }, { type: 'radio station', filterOption: "Other", duration: 1800 }, { type: 'power station', filterOption: "Other", duration: 1800 }, { type: 'Military site', filterOption: "Other", duration: 1800 }, { type: 'travel services', filterOption: "Other", duration: 1800 }, { type: 'event', filterOption: "Other", duration: 3600 }, { type: "church", filterOption: "Religious", duration: 1800 }, { type: "hindu_temple", filterOption: "Religious", duration: 1800 }, { type: "mosque", filterOption: "Religious", duration: 1800 }, { type: "place_of_worship", filterOption: "Religious", duration: 1800 }, { type: "synagogue", filterOption: "Religious", duration: 1800 }, { type: 'religious site', filterOption: "Religious", duration: 1800 }, { type: 'hindu temple', filterOption: "Religious", duration: 1800 }, { type: 'mosque', filterOption: "Religious", duration: 1800 }, { type: 'place of worship', filterOption: "Religious", duration: 1800 }, { type: 'cemetery', filterOption: "Religious", duration: 1800 }, { type: 'temple', filterOption: "Religious", duration: 1800 }, { type: 'shrine', filterOption: "Religious", duration: 1800 }, { type: 'pagoda', filterOption: "Religious", duration: 1800 }, { type: 'basilica', filterOption: "Religious", duration: 1800 }, { type: 'chapel', filterOption: "Religious", duration: 1800 }, { type: 'abbey', filterOption: "Religious", duration: 1800 }, { type: 'monastery', filterOption: "Religious", duration: 3600 }, { type: 'baptistery', filterOption: "Religious", duration: 1800 }, { type: 'cloisters', filterOption: "Religious", duration: 1800 }, { type: "bakery", filterOption: "Restaurants", duration: 1800 }, { type: "cafe", filterOption: "Restaurants", duration: 1800 }, { type: "restaurant", filterOption: "Restaurants", duration: 5400 }, { type: 'food', filterOption: "Restaurants", duration: 3600 }, { type: 'meal delivery', filterOption: "Restaurants", duration: 1800 }, { type: 'meal takeaway', filterOption: "Restaurants", duration: 1800 }, { type: 'Coffee house', filterOption: "Restaurants", duration: 1800 }, { type: 'brewery', filterOption: "Restaurants", duration: 3600 }, { type: 'distillery', filterOption: "Restaurants", duration: 3600 }, { type: 'winery', filterOption: "Restaurants", duration: 1800 }, { type: "book_store", filterOption: "Shopping", duration: 1800 }, { type: "clothing_store", filterOption: "Shopping", duration: 1800 }, { type: "convenience_store", filterOption: "Shopping", duration: 1800 }, { type: "department_store", filterOption: "Shopping", duration: 1800 }, { type: "electronics_store", filterOption: "Shopping", duration: 1800 }, { type: "florist", filterOption: "Shopping", duration: 1800 }, { type: "furniture_store", filterOption: "Shopping", duration: 1800 }, { type: "hardware_store", filterOption: "Shopping", duration: 1800 }, { type: "home_goods_store", filterOption: "Shopping", duration: 1800 }, { type: "jewelry_store", filterOption: "Shopping", duration: 1800 }, { type: "liquor_store", filterOption: "Shopping", duration: 1800 }, { type: "pet_store", filterOption: "Shopping", duration: 1800 }, { type: "shoe_store", filterOption: "Shopping", duration: 1800 }, { type: "shopping_mall", filterOption: "Shopping", duration: 5400 }, { type: "store", filterOption: "Shopping", duration: 1800 }, { type: 'shopping mall', filterOption: "Shopping", duration: 5400 }, { type: 'bicycle store', filterOption: "Shopping", duration: 1800 }, { type: 'book store', filterOption: "Shopping", duration: 1800 }, { type: 'clothing store', filterOption: "Shopping", duration: 1800 }, { type: 'convenience store', filterOption: "Shopping", duration: 1800 }, { type: 'department store', filterOption: "Shopping", duration: 3600 }, { type: 'electronics store', filterOption: "Shopping", duration: 1800 }, { type: 'furniture store', filterOption: "Shopping", duration: 1800 }, { type: 'hardware store', filterOption: "Shopping", duration: 1800 }, { type: 'home goods store', filterOption: "Shopping", duration: 1800 }, { type: 'jewelry store', filterOption: "Shopping", duration: 1800 }, { type: 'liquor store', filterOption: "Shopping", duration: 1800 }, { type: 'pet store', filterOption: "Shopping", duration: 1800 }, { type: 'shoe store', filterOption: "Shopping", duration: 1800 }, { type: 'Gear Rental', filterOption: "Shopping", duration: 1800 }, { type: 'Shop', filterOption: "Shopping", duration: 1800 }, { type: 'Specialty Shop', filterOption: "Shopping", duration: 1800 }]

		/*baseTimeUnit: <%= BASE_TIME_UNIT %>,
  baseTimeUnitsPerDay: <%= BASE_TIME_UNITS_PER_DAY %>,
  
  baseHeight: <%= BASE_HEIGHT_PX %>,
  baseWidth: <%= DAY_CALENDAR_WIDTH + 2 * DAY_CALENDAR_MARGIN %>,
  EARTH_RADIUS_KM: <%= EARTH_RADIUS_KM %>,
  DEG_TO_RAD: <%= DEG_TO_RAD %>,
  AVG_SPEED_KPH: <%= AVG_SPEED_KPH %>,
  PER_PAGE: <%= PER_PAGE %>,
  DEFAULT_PAGE_TITLE: "<%= DEFAULT_PAGE_TITLE %>",
  MAX_PAGE_TITLE_LENGTH: <%= MAX_PAGE_TITLE_LENGTH %>,
  MAX_ITEM_WITH_TYPE_IN_PARENT_LENGTH: <%= MAX_ITEM_WITH_TYPE_IN_PARENT_LENGTH %>,
  ITEM_PAGE_TITLE_MAPPINGS: <%= ITEM_PAGE_TITLE_MAPPINGS.to_json %>,
  ITEM_META_DESCRIPTIONS: <%= ITEM_META_DESCRIPTIONS.to_json.gsub('%s', '%@') %>,
  TRIP_META_DESCRIPTION: <%= TRIP_META_DESCRIPTION.to_json.gsub('%s', '%@') %>,
  TimeUnitEnum: {
  	SECOND: <%= SECOND %>,
  	MINUTE: <%= MINUTE %>,
  	TEN_MINUTES: <%= TEN_MINUTES %>,
  	FIFTEEN_MINUTES: <%= FIFTEEN_MINUTES %>,
  	TWENTY_MINUTES: <%= TWENTY_MINUTES %>,
  	THIRTY_MINUTES: <%= THIRTY_MINUTES %>,
  	HOUR: <%= HOUR %>,
  	DAY: <%= DAY %>
  },
  DAY_NAMES: <%= DAY_NAMES %>,
  UserRoleEnum: {
  	OWNER: <%= TRIP_OWNER %>,
  	EDITOR: <%= TRIP_EDIT %>,
  	COMMENTER: <%= TRIP_COMMENT %>,
  	VIEWER: <%= TRIP_VIEW %>
  },
  ATTRACTION_BLOCK: <%= ATTRACTION_BLOCK %>,
  PARENT_BLOCK: <%= PARENT_BLOCK %>,
  TRAVEL_TYPES: <%= TRAVEL_TYPES.to_json %>,
  TRAVEL_TYPE_NAMES: <%= TRAVEL_TYPE_NAMES %>,
  MIN_LATLNG_BOUND: <%= MIN_LATLNG_BOUND %>,
  INTERESTING_SECTIONS: <%= INTERESTING_SECTIONS %>,
  UNINTERESTING_SECTIONS: <%= UNINTERESTING_SECTIONS %>,
  GOOGLE_PLACES_TYPE_CONVERSION: <%= GOOGLE_PLACES_TYPE_CONVERSION.to_json %>,
  GOOGLE_DESTINATIONS_ITEM_TYPES: [
  	{googleType: "establishment", WaType: <%= ITEM_TYPES["ATTRACTION"] %>},
  	{googleType: "locality", WaType: <%= ITEM_TYPES["CITY"] %>},
  	{googleType: "sublocality", WaType: <%= ITEM_TYPES["CITY"] %>},
  	{googleType: "country", WaType: <%= ITEM_TYPES["COUNTRY"] %>},
  	{googleType: "administrative_area_level_1", WaType: <%= ITEM_TYPES["REGION"] %>},
  	{googleType: "administrative_area_level_2", WaType: <%= ITEM_TYPES["REGION"] %>},
  	{googleType: "administrative_area_level_3", WaType: <%= ITEM_TYPES["REGION"] %>}
  ],
  GoogleAttractionTypeArray: ["amusement_park", "aquarium", "amusement_park", "casino", "cemetery", "church", "city_hall", "hindu_temple", "library", "mosque", "movie_theater", "museum", "park", "place_of_worship", "shopping_mall", "spa", "stadium", "synagogue", "zoo"],
  flickrLicenses: {
  	0: "All Rights Reserved",
  	1: "Attribution-NonCommercial-ShareAlike",
  	2: "Attribution-NonCommercial",
  	3: "Attribution-NonCommercial-NoDerivs",
  	4: "Attribution",
  	5: "Attribution-ShareAlike",
  	6: "Attribution-NoDerivs",
  	7: "No known copyright restrictions",
  	8: "United States Government Work"
  },
  FLICKR_CC_LICENSES_IDS: "<%= FLICKR_CC_LICENCES_IDS %>",
  FLICKR_CC_NC_LICENSES_IDS: "<%= FLICKR_CC_NC_LICENCES_IDS %>",
  CDN_PATH_1: "<%= CDN_PATH_1 %>",
  CDN_PATH_2: "<%= CDN_PATH_2 %>",
  CDN_PATH_VIDEOS: "<%= CDN_PATH_1.gsub('photos/','videos/back/') %>",
  BACKGROUND_VIDEO_COUNT: 30,
  IMAGE_PROVIDERS: <%= IMAGE_PROVIDERS.to_json %>,
  WANDERANT_IMAGES: <%= WANDERANT_IMAGES %>,
  GOOGLE_IMAGES: <%= GOOGLE_IMAGES %>,
  FLICKR_IMAGES: <%= FLICKR_IMAGES %>,
  PANORAMIO_IMAGES: <%= PANORAMIO_IMAGES %>,
  WIKIPEDIA_IMAGES: <%= WIKIPEDIA_IMAGES %>,
  ARBITRARY_IMAGES: <%= ARBITRARY_IMAGES %>,
  WanderantBaseUrl: "https://www.wanderant.com",
  
  DUPLICATES_STEP: <%= DUPLICATES_STEP %>,
  ITEM_TYPES_BY_NAME: {},
  ITEM_TYPES_ARRAY: <%= ITEM_TYPES_ARRAY.to_json %>,
  PROMINENCE_BASE: <%= PROMINENCE_BASE %>,
  ANCESTRY_TREE_MAX_DEPTH: <%= ANCESTRY_TREE_MAX_DEPTH %>,
  SURVEY_OPTIONS: ["purpose", "addl_info", "improve"],
  SECTION_ORDER: ["Famous for", "Main destinations", "If you're into...", "Top attractions", "Suggested itineraries", "Good for a day trip"],
  REVIEW_SOURCE_NAMES: <%= REVIEW_SOURCE_NAMES %>*/
	});

	if (_tripmindConfigEnvironment['default'].environment === 'development') {
		Constants.BASE_SERVER_URL = "";
	}

	if (_tripmindConfigEnvironment['default'].environment === 'production' || _tripmindConfigEnvironment['default'].environment === 'staging') {
		Constants.BASE_SERVER_URL = "https://www.wanderant.com";
	}

	Constants.ITEM_TYPES_ARRAY[1] = { name: 'continent', duration: 1209600 };
	Constants.ITEM_TYPES_ARRAY[2] = { name: 'world region', duration: 1209600 };
	Constants.ITEM_TYPES_ARRAY[3] = { name: 'country', duration: 604800 };
	Constants.ITEM_TYPES_ARRAY[4] = { name: 'region', duration: 259200 };
	Constants.ITEM_TYPES_ARRAY[5] = { name: 'state', duration: 432000 };
	Constants.ITEM_TYPES_ARRAY[6] = { name: 'province', duration: 172800 };
	Constants.ITEM_TYPES_ARRAY[7] = { name: 'department', duration: 172800 };
	Constants.ITEM_TYPES_ARRAY[8] = { name: 'area', duration: 86400 };
	Constants.ITEM_TYPES_ARRAY[9] = { name: 'archipelago', duration: 86400 };
	Constants.ITEM_TYPES_ARRAY[10] = { name: 'islands', duration: 86400 };
	Constants.ITEM_TYPES_ARRAY[11] = { name: 'island', duration: 86400 };
	Constants.ITEM_TYPES_ARRAY[12] = { name: 'cape', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[13] = { name: 'county', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[14] = { name: 'district', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[15] = { name: 'peninsula', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[16] = { name: 'valley', duration: 14400 };

	Constants.ITEM_TYPES_ARRAY[30] = { name: 'city', duration: 172800 };
	Constants.ITEM_TYPES_ARRAY[31] = { name: 'capital city', duration: 172800 };
	Constants.ITEM_TYPES_ARRAY[32] = { name: 'municipality', duration: 172800 };

	Constants.ITEM_TYPES_ARRAY[40] = { name: 'town', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[41] = { name: 'township', duration: 14400 };

	Constants.ITEM_TYPES_ARRAY[50] = { name: 'village', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[51] = { name: 'resort', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[52] = { name: 'beach resort', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[53] = { name: 'ski resort', duration: 14400 };

	Constants.ITEM_TYPES_ARRAY[60] = { name: 'commune', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[70] = { name: 'sublocality', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[71] = { name: 'suburb', duration: 7200 };

	Constants.ITEM_TYPES_ARRAY[80] = { name: 'hamlet', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[81] = { name: 'borough', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[90] = { name: 'neighborhood', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[91] = { name: 'red light district', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[92] = { name: 'street', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[93] = { name: 'passage', duration: 1800 };

	Constants.ITEM_TYPES_ARRAY[100] = { name: 'attraction', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[101] = { name: 'museum', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[102] = { name: 'art gallery', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[103] = { name: 'gallery', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[104] = { name: 'History Museum', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[105] = { name: 'Military Museum', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[106] = { name: 'Art Museum', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[107] = { name: 'Natural History Museum', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[108] = { name: 'Science Museum', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[109] = { name: 'Specialty Museum', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[201] = { name: 'landmark', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[202] = { name: 'monument', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[203] = { name: 'gate', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[204] = { name: 'bridge', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[205] = { name: 'dam', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[206] = { name: 'statue', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[207] = { name: 'memorial', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[208] = { name: 'fountain', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[209] = { name: 'sculpture', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[210] = { name: 'aqueduct', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[211] = { name: 'lighthouse', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[212] = { name: 'mausoleum', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[213] = { name: 'art work', duration: 1800 };

	Constants.ITEM_TYPES_ARRAY[301] = { name: 'square', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[302] = { name: 'archaeological site', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[303] = { name: 'world heritage site', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[304] = { name: 'historic site', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[305] = { name: 'reservation', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[306] = { name: 'pier', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[307] = { name: 'port', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[308] = { name: 'canal', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[309] = { name: 'concentration camp', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[310] = { name: 'mine', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[311] = { name: 'reservoir', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[312] = { name: 'historic building', duration: 5400 };

	Constants.ITEM_TYPES_ARRAY[401] = { name: 'natural feature', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[402] = { name: 'garden', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[403] = { name: 'body of water', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[404] = { name: 'canyon', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[405] = { name: 'cave', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[406] = { name: 'desert', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[407] = { name: 'forest', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[408] = { name: 'hill', duration: 5400 };

	Constants.ITEM_TYPES_ARRAY[410] = { name: 'lake', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[411] = { name: 'mountain', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[412] = { name: 'river', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[413] = { name: 'volcano', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[414] = { name: 'waterfall', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[415] = { name: 'waterfront', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[416] = { name: 'park', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[417] = { name: 'bird watching', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[418] = { name: 'outdoors', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[419] = { name: 'zoo', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[420] = { name: 'aquarium', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[421] = { name: 'Geologic Formation', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[422] = { name: 'Hot Spring', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[423] = { name: 'National Park', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[424] = { name: 'Scenic Drive', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[425] = { name: 'Trail', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[426] = { name: 'Safari', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[427] = { name: 'Marine park', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[428] = { name: 'Botanical garden', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[429] = { name: 'Tree', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[430] = { name: 'summit', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[431] = { name: 'peak', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[432] = { name: 'mountain range', duration: 14400 };
	Constants.ITEM_TYPES_ARRAY[433] = { name: 'glacier', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[434] = { name: 'pinnacle', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[435] = { name: 'pass', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[436] = { name: 'pond', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[437] = { name: 'bay', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[438] = { name: 'fjord', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[438] = { name: 'jungle', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[439] = { name: 'lagoon', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[440] = { name: 'crater', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[441] = { name: 'nature reserve', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[442] = { name: 'swamp', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[443] = { name: 'wildlife reserve', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[444] = { name: 'stream', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[445] = { name: 'reef', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[446] = { name: 'ice field', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[447] = { name: 'estuary', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[448] = { name: 'strait', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[449] = { name: 'cliff', duration: 3600 };

	Constants.ITEM_TYPES_ARRAY[501] = { name: 'viewpoint', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[601] = { name: 'cultural', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[602] = { name: 'cultural site', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[603] = { name: 'educational institution', duration: 1800 };

	Constants.ITEM_TYPES_ARRAY[701] = { name: 'observatory', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[702] = { name: 'science', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[801] = { name: 'religious site', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[802] = { name: 'hindu temple', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[803] = { name: 'mosque', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[804] = { name: 'place of worship', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[805] = { name: 'church', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[806] = { name: 'synagogue', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[807] = { name: 'cemetery', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[808] = { name: 'temple', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[809] = { name: 'shrine', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[810] = { name: 'pagoda', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[811] = { name: 'basilica', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[812] = { name: 'chapel', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[813] = { name: 'abbey', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[814] = { name: 'monastery', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[815] = { name: 'baptistery', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[816] = { name: 'cloisters', duration: 1800 };

	Constants.ITEM_TYPES_ARRAY[901] = { name: 'activity', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[902] = { name: 'tour', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[903] = { name: 'classes', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[904] = { name: 'hiking', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[905] = { name: 'adventure', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[906] = { name: 'boat tour', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[907] = { name: 'golf', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[908] = { name: 'private tour', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[909] = { name: 'diving', duration: 21600 };
	Constants.ITEM_TYPES_ARRAY[910] = { name: 'sightseeing tour', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[911] = { name: 'swimming', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[912] = { name: 'walking tour', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[913] = { name: 'Marina', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[914] = { name: 'Scenic/ Historic Walking Area', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[915] = { name: 'Surf Camp', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[916] = { name: 'climbing', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[917] = { name: 'water sports', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[918] = { name: 'cycling', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[919] = { name: 'extreme sports', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[920] = { name: 'fishing', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[921] = { name: 'animal rides', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[922] = { name: 'scenic flight', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[923] = { name: 'driving', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[924] = { name: 'sports activity', duration: 5400 };

	Constants.ITEM_TYPES_ARRAY[1001] = { name: 'building', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1002] = { name: 'cultural building', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1003] = { name: 'government building', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1004] = { name: 'mansion', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1005] = { name: 'tower', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1006] = { name: 'windmill', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1007] = { name: 'architecture', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1008] = { name: 'castle', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1009] = { name: 'fortress', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1010] = { name: 'library', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1011] = { name: 'palace', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1012] = { name: 'villa', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1013] = { name: 'fortification', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1014] = { name: 'fort', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1015] = { name: 'edifice', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1016] = { name: 'official residence', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1017] = { name: 'royal residence', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1018] = { name: 'prison', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1019] = { name: 'apartment', duration: 3600 };

	Constants.ITEM_TYPES_ARRAY[1101] = { name: 'store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1102] = { name: 'shopping mall', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1103] = { name: 'bicycle store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1104] = { name: 'book store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1105] = { name: 'clothing store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1106] = { name: 'convenience store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1107] = { name: 'department store', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1108] = { name: 'electronics store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1109] = { name: 'florist', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1110] = { name: 'furniture store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1111] = { name: 'grocery', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1112] = { name: 'hardware store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1113] = { name: 'home goods store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1114] = { name: 'jewelry store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1115] = { name: 'liquor store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1116] = { name: 'market', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1117] = { name: 'pet store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1118] = { name: 'shoe store', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1119] = { name: 'Gear Rental', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1120] = { name: 'Shop', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1121] = { name: 'Specialty Shop', duration: 1800 };

	Constants.ITEM_TYPES_ARRAY[1201] = { name: 'bakery', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1202] = { name: 'cafe', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1203] = { name: 'food', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1204] = { name: 'meal delivery', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1205] = { name: 'meal takeaway', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1206] = { name: 'restaurant', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1207] = { name: 'Coffee house', duration: 1800 };

	Constants.ITEM_TYPES_ARRAY[1301] = { name: 'event', duration: 3600 };

	Constants.ITEM_TYPES_ARRAY[1401] = { name: 'nightlife', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1402] = { name: 'night club', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1403] = { name: 'dance club', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1404] = { name: 'gay bar', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1405] = { name: 'bar', duration: 5400 };

	Constants.ITEM_TYPES_ARRAY[1502] = { name: 'brewery', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1503] = { name: 'distillery', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1504] = { name: 'winery', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1601] = { name: 'entertainment', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1602] = { name: 'amusement park', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1603] = { name: 'bowling alley', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1604] = { name: 'casino', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1605] = { name: 'movie theater', duration: 9000 };
	Constants.ITEM_TYPES_ARRAY[1606] = { name: 'performance venue', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1607] = { name: 'sport venue', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1608] = { name: 'stadium', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1609] = { name: 'theme park', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[1610] = { name: 'Race Car Track', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1611] = { name: 'Theater', duration: 9000 };
	Constants.ITEM_TYPES_ARRAY[1612] = { name: 'Water Park', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1613] = { name: 'Water sports', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1614] = { name: 'Opera house', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1615] = { name: 'festival', duration: 10800 };
	Constants.ITEM_TYPES_ARRAY[1616] = { name: 'race track', duration: 7200 };
	Constants.ITEM_TYPES_ARRAY[1617] = { name: 'amphitheater', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1618] = { name: 'arena', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1619] = { name: 'roller coaster', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1620] = { name: 'arcade', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1621] = { name: 'ice skating', duration: 5400 };

	Constants.ITEM_TYPES_ARRAY[1701] = { name: 'spa', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1702] = { name: 'bath house', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1703] = { name: 'beach', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[1704] = { name: 'farm', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1705] = { name: 'gym', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1706] = { name: 'pool', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1801] = { name: 'accommodation', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1802] = { name: 'lodging', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1803] = { name: 'hotel', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1804] = { name: 'motel', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1901] = { name: 'health', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1902] = { name: 'dentist', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1903] = { name: 'doctor', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1904] = { name: 'hospital', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[1905] = { name: 'pharmacy', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[1906] = { name: 'physiotherapist', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2001] = { name: 'business', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2002] = { name: 'accounting', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2003] = { name: 'industrial site', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2004] = { name: 'Convention Center', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2005] = { name: 'Factory Tour', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[2101] = { name: 'airport', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2102] = { name: 'bus station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2103] = { name: 'car rental', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2104] = { name: 'parking', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2105] = { name: 'subway station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2106] = { name: 'taxi stand', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2107] = { name: 'train station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2108] = { name: 'transit station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2109] = { name: 'ship', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[2110] = { name: 'railway', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[2111] = { name: 'submarine', duration: 5400 };
	Constants.ITEM_TYPES_ARRAY[2112] = { name: 'ferry', duration: 3600 };

	Constants.ITEM_TYPES_ARRAY[2201] = { name: 'floor', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2202] = { name: 'geocode', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2203] = { name: 'intersection', duration: 1800 };

	Constants.ITEM_TYPES_ARRAY[2205] = { name: 'point of interest', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2206] = { name: 'political', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2207] = { name: 'post box', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2208] = { name: 'postal code', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2209] = { name: 'postal code prefix', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2210] = { name: 'postal town', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2211] = { name: 'premise', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2212] = { name: 'room', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2213] = { name: 'route', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2214] = { name: 'street address', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2215] = { name: 'street number', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2216] = { name: 'subpremise', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2301] = { name: 'atm', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2302] = { name: 'bank', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2303] = { name: 'beauty salon', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2304] = { name: 'campground', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2305] = { name: 'car dealer', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2306] = { name: 'car repair', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2307] = { name: 'car wash', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2308] = { name: 'city hall', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2309] = { name: 'courthouse', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2310] = { name: 'electrician', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2311] = { name: 'embassy', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2312] = { name: 'finance', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2313] = { name: 'financial institution', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2314] = { name: 'fire station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2315] = { name: 'funeral home', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2316] = { name: 'gas station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2317] = { name: 'gear rentals', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2318] = { name: 'general contractor', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2319] = { name: 'hair care', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2320] = { name: 'insurance agency', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2321] = { name: 'laundry', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2322] = { name: 'lawyer', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2323] = { name: 'locksmith', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2324] = { name: 'movie rental', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2325] = { name: 'moving company', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2326] = { name: 'painter', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2327] = { name: 'plumber', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2328] = { name: 'police', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2329] = { name: 'post office', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2330] = { name: 'real estate agency', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2331] = { name: 'roofing contractor', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2332] = { name: 'rv park', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2333] = { name: 'school', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2334] = { name: 'storage', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2335] = { name: 'travel agency', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2336] = { name: 'university', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2337] = { name: 'veterinary care', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2338] = { name: 'Military Base', duration: 3600 };
	Constants.ITEM_TYPES_ARRAY[2339] = { name: 'Visitor Center', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2340] = { name: 'college', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2341] = { name: 'community center', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2342] = { name: 'radio station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2343] = { name: 'power station', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2344] = { name: 'Military site', duration: 1800 };
	Constants.ITEM_TYPES_ARRAY[2345] = { name: 'travel services', duration: 1800 };

	exports['default'] = Constants;
});
define('tripmind/appconfig/geo_distance', ['exports', 'ember'], function (exports, _ember) {

	var EARTH_RADIUS_KM = 6378.137,
	    DEG_TO_RAD = Math.PI / 180;

	var geoDistances = {};

	geoDistances.distance = function (item1, item2) {
		var lat1 = item1.get('lat') * DEG_TO_RAD,
		    lng1 = item1.get('lng') * DEG_TO_RAD,
		    lat2 = item2.get('lat') * DEG_TO_RAD,
		    lng2 = item2.get('lng') * DEG_TO_RAD;
		var x = (lng2 - lng1) * Math.cos((lat1 + lat2) / 2);
		var y = lat2 - lat1;
		return Math.sqrt(x * x + y * y) * EARTH_RADIUS_KM; // in km
	};

	geoDistances.minDistance = function (item, fromItems) {
		if (!item || !fromItems || fromItems.get('length') == 0) return null;
		var minDistance = 99999,
		    minItem = null;
		fromItems.forEach(function (otherItem) {
			var distance = geoDistances.distance(item, otherItem);
			if (distance < minDistance) {
				minDistance = distance;
				minItem = otherItem;
			}
		});
		return [minDistance, minItem];
	};

	exports['default'] = geoDistances;
});
define("tripmind/appconfig/gmaps", ["exports"], function (exports) {
	var gmaps = {};

	(function () {
		// === Styles

		var styles = {};
		styles.originalStyles = new Array(10), styles.originalStyles[0] = [{
			"featureType": "road",
			"stylers": [{ "visibility": "off" }]
		}, {
			"featureType": "landscape.natural",
			"stylers": [{ "visibility": "off" }]
		}, {
			"featureType": "poi",
			"stylers": [{ "visibility": "off" }]
		}, {
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [{ "visibility": "on" }, { "color": "#f6f0e5" }]
		}, {
			"featureType": "administrative.locality",
			"stylers": [{ "visibility": "off" }]
		}, {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{ "color": "#aed6f4" }]
		}, {
			"featureType": "administrative.province",
			"stylers": [{ "visibility": "off" }]
		}, {
			"featureType": "administrative.country",
			"elementType": "geometry",
			"stylers": [{ "weight": 1.3 }, { "color": "#b7b5aa" }]
		}];
		styles.originalStyles[1] = styles.originalStyles[0].slice(0);
		/*styles.originalStyles[1].push({
   "featureType": "administrative.locality",
   "stylers": [
   { "visibility": "on" },
   { "gamma": 2.88 }
   ]
   });*/
		styles.originalStyles[2] = styles.originalStyles[0].slice(0);
		styles.originalStyles[2].push({
			"featureType": "administrative.locality",
			"stylers": [{ "visibility": "on" }, { "gamma": 2.88 }]
		}, {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{ "visibility": "on" }, { "gamma": 2.50 }]
		});
		styles.originalStyles[3] = styles.originalStyles[2].slice(0);
		styles.originalStyles[3].push({
			"featureType": "road.highway",
			"stylers": [{ "visibility": "on" }, { "weight": 0.5 }, { "saturation": -100 }, { "gamma": 3.31 }]
		}, {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{ "visibility": "on" }, { "gamma": 0.8 }]
		});
		styles.originalStyles[4] = styles.originalStyles[3].slice(0);
		styles.originalStyles[4].push({
			"featureType": "landscape.natural.terrain",
			"stylers": [{ "visibility": "on" }]
		}, {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{ "visibility": "on" }, { "gamma": 0.5 }]
		});
		styles.originalStyles[5] = styles.originalStyles[2].slice(0);
		styles.originalStyles[5].push({
			"featureType": "road.highway",
			"stylers": [{ "visibility": "on" }, { "gamma": 2.03 }]
		}, {
			"featureType": "landscape.natural.terrain",
			"stylers": [{ "visibility": "on" }]
		}, {
			"featureType": "road",
			"stylers": [{ "visibility": "on" }, { "saturation": -60 }]
		}, {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{ "visibility": "on" }, { "gamma": 0.4 }]

		});
		styles.originalStyles[6] = styles.originalStyles[2].slice(0);
		styles.originalStyles[6].push({
			"featureType": "administrative.locality",
			"stylers": [{ "visibility": "on" }, { "gamma": 0.3 }]
		}, { "featureType": "road.highway",
			"stylers": [{ "visibility": "on" }, { "gamma": 2.03 }]
		}, {
			"featureType": "landscape.natural.terrain",
			"stylers": [{ "visibility": "on" }]
		}, {
			"featureType": "road",
			"stylers": [{ "visibility": "on" }, { "saturation": -20 }]
		}, {
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{ "visibility": "on" }, { "gamma": 0.4 }]
		});
		styles.originalStyles[7] = styles.originalStyles[6].slice(0);
		/*styles.originalStyles[7].push({
   "featureType": "administrative.locality",
   "stylers": [
   { "visibility": "on" },
   { "gamma": 0.3 }
   ]
   });*/
		styles.originalStyles[8] = styles.originalStyles[7].slice(0);
		styles.originalStyles[8].push({
			"featureType": "transit",
			"stylers": [{ "visibility": "simplified" }]
		});
		styles.originalStyles[9] = styles.originalStyles[7].slice(0);
		styles.originalStyles[9].push({
			"featureType": "transit",
			"stylers": [{ "visibility": "on" }]
		});

		var stylesByZoomLevel = [0, //0
		0, //1
		0, //2
		1, //3
		2, //4
		2, //5
		2, //6
		2, //7
		3, //8
		4, //9
		5, //10
		6, //11
		7, //12
		8, //13
		8, //14
		9, //15
		9, //16
		9, //17
		9, //18
		9 //19
		];

		// === End of styles

		// === Marker Icons

		function createMarkerIcons() {
			var markerIconDot = {
				url: '/assets/images/1x1-pixel.png',
				size: new google.maps.Size(1, 1),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(4, 4),
				scaledSize: null
			};

			var markerIconSmallRed = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(16, 16),
				origin: new google.maps.Point(8, 85),
				anchor: new google.maps.Point(8, 12),
				scaledSize: null
			};

			var markerIconLargeRed = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(20, 28),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 24),
				scaledSize: new google.maps.Size(100, 66)
			};

			var markerIconInvisRed = {
				url: '/assets/images/picture1.png',
				size: new google.maps.Size(220, 230),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(3, 158)
			};

			var markerIconLargeRedMain = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(20, 28),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(10, 24),
				scaledSize: new google.maps.Size(100, 66)
			};

			var markerIconSmallBlue = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(16, 16),
				origin: new google.maps.Point(47, 85),
				anchor: new google.maps.Point(8, 12),
				scaledSize: null
			};

			var markerIconLargeBlue = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(20, 28),
				origin: new google.maps.Point(27, 0),
				anchor: new google.maps.Point(9, 24),
				scaledSize: new google.maps.Size(100, 66)
			};

			var markerIconSmallGreen = {};

			var markerIconLargeGreen = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(20, 28),
				origin: new google.maps.Point(54, 0),
				anchor: new google.maps.Point(8, 24),
				scaledSize: new google.maps.Size(100, 66)
			};

			var markerIconSmallOrange = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(16, 16),
				origin: new google.maps.Point(126, 85),
				anchor: new google.maps.Point(8, 12),
				scaledSize: null
			};

			var markerIconLargeOrange = {
				url: '/assets/images/markers4.png',
				size: new google.maps.Size(20, 28),
				origin: new google.maps.Point(81, 0),
				anchor: new google.maps.Point(8, 24),
				scaledSize: new google.maps.Size(100, 66)
			};

			return {
				dot: markerIconDot,
				smallRed: markerIconSmallRed,
				invisRed: markerIconInvisRed,
				smallBlue: markerIconSmallBlue,
				smallGreen: markerIconSmallGreen,
				smallOrange: markerIconSmallOrange,
				largeRed: markerIconLargeRed,
				largeRedMain: markerIconLargeRedMain,
				largeBlue: markerIconLargeBlue,
				largeGreen: markerIconLargeGreen,
				largeOrange: markerIconLargeOrange
			};
		};

		// === End of Marker Icons

		// === Polyline options

		function createPolylineOptions(primaryColor, secondaryColor) {

			var polylineStrokeOptions = {
				strokeColor: primaryColor,
				strokeOpacity: 0.8,
				strokeWeight: 6
			};
			var polylineHighlightStrokeOptions = {
				strokeColor: secondaryColor,
				strokeOpacity: 1,
				strokeWeight: 8
			};

			var defaultFlightIconOptions = {
				offset: '0',
				repeat: '20px'
			};
			var defaultWalkingIconOptions = {
				offset: '0',
				repeat: '15px'
			};

			var defaultFlightIcon = {
				path: 'M 0,-1 0,1',
				scale: 4
			};
			var defaultWalkingIcon = {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 2
			};

			var defaultFlightPolylineOptions = {
				geodesic: true,
				strokeOpacity: 0
			};
			var defaultWalkingPolylineOptions = {
				geodesic: false,
				strokeOpacity: 0
			};

			var flightIcon = $.extend({}, { icon: $.extend({}, defaultFlightIcon, polylineStrokeOptions) }, defaultFlightIconOptions);
			var highlightFlightIcon = $.extend({}, { icon: $.extend({}, defaultFlightIcon, polylineHighlightStrokeOptions) }, defaultFlightIconOptions);

			var polylineFlightOptions = $.extend({}, defaultFlightPolylineOptions, { icons: [flightIcon] });
			var polylineHighlightFlightOptions = $.extend({}, defaultFlightPolylineOptions, { icons: [highlightFlightIcon] });

			var walkingIcon = $.extend({}, { icon: $.extend({}, defaultWalkingIcon, polylineStrokeOptions) }, defaultWalkingIconOptions);
			var highlightWalkingIcon = $.extend({}, { icon: $.extend({}, defaultWalkingIcon, polylineHighlightStrokeOptions) }, defaultWalkingIconOptions);

			var polylineWalkingOptions = $.extend({}, defaultWalkingPolylineOptions, { icons: [walkingIcon] });
			var polylineHighlightWalkingOptions = $.extend({}, defaultWalkingPolylineOptions, { icons: [highlightWalkingIcon] });

			return {
				"default": polylineStrokeOptions,
				highlight: polylineHighlightStrokeOptions,
				flight: polylineFlightOptions,
				highlightFlight: polylineHighlightFlightOptions,
				walking: polylineWalkingOptions,
				highlightWalking: polylineHighlightWalkingOptions
			};
		};

		// === End of Polyline options

		// === Custom control

		/** @constructor */

		// === End of Custom control

		// === Init

		// Init options that don't require the map
		gmaps = $.extend(gmaps, {
			styles: styles,
			stylesByZoomLevel: stylesByZoomLevel,
			markerIcons: createMarkerIcons(),
			polylineOptions: createPolylineOptions('#7CCC34', '#00aa55'),
			createPolylineOptions: createPolylineOptions,
			polylineAlternateOptions: createPolylineOptions('#5ba0d0', '#0078b4'),
			directionsDisplayOptions: {
				suppressMarkers: true,
				preserveViewport: true
			}
		});
	})();

	/*polylineOptions: {
 	strokeOpacity: 0
 }*/
	exports["default"] = gmaps;
});
define('tripmind/appconfig/head_only_promise_from_ajax', ['exports', 'ember', 'tripmind/appconfig/promise_from_ajax'], function (exports, _ember, _tripmindAppconfigPromise_from_ajax) {
	exports['default'] = function (ajaxOptions) {
		return (0, _tripmindAppconfigPromise_from_ajax['default'])($.extend(ajaxOptions, { dataType: 'html' }));
	};

	;
});
define('tripmind/appconfig/promise_from_ajax', ['exports', 'ember'], function (exports, _ember) {

	var promiseFromAjax = function promiseFromAjax(ajaxOptions) {
		return new _ember['default'].RSVP.Promise(function (resolve, reject) {
			$.ajax(ajaxOptions).then(function (results) {
				resolve(results);
			}, function (jqXHR) {
				jqXHR.then = null; // tame jQuery's ill mannered promises
				reject(jqXHR);
			});
		});
	};

	exports['default'] = promiseFromAjax;
});
define('tripmind/appconfig/utils', ['exports', 'ember', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigConstants) {

	var Utils = {};

	Utils.itemTypeIsParent = function (itemType) {
		return itemType >= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["COUNTRY"] && itemType < _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["NEIGHBORHOOD"];
	};

	Utils.itemTypeIsAttraction = function (itemType) {
		return itemType >= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["ATTRACTION"];
	};

	Utils.itemTypeIsCountry = function (itemType) {
		return itemType <= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["COUNTRY"];
	};

	Utils.itemTypeIsRegion = function (itemType) {
		return itemType <= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["REGION"];
	};

	exports['default'] = Utils;
});
define('tripmind/components/action-bar-placeholder', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		elementId: 'action-bar-placeholder',
		service: _ember['default'].inject.service('action-service'),
		classNameBindings: ['isActive', 'addedClass'],
		isActive: _ember['default'].computed.alias('service.hasSelected')

	});
});
define('tripmind/components/action-bar', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		elementId: 'selected-action-bar',
		service: _ember['default'].inject.service('action-service'),
		classNames: ['action-bar', 'extension-only'],
		classNameBindings: ['isActive', 'addedClass'],
		isActive: _ember['default'].computed.alias('service.hasSelected'),

		isTrash: _ember['default'].computed.equal('addedClass', 'trash'),

		showActionButtons: (function () {
			return !(this.get('service.hasSelected') && this.get('canBeSelected'));
		}).property('targetModel', 'service.hasSelected'),

		currentIsSelected: (function () {
			return this.get('service').selectedIncludes(this.get('targetModel.id'));
		}).property('targetModel.id', 'service.selectedIds.[]'),

		actions: {
			clearSelection: function clearSelection() {
				this.get('service').clearSelected();
			},
			addSelected: function addSelected(targetModel) {
				this.send('openTopModal', 'addToCollection', targetModel);
			},
			removeFromCollection: function removeFromCollection(targetModel) {
				this.get('service').removeFromCollection(targetModel);
			},
			trashSelected: function trashSelected(targetModel) {
				this.get('service').trashSelected(targetModel);
			},
			openTopModal: function openTopModal(modalName, targetModel) {
				this.get('openModalAction')(modalName, targetModel);
			},
			toggleSelected: function toggleSelected(targetModel) {
				this.get('service').toggleSelected(targetModel.get('id'));
			}
		}

	});
});
define('tripmind/components/add-to-collection', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		collections: null,
		store: _ember['default'].inject.service('store'),
		actionService: _ember['default'].inject.service('action-service'),
		feedbackService: _ember['default'].inject.service('feedback-service'),

		init: function init() {
			var self = this;
			this._super();
			this.get('store').findAll('collection').then(function (result) {
				self.set('collections', result.sortBy('updatedAt').reverse());
			});
			ga('send', 'event', 'addToCollection', 'init');
		},

		actions: {
			chooseCollection: function chooseCollection(collection) {
				var currentTime = moment().format("X");
				var self = this,
				    selectedIds = this.get('actionService.selectedIds'),
				    targetModel = this.get('model'),
				    itemsToAdd = targetModel ? [targetModel] : this.get('store').peekAll('item').filter(function (item) {
					return selectedIds.indexOf(item.get('id')) > -1;
				});
				// Create a new collection if there is no input
				if (!collection) {
					collection = this.get('store').createRecord('collection', {
						id: 'tmp' + Math.random(),
						name: "Untitled",
						createdAt: currentTime,
						items: []
					});
				}
				var currentItems = collection.get('items');
				//.then(function (currentItems) {
				currentItems.addObjects(itemsToAdd);
				collection.set('updatedAt', currentTime);
				collection.save();
				itemsToAdd.forEach(function (item) {
					item.save();
				});

				self.get('actionService').clearSelected();
				self.get('closeAction')();
				self.get('feedbackService').setProperties({
					isShowing: true,
					feedbackSentence: "Selection has been added to the collection:",
					feedbackLinkRoute: 'collection',
					feedbackLinkTarget: collection.get('slug'),
					feedbackLinkModel: collection,
					feedbackActionName: null,
					feedbackAddedClass: 'success',
					feedbackDuration: 3000
				});
				//});
				ga('send', 'event', 'addToCollection', 'choseCollection');
				return false;
			}
		}

	});
});
define('tripmind/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'tripmind/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _tripmindConfigEnvironment) {

  var name = _tripmindConfigEnvironment['default'].APP.name;
  var version = _tripmindConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('tripmind/components/auth-tokens', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		service: _ember['default'].inject.service('auth-service'),

		didInsertElement: function didInsertElement() {
			this.get('service.authenticityToken');
		}
	});
});
define('tripmind/components/autosave-editable', ['exports', 'ember', 'tripmind/appconfig/better_sanitize'], function (exports, _ember, _tripmindAppconfigBetter_sanitize) {
	exports['default'] = _ember['default'].Component.extend({
		classNameBindings: ['isEditable', 'isEmpty'],
		attributeBindings: ['contenteditable'],
		valueOW: _ember['default'].computed.oneWay('value'),

		isEmpty: (function () {
			var value = this.get('value');
			if (!value) return true;
			if (typeof value.trim == 'function') {
				return value.trim().length == 0;
			}
			if (value.string) {
				return value.string.trim().length == 0;
			}
		}).property('value'),

		mouseDown: function mouseDown(e) {
			if (e.target.tagName != "A") {
				this.set('contenteditable', this.get('canEditContent'));
			}
		},

		_updateValue: function _updateValue(value) {
			this.set('value', value);
			this.$().html(value);
		},

		/*
  	valueDidChange: function(){
  		this.set('refreshModel.needsRefresh', true)
  	}.observes('value').on('init'),
  */

		focusOut: function focusOut() {
			var modelToSave = this.get('saveOnExit'),
			    self = this;
			if (modelToSave) {
				var currentValue = this.$().html();
				this.set('contenteditable', false);
				// This may be useful for something, but I think it's just an old unnecessary remnant that caused trouble
				/*this.set('value', null);
    this.$().html("");*/

				var defaultValue = this.get('defaultValue');
				if (defaultValue) {
					if (!currentValue) currentValue = defaultValue;
					if (typeof currentValue.trim == 'function') {
						if (currentValue.trim().length == 0) currentValue = defaultValue;
					}
					if (currentValue.string) {
						if (currentValue.string.trim().length == 0) currentValue = defaultValue;
					}
				}
				this.set('value', currentValue);
				this.$().html(currentValue);
				if (modelToSave.get('updatedAt')) {
					modelToSave.set('updatedAt', moment().format("X"));
				}
				modelToSave.save();
			}
			this.set('refreshModel.needsRefresh', true);
			console.log('focused out!');
		}
	});
});
define('tripmind/components/autosave-text-area', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].TextArea.extend({
		didInsertElement: function didInsertElement() {
			this.resizeToFitText();
		},

		resizeToFitText: function resizeToFitText() {
			this.$().height(0);
			this.$().height(this.$().prop('scrollHeight'));
		},

		valueDidChange: (function () {
			_ember['default'].run.scheduleOnce('afterRender', this, 'resizeToFitText');
		}).observes('value'),

		focusOut: function focusOut() {
			var modelToSave = this.get('saveOnExit');
			if (modelToSave) {
				if (modelToSave.get('updatedAt')) {
					modelToSave.set('updatedAt', moment().format("X"));
				}
				modelToSave.save();
			}
			console.log('focused out!');
		}
	});
});
define('tripmind/components/button-with-confirmation', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNameBindings: ['addedClass'],

		click: function click() {
			this.toggleProperty('isConfirming');
		},

		actions: {
			confirm: function confirm(state) {
				if (state) {
					this.get('onConfirm')();
				}
			}
		}

	});
});
define('tripmind/components/center-marker', ['exports', 'ember', 'tripmind/appconfig/gmaps', 'tripmind/components/map-marker'], function (exports, _ember, _tripmindAppconfigGmaps, _tripmindComponentsMapMarker) {
	exports['default'] = _tripmindComponentsMapMarker['default'].extend({
		currentCollection: _ember['default'].inject.service('current-collection'),
		visible: _ember['default'].computed.bool('model.lat'),
		map: _ember['default'].computed.alias('mapService.googleMapObject'),
		baseDepth: 0,
		addedLabelClass: 'center',
		unhoveredIcon: _tripmindAppconfigGmaps['default'].markerIcons.largeRed,
		hoveredIcon: _tripmindAppconfigGmaps['default'].markerIcons.largeRed,

		lat: _ember['default'].computed.alias('model.lat'),
		lng: _ember['default'].computed.alias('model.lng'),
		labelName: _ember['default'].computed.alias('model.name'),
		labelType: _ember['default'].computed.alias('model.itemTypeName'),
		labelOneliner: _ember['default'].computed.alias('model.onelinerOrAlt'),
		itemImageStyle: _ember['default'].computed.alias('model.photoStyle'),

		didInsertElement: function didInsertElement() {
			this._super();
			this.get('mapService').set('centerMarker', this);
		},
		willDestroyElement: function willDestroyElement() {
			this.get('mapService').set('centerMarker', null);
			this._super();
		},

		clickMarker: function clickMarker() {
			$('body').animate({ scrollTop: 0 }, 200);
		}

	});
});
define('tripmind/components/collection-action-bar', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		elementId: 'collection-action-bar',
		service: _ember['default'].inject.service('action-service'),
		classNames: ['action-bar', 'extension-only'],
		classNameBindings: ['isActive', 'addedClass'],
		isActive: _ember['default'].computed.alias('service.hasSelected'),

		isTrash: _ember['default'].computed.equal('addedClass', 'trash'),

		showActionButtons: (function () {
			return !(this.get('service.hasSelected') && this.get('targetModel'));
		}).property('targetModel', 'service.hasSelected'),

		currentIsSelected: (function () {
			return this.get('service').selectedIncludes(this.get('targetModel.id'));
		}).property('targetModel.id', 'service.selectedIds.[]'),

		actions: {
			clearSelection: function clearSelection() {
				this.get('service').clearSelected();
			},
			addSelected: function addSelected(targetModel) {
				this.send('openTopModal', 'addToCollection', targetModel);
			},
			trashSelected: function trashSelected(targetModel) {
				this.get('service').trashSelected(targetModel);
			},
			openTopModal: function openTopModal(modalName, targetModel) {
				this.get('openModalAction')(modalName, targetModel);
			},
			toggleSelected: function toggleSelected(targetModel) {
				this.get('service').toggleSelected(targetModel.get('id'));
			}
		}

	});
});
define('tripmind/components/collection-card', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['collection-card'],
		classNameBindings: ['addedClass', 'cardId', 'imageDidLoad'],
		addedClass: null

	});
});
define('tripmind/components/collection-marker', ['exports', 'ember', 'tripmind/appconfig/gmaps', 'tripmind/components/map-marker'], function (exports, _ember, _tripmindAppconfigGmaps, _tripmindComponentsMapMarker) {
	exports['default'] = _tripmindComponentsMapMarker['default'].extend({
		visible: true,
		map: _ember['default'].computed.alias('mapService.googleMapObject'),
		baseDepth: 2,
		addedLabelClass: null,

		init: function init() {
			this._super();
			if (this.get("markerColor")) {
				this.set('unhoveredIcon', _tripmindAppconfigGmaps['default'].markerIcons["small" + this.get('markerColor').capitalize()]);
			}
		},

		lat: _ember['default'].computed.alias('model.lat'),
		lng: _ember['default'].computed.alias('model.lng'),
		labelName: _ember['default'].computed.alias('model.name'),
		labelType: _ember['default'].computed.alias('model.itemTypeName'),
		labelOneliner: _ember['default'].computed.alias('model.onelinerOrAlt'),
		itemImageStyle: _ember['default'].computed.alias('model.photoStyle'),

		// here we calculate the XY position needed to offset the marker left by half its width, which is 100px
		// change the "100/2^zoomlevel" here if the styling of the marker with label changes width
		centerMarker: function centerMarker(centerYToo) {
			var map = this.get('map'),
			    zoomLevel = map.getZoom(),
			    zoomFactor = Math.pow(2, zoomLevel),
			    p = map.getProjection(),
			    markerPos = this.get('_marker').getPosition(),
			    currentCenterXy = p.fromLatLngToPoint(map.getCenter()),
			    xyOrig = p.fromLatLngToPoint(markerPos),
			    xyNew = new google.maps.Point(xyOrig.x + 100 / zoomFactor, centerYToo ? xyOrig.y : currentCenterXy.y),
			    latLngNew = p.fromPointToLatLng(xyNew);
			map.panTo(latLngNew);
		},

		clickMarker: function clickMarker(e) {
			// If we clicked on the area around the read-more
			// (This is determined by click offset because the click itself is registered on an image w/o access to the button

			// First we find the original event
			var originalEvent;
			for (var key in e) {
				if (e.hasOwnProperty(key)) {
					if (e[key] && (e[key].isTrusted || e[key].type == "click")) originalEvent = e[key];
				}
			}

			if (originalEvent.offsetX >= 120 && originalEvent.offsetX <= 220 && originalEvent.offsetY >= 180 && originalEvent.offsetY <= 220) {
				console.log('going to item!', this.get('model.name'));
				if (this.get('targetObject.targetObject.targetObject')) {
					this.get('targetObject.targetObject.targetObject').send('triggerTransition', 'item', this.get('model.slug'));
				} else {
					this.get('targetObject.targetObject').send('triggerTransition', 'item', this.get('model.slug'));
				}
				ga('send', 'event', 'marker', 'readMore');
			}
			var currentSetting = this.get('isClicked');
			/*if (this.get('minimizeAllAction')) { this.get('minimizeAllAction')()}
   */
			this.set('isExpanded', !currentSetting);
			this.set('isClicked', !currentSetting);
			if (!currentSetting) {

				this.centerMarker();
				ga('send', 'event', 'marker', 'enlarge');
			}
			return false;
		},

		updateHoveredState: function updateHoveredState() {
			if (this.get('isClicked')) return;
			var targetState = this.get('lastHoveredState');
			if (targetState) {
				if (this.get('minimizeAllAction')) {
					this.get('minimizeAllAction')();
				}
				this.centerMarker();
			}
			this.set('isExpanded', targetState);
		},

		hoverMarker: function hoverMarker() {
			this.set('lastHoveredState', true);
			_ember['default'].run.debounce(this, 'updateHoveredState', 300);
		},

		unhoverMarker: function unhoverMarker() {
			this.set('lastHoveredState', false);
			_ember['default'].run.debounce(this, 'updateHoveredState', 300);
		},

		unhoveredIcon: _tripmindAppconfigGmaps['default'].markerIcons.smallRed,
		hoveredIcon: _tripmindAppconfigGmaps['default'].markerIcons.invisRed,
		itemHoveredIcon: _tripmindAppconfigGmaps['default'].markerIcons.largeBlue

	});
});
define('tripmind/components/collection-markers', ['exports', 'ember', 'tripmind/appconfig/gmaps'], function (exports, _ember, _tripmindAppconfigGmaps) {
	exports['default'] = _ember['default'].Component.extend({
		mapService: _ember['default'].inject.service('map-service'),
		model: null,

		didInsertElement: function didInsertElement() {
			this._super();
			this.get('mapService').set('collectionMarkers', this);
		},

		willDestroyElement: function willDestroyElement() {
			var mapService = this.get('mapService');
			mapService.setProperties({
				collectionMarkers: null,
				bounds: null
			});
			this._super();
		},

		markerWrappers: (function () {
			if (!this.get('model') || typeof this.get('model').map == "undefined") {
				return [];
			};
			var self = this;
			var wrappers = this.get('model').map(function (item, index) {
				var object = _ember['default'].Object.create({ // wrapper object
					item: item,
					hide: function hide() {
						this.set('visible', false);
					},
					show: function show() {
						this.set('visible', true);
					},
					minimize: function minimize() {
						this.set('isExpanded', false);
						this.set('isClicked', false);
					}
				});
				return object;
			});
			return wrappers;
		}).property('model.[]'),

		_zoomToModel: function _zoomToModel() {
			console.log('zooming map!');
			this.set('mapService.bounds', this.get('mapBoundingBox'));
		},

		zoomToModel: (function () {
			_ember['default'].run.scheduleOnce('afterRender', this, '_zoomToModel');
		}).observes('model.[].lat', 'model.[].lng').on('init'),

		mapBoundingBox: (function () {
			var coordsArray = [],
			    bound = 0.001;
			var items = (this.get('model') || []).toArray();
			items.forEach(function (item) {
				var swLat = item.get('boundSwLat') || item.get('lat') - bound;
				var swLng = item.get('boundSwLng') || item.get('lng') - bound;
				var neLat = item.get('boundNeLat') || item.get('lat') + bound;
				var neLng = item.get('boundNeLng') || item.get('lng') + bound;
				if (swLat && neLng && swLng && neLat) coordsArray.push([swLat, swLng], [neLat, neLng]);
			});
			return this.get('mapService').getBoundingBox(coordsArray);
		}).property('model.[].lat', 'model.[].lng'),

		actions: {
			minimizeAllMarkers: function minimizeAllMarkers() {
				this.get('markerWrappers').invoke('minimize');
			}
		}

	});
});
define('tripmind/components/collection-search-field-wrapper', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		wrappedField: null,
		classNameBindings: ['addedClass'],
		searchService: _ember['default'].inject.service('search-service'),
		results: [],

		actions: {
			clearSearch: function clearSearch() {
				this.set('wrappedField.query', '');
				this.set('results', null);
			},
			foundItem: function foundItem(route, payload) {
				this.send('clearSearch');
				this.sendAction('foundItem', route, payload);
			},
			loading: function loading(status) {
				this.set('loading', status);
			},
			submit: function submit(query) {
				var self = this;
				this.set('loading', true);
				this.get('wrappedField').$().autocomplete('close');
				this.get('wrappedField').$().blur();
				if (query.length > 0) {
					this.get('searchService').executeQuery(query).then(function (results) {
						self.set('results', results);
						self.set('loading', false);
					});
				}
				ga('send', 'event', 'search', 'collectionSearchFieldSubmit');
			}
		}

	});
});
define('tripmind/components/date-view', ['exports', 'ember', 'tripmind/appconfig/color_generation', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigColor_generation, _tripmindAppconfigConstants) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['date-view'],
		attributeBindings: ['backgroundColor:style'],
		mapService: _ember['default'].inject.service('map-service'),

		backgroundColor: (function () {
			return 'border-left: 3px solid ' + this.get('model.color');
		}).property('model.color'),

		didInsertElement: function didInsertElement() {
			this._super();
			var model = this.get('model');
			if (!model.get('color')) {
				model.set('color', (0, _tripmindAppconfigColor_generation['default'])(true, 0.99, 0.99));
				model.save();
			}
		},

		itemLegs: (function () {
			var items = this.get('model.items'),
			    legs = this.get('legTravel'),
			    indexMove = this.get('prevDate.lastItem') ? 0 : 1;
			return items.map(function (item, index) {
				return _ember['default'].Object.create({ item: item, leg: legs ? legs[index - indexMove] : null });
			});
		}).property('model.items.[]', 'legTravel.[]', 'prevDate.lastItem'),

		prevDate: (function () {
			var myOrder = this.get('model.order'),
			    orderedDates = this.get('orderedDates');
			if (myOrder == 1) return null;
			var prevDate = orderedDates.find(function (date) {
				return date.get('order') == myOrder - 1;
			});
			return prevDate;
		}).property('model.order', 'orderedDates.[].order'),

		itemsWithPrev: (function () {
			var myItems = this.get('model.items'),
			    prevDate = this.get('prevDate'),
			    items = _ember['default'].ArrayProxy.create({ content: [] });
			myItems.forEach(function (item) {
				items.pushObject(item);
			});
			if (prevDate) {
				var prevItem = prevDate.get('lastItem');
				if (prevItem) items.unshiftObject(prevItem);
			}
			return items;
		}).property('model.items', 'prevDate.lastItem'),

		travelTimeText: (function () {
			var totalTravel = this.get('totalTravel');
			if (totalTravel) {
				switch (true) {
					case totalTravel < 5400:
						var travelTimeText = Math.round(totalTravel / 60) + "m";
						break;
					default:
						var travelTimeText = Math.round(totalTravel / 3600) + "h";
						break;
				}
			}
			return travelTimeText;
		}).property('totalTravel'),

		travelTimeProgress: (function () {
			return Math.round(this.get('totalTravel') / 12 / 3600 * 100);
		}).property('totalTravel'),

		totalFun: (function () {
			var items = this.get('model.items');
			var totalTime = 0;
			if (!items || !(items.get('length') > 0)) return null;
			items.forEach(function (item) {
				var itemDuration = _tripmindAppconfigConstants['default'].GOOGLE_TYPE_FILTER_CATEGORIES.find(function (el) {
					return el.type == item.get('itemType');
				});
				itemDuration = itemDuration ? itemDuration['duration'] : 1800;
				totalTime += itemDuration;
			});
			return totalTime;
		}).property('model.items.[]'),

		funTimeText: (function () {
			var totalFun = this.get('totalFun');
			if (totalFun) {
				switch (true) {
					case totalFun < 5400:
						var funTimeText = Math.round(totalFun / 60) + "m";
						break;
					default:
						var funTimeText = Math.round(totalFun / 3600) + "h";
						break;
				}
			}
			return funTimeText;
		}).property('totalFun'),

		funTimeProgress: (function () {
			return Math.round(this.get('totalFun') / 12 / 3600 * 100);
		}).property('totalFun'),

		mapBoundingBox: (function () {
			var coordsArray = [],
			    bound = 0.001;
			var items = (this.get('itemsWithPrev') || []).toArray();
			items.forEach(function (item) {
				var swLat = item.get('boundSwLat') || item.get('lat') - bound;
				var swLng = item.get('boundSwLng') || item.get('lng') - bound;
				var neLat = item.get('boundNeLat') || item.get('lat') + bound;
				var neLng = item.get('boundNeLng') || item.get('lng') + bound;
				if (swLat && neLng && swLng && neLat) coordsArray.push([swLat, swLng], [neLat, neLng]);
			});
			return this.get('mapService').getBoundingBox(coordsArray);
		}).property('model.items.[].lat', 'model.items.[].lng'),

		actions: {
			deleteDate: function deleteDate() {
				var model = this.get('model');
				model.get('collection').then(function (collection) {
					collection.get('items').then(function (collectionItems) {
						model.get('trippoints').then(function (trippoints) {
							var dateItemPromises = trippoints.map(function (tp) {
								return tp.get('item');
							});
							_ember['default'].RSVP.allSettled(dateItemPromises).then(function (array) {
								array.forEach(function (el) {
									var item = el.value;
									collectionItems.addObject(item);
									item.save();
								});
							}).then(function () {
								return collection.save();
							}).then(function () {
								trippoints.forEach(function (tp) {
									tp.destroy();
									tp.save();
								});
							}).then(function () {
								model.destroy();
								model.save();
								collection.reorderDates();
							});
						});
					});
				});
			},
			zoomDate: function zoomDate() {
				console.log('zooming date');
				this.set('mapService.bounds', this.get('mapBoundingBox'));
			}
		}
	});
});
define('tripmind/components/distance-leg', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['distance-leg'],
		classNameBindings: ['travelClass'],

		walkingTimeMins: function walkingTimeMins(distance) {
			return Math.round(distance / 5000 * 60);
		},

		travelClass: (function () {
			if (!this.get('model')) return null;
			return this.get('model.distance') < 1500 ? 'icon-walk' : 'icon-drive';
		}).property('model.distance'),

		displayText: (function () {
			var distance = this.get('model.distance'),
			    driveTime = this.get('model.driveTime');
			if (distance < 1500) {
				return this.walkingTimeMins(distance) + ' min walk';
			} else if (driveTime < 600) {
				return Math.round(driveTime / 60) + ' min drive or ' + this.walkingTimeMins(distance) + ' min walk';
			} else if (driveTime < 3600) {
				return Math.round(driveTime / 60) + ' min drive';
			} else {
				return Math.round(driveTime / 1800) / 2 + ' hr drive';
			}
		}).property('model.distance', 'model.driveTime')
	});
});
define('tripmind/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _emberModalDialogComponentsPositionedContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsPositionedContainer['default'];
    }
  });
});
define('tripmind/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('tripmind/components/expanded-map', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		elementId: 'expanded-map'

	});
});
define('tripmind/components/feed-back', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		feedbackService: _ember['default'].inject.service('feedback-service'),
		classNames: ['feedback'],
		classNameBindings: ['isShowing', 'feedbackAddedClass'],
		isShowing: _ember['default'].computed.alias('feedbackService.isShowing'),

		feedbackSentence: _ember['default'].computed.alias('feedbackService.feedbackSentence'),
		feedbackActionName: _ember['default'].computed.alias('feedbackService.feedbackActionName'),
		feedbackLinkRoute: _ember['default'].computed.alias('feedbackService.feedbackLinkRoute'),
		feedbackLinkTarget: _ember['default'].computed.alias('feedbackService.feedbackLinkTarget'),
		feedbackLinkModel: _ember['default'].computed.alias('feedbackService.feedbackLinkModel'),
		feedbackAddedClass: _ember['default'].computed.alias('feedbackService.feedbackAddedClass'),

		didInsertElement: function didInsertElement() {
			this.get('feedbackService').set('component', this);
			this._super();
		},

		actions: {
			callAction: function callAction() {
				if (this.get('feedbackService.feedbackAction')) {
					this.get('feedbackService.feedbackAction')();
				}
			},
			dismiss: function dismiss() {
				this.set('feedbackService.isShowing', false);
			}
		}

	});
});
define('tripmind/components/google-map', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		mapService: _ember['default'].inject.service('map-service'),
		//classNames: ['map-holder'],
		classNameBindings: ['isOriginal'],
		googleMapObject: null
	});
});
define('tripmind/components/horizontal-item-card', ['exports', 'ember', 'tripmind/components/item-card'], function (exports, _ember, _tripmindComponentsItemCard) {
	exports['default'] = _tripmindComponentsItemCard['default'].extend({
		classNames: ['horizontal']

	});
});
define('tripmind/components/input-with-default', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		'default': 'placeholder',
		valueOrDefault: _ember['default'].computed('default', 'value', {
			get: function get(key) {
				return this.get('value') || this.get('default');
			},
			set: function set(key, value) {
				this.set('value', value || this.get('default'));
				return value;
			}
		}),
		focusOut: function focusOut() {
			var modelToSave = this.get('saveOnExit');
			if (modelToSave) {
				if (modelToSave.get('updatedAt')) {
					modelToSave.set('updatedAt', moment().format("X"));
				}
				modelToSave.save();
			}console.log('focused out!');
		}
	});
});
define('tripmind/components/item-card', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['item-card'],
		classNameBindings: ['addedClass', 'cardId', 'imageDidLoad', 'isSelected', 'inSelectMode'],
		addedClass: null,
		actionService: _ember['default'].inject.service('action-service'),

		isSelected: (function () {
			return this.get('actionService').get('selectedIds').indexOf(this.get('model.id')) > -1;
		}).property('model.id', 'actionService.selectedIds.[]'),

		inSelectMode: _ember['default'].computed.alias('actionService.hasSelected'),

		mouseEnter: function mouseEnter() {
			this.set('model.isHovered', true);
		},
		mouseLeave: function mouseLeave() {
			this.set('model.isHovered', false);
		},

		actions: {
			toggleSelected: function toggleSelected() {
				if (this.get('isSelected')) {
					this.get('actionService.selectedIds').removeObject(this.get('model.id'));
				} else {
					this.get('actionService.selectedIds').pushObject(this.get('model.id'));
				}
				return false;
			}
		}

	});
});
define('tripmind/components/item-draggable-card', ['exports', 'ember', 'tripmind/components/item-card', 'tripmind/mixins/draggable'], function (exports, _ember, _tripmindComponentsItemCard, _tripmindMixinsDraggable) {
	exports['default'] = _tripmindComponentsItemCard['default'].extend(_tripmindMixinsDraggable['default'], {
		screenDefs: _ember['default'].inject.service('screen-defs'),
		drag_zIndex: 10000,
		drag_revert: true,
		drag_revertDuration: 100,

		init: function init() {
			if (this.get('screenDefs.screenWidth') < 600) this.set('stopWidget', true);
			this._super();
		}
	});
});
define('tripmind/components/items-sorter', ['exports', 'ember', 'tripmind/mixins/sortable', 'tripmind/appconfig/geo_distance'], function (exports, _ember, _tripmindMixinsSortable, _tripmindAppconfigGeo_distance) {
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports['default'] = _ember['default'].Component.extend(_tripmindMixinsSortable['default'], {
		screenDefs: _ember['default'].inject.service('screen-defs'),
		store: _ember['default'].inject.service('store'),
		classNames: ['connected-sortable', 'items-sorter'],
		sortable_connectWith: '.connected-sortable',
		sortable_items: '.item-card',
		sortable_helper: "clone",
		sortable_update: function sortable_update(event, ui) {
			_ember['default'].run.schedule('actions', this, '_sortableUpdate', event, ui);
		},

		init: function init() {
			if (this.get('screenDefs.screenWidth') < 600) this.set('stopWidget', true);
			this._super();
		},

		sortable_over: function sortable_over(event, ui) {
			this.$().addClass('with-border');
			// update distance from
			var store = this.get('store'),
			    compToUpdate = this.get('compToUpdate');
			if (compToUpdate) {
				var originalItemId = $(ui.item).find('.id').attr('data-id'),
				    item = store.peekRecord('item', originalItemId),
				    otherItems = compToUpdate.get('model.items');
				var minDistance, minItem, distanceTime, distanceText;
				var response = _tripmindAppconfigGeo_distance['default'].minDistance(item, otherItems);
				if (response) {
					var _response = _slicedToArray(response, 2);

					minDistance = _response[0];
					minItem = _response[1];

					switch (true) {
						case minDistance < 0.1:
							distanceText = 'Already here';
							break;
						case minDistance < 75:
							distanceTime = Math.max(1, Math.round(minDistance / 50 * 6)) * 10;
							distanceText = '+' + distanceTime + 'min';
							break;
						case minDistance < 200:
							distanceTime = Math.round(minDistance / 50);
							distanceText = '+' + distanceTime + 'hr';
							break;
						case minDistance < 500:
							distanceTime = Math.round(minDistance / 75);
							distanceText = '+' + distanceTime + 'hr';
							break;
						default:
							distanceText = 'Really far!';
							break;
					}
					this.set('compToUpdate.timeAwayText', distanceText);
				} else {
					this.set('compToUpdate.timeAwayText', null);
				}
			}
		},

		sortable_out: function sortable_out(event, ui) {
			this.$().removeClass('with-border');
			var compToUpdate = this.get('compToUpdate');
			if (compToUpdate) {
				compToUpdate.set('timeAwayText', null);
			}
		},

		sortable_stop: function sortable_stop(event, ui) {
			this.$().removeClass('with-border');
		},

		sortable_start: function sortable_start(event, ui) {
			// if ctrl is held when starting the move, then create another copy of this item when done
			if (event.ctrlKey) {
				// The original is already kept thanks to the "helper = clone" option
				$(ui.item).show();
				//TODO: add a listener to adjust the state of the ctrl key
				var originalItemId = $(ui.item).find('.id').attr('data-id');
				this.set('originalItemId', originalItemId);
			}
		},

		_removeItem: function _removeItem(el) {
			$(el).remove();
		},

		_sortableUpdate: function _sortableUpdate(event, ui) {
			var store = this.get('store'),
			    modelToUpdate = this.get('modelToUpdate');
			if (this.get('update')) {
				var newItems = this.$().find('.item-card').toArray().map(function (el) {
					return $(el).find('.id').attr('data-id');
				}).map(function (id, idx) {
					var item = store.peekRecord('item', id);
					return item;
				});
				var originalItemId = this.get('originalItemId');
				if (originalItemId) {
					var item = store.peekRecord('item', originalItemId);
					newItems.unshiftObject(item);
					this.set('originalItemId', null);
				}
				modelToUpdate.set('items', newItems);
				//Ember.run.scheduleOnce('afterRender', this, '_removeItem', ui.item)
				modelToUpdate.save();
				//This is to refresh the items sorter after we copy from it. Not sure why but the component won't refresh otherwise
				if (this.get('withRefresh')) this.set('needsRefresh', true);
			}
		}

	});
});
define('tripmind/components/left-menu', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		elementId: "left-menu",
		actionService: _ember['default'].inject.service('action-service'),
		classNameBindings: ['isHidden'],
		isHidden: _ember['default'].computed.alias('actionService.hasSelected')
	});
});
define('tripmind/components/link-card', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['link-card'],
		classNameBindings: ['addedClass', 'isExpanded'],
		addedClass: null,
		isExpanded: null,

		actions: {
			toggleExpanded: function toggleExpanded() {
				this.toggleProperty('isExpanded');
			},
			deleteLink: function deleteLink() {
				this.get('model').destroyRecord();
			}
		}
	});
});
define('tripmind/components/major-section', ['exports', 'ember', 'tripmind/mixins/section-mixin'], function (exports, _ember, _tripmindMixinsSectionMixin) {
	exports['default'] = _ember['default'].Component.extend(_tripmindMixinsSectionMixin['default'], {
		classNames: ['major-section']
	});
});
define('tripmind/components/major-sections-holder', ['exports', 'ember', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigConstants) {
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports['default'] = _ember['default'].Component.extend({
		recsService: _ember['default'].inject.service('recs-service'),
		classNames: ['major-sections-holder'],
		classNameBindings: [],
		model: null,
		filteredItems: null,
		orderedMajorSections: null,
		majorSectionType: null,
		minorSectionType: null,

		withScrollMenu: (function () {
			return !this.get('isTrash') && (this.get('withRecs') || this.get('majorSections'));
		}).property('withRecs', 'majorSections', 'isTrash'),

		withOptionsMenu: _ember['default'].computed.or('canHaveRecs', 'majorSections'),

		canHaveRecs: (function () {
			return this.get('model.length') || this.get('parentItem.canHaveChildren') || _tripmindAppconfigConstants['default'].GOOGLE_PLACE_DESTINATION_TYPES.indexOf(this.get('parentItem.itemType')) > -1;
		}).property('parentItem.canHaveChildren', 'parentItem.itemType', 'model.length'),

		withRecs: _ember['default'].computed.alias('recsService.withRecs'),

		showRecs: _ember['default'].computed.and('withRecs', 'canHaveRecs'),

		recsSection: (function () {
			return _ember['default'].Object.create({
				title: 'Recommendations',
				items: this.get('recs'),
				sortedItems: this.get('recs'),
				scrollSlug: 'recs'
			});
		}).property('recs'),

		filterItems: function filterItems(items, attribute) {
			if (!attribute) return this.get('model');

			var _attribute$split = attribute.split("-");

			var _attribute$split2 = _slicedToArray(_attribute$split, 2);

			var filterAttribute = _attribute$split2[0];
			var not = _attribute$split2[1];

			var filteringItemTypes = [];
			this.get('filterOptions').filter(function (type) {
				return type.isSelected;
			}).forEach(function (typeOption) {
				filteringItemTypes = filteringItemTypes.concat(typeOption.value);
			});
			not = not == 'not';
			return items.filter(function (item) {
				return not ? !item.get(filterAttribute) : item.get(filterAttribute);
			}).filter(function (item) {
				return filteringItemTypes.indexOf(item.get('itemType')) > -1;
			});
		},

		shouldRefilterItems: (function () {
			_ember['default'].run.scheduleOnce('sync', this, 'refilterItems');
		}).observes('model.@each.trackingStatus').on('init'),

		refilterItems: function refilterItems() {
			var initialItems = this.get('model'),
			    prefilterAttribute = this.get('prefilterAttribute');
			this.set('filteredItems', this.filterItems(initialItems, prefilterAttribute));
		},

		majorSort: (function () {
			return this.get('majorSortOptions').findBy('isSelected');
		}).property('majorSortOptions.[]'),

		subSort: (function () {
			return this.get('subSortOptions').findBy('isSelected');
		}).property('subSortOptions.[]'),

		init: function init() {
			this._super();
			var majorSortOptions = [{ name: "Geography (auto-sort)", value: 'geo-auto', isSelected: true }, { name: "Geography (A-Z)", value: 'geo-name', isSelected: false }, { name: "Category", value: 'category', isSelected: false }, { name: "Date visited", value: 'date', isSelected: false }, { name: "Name", value: 'name', isSelected: false }],
			    subSortOptions = [{ name: "Geography (auto-sort)", value: 'geo-auto', isSelected: true }, { name: "Geography (A-Z)", value: 'geo-name', isSelected: false }, { name: "Category", value: 'category', isSelected: false }, { name: "Date visited", value: 'date', isSelected: false, sortOnly: true }, { name: "Name", value: 'name', isSelected: false, sortOnly: true }];
			var filterOptions = [],
			    filterOptionsHash = {},
			    filterOptionsOrder = ["Art", "Entertainment", "Family", "History", "Landmark", "Lifestyle", "Museum", "Nature", "Religious", "Other", "Restaurants", "Nightlife", "Shopping", "Hotels"],
			    filterOptionsWithSeparator = ["Restaurants", "Nightlife", "Shopping", "Hotels"];

			_tripmindAppconfigConstants['default'].GOOGLE_TYPE_FILTER_CATEGORIES.forEach(function (type) {
				filterOptionsHash[type.filterOption] = (filterOptionsHash[type.filterOption] || []).concat(type.type);
			});
			filterOptionsHash['Other'] = filterOptionsHash['Other'].concat(filterOptionsHash['Destination']);
			filterOptionsOrder.forEach(function (name) {
				filterOptions.push({
					name: name,
					value: filterOptionsHash[name],
					hasLineBefore: filterOptionsWithSeparator.indexOf(name) > -1,
					isSelected: true
				});
			});

			/*
    filterOptions = [
   		{name: "Museums", value: ['museum'], isSelected: true},
   		{name: "Nature", value: 'nature', isSelected: true},
   		{name: "Art", value: 'art', isSelected: true},
   		{name: "History", value: 'history', isSelected: true},
   		{name: "Other", value: ['history2'], isSelected: true},
   		{name: "Restaurants", value: 'restaurant', isSelected: true, hasLineBefore: true},
   		{name: "Hotels", value: 'lodging', isSelected: true, hasLineBefore: true}
   	];*/

			majorSortOptions = _ember['default'].ArrayProxy.create({ content: majorSortOptions.map(function (el) {
					return _ember['default'].Object.create(el);
				}) });
			subSortOptions = _ember['default'].ArrayProxy.create({ content: subSortOptions.map(function (el) {
					return _ember['default'].Object.create(el);
				}) });
			filterOptions = _ember['default'].ArrayProxy.create({ content: filterOptions.map(function (el) {
					return _ember['default'].Object.create(el);
				}) });
			this.setProperties({
				majorSortOptions: majorSortOptions,
				subSortOptions: subSortOptions,
				filterOptions: filterOptions
			});
		},

		modelDidChange: (function () {
			_ember['default'].run.scheduleOnce('sync', this, 'updateSections');
		}).observes('filteredItems.[]').on('init'),

		updateSections: function updateSections() {
			var items = this.get('filteredItems');
			if (!items || items.get('length') == 0) {
				this.set('majorSections', []);
				return;
			}
			var majorSections = this._sectionItems(items, this.get('majorSectionType') || this.get('majorSort.value'), { countriesOnly: true, threshold: 1, minDepth: 1 });
			this._subsectionSections(majorSections, this.get('subSort.value'), { threshold: 3, minDepth: 2, sortOnly: this.get('subSort.sortOnly') });
			this.set('majorSections', majorSections);
		},

		// we will have to sort items, places, or types of attraction(museums) so this will be a useful tool in many levels
		// SortItemsByGeo(items - can also be places, TH - num of items to collect for parent to appear, root level/ node)

		_sortItems: function _sortItems(items, order) {},

		//options: threshold and countriesOnly
		_sectionItems: function _sectionItems(items, sectionType, options) {
			var sectionsObject = {};
			var orderedSections = _ember['default'].ArrayProxy.create({ content: [] });
			var extraItems = _ember['default'].ArrayProxy.create({ content: [] });
			// Each type of sort returns a sectionsObject and a sortedKeys

			//----- Sort by name
			if (sectionType == 'name') {
				// Organize items into sections
				items.forEach(function (item) {
					var firstLetter = item.get('name').slice(0, 1).toUpperCase();
					sectionsObject[firstLetter] = sectionsObject[firstLetter] || _ember['default'].Object.create({
						title: firstLetter,
						scrollSlug: firstLetter,
						items: _ember['default'].ArrayProxy.create({ content: [] }),
						innerSort: 'name'
					});
					sectionsObject[firstLetter].items.pushObject(item);
				});
				var orderedKeys = Object.keys(sectionsObject).sort();
			} else if (sectionType.slice(0, 3) == 'geo') {

				//--- Sort by geo
				// Step 1 - build a tree that shows every descendant
				var treeObject = {};
				items.forEach(function (item) {
					var ancestry = item.get('ancestry'),
					    ancestryArray = ancestry ? ancestry.split("/") : null,
					    itemId = item.get('id');
					if (!ancestryArray || ancestryArray.length == (options.minDepth - 1 || 0) && _tripmindAppconfigConstants['default'].GOOGLE_PLACE_DESTINATION_TYPES.indexOf(item.get('itemType')) > -1) {
						treeObject[itemId] = treeObject[itemId] || {
							ancestryArray: [],
							count: 0,
							descs: [],
							depth: (ancestryArray ? ancestryArray.length : 0) + 1,
							name: item.get('name')
						};
					} else {
						var ancestorsArray = ancestry.split("/"),
						    ancestorNamesArray = item.get('ancestryNames').split("/");
						ancestorsArray.forEach(function (ancestorId, index) {
							if (options.countriesOnly && index > 0) return;
							treeObject[ancestorId] = treeObject[ancestorId] || {
								ancestryArray: ancestorsArray.slice(0, index),
								count: 0,
								descs: [],
								depth: index + 1,
								name: ancestorNamesArray[index]
							};
							treeObject[ancestorId].descs.push(item);
							treeObject[ancestorId].count++;
							//TODO: add a total weight to each node based on this item's weight
							// If this item is a parent we should put it in the tree even if it doesn't have desc
							if (_tripmindAppconfigConstants['default'].GOOGLE_PLACE_DESTINATION_TYPES.indexOf(item.get('itemType')) > -1) {
								treeObject[itemId] = treeObject[itemId] || {
									ancestryArray: ancestorsArray,
									count: 0,
									descs: [],
									depth: ancestorsArray.length + 1,
									name: item.get('name')
								};
							}
						});
					}
				});

				// Step 2 - sort the tree nodes by their depth from deepest to shallowest
				var treeArray = [];
				for (var itemId in treeObject) {
					if (treeObject.hasOwnProperty(itemId)) {
						treeArray.push(itemId);
					}
				}
				// We sort the treeArray in reverse by depth
				treeArray.sort(function (a, b) {
					if (treeObject[a].depth == treeObject[b].depth) return 0;
					return treeObject[a].depth > treeObject[b].depth ? -1 : 1;
				});

				// Step 3 - traverse from deepest node, creating a section if it has enough descendants
				// Where we create a node, we remove those items from higher up in the tree, and remove that node as well.
				// If the node did not pass the threshold, BUT it sits at the minimum depth that we care about, then it becomes a section too.
				var orderedKeys = [];
				treeArray.forEach(function (itemId) {
					var descCount = treeObject[itemId].count;
					if (descCount >= options.threshold || treeObject[itemId].depth <= options.minDepth) {
						if (treeObject[itemId].skipIfEmpty && treeObject[itemId].descs.length == 0) return;
						// Create the sectionsObject
						sectionsObject[itemId] = sectionsObject[itemId] || _ember['default'].Object.create({
							title: treeObject[itemId].name,
							slug: (itemId + ' ' + treeObject[itemId].name).replace(/ /g, '+'),
							scrollSlug: (itemId + ' ' + treeObject[itemId].name).replace(/ /g, '_'),
							items: _ember['default'].ArrayProxy.create({ content: treeObject[itemId].descs }),
							count: treeObject[itemId].count,
							innerSort: 'name',
							subsections: null
						});
						orderedKeys.push(itemId);
						// now remove these items from the node's ancestors
						treeObject[itemId].ancestryArray.forEach(function (nodeAncestorId, index) {
							// reduce the count of that node's children - and +1 for this node itself
							treeObject[nodeAncestorId].count -= descCount + 1;
							treeObject[nodeAncestorId].skipIfEmpty = true;
							// now remove the actual descendants from that ancestor node
							treeObject[itemId].descs.forEach(function (desc) {
								treeObject[nodeAncestorId].descs.removeObject(desc);
							});
							// Now remove this own node from that ancestor
							treeObject[nodeAncestorId].descs = treeObject[nodeAncestorId].descs.reject(function (desc) {
								return desc.get('id') == itemId;
							});
						});
					}
				});
				// now sort the ordered keys based on the count of items in the node in reverse order, or in A-Z order:
				if (sectionType == 'geo-auto') {

					orderedKeys.sort(function (a, b) {
						if (treeObject[a].count == treeObject[b].count) return 0;
						return treeObject[a].count > treeObject[b].count ? -1 : 1;
					});
				} else {
					orderedKeys.sort(function (a, b) {
						if (treeObject[a].name == treeObject[b].name) return 0;
						return treeObject[a].name > treeObject[b].name ? 1 : -1;
					});
				}
			} else if (sectionType == 'item') {
				//------ sort for item pages

				// split items by section
				var destinations = _ember['default'].ArrayProxy.create({ content: [] }),
				    attractions = _ember['default'].ArrayProxy.create({ content: [] }),
				    restaurants = _ember['default'].ArrayProxy.create({ content: [] }),
				    hotels = _ember['default'].ArrayProxy.create({ content: [] });
				items.forEach(function (item) {
					var itemType = item.get('itemType');
					if (_tripmindAppconfigConstants['default'].GOOGLE_PLACE_DESTINATION_TYPES.indexOf(itemType) > -1) {
						destinations.pushObject(item);
					} else if (_tripmindAppconfigConstants['default'].GOOGLE_PLACE_RESTAURANT_TYPES.indexOf(itemType) > -1) {
						restaurants.pushObject(item);
					} else if (_tripmindAppconfigConstants['default'].GOOGLE_PLACE_NIGHTLIFE_TYPES.indexOf(itemType) > -1) {
						restaurants.pushObject(item);
					} else if (_tripmindAppconfigConstants['default'].GOOGLE_PLACE_HOTEL_TYPES.indexOf(itemType) > -1) {
						hotels.pushObject(item);
					} else {
						attractions.pushObject(item);
					}
				});
				if (destinations.get('length') > 0) sectionsObject[0] = _ember['default'].Object.create({
					title: 'Destinations',
					scrollSlug: 'destinations',
					items: destinations,
					innerSort: 'name'
				});
				if (attractions.get('length') > 0) sectionsObject[1] = _ember['default'].Object.create({
					title: 'Attractions',
					scrollSlug: 'attractions',
					items: attractions,
					innerSort: 'geo'
				});
				if (restaurants.get('length') > 0) sectionsObject[2] = _ember['default'].Object.create({
					title: 'Restaurants',
					scrollSlug: 'restaurants',
					items: restaurants,
					innerSort: 'geo'
				});
				if (hotels.get('length') > 0) sectionsObject[3] = _ember['default'].Object.create({
					title: 'Hotels',
					scrollSlug: 'hotels',
					items: hotels,
					innerSort: 'geo'
				});
				var orderedKeys = [0, 1, 2, 3];
			} else if (sectionType == 'category') {

				// Organize items into sections
				items.forEach(function (item) {
					var itemType = item.get('itemType').replace(/_/g, " ").capitalize();
					sectionsObject[itemType] = sectionsObject[itemType] || _ember['default'].Object.create({
						title: itemType,
						scrollSlug: item.get('itemType'),
						items: _ember['default'].ArrayProxy.create({ content: [] }),
						innerSort: 'name'
					});
					sectionsObject[itemType].items.pushObject(item);
				});
				var orderedKeys = Object.keys(sectionsObject).sort();
			} else if (sectionType == 'date') {
				// Organize items into sections
				items.forEach(function (item) {
					var updatedDate = item.get('updatedAtRecently');
					sectionsObject[updatedDate] = sectionsObject[updatedDate] || _ember['default'].Object.create({
						title: updatedDate,
						value: item.get('updatedAt'),
						scrollSlug: updatedDate.replace(/[\/\s]/g, "_"),
						items: _ember['default'].ArrayProxy.create({ content: [] }),
						innerSort: 'date'
					});
					sectionsObject[updatedDate].items.pushObject(item);
				});
				var orderedKeys = Object.keys(sectionsObject).sort(function (a, b) {
					return sectionsObject[a].value > sectionsObject[b].value ? -1 : 1;
				});
			}

			// Order sectionsObject into an array according to the sorted keys
			orderedKeys.forEach(function (key) {
				if (sectionsObject[key]) orderedSections.pushObject(sectionsObject[key]);
			});
			return orderedSections;
		},

		_subsectionSections: function _subsectionSections(sectionsArray, subSectionType, options) {
			var self = this;
			sectionsArray.forEach(function (section) {
				if (options.sortOnly) {
					section.setProperties({
						subsections: null,
						sortedItems: section.get('items').sortBy(subSectionType)
					});
				} else {
					section.setProperties({
						subsections: self._sectionItems(section.get('items'), subSectionType, options),
						sortedItems: null
					});
				}
			});
		},

		//We will have major sections (France-USA.../Museum-Nature.../This week-Last week.../) Then subsections.
		// sections have a left-side shortcut menu
		// sub sections can be minimized then appear as a stack of cards
		// both section and subsection heads can be items which would make them clickable
		// both section and subsection heads can be used as a select all trigger
		// both sections and subsedtions can be sorted according to whatever we like -
		// - but this is controlled from the major section holder here
		// The major section holder has a menu where you can determine the filtering and sort for both sections and subsections

		// major section: Title Item, items in order

		actions: {
			updateSortOptions: function updateSortOptions() {
				this.notifyPropertyChange('majorSortOptions');
				this.notifyPropertyChange('subSortOptions');
				_ember['default'].run.scheduleOnce('sync', this, 'updateSections');
			},
			updateFilter: function updateFilter() {
				this.notifyPropertyChange('filterOptions');
				this.shouldRefilterItems();
				_ember['default'].run.scheduleOnce('sync', this, 'updateSections');
				console.log('refiltering!');
			},
			scrollToSection: function scrollToSection(destination) {
				var newOffset = destination == "top" ? 0 : $('#major-section-' + destination).offset().top;
				$('body').animate({ scrollTop: newOffset }, 200);
			},
			toggleRecs: function toggleRecs() {
				this.toggleProperty('withRecs');
			}
		}
	});
});
define('tripmind/components/map-expand-toggle', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		mapService: _ember['default'].inject.service('map-service'),
		classNames: ['map-expand-toggle'],
		classNameBindings: ['isExpanded'],
		isExpanded: _ember['default'].computed.alias('mapService.isExpanded'),

		click: function click() {
			this.get('mapService').toggleExpanded();
		}

	});
});
define('tripmind/components/map-marker', ['exports', 'ember', 'tripmind/appconfig/gmaps'], function (exports, _ember, _tripmindAppconfigGmaps) {

	var MapMarker = _ember['default'].Component.extend({
		mapService: _ember['default'].inject.service('map-service'),

		// static properties
		model: null,
		id: null,
		anchorPoint: new google.maps.Point(0, 0),
		labelAnchor: new google.maps.Point(0, 0),
		defaultLabelClass: 'map-marker',
		addedLabelClass: null,
		baseDepth: 1,
		_marker: null,

		// dynamic properties
		lat: 0,
		lng: 0,
		position: (function () {
			return new google.maps.LatLng(this.get('lat'), this.get('lng'));
		}).property('lat', 'lng'),
		map: null,
		visible: false,
		clickable: true,
		draggable: false,

		hovered: false,
		isExpanded: false,
		enlarged: false,

		labelName: null,
		labelType: null,
		labelOneliner: null,
		labelImageStyle: _ember['default'].computed.alias('itemImageStyle'),

		hoveredIcon: _tripmindAppconfigGmaps['default'].markerIcons.dot,
		unhoveredIcon: _tripmindAppconfigGmaps['default'].markerIcons.dot,

		hoverMarker: function hoverMarker() {},
		unhoverMarker: function unhoverMarker() {},

		isItemHovered: _ember['default'].computed.alias('model.isHovered'),

		didInsertElement: function didInsertElement() {
			this._super();
			//console.log('building marker', this.get('labelName'))
			var marker = new MarkerWithLabel(this._initOptions());
			this.set('_marker', marker);
			this._setListeners(marker);
			this._setObservers();
		},

		willDestroyElement: function willDestroyElement() {
			this._super();
			//console.log('destroying marker', this.get('labelName'))
			var marker = this.get('_marker');
			google.maps.event.clearInstanceListeners(marker);
			marker.setMap(null);
		},

		icon: (function () {
			if (this.get('isItemHovered')) return this.get('itemHoveredIcon');
			return this.get('isExpanded') ? this.get('hoveredIcon') : this.get('unhoveredIcon');
		}).property('isItemHovered', 'isExpanded', 'unhoveredIcon'),

		depth: (function () {
			return this.get('isExpanded') ? 0 : this.get('baseDepth');
		}).property('isExpanded', 'baseDepth'),

		zIndex: (function () {
			return google.maps.Marker.MAX_ZINDEX - this.get('depth');
		}).property('depth'),

		// Organize the content of the marker
		isExpanded: false,

		defaultLabelClass: 'map-marker item',

		labelClass: (function () {
			var labelClass = [this.get('defaultLabelClass')];
			if (this.get('addedLabelClass')) labelClass.push(this.get('addedLabelClass'));
			if (this.get('isExpanded')) labelClass.push('prominent');

			return labelClass.join(' ');
		}).property('defaultLabelClass', 'addedLabelClass', 'isExpanded'),

		labelContent: (function () {
			var markerImageString = '<div class="marker-image-container"><div class="marker-image photo-div" style="' + this.get('labelImageStyle') + '"></div></div>',
			    markerLabelString = '<div class="marker-label">' + this.get('labelName') + '</div>',
			    markerOnlinerString = this.get('labelOneliner') ? '<div class="marker-oneliner">' + this.get('labelOneliner') + '</div>' : "",
			    markerReadMoreString = '<div class="read-more">READ MORE</div>',
			    markerDetailsString = '<div class="marker-details">' + markerLabelString + markerOnlinerString + markerReadMoreString + '</div>';
			return markerImageString + markerDetailsString;
		}).property('labelName', 'labelImageStyle', 'labelType', 'labelOneliner'),

		clickMarker: function clickMarker() {},

		_initOptions: function _initOptions() {
			return this.getProperties(_ember['default'].String.w('id anchorPoint icon position map visible clickable draggable labelAnchor labelName labelClass labelContent zIndex'));
		},

		_setListeners: function _setListeners(marker) {
			var self = this;
			google.maps.event.addListener(marker, 'click', function (e) {
				self.clickMarker(e);
			});
			google.maps.event.addListener(marker, 'mouseover', function (e) {
				self.set('hovered', true);
				self.hoverMarker(e);
			});
			google.maps.event.addListener(marker, 'mouseout', function (e) {
				self.set('hovered', false);
				self.unhoverMarker(e);
			});
			google.maps.event.addListener(marker, 'dragend', function () {
				console.log(marker.getPosition().lat(), marker.getPosition().lng());
				self.model.setProperties({
					lat: marker.getPosition().lat(),
					lng: marker.getPosition().lng()
				});
			});
		},

		_setObservers: function _setObservers() {
			var self = this;

			// keys that have a matching setKey(value) function on the _marker
			var observableKeys = _ember['default'].String.w('clickable draggable icon position map visible zIndex');
			observableKeys.forEach(function (key) {
				self.addObserver(key, function () {
					_ember['default'].run.once(self.get('_marker'), 'set' + key.capitalize(), self.get(key));
				});
			});

			// keys that don't have a setKey function on the _marker use setKey on self
			var optionsKeys = _ember['default'].String.w('labelClass labelContent');
			optionsKeys.forEach(function (key) {
				self.addObserver(key, function () {
					_ember['default'].run.once(self, '_set' + key.capitalize(), self.get(key));
				});
			});
		},

		_setLabelClass: function _setLabelClass(labelClass) {
			this.get('_marker').setOptions({ labelClass: labelClass });
		},

		_setLabelContent: function _setLabelContent(labelContent) {
			this.get('_marker').setOptions({ labelContent: labelContent });
		}

	});

	exports['default'] = MapMarker;
});
define('tripmind/components/map-placeholder', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		mapService: _ember['default'].inject.service('map-service'),
		classNames: ['map-placeholder'],

		didInsertElement: function didInsertElement() {
			_ember['default'].run.scheduleOnce('afterRender', this, 'attachMap');
		},

		willDestroyElement: function willDestroyElement() {
			this.detachMap();
		},

		modelDidChange: (function () {
			_ember['default'].run.scheduleOnce('afterRender', this, 'attachMap');
		}).observes('model').on('init'),

		attachMap: function attachMap() {
			var container = this.$(),
			    mapService = this.get('mapService');
			mapService.changeCenter(this.get('model.lat'), this.get('model.lng'));
			mapService.set('minimizedHolder', container);
			if (!mapService.get('isExpanded')) {
				mapService.moveDomToElement(container);
				mapService.setProperties({
					draggable: false,
					disableDefaultUI: true,
					bounds: this.get('boundsForMap')
				});
			}
		},

		detachMap: function detachMap() {
			var mapService = this.get('mapService'),
			    container = $('#expanded-map');
			mapService.moveDomToElement(container);
			mapService.set('minimizedHolder', null);
			mapService.setProperties({
				draggable: true,
				disableDefaultUI: false,
				bounds: this.get('boundsForMap')
			});
		}

	});
});
define('tripmind/components/map-resize', ['exports', 'ember', 'tripmind/mixins/draggable'], function (exports, _ember, _tripmindMixinsDraggable) {
	exports['default'] = _ember['default'].Component.extend(_tripmindMixinsDraggable['default'], {
		screenDefService: _ember['default'].inject.service('screen-defs'),
		mapService: _ember['default'].inject.service('map-service'),
		classNameBindings: ['hidden'],
		hidden: _ember['default'].computed.not('mapService.isExpanded'),
		elementId: 'map-resize',
		drag_axis: 'x',

		drag_containment: (function () {
			return [600, 0, this.get('screenDefService.screenWidth') - 200, 10];
		}).property('screenDefService.screenWidth'),

		drag_stop: function drag_stop(event, ui) {
			var newWidth = $(document).innerWidth() - ui.offset.left - 5;
			this.set('screenDefService.mapWidth', newWidth);
			this.get('mapService').resizeMap();
			ga('send', 'event', 'map', 'resize');
		}

	});
});
define('tripmind/components/map-route', ['exports', 'ember', 'tripmind/appconfig/gmaps'], function (exports, _ember, _tripmindAppconfigGmaps) {
	exports['default'] = _ember['default'].Component.extend({
		mapService: _ember['default'].inject.service('map-service'),
		directionsService: _ember['default'].computed.alias('mapService.directionsService'),

		waypoints: (function () {
			return this.get('items').map(function (item) {
				return { location: new google.maps.LatLng(item.get('lat'), item.get('lng')) };
			});
		}).property('items.[]'),

		itemNameString: (function () {
			var nameString = this.get('items').map(function (item) {
				return item.get('name');
			}).join("");
			return nameString;
		}).property('items.[]'),

		_getDirections: function _getDirections() {
			var self = this;
			return new _ember['default'].RSVP.Promise(function (resolve, reject) {
				var waypoints = self.get('waypoints');

				if (waypoints.get('length') < 2) resolve(0);

				var origin = waypoints[0];
				var destination = waypoints[waypoints.length - 1];
				var request = {
					origin: origin.location,
					destination: destination.location,
					waypoints: waypoints.slice(1, [waypoints.length - 1]),
					travelMode: google.maps.TravelMode.DRIVING
				};

				self.get('directionsService').route(request, function (response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						console.log('success drawing route');
						resolve(response);
					} else if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
						console.log('zero results!');
						resolve(0);
					} else {
						console.log('route not drawn:', status);
						reject(status);
					}
				});
			});
		},

		_drawDirections: function _drawDirections(response) {
			var directionsDisplay = this.get('directionsDisplay');

			directionsDisplay.setDirections(response);
			directionsDisplay.setMap(this.get('mapService.googleMapObject'));
		},

		didInsertElement: function didInsertElement() {
			this._super();
			var displayOptions = $.extend(_tripmindAppconfigGmaps['default'].directionsDisplayOptions, {
				polylineOptions: _tripmindAppconfigGmaps['default'].createPolylineOptions(this.get('color'))['default']
			});
			var directionsDisplay = new google.maps.DirectionsRenderer(_tripmindAppconfigGmaps['default'].directionsDisplayOptions);
			this.set('directionsDisplay', directionsDisplay);
			directionsDisplay.setMap(this.get('mapService.googleMapObject'));
			_ember['default'].run.scheduleOnce('afterRender', this, '_refreshDirections');
			this.get('itemNameString');
		},

		colorDidChange: (function () {
			var directionsDisplay = this.get('directionsDisplay');
			if (directionsDisplay) {
				directionsDisplay.polylineOptions = _tripmindAppconfigGmaps['default'].createPolylineOptions(this.get('color'))['default'];
			}
		}).observes('color').on('init'),

		_refreshDirections: function _refreshDirections() {
			var self = this;
			this._getDirections().then(function (response) {
				var modelForDistance = self.get('modelForDistance');
				if (response != 0) {
					if (modelForDistance) {
						var totalTravel = response.routes[0].legs.reduce(function (pv, el) {
							return pv + el.duration.value;
						}, 0);
						var legTravel = response.routes[0].legs.map(function (leg) {
							return _ember['default'].Object.create({
								driveTime: leg.duration.value,
								distance: leg.distance.value
							});
						});
						modelForDistance.setProperties({
							totalTravel: totalTravel,
							legTravel: legTravel
						});
					}
					self._drawDirections(response);
				} else {
					if (modelForDistance) {
						modelForDistance.set('totalTravel', 0);
					}
					self.get('directionsDisplay').setMap(null);
				}
			});
		},

		itemsDidChange: (function () {
			this._checkItemOrder();
		}).observes('items.[]').on('init'),

		_checkItemOrder: function _checkItemOrder() {
			var currentOrder = this.get('itemNameString');
			if (currentOrder != this.get('oldNameString')) {
				this.set('oldNameString', currentOrder);
				_ember['default'].run.scheduleOnce('afterRender', this, '_refreshDirections');
			}
		},

		willDestroyElement: function willDestroyElement() {
			var directionsDisplay = this.get('directionsDisplay');
			directionsDisplay.setMap(null);
			this._super();
		}

	});
});
define('tripmind/components/modal-dialog-overlay', ['exports', 'ember-modal-dialog/components/modal-dialog-overlay'], function (exports, _emberModalDialogComponentsModalDialogOverlay) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialogOverlay['default'];
    }
  });
});
define('tripmind/components/modal-dialog', ['exports', 'ember', 'ember-modal-dialog/components/modal-dialog'], function (exports, _ember, _emberModalDialogComponentsModalDialog) {
	exports['default'] = _emberModalDialogComponentsModalDialog['default'].extend({
		setup: (function () {
			var _this = this;

			_ember['default'].$('body').on('keyup.modal-dialog', function (e) {
				if (e.keyCode === 27) {
					_this.sendAction('close');
				}
			});
		}).on('didInsertElement'),

		teardown: (function () {
			_ember['default'].$('body').off('keyup.modal-dialog');
		}).on('willDestroyElement')
	});
});
define('tripmind/components/open-tripmind', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['online-only', 'open-tripmind'],

		actions: {
			openExtension: function openExtension() {
				this.get('targetObject').send('openExtension', true);
			}
		}

	});
});
define('tripmind/components/refresh-done', ['exports', 'ember', 'tripmind/mixins/sortable'], function (exports, _ember, _tripmindMixinsSortable) {
	exports['default'] = _ember['default'].Component.extend({
		didInsertElement: function didInsertElement() {
			this._super();
			var self = this;
			console.log('refreshing!', this.get('parentComponent.elementId'));
			_ember['default'].run.scheduleOnce('afterRender', this, function () {
				self.set('parentComponent.needsRefresh', false);
			});
		}

	});
});
define('tripmind/components/search-field-wrapper', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		wrappedField: null,
		searchService: _ember['default'].inject.service('search-service'),
		results: [],

		actions: {
			clearSearch: function clearSearch() {
				this.set('wrappedField.query', '');
				this.get('targetObject').send('transitionToSearch');
			},
			foundItem: function foundItem(route, payload) {
				this.sendAction('foundItem', route, payload);
			},
			loading: function loading(status) {
				if (status) {
					this.get('targetObject').send('loading');
				} else {
					this.get('targetObject').send('stopLoading');
				}
			},
			submit: function submit(query) {
				this.get('targetObject').send('loading');
				this.get('wrappedField').$().autocomplete('close');
				var self = this;
				if (query.length > 0) this.get('targetObject').send('transitionToResults', query);
				this.get('wrappedField').$().autocomplete("close");
				this.get('wrappedField').$().blur();
				ga('send', 'event', 'search', 'searchFieldSubmit');
			}
		}

	});
});
define('tripmind/components/search-field', ['exports', 'ember', 'tripmind/mixins/autocomplete'], function (exports, _ember, _tripmindMixinsAutocomplete) {
	exports['default'] = _ember['default'].TextField.extend(_tripmindMixinsAutocomplete['default'], {
		autocomplete_service: _ember['default'].inject.service('places-autocomplete'),
		autocomplete_emberobj: null,
		searchService: _ember['default'].inject.service('search-service'),
		classNames: ['search-field'],
		valueBinding: "query",
		placeholder: "Explore any destination...",
		searchCache: null,
		withAutofocus: true,

		init: function init() {
			this._super();
			this.set('autocomplete_emberobj', this);
		},

		didInsertElement: function didInsertElement() {
			this.setupWidget();
			this.set('parentView.wrappedField', this);
			if (this.get('withAutofocus')) this.$().focus();
		},

		autocomplete_source: function autocomplete_source(request, response) {
			// TODO: add params for location biasing acc. to:
			// https://developers.google.com/maps/documentation/javascript/reference#QueryAutocompletionRequest
			var self = this;
			this.options['service'].get('service').getQueryPredictions({ input: request.term }, function (predictions, status) {
				if (status != google.maps.places.PlacesServiceStatus.OK) {
					return;
				}
				self.options['emberobj'].set('searchCache', predictions);
				response($.map(predictions, function (prediction, i) {
					return {
						label: prediction.description
					};
				}));
			});
		},

		autocomplete_select: function autocomplete_select(event, ui) {
			// find the relevant prediction from the full set
			var selectedPrediction = this.get('searchCache').find(function (prediction) {
				return prediction.description == ui.item.value;
			});

			// run wanderant search on the selected place_id
			var self = this;
			this.$().autocomplete('close');
			this.$().blur();
			this.get('targetObject').send('loading', true);

			// if user selected a specific place, we immediately look for it in Wanderant's db then google's
			if (selectedPrediction.place_id) {
				var searchService = this.get('searchService');
				searchService.findOrCreateFromPlaceId(selectedPrediction.place_id).then(function (item) {
					self.sendAction('foundItem', 'item', item.get('slug'));
					self.send('clearSearch');
					self.get('targetObject').send('loading', false);
				}, function (status) {
					console.log('no results found');
				});
				ga('send', 'event', 'search', 'autocompleteSelect', selectedPrediction.place_id);
			} else {
				//submit the search
				self.get('parentView').send('submit', this.get('query'));
				ga('send', 'event', 'search', 'searchSubmit', this.get('query'));
			}
		},

		actions: {
			clearSearch: function clearSearch() {
				this.set('query', '');
				ga('send', 'event', 'search', 'clearSearch');
			}
		}

	});
});
define('tripmind/components/section-holder', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['section'],
		classNameBindings: ['isMinimized'],
		isMinimized: false,
		model: null,

		actions: {
			toggleMinimized: function toggleMinimized() {
				this.toggleProperty('isMinimized');
			}
		}
	});
});
define('tripmind/components/select-many', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		options: null,

		actions: {
			toggleThis: function toggleThis(value) {
				var options = this.get('options');
				options.forEach(function (option) {
					if (option.get('value') == value) option.toggleProperty('isSelected');
				});
				this.get('onChange')();
			}
		}
	});
});
define('tripmind/components/select-one', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		options: null,

		actions: {
			selectThis: function selectThis(value) {
				var options = this.get('options');
				options.forEach(function (option) {
					option.set('isSelected', option.get('value') == value);
				});
				this.get('onChange')();
			}
		}
	});
});
define('tripmind/components/share-collection', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		store: _ember['default'].inject.service('store'),
		actionService: _ember['default'].inject.service('action-service'),
		feedbackService: _ember['default'].inject.service('feedback-service'),

		sharedLink: (function () {
			return 'https://www.tripmind.online/#/collections/' + this.get('model.tmToken');
		}).property('model.tmToken'),

		didInsertElement: function didInsertElement() {
			_ember['default'].run.scheduleOnce('afterRender', this, 'sendSharingData');
		},

		sendSharingData: function sendSharingData() {
			var self = this,
			    model = this.get('model');
			this.set('loading', true);
			model.getTmToken().then(function (result) {
				if (result.redirect) {
					self.get('targetObject').send('triggerTransition', 'collection', result.token);
					self.set('model', result.newModel);
					return result.newModel.postToServer();
				} else {
					return model.postToServer();
				}
			}).then(function (result) {
				//TODO: Send the code and codesystem to the collection for storage then on acceptance set loading to false
				self.set('code', result.code);
				self.set('codeSystem', result.compressed);
				self.set('loading', false);
				ga('send', 'event', 'shareCollection', 'success');
			});
		},

		actions: {
			copyLink: function copyLink() {
				var copyTextarea = this.$('.share-input:eq(0)');
				copyTextarea.select();

				try {
					var successful = document.execCommand('copy');
					var msg = successful ? 'successful' : 'unsuccessful';
					var feedbackSentence = successful ? "Link has been copied to clipboard" : "Couldn't copy link",
					    feedbackAddedClass = successful ? 'success' : 'failure';
				} catch (err) {
					var feedbackSentence = "Couldn't copy link",
					    feedbackAddedClass = 'failure';
				}
				this.get('feedbackService').setProperties({
					isShowing: true,
					feedbackSentence: feedbackSentence,
					feedbackAddedClass: feedbackAddedClass,
					feedbackDuration: 3000
				});
			}
		}

	});
});
define('tripmind/components/style-guide', ['exports', 'ember', 'tripmind/config/environment'], function (exports, _ember, _tripmindConfigEnvironment) {
	exports['default'] = _ember['default'].Component.extend({
		service: _ember['default'].inject.service('screen-defs'),
		mapWidth: _ember['default'].computed.alias('service.actualMapWidth'),
		barRightWidth: (function () {
			return Math.max(this.get('mapWidth'), 48);
		}).property('mapWidth'),
		// Hide all editing elements on the online version
		hideEditing: (function () {
			return _tripmindConfigEnvironment['default'].environment === 'production';
		}).property(),
		hasExtension: false,
		requiredVersion: 1.0,

		rhsBorderRight: (function () {
			if (this.get('service.screenWidth') < 500) {
				return 0;
			} else {
				return this.get('mapWidth');
			}
		}).property('mapWidth', 'service.screenHeight', 'service.screenWidth'),

		rhsBorderTop: (function () {
			if (this.get('service.screenWidth') < 500 && this.get('service.mapService.isExpanded')) {
				return this.get('service.screenHeight') * 0.4;
			} else {
				return 0;
			}
		}).property('service.mapService.isExpanded', 'service.screenHeight', 'service.screenWidth'),

		didInsertElement: function didInsertElement() {
			var self = this;
			if (typeof chrome.runtime != "undefined") {
				chrome.runtime.sendMessage(_tripmindConfigEnvironment['default'].chromeExtensionId, { message: "version" }, function (reply) {
					if (reply && reply.version && reply.version >= self.get('requiredVersion')) {
						self.set('hasExtension', true);
					}
				});

				_ember['default'].run.later(function () {
					self.set('doneCheckExtension', true);
				}, 2000);
			}
		}

	});
});
define('tripmind/components/sub-section', ['exports', 'ember', 'tripmind/mixins/section-mixin'], function (exports, _ember, _tripmindMixinsSectionMixin) {
	exports['default'] = _ember['default'].Component.extend(_tripmindMixinsSectionMixin['default'], {
		store: _ember['default'].inject.service('store'),
		classNames: ['sub-section'],

		mouseEnter: function mouseEnter() {
			if (this.get('model.count') || !this.get('model.slug')) return;
			var item = this.get('store').peekRecord('item', this.get('model.slug').split("+")[0]);
			item.set('isHovered', true);
		},
		mouseLeave: function mouseLeave() {
			if (this.get('model.count') || !this.get('model.slug')) return;
			var item = this.get('store').peekRecord('item', this.get('model.slug').split("+")[0]);
			item.set('isHovered', false);
		}
	});
});
define('tripmind/components/temp-item-card', ['exports', 'ember', 'tripmind/components/item-card', 'tripmind/appconfig/geo_distance'], function (exports, _ember, _tripmindComponentsItemCard, _tripmindAppconfigGeo_distance) {
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports['default'] = _tripmindComponentsItemCard['default'].reopen({
		classNames: ['temporary'],
		persistRecord: false,
		store: _ember['default'].inject.service('store'),

		closestDistance: (function () {
			var fromItems = this.get('fromItems'),
			    item = this.get('model'),
			    minDistance,
			    minItem;
			var result = _tripmindAppconfigGeo_distance['default'].minDistance(item, fromItems);
			if (result) {
				var _result = _slicedToArray(result, 2);

				minDistance = _result[0];
				minItem = _result[1];
			} else {
				return null;
			}
			var distanceText, distanceTime, travelClass;
			switch (true) {
				case minDistance == 0:
					if (this.get('model.name') == minItem.get('name')) {
						distanceText = 'Already in collection';
					} else {
						distanceText = 'Next to  ' + minItem.get('name');
					}
					break;
				case minDistance < 0.1:
					distanceTime = Math.round(minDistance / 5 * 60);
					distanceText = 'Next to  ' + minItem.get('name');
					travelClass = "icon-walk";
					break;

				case minDistance < 1:
					distanceTime = Math.round(minDistance / 5 * 60);
					distanceText = distanceTime + 'min from ' + minItem.get('name');
					travelClass = "icon-walk";
					break;
				case minDistance < 75:
					distanceTime = Math.max(1, Math.round(minDistance / 50 * 6)) * 10;
					distanceText = distanceTime + 'min from  ' + minItem.get('name');
					travelClass = "icon-drive";
					break;
				case minDistance < 300:
					distanceTime = Math.round(minDistance / 50);
					distanceText = 'about ' + distanceTime + 'hrs from ' + minItem.get('name');
					travelClass = "icon-drive";
					break;
				default:
					distanceTime = Math.round(minDistance / 50);
					distanceText = 'Too far, take a flight!';
					travelClass = "icon-fly";
					break;
			}
			return _ember['default'].Object.create({ item: minItem, distance: minDistance, distanceText: distanceText, travelClass: travelClass });
		}).property('model.lat', 'fromItems.[].lat'),

		willDestroyElement: function willDestroyElement() {
			if (this.get('persistRecord')) {
				this.get('model').set('isTemporary', false);
				this.get('model').getAdditionalItemInfo();
			} else if (this.get('model.isTemporary')) {
				this.get('model').destroyRecord();
			}
			this._super();
		},

		actions: {
			persistItem: function persistItem() {
				this.set('persistRecord', true);
			},
			selectAction: function selectAction(type, itemSlug) {
				this.set('persistRecord', true);
				this.get('selectAction')(type, itemSlug);
			}
		}

	});
});
define('tripmind/components/tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _emberModalDialogComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsTetherDialog['default'];
    }
  });
});
define('tripmind/controllers/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		displayService: _ember['default'].inject.service('display-service'),

		actions: {
			toggleModal: function toggleModal() {
				this.get('displayService').closeTopModal();
			}
		}
	});
});
define('tripmind/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('tripmind/controllers/collection', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		store: _ember['default'].inject.service('store'),
		withCategories: false,

		actions: {
			addDate: function addDate(position) {
				this.get('model').addDate(position);
			},
			toggleCategories: function toggleCategories() {
				this.toggleProperty('withCategories');
			},
			addToCollection: function addToCollection(type, itemSlug) {
				var self = this,
				    model = this.get('model'),
				    itemId = itemSlug.split('+')[0];
				model.get('items').then(function (items) {
					self.get('store').findRecord(type, itemId).then(function (item) {
						items.addObject(item);
						item.save();
						model.save();
					});
				});
			}
		}
	});
});
define('tripmind/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('tripmind/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('tripmind/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('tripmind/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _emberModalDialogInitializersAddModalsContainer) {
  exports['default'] = {
    name: 'add-modals-container',
    initialize: _emberModalDialogInitializersAddModalsContainer['default']
  };
});
define('tripmind/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'tripmind/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _tripmindConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_tripmindConfigEnvironment['default'].APP.name, _tripmindConfigEnvironment['default'].APP.version)
  };
});
define('tripmind/initializers/chrome_extension_utils', ['exports', 'ember'], function (exports, _ember) {
	exports.initialize = initialize;

	function initialize(application) {}

	;

	exports['default'] = {
		name: 'chrome-extension-utils',
		initialize: initialize
	};
});
define('tripmind/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('tripmind/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('tripmind/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('tripmind/initializers/export-application-global', ['exports', 'ember', 'tripmind/config/environment'], function (exports, _ember, _tripmindConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_tripmindConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _tripmindConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_tripmindConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('tripmind/initializers/extend-array', ['exports', 'ember'], function (exports, _ember) {
	exports.initialize = initialize;

	function initialize(application) {
		Array.prototype.rotate = function () {
			var result = this.slice(1, this.length);
			result.push(this[0]);
			return result;
		};

		// Return true if all values are the same
		Array.prototype.isUniform = function () {
			var result = this[0];
			for (var i = 1; i < this.length; i++) {
				if (!this[i].compare(result)) {
					return false;
				}
			}
			return true;
		};

		Array.prototype.compare = function (other) {
			// if the array or the other array is a falsy value, return
			if (!this || !other) {
				return false;
			}

			// compare lengths - can save a lot of time
			if (this.length != other.length) {
				return false;
			}

			for (var i = 0, l = this.length; i < l; i++) {
				// Check if we have nested arrays
				if (this[i] instanceof Array && other[i] instanceof Array) {
					// recurse into the nested arrays
					if (!this[i].compare(other[i])) {
						return false;
					}
				} else if (this[i] != other[i]) {
					// Warning - two different object instances will never be equal: {x:20} != {x:20}
					return false;
				}
			}
			return true;
		};
	}

	;

	exports['default'] = {
		name: 'extend-array',
		initialize: initialize
	};
});
define('tripmind/initializers/extend-controller', ['exports', 'ember'], function (exports, _ember) {
	exports.initialize = initialize;

	function initialize(application) {
		_ember['default'].Controller.reopen({
			displayService: _ember['default'].inject.service('display-service')
		});
	}

	;

	exports['default'] = {
		name: 'extend-controller',
		initialize: initialize
	};
});
define('tripmind/initializers/google_analytics', ['exports'], function (exports) {
	exports['default'] = {
		name: 'ga',
		initialize: function initialize() {
			(function (i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
					(i[r].q = i[r].q || []).push(arguments);
				}, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
			})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
			window.ga = window.ga || function () {
				(ga.q = ga.q || []).push(arguments);
			};ga.l = +new Date();
			ga('create', 'UA-77264031-1', 'auto');
		}
	};
});
define('tripmind/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('tripmind/initializers/link-with-action', ['exports', 'ember'], function (exports, _ember) {
	exports.initialize = initialize;

	function initialize(application) {
		_ember['default'].LinkComponent.reopen({
			_sendInvokeAction: function _sendInvokeAction() {
				this.sendAction('invokeAction');
			},

			didInitAttrs: function didInitAttrs() {
				this._super.apply(this, arguments);

				// Map desired event name to invoke function
				var eventName = this.get('eventName');

				if (this.get('invokeAction')) {
					this.on(eventName, this, this._sendInvokeAction);
				}
			},

			willDestroyElement: function willDestroyElement() {
				if (this.get('invokeAction')) {
					this.off(this.get('eventName'), this, this._sendInvokeAction);
				}
			}
		});
	}

	;

	exports['default'] = {
		name: 'link-with-action',
		initialize: initialize
	};
});
define('tripmind/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('tripmind/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("tripmind/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('tripmind/instance-initializers/load_data', ['exports', 'ember', 'tripmind/config/environment'], function (exports, _ember, _tripmindConfigEnvironment) {
	exports.initialize = initialize;

	var places = [];

	var addlData = { data: [{
			id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk",
			type: 'item',
			attributes: {
				ancestryNames: "France/Paris",
				ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
				address: "75001 Paris, France",
				longDesc: "The Louvre Palace is a former royal palace located on the Right Bank of the Seine in Paris, between the Tuileries Gardens and the church of Saint-Germain l'Auxerrois. Wikipedia",
				image: "https://lh5.googleusercontent.com/-HIc3V6HYPg4/VrXryykTJ2I/AAAAAAAAmVo/adAXMHlv0Pw/w3000-k/",
				lat: "48.8606111",
				lng: "2.337644",
				name: "The Louvre",
				place_id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk",
				oneliner: "Palace in Paris, France",
				itemType: "museum",
				updatedAt: "1460548462"
			},
			relationships: {
				collections: {
					data: [{ type: 'collection', id: "tmp1" }]
				}
			}
		}, {
			id: "ChIJ442GNENu5kcRGYUrvgqHw88",
			type: 'item',
			attributes: {
				ancestryNames: "France/Paris",
				ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
				address: "Montmartre hill, Paris, France",
				longDesc: "The Basilica of the Sacred Heart of Paris, commonly known as Sacré-Cœur Basilica and often simply Sacré-Cœur, is a Roman Catholic church and minor basilica, dedicated to the Sacred Heart of Jesus, in Paris, France. ",
				image: "https://lh5.googleusercontent.com/-Bjqfs1z6bJ0/VG8NbQBV5jI/AAAAAAAAAA8/NxjyxM37UAQ/w3000-k/",
				lat: "48.7606111",
				lng: "2.437644",
				name: "Sacre Coeur",
				place_id: "ChIJ442GNENu5kcRGYUrvgqHw88",
				oneliner: "Church in Paris, France",
				itemType: "place of worship",
				trackingStatus: false,
				updatedAt: "1465948462"
			}
		}, { id: "ChIJdbbQwbZx5kcRs7Qu5nPw18g",
			type: 'item',
			attributes: {
				ancestryNames: "France/Paris",
				ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws/ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
				address: "1 Avenue du Colonel Henri Rol-Tanguy, 75014 Paris, France",
				longDesc: "The Catacombs of Paris are underground ossuaries in Paris, France which hold the remains of about six million people in a small part of the ancient Mines of Paris tunnel network. Wikipedia",
				image: "https://lh5.googleusercontent.com/-VpLjFFT9_O8/VAiPrcdVQ9I/AAAAAAAAF4E/o-FmhWyOtJ8/w3000-k/",
				lat: "48.8338325",
				lng: "2.3324222",
				name: "Catacombs of Paris",
				place_id: "ChIJdbbQwbZx5kcRs7Qu5nPw18g",
				oneliner: "Cemetery",
				itemType: "cemetery",
				updatedAt: "1460712462"
			},
			relationships: {
				collections: {
					data: [{ type: 'collection', id: "tmp1" }]
				}
			}
		}, {
			id: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
			type: 'item',
			attributes: {
				ancestryNames: "",
				ancestry: "",
				address: "France",
				longDesc: "France is the most toured country in the World with 80 million visitors annually.",
				//image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOMAAACXCAMAAADQ4xypAAAAFVBMVEX///8AI5XtKTl0e7fzfYTtESgAAJCDlMQAAAAAp0lEQVR4nO3PNwEAMAADoHT6l1wTOXqAAzJq7krPPrMmjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Onx0fofSNkUYueUMAAAAASUVORK5CYII=",
				lat: "46.22606111",
				lng: "2.21",
				name: "France",
				place_id: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
				oneliner: "Country",
				itemType: "country",
				updatedAt: "1460248462"
			}
		}, {
			id: "ChIJCzYy5IS16lQRQrfeQ5K5Oxw",
			type: 'item',
			attributes: {
				ancestryNames: "",
				ancestry: "",
				address: "United States of America",
				longDesc: "The best country in the world according to many!",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAABtCAMAAAAI7HTTAAAAqFBMVEX///+yIjQ8O26uAB+6R1O0MD+sABHt2NnkwsSvDCbaqKyyHzKxGS78+PnHcnmwESkxMGh9fZk4N2w2PHBwM1yQj6e4IC9BQHEtLGbs7PBIR3bz8/YpKGS9vcvU1N0AAFecnLFSUXxzcpMfHl+Hh6GyssKkpLcAAFJlZYkRD1rg4OfKytUaGF1ZWIEAAEUKB1h9ZYN1TnCbeI1oI1NxPWOyAACFc40AAEsXiuB2AAAH+UlEQVR4nO2c2ZLkqBWGGbU9XuUB2rIkJEjQQpFImrLdtuf938wsYqlbuzLEdOiPvvkLdcQ5qZMfh6UKVJ+ur3/92w8XCnxmLrigjFqSR0ZyhwXOHWk/jH1wBywlI9wtzRjjxjNfckcPmFy3qsztH9xzqzAuIiM8Kb1N0xlYO6l+U8GRadJUKRzdsE7RoQPI6ARCg3FlZMRrAEATPmxuDEAhP2nMMJ1j7WpcH1xFrYv5bcbpA5eQUbU3AExzqJ7ZpKTG4N5NSqoL7s0kQaJ7mCSeMJbnBoaqjKqrIJMrsxn5j5tJSsfgnj3fVhgc7Bu2hjF89ItuuuBE32hkM/r27x8vlMuIHOOsWhuiRVerxtkVlhBubB6VC5jYB8jonbJJCtLt9kl8uAfE2NkShP/5/ZXy9Mb+37yiDkc3ytztbgyf7rkJGB2EW5tcBRtwqaqoFiHNIvIqNA0bikhYJkCjI2gZKFJVgFxTSxQAUVJGlY1kQGdkmBvXI5ghL0KOWKcj5NbcFZXRbEJBEXlPmSNvN2ETGJ+koD6ie2NgSGOlZGQ/4V0vcnPYcp+3dRGAgi1rhJxB3rTJCDmSu1IyErZoWtJ1wiHPtnKihaNzrtYI6cbDfvWV7flIBTN3QAgtFuEES8kI7pLPMLwr+FibPTjcPTdlxzzIunlTYxp7Y3YMn+6hhe0HS8ioaXrNm7P+SMMHzZezqSac94yHnkhwXm/8xAUWkgPjfK3hg8ua8slkhH53pWxGEPUGVgFk2LmILjQAwKJbjNuCg9w4egTAc/P5UFOvX7/9+OVCuXdkO7klQm40kEOxd3vSup6yTq7OuryZDQBHyEE2DKSQvq7dEGIWZG6x025TQ+eAvFkr6fs6+00STPHVZuR+orZDyugOdtAFFpKRaWQqhzXhP23YuoBtu9bi4FyXB72DNnQ71hFXqK0fc66EjEK5vdPmPc6p44Muz1BgeHzbUOYe+tjTMqLTZE8zbDkZEUn7nvK4uKO1pjxgbaVA0xOH+DBjjC4BcpQC5uqttIywYgZkAV140h5dvg6tW0kcMzikbY5DmbZQTEZ/ulB51e1rPTSpk6MDQKkGjVOpr2N9ndxD94PKq+6H316oMyOHNbgptLbBCXpM1MbpYj2oWNaIQ7KZmReeDisanH+f18+wNqjJd6guXuj3d4JrzpxdvBhZ5LWng4tz0LuRF9PXzW+rfIQCw/MvG39L7sFQcvuTTenJ/ed+ekQA7gaA710RGWFqFjhsPSMjVINBh2+6oLo27sSa2DQwbV4AIDNOn7tiZrq1YwaAJWREqAFZQBcmBnkrDpAT1sWp5zDIC3yvoNLZNl9ncFg3Zbyjal77Qca+DtLeReb13PohzTVP1g+p58Nag0B7I62Ho5DVBJFCrAFdZm4lyi9XHR8ontxbcVg7JJxkwBpW64x46uvWsbG5l5CRid3juzlwctjv/UBfgHDJATj6bxY+F+ncHWbAqhjWnZofVEasVfMvrHlLC4efdXJ4f9dT5sb+eKQZFv/9j1cq7+tMWwCGNfR1Zu1T96sP29BiAMMQkHfYsSFCTpuxvsn6ui9/uFB5X9etpj+Lkw00AIyAwNVmFoVhDFYM1HGJCFsDudQvFdSpmk5O9zJboOqexzjxpgcUX8OoWeb2gfWotNWE/55LSHjsoYWcCcdhUPD54HFPjshZxTLDqnlOCw5jZWQE0eLh7bjWNcgD2rnRLyLw2c1yh0O/pWWQp3B6cqa4lIza922dw8tpq3e27smNjGeu00t6Ej/Mdys6CPvJugIygh5yITLnZKg96/qzkzOriA9OW9dEANZ269+eWn7584Xyp5bSYC2gC9tN+2aPjmY7X/ZkEkwRh6Pp+UQOwMFu/X/912+ulMuo2xijsa/DG9MJebum8aVYyFGdAcKMJciRfh2U7+vqC+X7umYeXfG4ZqY1K3M3EbXuK9LMxIHMLW6P5ekcJq7LQw9hkYLd/zvQrlAxfZ1rNvEoJ9eP+t3GkTvnQYZnOXVpbKdV9iSk7fmkK78SMvJIUAfbhApb+JPQqwib4WIivTzCmFCHdWeRCqWG5SjyjE9ayIWJE64OZMFZ5OlwotnSOj/D3OrsokZRGb3nyKuea35t42mQd0TIPbfs2gZ+mGX8EVFSUkYzW7e4AK8gW9NljIowyXiMGvZcp4WtdU28xFFIRv42GtrHye3JE/fVec7InUe4vm6aIXJYcw+Yl+cvcdj9f6X21l/UKGbFB+emGePJJNzlMuMAQLhTlS5qwHFNDsMn/eA24tw//nKl3F5QM+kNLWcNkcW4CQWsLUjTKSDBuGFF4ZxSNArIcG3DTFXL4Jzpgn66UK6vs2eR/RL2s5ohAxm2J5MJZBaH8UQTrnV+omkBqEkZt9GePL+aMcusd6sea+7eDOREtvMFwJi29zdQt4WcWuKNS5qW1Yyvye39QmVaoOpliz0fPjRiaeEu+omhQk4tiRr3KQbtbqPB5OYu3Gmydzf8bTQv4+Z4IbISYsSqkHd0gizG/f+5qzOCn69v17IOfb7+ee18dOvWrVu3fo26cmvtJQKX7n++QuDKLeqXCFzZVL5Ed0bl686ofIErrx68RODS+yGv0NUty61bt27d+p906f35Vwhc+SsOLxG48tdQXqLvsFO9OoBP151R+foOM7ry14tfou9whr1169atW79GXfo3sl4hcOWfMXuJvsO+7uoAPl13RuXrzqh8fX8Z/RcMvLD1UewjtQAAAABJRU5ErkJggg==",
				lat: "37.09024",
				lng: "-95.712891",
				name: "USA",
				place_id: "ChIJCzYy5IS16lQRQrfeQ5K5Oxw",
				oneliner: "Country",
				itemType: "country",
				updatedAt: "1460648462"
			}
		}, {
			id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
			type: 'item',
			attributes: {
				ancestryNames: "France",
				ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
				address: "Paris, France",
				longDesc: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its picturesque 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture, and designer boutiques along the Rue du Faubourg Saint-Honoré.",
				image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKAA/gMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAIFBgEABwj/xAA4EAACAQMDAgQDBgUDBQAAAAABAgMABBEFEiExQQYTIlFhcYEUIzKRobEHFUJiwSTh8BZScpLR/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EACYRAAICAQMEAgMBAQAAAAAAAAABAhEDBBIhEzFBUQUiMkJhgSP/2gAMAwEAAhEDEQA/APnCiiKK4ooiivrUjwmzqipgV5VoyrTE+5xUoqpUlSiqlBseMSKpRAlTC0QLS2VUQYWiBKmFqYQngUGx0gQTiprGOrDin5bbFtatgKGViTj40u3PQYHYUkZ2M40AKluvTtXNlH217ZT2CgBWubaY21wrWsWhcpzUdlM7a4VrWahYpUSlMlKiUoi0LFKGUpspUClawNCbJQmSnilCZKZMm4iRShkU2yUFkxRJvgXIobDmmSKEy0GhosXYUNhTDChMKm0WixdhUCKMwoZFSaKpliooiioqKMgrpRyMki0dFqKLTCLQbHijqLRVWvKKKq0rZRIiq0ULXVWiKtBsokRC0RULHAIBPc9qkq0ZUJ4XqelTnKotjwXICCXXJLG0g1KWSS2jUshlgVSM9twGT8jU9lbbxhGg0uAIG9MoByP7Kx+2vO+LyvJg3P2zr1qXU4XgDsr2yjba9tr0rOOgO2ubaPtr22jZqF9lcKUxtqO2tYKFylRKUyVqJWjYKFitQK0yVqBWjYKFilDZKbK0Nlo2K0JslBeOnWWhOtFMm4iDpQWFOutLuuKayTVCzChMKYZaEwpGNFi7ChMOaYYUJhzU2XTLBBR41oUYpmMcVayEQiCjoKggoyClsqkTUUVRUVFFUUpVIkq0RRXlFFUULGo8opqxj8y7gUDOZFGPrQVFWehIDq9pn8IkB6Zrm1MtuKT/AIy2JXNI0Xi0s+mE7cBbrHT+2sditn4hcSaRcHHJuxxjkcVkSteX8JK9N/rOnXKsgLbXgtFAruK9mziBYrhWjYr22tZgBWolaORXCK1gFytRK0wRUStGzULlaiVo5FRIo2LQuy0NhTDChkU1goWYfChMtNMtCYUUxWhN1peRaecUvItNZKSEHGKCwpuVaXYViK4YuwoRHNHcUI9aRlosfjFMxil46Zj6U7Fig6CjqKCnSjJSlkFUUZRQlo6DigyiRNRRFFQWirSsYIoq58Lx7tYgz/TlueKqFrQ+EFH26SUhvRESOMn6V5/yEtumm/4dWlV5UWGotFcaHqDw9EugeD8h/mstitJazR3nhzUzFt5k3gkY7g/tWdHf4V5/wkv+DX9On5GNZSIFexUhXcV7h51EMV7FTxXsVrMD21Eii4qJrWCgZWokUQ1EiiYERUCKMRQyK1gBEVBhRiKgwo2CgDChMKYK1ERbupxRsFCTrQJFpuZQGwpzS8gpkyckJSjrSjjmnZBSkg5p7OeSpi7UFutHagt1pWNEejpqPpS0VMx07GgHXpRkoSUZKUqgyUZaCtEWlbKIOtEWhLRVpGxgy01Y69NpBmjt7J5nkUhXLbVBAzj39u3elRxz2rPa3pMkNrLdgod7O27uSTwOnOBivL+SktihLyehoYfZz9GpsPFL2lnd2t7ZlzPGVUwEPg4xyPbuK6rK3IP61gNHjdr3ZHCG4yYw5TcexBHfNbqzilgtkhnBEiDDZOSfjn41LQRhim8aH1ac4KbD12vV6vWPPo9Xq9XqADlRNdNcNYByoGpGoGiY4ag1SNRajYAbVE1JjQ2NEBwnFQkbipVZaTol3qzFbSPdt5PwpJTUFbMot9ihcUvJVzqumzWMxhnXa69appjt4poTUlaEnGu4rLSkhyTTMzUm55qyZyzBNQWojmgseaVsMUWMVMpScbUzGadsaA2lFWgIeKKppGWQdaMtAU0VTQsdDC0VaAhoy0jY6Q1awyXEyQx/jc7Rnt8fy5q08T20JSGBikkTfiXBHC9PlVRp+oQ2uptcSyRQQWxAjlm9QaQjkED5mq+61y2v9bmkvddW3t40AhZUyrHqRtx+teDmn1tXF/rE9bHB4cD55Z6G0t7DXdOkt440Dkrz0znr9Bmtr4msBbSwTRphZE2sR3Yf5xWJuDpl5HGx8U2yOh3RlICGDY6ZxV/b+ITqvh5FunVrmMbkhR8MzAdz055qGWUseqWZdisV1sCh5RAHIBHfpXqlKqowCsGBUEkdM4qGa+gjNSVo8iUXF0ztezXM1zvijYtHjXM149cVHNbcBnaiRTNlF50ipxkkCrfW9BfToY5HZSHHapSzRjJIZQbVmbahk1OYgNgUFjV07Js4zUJmrznjNBZ6NgsJvq00bXLjSmJt5Cu7rjvVGXprTLGbUrlYLVcyt0561PMoyhUhoSalwWfifVLfUJkntS+2SJXy5BPIz2rKzvzTuoabc6TNPZ3abXic8fA+ofvj6VUTyUNMo7PqJqJPdyQmalXapSPmgM3NdJx1bOMaExrsh4yKXknQHO7j5UkpJdy8Yt9izRsUyj1Xxyqy7lPHvXHv4oQdxyfYUzmkrYkYu6ouEejI9UEerx/1qw+XNG/nduvRXb5Cp9aHsuoS9F+r0ZGzVDDrNq6ksxQr1DDr8qWbxEfNIigBQd2bk0rzQHUGa1HFHTzZAFgQvIc7VHc1VW1yssSSjAUjt2rceD9JJUXs/DSL92MD0rz1PxwD9BXHrtZHT4nLydOmwdWdMwmvaXc2FgJrpIduegA3bm9z3/57VmoNOvLk5t4iys2wPwEz7ZNbnxRIusapPG3mtBBlYSdqoz/1MTj1Y7AAfOkZNHifZLfm4uOPQZWwuBxwBgVxaRZpY02qv2d2q6bnV9iki0mdIikkkayLj8MgOKc0jTnk1KK1unkjDnCtgYJ+ftV1ZafZQsI3WSFW7gkgfEg9RR9E8M3d1PdaczlJIU8y2cD0SDnGD+lT1GTJjTUx8EMcvtHwW8+l3GmIgkVTC/Kun4cnt+9BzxmtnokY1Tw4Le9k+/I+8ywLKR3x2P8AvWP1y7023vIbPTzLPP643VRu3SJ+IDHan0Guc108ndHPqsP23RIkEDLAge+KlDtaRQWwCeTS0WvSalYwabHGIbkT+VFHKArbjnlie3HSs5J4guYLySxa1E1yJGQeS3pJHtx8M16CyqSORqjc61Zw2MiJBOs4ZQSw6D4VUs2M+wrKav4puZLHTGtW8nHn7kbDZ+8HXvTmpeMLI21kLWyYTmEGdvNGC3ftxQx5a4YJL0aS1mZZRs5bPA+NO3t9PJaf6gsGSQo24/AEfvXy258SXr30EqM8CRuG2o+c89aste8Z395dXSyKHdpFKStwwUKRggcZ56/ClnJSyIZfiaWSQc5PPWrLRbWzvjKLq8jg2Jkbu59q+XS63O/4jJg8nc1WFpNJcqURpEeQ7QzDgcfn7U88n1pCJezTXc0UbsocHBxwKUeZSM7uKXa2u1iRpI5F354YnJwM5+orL3l1PPI0QVlXcdqKOf8AejHUpLkWULNUZgeh/Wj6fqUljdJPGz5U9UbacfOsL9+oOS42nByfwmrHTNal0+CeKazguY7hNqtcKxKY7ocjn86Ms8ZKmgKEk7Rfaprc2qXyzSq6yNH5b7n3ZZT1/I1VzXCAkFufaqaW+kklDgIrJ02jGfia5HepvYyD1noOxrY80YRpAnilN2y1L7oxIM7SSAfiKWnIjWNlZ2OMsT05PQUrPLcxIhKbY39SHHUcfH2NChvpI3LGKGTPO2RNwH0oyz2GGDaPswIJzxSN2ApBVwgbrjpkUASs7bWcqpO44FcEmYwjYIBzyO9JPLv4KY8e3kb+y3yRlVjbYBzjvSwhmd9u059j1rU2Gs2t3qSo9okIyB5jynCA4HRVOTzSUbXE9zczQCOBkba/IOOeme9Sbg/I1NFLcW00EEU0vCy58vIIyB3FQjjY85rRJodzqlxHHNf2wXkL5krBU98DGBWin/hnbxNYRQeIbV5rkqjL5bEBif6TnkYx1xUZTjF1Y1NrgwAEeCWOHHTIzmoqIzIff2xxWk1nwvDpWrz2DX4uBDL5bSpHgH6bjj5VpNF8D6LcadK95ez+d1i8tVXBz3z14BoSyRxpNgSb4MWPsH8ikD3lydQWcCO3UYi2HO4k9z04yK0ug6zrdt4amt7VbnarFJH28xRtjHPX3xU7fQ9IsrueXVrmcoinytjBMHsTiqG5uJZ55Y7e4nlV22sSchlB4B9+v60Go5u/geGR4maWwsL26VEtreRtowqng4+vz7Vc6XfAXIs9VUN5RMMQd8GBup474pTw1ZacLAed9p+3wSB1fzWQxhc4wM4HWqPUrCVbxpoy07u+485O7HOT3zSyyudw8FIwSe4vNd11rPXJTaG3u2kCsXYfh6YC4zgjHftULLxhdwSbry4M8uXCrEgjRVJzwxzjBzx396npvibTZbfXH1nRbVGjsl27EA3kHbgD35Wm/C8nhq/8A3M95YojQkrKxfDRn/yHNRnO4pTiVgmpXFlNP4jitNbu2sLljau+9laZlJJX1LuxyM5Ocd6WttehuPFMep6msdtbROWUwJswSo9hyff35pn+HemaBr+tzxTyGUBSwhlBBI9x0zW18VeDfDQ0h47dZrWQJkNEwJOOQPVnH0pZZMOOSi0ZrJkVmQ1WPwfJeTXf87ubiSf78Ku9PLf24U8/E+9BuLvwVZwWsNrc6pJJEHuftaR4fzjwEIZcFcDristPo8yyFYbiQjOMMB8qas9EuL2e3ikPKLs3DI3Dt1rqlKEY22QUJuVUV15I7tCksMUaAscoBuO4g846/D2oT24e2QxlvNEjdfw7CBj653fpX1SH+GOmXOlrJE1yt6oJYGT0t3A4/cZ7VFP4RTDzZDqKRQMgaIbS7I3sQev0NRWuwNUNLS5FyfJZQzRKoUlgcFjzRkl8mMqIUJdcMWXOec/Stnrv8Mtd0tXkiuba4i6jYxU/kRWNudO1G1YrPHgjsGq8NRil+LIyw5F3XAWz1CW0mWRERgv9JQU1P4hvnk3KSuQVIZt2Qcf/AAVTMLmPho3HyNQLSt/RIcf89qd7W9wtSXBejxBqJeORpGeWOPy0kdmJVcYwOcdKTF1dJKLkRxlwc7yuearTM4GDvH0rxuZNu3cwHtijcUDax+a5muJ5Lh0j3uSTtXAz8qAJpNqp2QEKOwz1pYXDYI3c+2KiJyvIcflW3I21liZrr7z1YEgw4A/EKUEW6TBUZqH2qTOPN+uKgZ23btwz9a25G2sLghdmcDOcAcVEpjoaEZj/ANw/WueaT/UK24O1k2BH1qBqJkJ7ivAk9MULGpn0g3vgw+FjEbeQatGSIpMkquec/nx3rNw38EETpEyMZG3sVUj96q1sv9I80kjqQfSPLOCfn0oAUDoSfiKeGKmCUr7Fwt95cm9FU85I2dav9Es72+ZJWmgiQIfVNMiAZGOOe3WsvpFtFd6hAk+3yy3q3sVX6kVrdFtdPn1vUZprGGWK3jbyoo0Yqzdjng9u4rZQQfJQ65cA3rbLmBiGdiyPuz6jj68UAarebdy3cuyM8FRwCR70W3sbOaZpZT5Z3bvLPfn8I7D61oGfTv5eLWN7a1G4szPIuG544z2/zTtKlwLVvgyxmluT5mZZynUnpWgh0DV5reOVDZxM437HuEQgdietF+0aWscKSa3B911VAmG5zzgGtR/11okciNHCm9TkCC1f1enaR+EA+9JPJJcRiUx4o/szJtperrZ/aDd2zt53lBI5txbjOcjgim7bwb4qkeOV1tliLLv2XKlwpOM4/wB6nq2u6BfwLBNp995KEuFiCxAE9ejZ70z4a1TT9LhuL6wt1s7ZysRa6uGOW/bv79q48s8sY2dMIQvhnNc8AazBcXX8nT7fZBMmSUBWBA6ADr+lYy3nEOl3dndSyWxmYGSIjg7ema+76Zqkh0ueWRpHSYcGK2c8EfDOM+9YaXwNZyaPe301tKJomYiN5csQPduhP1qGPU8bZjzwNfaJ8usbyawv4Lmwl2TxOGVs4Gfj8PevpHjvxo15o9l9gUi4mQPMQ2ViYgZAP7V8xlUxzAmNkweh6j51Y3Wqxy2vlBSxCgbintXXPFGc1P0QjkcIuK8lVI83mM8kkhYnJJY5q78P+J7vSp0aYG4t1I3K34h8jVHcSeZxjFDVscU0oxkqYsJSjyfonwXrg1eFzazB4ZM7Wxgj4EfWtjeyTLFb7eTI2w7T3wf04X9a/MXhDxPdeGNWW7t1MkLjbLCTgOPh7Gv0RplxYaxY22rwSyZkUSIpcrjgjlf3+QrxNRg6Mm/DPQhk6iT8oT8Q6nNb2pWbG8J61B/avnWrSR3bM4G49RkVoP4geJNNsVRJpw1wQV+zx8vjnkjt9a+U3fia7m9FqqQr/dyTV9Fg43UbPmUfoXktsjKrso64PFJ3FsiepPT2IHesxLfXcxPmXEp+AbA/ShNLKfxSyfVzXpKNHBJ2aI2SFzmomARADAO3JXis+JZRyssn/samt3dL0lf5E5phaLV7JcnaAAzE/rUTZKu5ioYYPalI9TuVxv2t8xTKasjRFZYj81NY1HmsgAvpGG5+VAFlyoYHLhiPoas4by2uI0jD+vb0Iwf+dK7sDEcnisAqPssYUAhtwGc5of2cFc8gkcCrkwrlsUHycBv7awSuW3WVdy5BHbFDaFM4JZSODhSc1Z+WDu7cdqXZAp4oWEZuiDCq5PvgsSM0CDaM7kzQpXYnGeK8jHGDXejlrgtNMlWGRpMAMOmVzV7o9z5VnqFwRsCoTvZSAWPbI49/zrKW5ZTlDhu1Wc90Y9K8hnXLNnGclR7VLJGx8boqMxsGJQMzHO81NEDfgTihEjOBxijRQtJgEHB5zircIVhrVkE6BwCAwq5mukyywxDB5z0qqW3WJlIdpD2IBXH51Nie276nNQyNM6MMaiWEMRuMAHjHI3YzWv0+3sbe1FtuiiDuplRJC5GOeeMDp71j9Nm8mYGRZgAMhlX/AD9a01jdKhVo4pCw5yykfUE15motnZCrN3AzNp8iKQEYejaGJx7HqBRrV/K0W5hvh5bbSzOxOAD3JHT2rPQSQC2KStHI7eoATM7K2OmS1WEAaawLxPJvIOfNlVVXjngGvPppo6PDPid/btNqciFl3FmPQ8YJ4OM0XVNHNlBA2GMkqFyuMAD3z3p02W/VYo4JI1MwQqM49JPpLHt0zW28QaTPNpcbwXiSDau30AKQB8jgdOtepLLscUcKxKSbPj7/AA5odNXcLRSMpA9PBIOQeTzS9dBIlbyNFMki8EHjIzWy0jXtatbIvDekwluIvY9yO9YxSMir/TLpIYHSQkp2PzpXCM1yrNvcXw6BahF5kr3Mo3ySsWdiSTmkriJBHuC4NWt5d2/kYQEn5VWzXkRQjaOlFLihZO3ZWdGz8aMfVg0CpByKwzQQLXiKFvauEse9YCQQ49xXCy0OvVg0Hhn8udHViCDy1Gup5IbgtDOWyM56UlnmmZiZIQWLE8YBPFMuzQKph4dVlXAlAcfDim0vopeFIXPY8VR1JTzS9xmi8DBQcEYNAkIpFZWUcMamLj3Wm2i2f//Z",
				lat: "48.85661400000001",
				lng: "2.3522219000000177",
				name: "Paris",
				place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
				oneliner: "Capital of France",
				itemType: "locality",
				updatedAt: "1460348462"
			}
		}, {
			id: "ChIJl4foalHq9EcR8CG75CqrCAQ",
			type: 'item',
			attributes: {
				ancestryNames: "France",
				ancestry: "ChIJMVd4MymgVA0R99lHx5Y__Ws",
				address: "Lyon, France",
				longDesc: "Lyon is France's capital of gastronomy",
				image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKAA/gMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAIFBgEABwj/xAA4EAACAQMDAgQDBgUDBQAAAAABAgMABBEFEiExQQYTIlFhcYEUIzKRobEHFUJiwSTh8BZScpLR/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EACYRAAICAQMEAgMBAQAAAAAAAAABAhEDBBIhEzFBUQUiMkJhgSP/2gAMAwEAAhEDEQA/APnCiiKK4ooiivrUjwmzqipgV5VoyrTE+5xUoqpUlSiqlBseMSKpRAlTC0QLS2VUQYWiBKmFqYQngUGx0gQTiprGOrDin5bbFtatgKGViTj40u3PQYHYUkZ2M40AKluvTtXNlH217ZT2CgBWubaY21wrWsWhcpzUdlM7a4VrWahYpUSlMlKiUoi0LFKGUpspUClawNCbJQmSnilCZKZMm4iRShkU2yUFkxRJvgXIobDmmSKEy0GhosXYUNhTDChMKm0WixdhUCKMwoZFSaKpliooiioqKMgrpRyMki0dFqKLTCLQbHijqLRVWvKKKq0rZRIiq0ULXVWiKtBsokRC0RULHAIBPc9qkq0ZUJ4XqelTnKotjwXICCXXJLG0g1KWSS2jUshlgVSM9twGT8jU9lbbxhGg0uAIG9MoByP7Kx+2vO+LyvJg3P2zr1qXU4XgDsr2yjba9tr0rOOgO2ubaPtr22jZqF9lcKUxtqO2tYKFylRKUyVqJWjYKFitQK0yVqBWjYKFilDZKbK0Nlo2K0JslBeOnWWhOtFMm4iDpQWFOutLuuKayTVCzChMKYZaEwpGNFi7ChMOaYYUJhzU2XTLBBR41oUYpmMcVayEQiCjoKggoyClsqkTUUVRUVFFUUpVIkq0RRXlFFUULGo8opqxj8y7gUDOZFGPrQVFWehIDq9pn8IkB6Zrm1MtuKT/AIy2JXNI0Xi0s+mE7cBbrHT+2sditn4hcSaRcHHJuxxjkcVkSteX8JK9N/rOnXKsgLbXgtFAruK9mziBYrhWjYr22tZgBWolaORXCK1gFytRK0wRUStGzULlaiVo5FRIo2LQuy0NhTDChkU1goWYfChMtNMtCYUUxWhN1peRaecUvItNZKSEHGKCwpuVaXYViK4YuwoRHNHcUI9aRlosfjFMxil46Zj6U7Fig6CjqKCnSjJSlkFUUZRQlo6DigyiRNRRFFQWirSsYIoq58Lx7tYgz/TlueKqFrQ+EFH26SUhvRESOMn6V5/yEtumm/4dWlV5UWGotFcaHqDw9EugeD8h/mstitJazR3nhzUzFt5k3gkY7g/tWdHf4V5/wkv+DX9On5GNZSIFexUhXcV7h51EMV7FTxXsVrMD21Eii4qJrWCgZWokUQ1EiiYERUCKMRQyK1gBEVBhRiKgwo2CgDChMKYK1ERbupxRsFCTrQJFpuZQGwpzS8gpkyckJSjrSjjmnZBSkg5p7OeSpi7UFutHagt1pWNEejpqPpS0VMx07GgHXpRkoSUZKUqgyUZaCtEWlbKIOtEWhLRVpGxgy01Y69NpBmjt7J5nkUhXLbVBAzj39u3elRxz2rPa3pMkNrLdgod7O27uSTwOnOBivL+SktihLyehoYfZz9GpsPFL2lnd2t7ZlzPGVUwEPg4xyPbuK6rK3IP61gNHjdr3ZHCG4yYw5TcexBHfNbqzilgtkhnBEiDDZOSfjn41LQRhim8aH1ac4KbD12vV6vWPPo9Xq9XqADlRNdNcNYByoGpGoGiY4ag1SNRajYAbVE1JjQ2NEBwnFQkbipVZaTol3qzFbSPdt5PwpJTUFbMot9ihcUvJVzqumzWMxhnXa69appjt4poTUlaEnGu4rLSkhyTTMzUm55qyZyzBNQWojmgseaVsMUWMVMpScbUzGadsaA2lFWgIeKKppGWQdaMtAU0VTQsdDC0VaAhoy0jY6Q1awyXEyQx/jc7Rnt8fy5q08T20JSGBikkTfiXBHC9PlVRp+oQ2uptcSyRQQWxAjlm9QaQjkED5mq+61y2v9bmkvddW3t40AhZUyrHqRtx+teDmn1tXF/rE9bHB4cD55Z6G0t7DXdOkt440Dkrz0znr9Bmtr4msBbSwTRphZE2sR3Yf5xWJuDpl5HGx8U2yOh3RlICGDY6ZxV/b+ITqvh5FunVrmMbkhR8MzAdz055qGWUseqWZdisV1sCh5RAHIBHfpXqlKqowCsGBUEkdM4qGa+gjNSVo8iUXF0ztezXM1zvijYtHjXM149cVHNbcBnaiRTNlF50ipxkkCrfW9BfToY5HZSHHapSzRjJIZQbVmbahk1OYgNgUFjV07Js4zUJmrznjNBZ6NgsJvq00bXLjSmJt5Cu7rjvVGXprTLGbUrlYLVcyt0561PMoyhUhoSalwWfifVLfUJkntS+2SJXy5BPIz2rKzvzTuoabc6TNPZ3abXic8fA+ofvj6VUTyUNMo7PqJqJPdyQmalXapSPmgM3NdJx1bOMaExrsh4yKXknQHO7j5UkpJdy8Yt9izRsUyj1Xxyqy7lPHvXHv4oQdxyfYUzmkrYkYu6ouEejI9UEerx/1qw+XNG/nduvRXb5Cp9aHsuoS9F+r0ZGzVDDrNq6ksxQr1DDr8qWbxEfNIigBQd2bk0rzQHUGa1HFHTzZAFgQvIc7VHc1VW1yssSSjAUjt2rceD9JJUXs/DSL92MD0rz1PxwD9BXHrtZHT4nLydOmwdWdMwmvaXc2FgJrpIduegA3bm9z3/57VmoNOvLk5t4iys2wPwEz7ZNbnxRIusapPG3mtBBlYSdqoz/1MTj1Y7AAfOkZNHifZLfm4uOPQZWwuBxwBgVxaRZpY02qv2d2q6bnV9iki0mdIikkkayLj8MgOKc0jTnk1KK1unkjDnCtgYJ+ftV1ZafZQsI3WSFW7gkgfEg9RR9E8M3d1PdaczlJIU8y2cD0SDnGD+lT1GTJjTUx8EMcvtHwW8+l3GmIgkVTC/Kun4cnt+9BzxmtnokY1Tw4Le9k+/I+8ywLKR3x2P8AvWP1y7023vIbPTzLPP643VRu3SJ+IDHan0Guc108ndHPqsP23RIkEDLAge+KlDtaRQWwCeTS0WvSalYwabHGIbkT+VFHKArbjnlie3HSs5J4guYLySxa1E1yJGQeS3pJHtx8M16CyqSORqjc61Zw2MiJBOs4ZQSw6D4VUs2M+wrKav4puZLHTGtW8nHn7kbDZ+8HXvTmpeMLI21kLWyYTmEGdvNGC3ftxQx5a4YJL0aS1mZZRs5bPA+NO3t9PJaf6gsGSQo24/AEfvXy258SXr30EqM8CRuG2o+c89aste8Z395dXSyKHdpFKStwwUKRggcZ56/ClnJSyIZfiaWSQc5PPWrLRbWzvjKLq8jg2Jkbu59q+XS63O/4jJg8nc1WFpNJcqURpEeQ7QzDgcfn7U88n1pCJezTXc0UbsocHBxwKUeZSM7uKXa2u1iRpI5F354YnJwM5+orL3l1PPI0QVlXcdqKOf8AejHUpLkWULNUZgeh/Wj6fqUljdJPGz5U9UbacfOsL9+oOS42nByfwmrHTNal0+CeKazguY7hNqtcKxKY7ocjn86Ms8ZKmgKEk7Rfaprc2qXyzSq6yNH5b7n3ZZT1/I1VzXCAkFufaqaW+kklDgIrJ02jGfia5HepvYyD1noOxrY80YRpAnilN2y1L7oxIM7SSAfiKWnIjWNlZ2OMsT05PQUrPLcxIhKbY39SHHUcfH2NChvpI3LGKGTPO2RNwH0oyz2GGDaPswIJzxSN2ApBVwgbrjpkUASs7bWcqpO44FcEmYwjYIBzyO9JPLv4KY8e3kb+y3yRlVjbYBzjvSwhmd9u059j1rU2Gs2t3qSo9okIyB5jynCA4HRVOTzSUbXE9zczQCOBkba/IOOeme9Sbg/I1NFLcW00EEU0vCy58vIIyB3FQjjY85rRJodzqlxHHNf2wXkL5krBU98DGBWin/hnbxNYRQeIbV5rkqjL5bEBif6TnkYx1xUZTjF1Y1NrgwAEeCWOHHTIzmoqIzIff2xxWk1nwvDpWrz2DX4uBDL5bSpHgH6bjj5VpNF8D6LcadK95ez+d1i8tVXBz3z14BoSyRxpNgSb4MWPsH8ikD3lydQWcCO3UYi2HO4k9z04yK0ug6zrdt4amt7VbnarFJH28xRtjHPX3xU7fQ9IsrueXVrmcoinytjBMHsTiqG5uJZ55Y7e4nlV22sSchlB4B9+v60Go5u/geGR4maWwsL26VEtreRtowqng4+vz7Vc6XfAXIs9VUN5RMMQd8GBup474pTw1ZacLAed9p+3wSB1fzWQxhc4wM4HWqPUrCVbxpoy07u+485O7HOT3zSyyudw8FIwSe4vNd11rPXJTaG3u2kCsXYfh6YC4zgjHftULLxhdwSbry4M8uXCrEgjRVJzwxzjBzx396npvibTZbfXH1nRbVGjsl27EA3kHbgD35Wm/C8nhq/8A3M95YojQkrKxfDRn/yHNRnO4pTiVgmpXFlNP4jitNbu2sLljau+9laZlJJX1LuxyM5Ocd6WttehuPFMep6msdtbROWUwJswSo9hyff35pn+HemaBr+tzxTyGUBSwhlBBI9x0zW18VeDfDQ0h47dZrWQJkNEwJOOQPVnH0pZZMOOSi0ZrJkVmQ1WPwfJeTXf87ubiSf78Ku9PLf24U8/E+9BuLvwVZwWsNrc6pJJEHuftaR4fzjwEIZcFcDristPo8yyFYbiQjOMMB8qas9EuL2e3ikPKLs3DI3Dt1rqlKEY22QUJuVUV15I7tCksMUaAscoBuO4g846/D2oT24e2QxlvNEjdfw7CBj653fpX1SH+GOmXOlrJE1yt6oJYGT0t3A4/cZ7VFP4RTDzZDqKRQMgaIbS7I3sQev0NRWuwNUNLS5FyfJZQzRKoUlgcFjzRkl8mMqIUJdcMWXOec/Stnrv8Mtd0tXkiuba4i6jYxU/kRWNudO1G1YrPHgjsGq8NRil+LIyw5F3XAWz1CW0mWRERgv9JQU1P4hvnk3KSuQVIZt2Qcf/AAVTMLmPho3HyNQLSt/RIcf89qd7W9wtSXBejxBqJeORpGeWOPy0kdmJVcYwOcdKTF1dJKLkRxlwc7yuearTM4GDvH0rxuZNu3cwHtijcUDax+a5muJ5Lh0j3uSTtXAz8qAJpNqp2QEKOwz1pYXDYI3c+2KiJyvIcflW3I21liZrr7z1YEgw4A/EKUEW6TBUZqH2qTOPN+uKgZ23btwz9a25G2sLghdmcDOcAcVEpjoaEZj/ANw/WueaT/UK24O1k2BH1qBqJkJ7ivAk9MULGpn0g3vgw+FjEbeQatGSIpMkquec/nx3rNw38EETpEyMZG3sVUj96q1sv9I80kjqQfSPLOCfn0oAUDoSfiKeGKmCUr7Fwt95cm9FU85I2dav9Es72+ZJWmgiQIfVNMiAZGOOe3WsvpFtFd6hAk+3yy3q3sVX6kVrdFtdPn1vUZprGGWK3jbyoo0Yqzdjng9u4rZQQfJQ65cA3rbLmBiGdiyPuz6jj68UAarebdy3cuyM8FRwCR70W3sbOaZpZT5Z3bvLPfn8I7D61oGfTv5eLWN7a1G4szPIuG544z2/zTtKlwLVvgyxmluT5mZZynUnpWgh0DV5reOVDZxM437HuEQgdietF+0aWscKSa3B911VAmG5zzgGtR/11okciNHCm9TkCC1f1enaR+EA+9JPJJcRiUx4o/szJtperrZ/aDd2zt53lBI5txbjOcjgim7bwb4qkeOV1tliLLv2XKlwpOM4/wB6nq2u6BfwLBNp995KEuFiCxAE9ejZ70z4a1TT9LhuL6wt1s7ZysRa6uGOW/bv79q48s8sY2dMIQvhnNc8AazBcXX8nT7fZBMmSUBWBA6ADr+lYy3nEOl3dndSyWxmYGSIjg7ema+76Zqkh0ueWRpHSYcGK2c8EfDOM+9YaXwNZyaPe301tKJomYiN5csQPduhP1qGPU8bZjzwNfaJ8usbyawv4Lmwl2TxOGVs4Gfj8PevpHjvxo15o9l9gUi4mQPMQ2ViYgZAP7V8xlUxzAmNkweh6j51Y3Wqxy2vlBSxCgbintXXPFGc1P0QjkcIuK8lVI83mM8kkhYnJJY5q78P+J7vSp0aYG4t1I3K34h8jVHcSeZxjFDVscU0oxkqYsJSjyfonwXrg1eFzazB4ZM7Wxgj4EfWtjeyTLFb7eTI2w7T3wf04X9a/MXhDxPdeGNWW7t1MkLjbLCTgOPh7Gv0RplxYaxY22rwSyZkUSIpcrjgjlf3+QrxNRg6Mm/DPQhk6iT8oT8Q6nNb2pWbG8J61B/avnWrSR3bM4G49RkVoP4geJNNsVRJpw1wQV+zx8vjnkjt9a+U3fia7m9FqqQr/dyTV9Fg43UbPmUfoXktsjKrso64PFJ3FsiepPT2IHesxLfXcxPmXEp+AbA/ShNLKfxSyfVzXpKNHBJ2aI2SFzmomARADAO3JXis+JZRyssn/samt3dL0lf5E5phaLV7JcnaAAzE/rUTZKu5ioYYPalI9TuVxv2t8xTKasjRFZYj81NY1HmsgAvpGG5+VAFlyoYHLhiPoas4by2uI0jD+vb0Iwf+dK7sDEcnisAqPssYUAhtwGc5of2cFc8gkcCrkwrlsUHycBv7awSuW3WVdy5BHbFDaFM4JZSODhSc1Z+WDu7cdqXZAp4oWEZuiDCq5PvgsSM0CDaM7kzQpXYnGeK8jHGDXejlrgtNMlWGRpMAMOmVzV7o9z5VnqFwRsCoTvZSAWPbI49/zrKW5ZTlDhu1Wc90Y9K8hnXLNnGclR7VLJGx8boqMxsGJQMzHO81NEDfgTihEjOBxijRQtJgEHB5zircIVhrVkE6BwCAwq5mukyywxDB5z0qqW3WJlIdpD2IBXH51Nie276nNQyNM6MMaiWEMRuMAHjHI3YzWv0+3sbe1FtuiiDuplRJC5GOeeMDp71j9Nm8mYGRZgAMhlX/AD9a01jdKhVo4pCw5yykfUE15motnZCrN3AzNp8iKQEYejaGJx7HqBRrV/K0W5hvh5bbSzOxOAD3JHT2rPQSQC2KStHI7eoATM7K2OmS1WEAaawLxPJvIOfNlVVXjngGvPppo6PDPid/btNqciFl3FmPQ8YJ4OM0XVNHNlBA2GMkqFyuMAD3z3p02W/VYo4JI1MwQqM49JPpLHt0zW28QaTPNpcbwXiSDau30AKQB8jgdOtepLLscUcKxKSbPj7/AA5odNXcLRSMpA9PBIOQeTzS9dBIlbyNFMki8EHjIzWy0jXtatbIvDekwluIvY9yO9YxSMir/TLpIYHSQkp2PzpXCM1yrNvcXw6BahF5kr3Mo3ySsWdiSTmkriJBHuC4NWt5d2/kYQEn5VWzXkRQjaOlFLihZO3ZWdGz8aMfVg0CpByKwzQQLXiKFvauEse9YCQQ49xXCy0OvVg0Hhn8udHViCDy1Gup5IbgtDOWyM56UlnmmZiZIQWLE8YBPFMuzQKph4dVlXAlAcfDim0vopeFIXPY8VR1JTzS9xmi8DBQcEYNAkIpFZWUcMamLj3Wm2i2f//Z",
				lat: "44.85661400000001",
				lng: "1.8522219000000177",
				name: "Lyon",
				place_id: "ChIJl4foalHq9EcR8CG75CqrCAQ",
				oneliner: "City in France",
				itemType: "locality",
				updatedAt: "1460738462"
			}
		}, {
			id: "tmp1",
			type: 'collection',
			attributes: {
				name: "itai's collection"
			},
			relationships: {
				items: {
					data: [{ type: 'item', id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk" }, { type: 'item', id: "ChIJdbbQwbZx5kcRs7Qu5nPw18g" }]
				},
				dates: {
					data: [{ type: 'date', id: 'asdas' }]
				}
			}
		}, {
			id: "tmp2",
			type: 'collection',
			attributes: {
				name: "itai's other collection"
			},
			relationships: {
				items: {
					data: []
				}
			}
		}, {
			id: "https://www.google.com/search?q=Louvre&oq=louvre",
			type: 'potentialLink',
			attributes: {
				createdAt: '1460248462',
				lastVisited: '1460248462',
				//note: "The Louvre Palace is a former royal palace located on the Right Bank of the Seine in Paris, between the Tuileries Gardens and the church of Saint-Germain l'Auxerrois. Wikipedia asdkjashkd",
				note: '12345',
				image: "https://lh5.googleusercontent.com/-HIc3V6HYPg4/VrXryykTJ2I/AAAAAAAAmVo/adAXMHlv0Pw/w3000-k/",
				title: 'louvre museum - the full website',
				description: ' I dont know what the desc is for really'
			},
			relationships: {
				item: {
					data: { type: 'item', id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk" }
				}
			}
		}, {
			id: "http://www.lonelyplanet.com",
			type: 'potentialLink',
			attributes: {
				createdAt: '1460248462'
			},
			relationships: {
				item: {
					data: { type: 'item', id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk" }
				}
			}
		}, {
			id: "asdas",
			type: 'date',
			attributes: {
				order: '1'
			},
			relationships: {
				collection: {
					data: { type: 'collection', id: "tmp1" }
				},
				trippoints: {
					data: [{ type: 'trippoint', id: 'adasdas' }, { type: 'trippoint', id: 'adasdas2' }]
				}
			}
		}, {
			id: "adasdas",
			type: 'trippoint',
			attributes: {
				order: '1'
			},
			relationships: {
				date: {
					data: { type: 'date', id: "asdas" }
				},
				item: {
					data: { type: 'item', id: 'ChIJdbbQwbZx5kcRs7Qu5nPw18g' }
				}
			}
		}, {
			id: "adasdas2",
			type: 'trippoint',
			attributes: {
				order: '2'
			},
			relationships: {
				date: {
					data: { type: 'date', id: "asdas" }
				},
				item: {
					data: { type: 'item', id: 'ChIJD3uTd9hx5kcR1IQvGfr8dbk' }
				}
			}
		}] };

	var formatPlace = function formatPlace(place) {
		if (place.ancestryNames && place.ancestryNames.length > 0) {
			var path = place.ancestryNames + "/" + place.name;
		} else {
			var path = place.name;
		}
		path = path.replace(/\//g, "_");
		var item = {
			id: place.place_id,
			type: 'item',
			attributes: place
		};
		/*if (["ChIJD3uTd9hx5kcR1IQvGfr8dbk", "ChIJdbbQwbZx5kcRs7Qu5nPw18g"].indexOf(place.place_id) > -1) {
  	item = $.extend(item, {
  			relationships: {
  				collections: {
  					data: [
  						{type: "collection", id: "1"}
  					]
  				}
  			}
  		}
  	)
  }*/
		return item;
	};

	function initialize(applicationInstance) {
		var store = applicationInstance.lookup('service:store');
		if (chrome.extension) {
			var backgroundPage = chrome.extension.getBackgroundPage();
			var trackedPlaces = backgroundPage.TripMinder.trackedPlaces;
			var formattedData = Object.keys(trackedPlaces).map(function (key) {
				return trackedPlaces[key].item;
			}).map(function (place) {
				return formatPlace(place);
			});
		} else if (_tripmindConfigEnvironment['default'].environment === 'development') {
			localforage.getItem('DS.LFAdapter').then(function (result) {
				if (!result || !result.item || result.item.records.length == 0) {
					store.push(addlData);
					var array = ['item', 'potential-link', 'collection', 'date', 'trippoint'];
					array.forEach(function (type) {
						store.findAll(type).then(function (records) {
							records.forEach(function (record) {
								record.save();
							});
						});
					});
				}
			});
		}
		if (formattedData) store.push({ data: formattedData });
	}

	;

	exports['default'] = {
		name: 'load-data',
		initialize: initialize
	};
});
define('tripmind/mixins/autocomplete', ['exports', 'ember', 'tripmind/mixins/widget'], function (exports, _ember, _tripmindMixinsWidget) {
	exports['default'] = _ember['default'].Mixin.create(_tripmindMixinsWidget['default'], {
		uiTypes: [],
		// we are not using all the autocomplete options and each one gets an observer above
		// therefore we only include here options that we need to set
		autocompleteUiOptions: ['autocomplete_minLength', 'autocomplete_appendTo', 'autocomplete_autoFocus', 'autocomplete_delay', 'autocomplete_disabled', 'autocomplete_minLength', 'autocomplete_position', 'autocomplete_source', 'autocomplete_service', 'autocomplete_emberobj'],
		autocompleteUiEvents: ['autocomplete_change', 'autocomplete_close', 'autocomplete_create', 'autocomplete_focus', 'autocomplete_open', 'autocomplete_response', 'autocomplete_search', 'autocomplete_select'],

		init: function init() {
			this._super();
			this.set('uiTypes', this.get('uiTypes').concat('autocomplete'));
		}
	});
});
define('tripmind/mixins/draggable', ['exports', 'ember', 'tripmind/mixins/widget'], function (exports, _ember, _tripmindMixinsWidget) {
	exports['default'] = _ember['default'].Mixin.create(_tripmindMixinsWidget['default'], {
		uiTypes: [],
		// we are not using all the draggable options and each one gets an observer above
		// therefore we only include here options that we need to set
		draggableUiOptions: ['drag_appendTo', 'drag_axis', 'drag_containment', 'drag_cursorAt', 'drag_delay', 'drag_helper', 'drag_handle', 'drag_revert', 'drag_revertDuration', 'drag_zIndex', 'drag_disabled'],
		draggableUiEvents: ['drag_drag', 'drag_start', 'drag_stop'],

		init: function init() {
			this._super();
			this.set('uiTypes', this.get('uiTypes').concat('draggable'));
		}
	});
});
define('tripmind/mixins/google-item', ['exports', 'ember', 'tripmind/appconfig/constants', 'tripmind/mixins/item-type-conversions'], function (exports, _ember, _tripmindAppconfigConstants, _tripmindMixinsItemTypeConversions) {
	exports['default'] = _ember['default'].Mixin.create(_tripmindMixinsItemTypeConversions['default'], {
		normalizeGoogleItem: function normalizeGoogleItem(data, index, isPartialResponse, existingId) {
			// Set up the data that is included in all responses, even partial ones from Search response
			var itemType = this.getItemType(data);
			var address_comps = data.formatted_address ? data.formatted_address.split(", ") : null,
			    country = address_comps instanceof Array ? address_comps[address_comps.length - 1] : null;
			var objectToCreate = {
				name: data.name,
				gmapsReference: data.place_id,
				imageBaseUrl: data.photos ? data.photos[0].getUrl({ maxWidth: 3000 }).replace(/w3000/, '%@') : null,
				image: data.photos ? data.photos[0].getUrl({ maxWidth: 3000 }) : null,
				imageProvider: data.photos ? _tripmindAppconfigConstants['default'].GOOGLE_IMAGES : null,
				googleIcon: data.icon,
				address: data.formatted_address,
				lat: data.geometry.location.lat(),
				lng: data.geometry.location.lng(),
				itemType: itemType,
				category: data.types ? data.types.join(', ') : null,
				duration: itemType && _tripmindAppconfigConstants['default'].ITEM_TYPES_ARRAY[itemType] ? _tripmindAppconfigConstants['default'].ITEM_TYPES_ARRAY[itemType].duration : 3600,
				rating: Math.round(data.rating * 10), // our rating system is in integers between 0 and 50, google's is 0-5
				phone: data.international_phone_number || data.formatted_phone_number,
				id: data.place_id,
				googleResultOrder: index,
				isGoogle: true,
				needsFullGoogleInfo: isPartialResponse,
				ancestry: data.ancestry,
				ancestryNames: data.ancestryNames || country,
				ancestryDepth: data.ancestryDepth
			};

			// now setup data that's only available in full responses -------------------
			if (!isPartialResponse) {
				if (data.opening_hours) objectToCreate.operatingHours = this.convertGoogleHours(data);

				if (data.website) objectToCreate.externalLinks = [{ icon: '/assets/info_link.png', text: 'website', source: data.website }];

				if (data.address_components) objectToCreate.ancestryObject = data.address_components;
				objectToCreate.googleTypes = data.types;

				objectToCreate.needsWikiContent = true;

				// setup photo caption information
				if (data.photos && data.photos[0].html_attributions.length > 0) {
					if (data.photos[0].html_attributions[0].indexOf('href' != -1)) {
						objectToCreate.captionLink = data.photos[0].html_attributions[0].replace(/(.*)(href=")(.*)(\")(.*)/, '$3');
						objectToCreate.captionName = data.photos[0].html_attributions[0].replace(/(.*)(\>)(.*)(\<)(.*)/, '$3');
						objectToCreate.captionCc = "all rights reserved";
					} else {
						objectToCreate.captionName = data.photos[0].html_attributions[0];
						objectToCreate.captionCc = "all rights reserved";
					}
				} else {
					objectToCreate.captionName = "Google";
					objectToCreate.captionCc = "No known copyright restrictions";
				}
			}

			/*var item = store.createRecord('item', objectToCreate);
   		 // get info from Wikipedia if this is a full response
    if (!isPartialResponse) {
    var self = this;
    Ember.run(function () {
    self.getWikiLink(data.name, item)
    });
    }*/

			return objectToCreate;
		},

		combineWithWanderant: function combineWithWanderant(googleData, store, options) {
			options = options || {};
			// see if we can get wanderant results for any of these via their placeIds
			var placeIdArray = googleData.reduce(function (previousValue, result) {
				return previousValue.concat(result.place_id);
			}, []);
			var self = this;

			return $.getJSON('/api/ember2/items/ref_batch_search', { refs: placeIdArray }).then(function (wanderantData) {
				return self.normalizeMixedWanderantGoogleData(googleData, wanderantData, store, { previousWanderantItems: options.previousWanderantItems, index: options.index });
			});
		},

		normalizeMixedWanderantGoogleData: function normalizeMixedWanderantGoogleData(googleData, wanderantData, store, options) {
			options = options || {};
			var normalized = _ember['default'].ArrayProxy.create({ content: [] }),
			    index = options.index || 0,
			    self = this,
			    foundIds = wanderantData.found_ids,
			    foundRecordHash = {},
			    allWanderantItems = wanderantData.items.data;
			if (options.previousWanderantItems) {
				var existingItemsToConcat = [];

				options.previousWanderantItems.forEach(function (prevItem) {
					if (foundIds.indexOf(prevItem.gmaps_reference) == -1) {
						existingItemsToConcat.push(prevItem);
					}
				});
				allWanderantItems = wanderantData.items.concat(existingItemsToConcat);
			}

			// create records for the Wanderant data
			allWanderantItems.forEach(function (itemObj) {
				var record = store.push(store.normalize('item', itemObj));
				normalized.pushObject(record);
				foundRecordHash[itemObj.attributes["gmaps-reference"]] = record;
			});

			googleData.forEach(function (obj) {
				// if we found this item, place its order on its item record
				if (wanderantData.found_ids.indexOf(obj.place_id) != -1) {
					foundRecordHash[obj.place_id].set('googleResultOrder', index);
					// else we will create a new record for it
				} else {
						var itemObj = self.normalizeGoogleItem(obj, index, true);
						var item = store.createRecord('item', itemObj);
						normalized.pushObject(item);
					}
				index++;
			});
			return normalized;
		},

		convertGoogleHours: function convertGoogleHours(data) {
			if (data.opening_hours && data.opening_hours.periods) {
				var periods = data.opening_hours.periods;

				var nextDayIndex = function nextDayIndex(dayIndex) {
					return (dayIndex + 1) % 7;
				};

				var prevDayIndex = function prevDayIndex(dayIndex) {
					return (dayIndex + 6) % 7;
				};

				var daysBetween = function daysBetween(startDayIndex, endDayIndex) {
					if (startDayIndex > endDayIndex) {
						var currentIndex = startDayIndex,
						    result = [];
						while (currentIndex != prevDayIndex(endDayIndex)) {
							currentIndex = nextDayIndex(currentIndex);
							result.push(currentIndex);
						}
						return result;
					} else {
						var array = new Array(endDayIndex - startDayIndex + 1);
						for (var i = 0; i < array.length; i++) {
							array[i] = startDayIndex + i;
						}
						return array;
					}
				};

				var parseTimestring = function parseTimestring(timestring) {
					return parseInt(timestring.slice(0, 2)) * 3600 + parseInt(timestring.slice(2, 4)) * 60;
				};

				// local constants
				var startOfDaySeconds = 0,
				    endOfDaySeconds = 86400,
				    allDayPeriod = [0, 86400];

				// Don't calculate anything if there are no periods
				if (!periods || periods.length == 0) {
					return null;
				}

				//periods = JSON.parse(periods) if periods.class.name == "String"

				// Open 24/7
				if (periods.length == 1 && periods[0].open.time == "0000" && undefined === periods[0].close) {
					var array = new Array(7);
					for (var i = 0; i < array.length; i++) {
						array[i] = [allDayPeriod];
					}
					return array;
				}

				//Use this version of Array.new so that all values don't reference the same object
				var result = new Array(7);
				for (var i = 0; i < result.length; i++) {
					result[i] = [];
				}

				periods.forEach(function (period) {

					var dayIndexOpen = period.open.day,
					    dayIndexClose = period.close.day;

					var timeOpenSeconds = parseTimestring(period.open.time),
					    timeCloseSeconds = parseTimestring(period.close.time);
					//open and close on the same day
					if (dayIndexOpen == dayIndexClose) {
						result[dayIndexOpen].push([timeOpenSeconds, timeCloseSeconds]);
						// don't open and close on the same day. Example: Bar opens at 16:00 and closes at 04:00 the next day
					} else {
							result[dayIndexOpen].push([timeOpenSeconds, endOfDaySeconds]);
							if (timeCloseSeconds > startOfDaySeconds) {
								result[dayIndexClose].push([startOfDaySeconds, timeCloseSeconds]);
							}

							// if difference between open and close is more than 1 day, set days between as open 24 hours
							if (nextDayIndex(dayIndexOpen) != dayIndexClose) {
								daysBetween(dayIndexOpen, dayIndexClose).forEach(function (dayIndex) {
									result[dayIndex] = [allDayPeriod];
								});
							}
						}
				});
				return result;
			} else {
				return null;
			}
		},

		getItemType: function getItemType(data) {
			// Take the first type from the data.types and convert it to Wanderant name, then find its type_code
			var self = this;
			if (data.types && data.types.length > 0) {
				var response = data.types.reduce(function (previousValue, googleType) {
					var waType = _tripmindAppconfigConstants['default'].GOOGLE_PLACES_TYPE_CONVERSION[googleType] || googleType;
					return previousValue || self.itemTypeFromName(waType);
				}, null);
				return response;
			}
		}
	});
});
define('tripmind/mixins/item-type-conversions', ['exports', 'ember', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigConstants) {
	exports['default'] = _ember['default'].Mixin.create({
		convertTypeFromGoogle: function convertTypeFromGoogle(typeString) {
			return _tripmindAppconfigConstants['default'].GOOGLE_PLACES_TYPE_CONVERSION[typeString] || typeString;
		},

		itemTypeFromName: function itemTypeFromName(typeNameString) {
			var slug = $.trim(typeNameString).replace(/ /, "_").toUpperCase();
			return _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME[slug];
		},

		// return radius in meters for google search acc. to item type
		radiusByItemType: function radiusByItemType(itemType) {
			var result = 1000;
			if (itemType) {
				if (itemType >= constants.ITEM_TYPES_BY_NAME["COUNTRY"]) result: 500000;
				if (itemType >= constants.ITEM_TYPES_BY_NAME["REGION"]) result: 100000;
				if (itemType >= constants.ITEM_TYPES_BY_NAME["CITY"]) result: 20000;
				if (itemType >= constants.ITEM_TYPES_BY_NAME["ATTRACTION"]) result: 1000;
			}
			return result;
		},

		// return radius in meters for google search acc. to item type
		coordRangeByItemType: function coordRangeByItemType(itemType) {
			var result = 1000;
			if (itemType) {
				if (itemType >= constants.ITEM_TYPES_BY_NAME["COUNTRY"]) result: 1;
				if (itemType >= constants.ITEM_TYPES_BY_NAME["REGION"]) result: 0.5;
				if (itemType >= constants.ITEM_TYPES_BY_NAME["CITY"]) result: 0.2;
				if (itemType >= constants.ITEM_TYPES_BY_NAME["ATTRACTION"]) result: 0.005;
			}
			return result;
		},

		itemTypeIsCity: function itemTypeIsCity(itemType) {
			return itemType >= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["CITY"] && itemType < _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["NEIGHBORHOOD"];
		},

		itemTypeIsCityOrRegion: function itemTypeIsCityOrRegion(itemType) {
			return itemType >= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["REGION"] && itemType < _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["NEIGHBORHOOD"];
		},

		itemTypeIsRegionOrCountry: function itemTypeIsRegionOrCountry(itemType) {
			return itemType >= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["COUNTRY"] && itemType < _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["CITY"];
		},

		itemTypeIsParent: function itemTypeIsParent(itemType) {
			return itemType >= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["COUNTRY"] && itemType < _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["NEIGHBORHOOD"];
		},

		itemTypeIsAttraction: function itemTypeIsAttraction(itemType) {
			return itemType >= _tripmindAppconfigConstants['default'].ITEM_TYPES_BY_NAME["ATTRACTION"];
		}
	});
});
define('tripmind/mixins/model_with_descs', ['exports', 'ember', 'ember-data', 'tripmind/appconfig/better_sanitize'], function (exports, _ember, _emberData, _tripmindAppconfigBetter_sanitize) {

	var ModelWithDescs = _ember['default'].Mixin.create({
		longDesc: _emberData['default'].attr('string'),
		oneliner: _emberData['default'].attr('string'),
		altLongDesc: null,
		altOneliner: null,
		longDescOrAlt: (function () {
			return this.get('altLongDesc') || this.get('longDesc');
		}).property('longDesc', 'altLongDesc'),

		onelinerOrAlt: (function () {
			return this.get('altOneliner') || this.get('oneliner');
		}).property('oneliner', 'altOneliner'),

		onelinerOrLong: (function () {
			if (this.get('longDescOrAlt')) return _ember['default'].String.htmlSafe(this.get('longDescOrAlt').replace(/<(?:.|\n)*?>/gm, '').slice(0, 80) + "...");
			if (this.get('onelinerOrAlt')) return this.get('onelinerOrAlt');
		}).property('onelinerOrAlt', 'longDescOrAlt'),

		longDescEditable: _ember['default'].computed('longDesc', {
			get: function get(key) {
				return _ember['default'].String.htmlSafe(this.get('longDesc'));
			}, set: function set(key, value) {
				this.set('longDesc', (0, _tripmindAppconfigBetter_sanitize['default'])(value));
				return _ember['default'].String.htmlSafe(value);
			}
		})
	});

	exports['default'] = ModelWithDescs;
});
define('tripmind/mixins/promise_from_ajax', ['exports', 'ember'], function (exports, _ember) {

	var promiseFromAjax = function promiseFromAjax(ajaxOptions) {
		return new _ember['default'].RSVP.Promise(function (resolve, reject) {
			$.ajax(ajaxOptions).then(function (results) {
				_ember['default'].run(null, resolve, results);
			}, function (jqXHR) {
				jqXHR.then = null; // tame jQuery's ill mannered promises
				_ember['default'].run(null, reject, jqXHR);
			});
		});
	};

	exports['default'] = promiseFromAjax;
});
define('tripmind/mixins/promise_utils', ['exports', 'ember'], function (exports, _ember) {

	var promiseFromAjax = function promiseFromAjax(ajaxOptions) {
		return new _ember['default'].RSVP.Promise(function (resolve, reject) {
			$.ajax(ajaxOptions).then(function (results) {
				_ember['default'].run(null, resolve, results);
			}, function (jqXHR) {
				jqXHR.then = null; // tame jQuery's ill mannered promises
				_ember['default'].run(null, reject, jqXHR);
			});
		});
	};

	var promiseFromUrl = function promiseFromUrl(url, requestData) {
		return promiseFromAjax({
			url: url,
			type: 'GET',
			data: requestData,
			dataType: 'JSON'
		});
	};

	// Use this for any url that returns an empty head response.
	var headOnlyPromiseFromUrl = function headOnlyPromiseFromUrl(url, requestData) {
		return promiseFromAjax({
			url: url,
			type: 'GET',
			data: requestData,
			dataType: 'html'
		});
	};

	exports['default'] = promiseFromUrl;
});
define('tripmind/mixins/section-mixin', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Mixin.create({
		classNames: ['section-holder'],
		classNameBindings: ['isMinimized', 'inSelectMode', 'isSelected'],
		isMinimized: false,
		actionService: _ember['default'].inject.service(),
		inSelectMode: _ember['default'].computed.alias('actionService.hasSelected'),

		isSelected: (function () {
			var selectedIds = this.get('actionService.selectedIds');
			var items = this.get('model.items');
			if (!items) return false;
			return items.every(function (item) {
				return selectedIds.indexOf(item.get('id')) > -1;
			});
		}).property('model.items.[]', 'actionService.selectedIds.[]'),

		actions: {
			toggleMinimized: function toggleMinimized() {
				this.toggleProperty('isMinimized');
			},
			toggleSelected: function toggleSelected() {
				var itemIds = this.get('model.items').map(function (item) {
					return item.get('id');
				});
				if (this.get('isSelected')) {
					this.get('actionService.selectedIds').removeObjects(itemIds);
				} else {
					this.get('actionService.selectedIds').addObjects(itemIds);
				}
			}
		}
	});
});
define('tripmind/mixins/sortable', ['exports', 'ember', 'tripmind/mixins/widget'], function (exports, _ember, _tripmindMixinsWidget) {
	exports['default'] = _ember['default'].Mixin.create(_tripmindMixinsWidget['default'], {
		uiTypes: [],
		// we are not using all the resizable options and each one gets an observer above
		// therefore we only include here options that we need to set
		sortableUiOptions: ['sortable_appendTo', 'sortable_axis', 'sortable_items', 'sortable_handle', 'sortable_connectWith', 'sortable_helper'],
		sortableUiEvents: ['sortable_start', 'sortable_stop', 'sortable_update', 'sortable_sort', 'sortable_remove', 'sortable_over', 'sortable_out'],

		init: function init() {
			this._super();
			this.set('uiTypes', this.get('uiTypes').concat('sortable'));
		}
	});
});
define('tripmind/mixins/widget', ['exports', 'ember'], function (exports, _ember) {

	// Create a new mixin for jQuery UI widgets using the Ember
	// mixin syntax.
	var Widget = _ember['default'].Mixin.create({
		// call this method to set up the widget
		// IL: best if not done on every didInsertElement to save useless effort
		// e.g. when cards are still moving about.
		setupWidget: function setupWidget() {
			this._super();
			if (!this.get('widgetIsUp') && !this.get('stopWidget')) {

				var self = this;
				this.get('uiTypes').forEach(function (uiType) {
					// Make jQuery UI options available as Ember properties
					var options = self._gatherOptions(uiType);

					// Make sure that jQuery UI events trigger methods on this view.
					self._gatherEvents(uiType, options);

					// Create a new instance of the jQuery UI widget based on its `uiType`
					// and the current element.
					self._createWidget(uiType, options);
				});
				this.set('widgetIsUp', true);
			}
		},

		didInsertElement: function didInsertElement() {
			this._super();
			this.setupWidget();
		},

		destroyWidget: function destroyWidget() {
			var hasWidget = this.get('widgetIsUp');

			if (hasWidget) {
				// Tear down any observers that were created to make jQuery UI
				// options available as Ember properties.
				var observers = this._observers;
				for (var prop in observers) {
					if (observers.hasOwnProperty(prop)) {
						this.removeObserver(prop, observers[prop]);
					}
				}
				var self = this;
				this.get('uiTypes').forEach(function (uiType) {
					self._destroyData(self, uiType);
				});
			}
			this.set('widgetIsUp', false);
		},

		// When Ember tears down the view's DOM element, it will call
		// this method.
		willDestroyElement: function willDestroyElement() {
			this._super();
			this.destroyWidget();
		},

		// Each jQuery UI widget has a series of options that can be configured.
		// For instance, to disable a button, you call
		// `button.options('disabled', true)` in jQuery UI. To make this compatible
		// with Ember bindings, any time the Ember property for a
		// given jQuery UI option changes, we update the jQuery UI widget.
		_gatherOptions: function _gatherOptions(uiType) {
			var uiOptions = this.get(uiType + 'UiOptions'),
			    options = {};
			var self = this;

			// The view can specify a list of jQuery UI options that should be treated
			// as Ember properties.
			//
			// we use uiType_* for option names - e.g., draggable_grid
			uiOptions.forEach(function (key) {
				var jQkey = key.split('_')[1];
				options[jQkey] = this.get(key);

				// TODO: split this so we only set observers on some properties, and others are
				// just set up front
				//
				// Set up an observer on the Ember property. When it changes,
				// call jQuery UI's `option` method to reflect the property onto
				// the jQuery UI widget.
				var observer = function observer() {
					var value = this.get(key);
					self._setOption(this, uiType, jQkey, value);
				};

				this.addObserver(key, observer);

				// Insert the observer in a Hash so we can remove it later.
				this._observers = this._observers || {};
				this._observers[key] = observer;
			}, this);

			return options;
		},

		// Each jQuery UI widget has a number of custom events that they can
		// trigger. For instance, the progressbar widget triggers a `complete`
		// event when the progress bar finishes. Make these events behave like
		// normal Ember events. For instance, a subclass of JQ.ProgressBarView
		// could implement the `complete` method to be notified when the jQuery
		// UI widget triggered the event.
		_gatherEvents: function _gatherEvents(uiType, options) {
			var uiEvents = this.get(uiType + 'UiEvents') || [],
			    self = this;

			uiEvents.forEach(function (eventName) {
				var callback = self[eventName];

				if (callback) {
					// You can register a handler for a jQuery UI event by passing
					// it in along with the creation options. Update the options hash
					// to include any event callbacks.
					//
					// we use uiType_* for event names - e.g., draggable_start
					options[eventName.split('_')[1]] = function (event, ui) {
						callback.call(self, event, ui);
					};
				}
			});
		},

		// Some jquery widgets are functions, while others are objects. Based on this:
		// http://stackoverflow.com/questions/10435266/getting-jquery-uis-datepicker-widget-as-a-emberjs-mixin-to-work
		_createWidget: function _createWidget(uiType, options) {
			if (typeof $.ui[uiType] === 'function') {
				$.ui[uiType](options, this.$());
			} else {
				// "object"
				this.$()[uiType](options);
			}
		},

		// Widgets that are functions have a "data", while ones that are objects don't
		// We use the data to bind options or destroy the widgets

		_setOption: function _setOption(element, uiType, key, value) {
			var uiData = element.$().data('ui' + uiType.capitalize());
			if (uiData && typeof uiData.option === 'function') {
				uiData.option(key, value);
			} else {
				element.$()[uiType]("option", key, value);
			}
		},

		_destroyData: function _destroyData(element, uiType) {
			var uiData = element.$().data('ui' + uiType.capitalize());
			if (uiData && typeof uiData.destroy === 'function') {
				uiData.destroy();
			} else {
				element.$()[uiType]("destroy");
			}
		}

	});

	exports['default'] = Widget;
});
define('tripmind/mixins/with_ancestry', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Mixin.create({
		parentName: (function () {
			var names = this.get('ancestryNames');
			if (names && names.length > 0) {
				names = names.split("/");
				return names[names.length - 1];
			} else {
				return false;
			}
		}).property('ancestryNames'),

		itemTypeInParent: (function () {
			var itemTypeName = this.get('itemTypeClean');
			var parentName = this.get('parentName');

			if (parentName) {
				return itemTypeName + ' in ' + parentName;
			} else {
				return itemTypeName;
			}
		}).property('itemTypeClean', 'parentName'),

		path: (function () {
			var ancestry = this.get('ancestry');
			if (ancestry && ancestry.length > 0) {
				return ancestry + '/' + this.get('id');
			} else {
				return this.get('id');
			}
		}).property('ancestry', 'id'),

		pathNames: (function () {
			var ancestryNames = this.get('ancestryNames');
			if (ancestryNames && ancestryNames.length > 0) {
				return ancestryNames + '/' + this.get('name');
			} else {
				return this.get('name');
			}
		}).property('ancestryNames', 'name'),

		/*ancestorsArray: function () {
  	var ancestryNames = this.get('ancestryNames'),
  		response = [];
  	if (ancestryNames && ancestryNames.length > 0) {
  		var ancestryNamesArray = ancestryNames.split("/");
  		response = ancestryNamesArray.map(function (el, i) {
  			return {target: 'item', name: ancestryNamesArray[i], slug: ancestryNamesArray.slice(0,i+1).join("_"), offsetClass: `offset-${i + 1}`}
  		});
  	}
  	var ancestryLength = response.length;
  	response.push({target: 'item', name: this.get('name'), slug: this.get('slug'), offsetClass: `offset-${ancestryLength + 1} is-selected`});
  	return response;
  }.property('ancestryNames', 'name', 'slug'),*/

		ancestorsArray: (function () {
			var ancestry = this.get('ancestry'),
			    ancestryNames = this.get('ancestryNames'),
			    response = [];
			if (ancestry && ancestry.length > 0) {
				var ancestryArray = ancestry.split("/"),
				    ancestryNamesArray = ancestryNames.split("/");
				response = ancestryArray.map(function (el, i) {
					return { target: 'item', name: ancestryNamesArray[i], slug: el + '+' + ancestryNamesArray[i], offsetClass: 'offset-' + (i + 1) };
				});
			}
			var ancestryLength = response.length;
			//response.push({target: 'item', name: this.get('name'), slug: this.get('slug'), offsetClass:`offset-${ancestryLength + 1} is-selected`});
			return response;
		}).property('ancestry', 'ancestryNames', 'name', 'slug')

	});
});
define('tripmind/mixins/with_item_image', ['exports', 'ember', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigConstants) {

	var WithItemImage = _ember['default'].Mixin.create({
		defaultImageUrl: "",
		defaultImageStyle: "background-color: #000",
		missingImage: _ember['default'].computed.empty('imageProvider'),

		// overwrite these in models

		imageUrl: "",
		imageStyle: "",
		//imageProvider: null,

		// for a singular item object

		itemImageUrl: (function () {
			var baseUrl = this.get('imageBaseUrl');

			if (baseUrl) {
				if (this.get('imageProvider') == _tripmindAppconfigConstants['default'].WANDERANT_IMAGES && Math.floor(Math.random() * 2) % 2 == 0) {
					return baseUrl.replace(_tripmindAppconfigConstants['default'].CDN_PATH_1, _tripmindAppconfigConstants['default'].CDN_PATH_2);
				} else if (this.get('imageProvider') == _tripmindAppconfigConstants['default'].WIKIPEDIA_IMAGES) {
					var imageName = baseUrl.split("/").pop();
					return baseUrl.replace('commons/', 'commons/thumb/').replace(imageName, [imageName, "/%@px-", imageName].join(""));
				} else {
					return baseUrl;
				}
			} else if (this.get('googleIcon')) {
				return this.get('googleIcon');
			} else {
				return this.get('defaultImageUrl');
			}
		}).property('imageBaseUrl', 'imageProvider', 'googleIcon'),

		itemImageStyle: (function () {
			if ([0, 1, 2, 3, 4, 5, 6, 7].indexOf(this.get('imageProvider')) > -1) {
				return "background-image: url('%@');";
			} else if (this.get('googleIcon')) {
				return "background-image: url('%@'); background-size:71px;";
			} else {
				return this.get('defaultImageStyle');
			}
		}).property('imageProvider', 'googleIcon'),

		// for a list of items

		itemArrayImageUrl: (function () {
			return this.get('firstItemCalc') && this.get('firstItemCalc.imageUrl') ? this.get('firstItemCalc.imageUrl') : this.get('defaultImageUrl');
		}).property('firstItemCalc.imageUrl'),

		itemArrayImageStyle: (function () {
			return this.get('firstItemCalc') && this.get('firstItemCalc.imageStyle') ? this.get('firstItemCalc.imageStyle') : this.get('defaultImageStyle');
		}).property('firstItemCalc.imageStyle'),

		// all

		imageSizeToken: function imageSizeToken(sizeName, imageProvider) {
			if (imageProvider == undefined) return "";

			return _tripmindAppconfigConstants['default'].IMAGE_PROVIDERS.find(function (provider) {
				return provider.provider_id == imageProvider;
			}).sizes.find(function (size) {
				return size.name == sizeName;
			}).token;
		},

		smallImageUrl: (function () {
			return this.get('imageUrl').replace('%@', this.imageSizeToken('small', this.get('imageProvider')));
		}).property('imageUrl', 'imageProvider'),

		mediumImageUrl: (function () {
			return this.get('imageUrl').replace('%@', this.imageSizeToken('medium', this.get('imageProvider')));
		}).property('imageUrl', 'imageProvider'),

		largeImageUrl: (function () {
			return this.get('imageUrl').replace('%@', this.imageSizeToken('large', this.get('imageProvider')));
		}).property('imageUrl', 'imageProvider'),

		smallImageStyle: (function () {
			return _ember['default'].String.htmlSafe(this.get('imageStyle').replace('%@', this.get('smallImageUrl')));
		}).property('imageStyle', 'smallImageUrl'),

		mediumImageStyle: (function () {
			return _ember['default'].String.htmlSafe(this.get('imageStyle').replace('%@', this.get('mediumImageUrl')));
		}).property('imageStyle', 'mediumImageUrl'),

		largeImageStyle: (function () {
			var output = this.get('imageStyle').replace('%@', this.get('largeImageUrl'));
			// fix for wikipedia images
			if (this.get('imageProvider') == _tripmindAppconfigConstants['default'].WIKIPEDIA_IMAGES) {
				var imageName = output.split("/").pop();
				output = output.replace("/" + imageName, "").replace('commons/thumb/', 'commons/') + "');";
			}
			return _ember['default'].String.htmlSafe(output);
		}).property('imageStyle', 'largeImageUrl'),

		// aliases

		smallImage: _ember['default'].computed.alias('smallImageUrl'),
		mediumImage: _ember['default'].computed.alias('mediumImageUrl'),
		largeImage: _ember['default'].computed.alias('largeImageUrl')

	});

	exports['default'] = WithItemImage;
});
define('tripmind/models/collection', ['exports', 'ember', 'ember-data', 'tripmind/appconfig/promise_from_ajax', 'tripmind/appconfig/head_only_promise_from_ajax', 'tripmind/appconfig/constants'], function (exports, _ember, _emberData, _tripmindAppconfigPromise_from_ajax, _tripmindAppconfigHead_only_promise_from_ajax, _tripmindAppconfigConstants) {
	exports['default'] = _emberData['default'].Model.extend({
		name: _emberData['default'].attr('string'),
		items: _emberData['default'].hasMany('item'),
		tmToken: _emberData['default'].attr('string'),
		createdAt: _emberData['default'].attr('string'),
		updatedAt: _emberData['default'].attr('string'),
		dates: _emberData['default'].hasMany('date'),

		slug: (function () {
			return this.get('id') + '-' + this.get('name');
		}).property('id', 'name'),

		addDate: function addDate(position) {
			var order = position == "before" ? 0 : 99999,
			    self = this;
			this.get('dates').then(function (dates) {
				var date = self.store.createRecord('date', { order: order });
				dates.addObject(date);
				self.reorderDates();
				self.save();
			});
		},

		reorderDates: function reorderDates() {
			this.get('dates').then(function (dates) {
				var orderedDates = dates.sortBy('order');
				orderedDates.forEach(function (date, idx) {
					date.set('order', idx + 1);
					date.save();
				});
			});
		},

		orderedDates: (function () {
			return this.get('dates').sortBy('order');
		}).property('dates.[].order'),

		getTmToken: function getTmToken() {
			var self = this,
			    store = this.store;
			return new _ember['default'].RSVP.Promise(function (resolve, reject) {
				if (self.get('tmToken')) {
					resolve({});
				} else {
					(0, _tripmindAppconfigPromise_from_ajax['default'])({
						url: _tripmindAppconfigConstants['default'].BASE_SERVER_URL + '/api/tm/tm_collections/',
						type: 'POST'
					}).then(function (result) {
						self.set('tmToken', result.tm_token);
						// Here we replace the collection with a new copy that has the tmToken as its id as well
						var attributes = self.serialize();
						attributes.items = attributes.items.map(function (id) {
							return store.peekRecord('item', id);
						});
						attributes.dates = attributes.dates.map(function (id) {
							return store.peekRecord('date', id);
						});
						var newCollection = store.createRecord('collection', $.extend(attributes, { id: result.tm_token, tmToken: result.tm_token }));

						newCollection.save().then(function () {
							attributes.items.forEach(function (item) {
								var itemCollections = item.get('collections');
								itemCollections.removeObject(self);
								itemCollections.addObject(newCollection);
								item.save();
							});
							attributes.dates.forEach(function (date) {
								date.set('collection', newCollection);
								date.save();
							});
						}).then(function () {
							self.destroyRecord();
							resolve({
								token: self.get('tmToken'),
								redirect: true,
								newModel: newCollection
							});
						}, function () {
							reject('could not save');
						});
					}, function (status) {
						reject(status);
					});
				}
			});
		},

		postToServer: function postToServer() {
			var self = this,
			    linksToSend = _ember['default'].ArrayProxy.create({ content: [] }),
			    trippointsToSend = _ember['default'].ArrayProxy.create({ content: [] }),
			    dateItemsToSend = _ember['default'].ArrayProxy.create({ content: [] });
			return this.get('items').then(function (items) {
				var visitedLinkPromises = items.map(function (item) {
					return item.get('potentialLinks').then(function (links) {
						return links.filter(function (link) {
							return link.get('lastVisited') > 0;
						});
					});
				});
				return _ember['default'].RSVP.allSettled(visitedLinkPromises).then(function (array) {
					array.forEach(function (el) {
						if (el.state == 'fulfilled') linksToSend.addObjects(el.value);
					});
					return self.get('dates').then(function (dates) {
						var trippointPromises = dates.map(function (date) {
							return date.get('trippoints');
						});
						return _ember['default'].RSVP.allSettled(trippointPromises).then(function (tpPromiseArray) {
							tpPromiseArray.forEach(function (el) {
								if (el.state == 'fulfilled') trippointsToSend.addObjects(el.value);
							});
							var dateItemPromises = trippointsToSend.map(function (tp) {
								return tp.get('item');
							});
							return _ember['default'].RSVP.allSettled(dateItemPromises).then(function (dateItemsArray) {
								dateItemsArray.forEach(function (el) {
									if (el.state == 'fulfilled') dateItemsToSend.addObject(el.value);
								});
								return dateItemsToSend;
							}).then(function (dateItemsToSend) {
								var allItemAncestorIds = items.toArray().concat(dateItemsToSend.toArray()).reduce(function (pv, item) {
									var ancestorArray = item.get('ancestry');
									ancestorArray = ancestorArray ? ancestorArray.split("/") : [];
									return pv.concat(ancestorArray);
								}, []).uniq();
								return self.store.findAll('item').then(function (allItemRecords) {
									var ancestorItems = allItemRecords.filter(function (item) {
										return allItemAncestorIds.indexOf(item.get('id')) > -1;
									});
									var serializedRecords = [{
										attributes: self.toJSON(),
										type: 'collection',
										id: self.get('tmToken'),
										relationships: {
											items: {
												data: items.map(function (item) {
													return { type: 'item', id: item.get('id') };
												})
											}

										}
									}],
									    serializedItems = items.map(function (item) {
										var potentialLinks = item.get('potentialLinks').filter(function (link) {
											return link.get('lastVisited') > 0;
										});
										return {
											id: item.get('id'),
											type: 'item',
											attributes: item.toJSON(),
											relationships: {
												collections: {
													data: [{ type: 'collection', id: self.get('tmToken') }]
												},
												potentialLinks: {
													data: potentialLinks.map(function (link) {
														return { type: 'potentialLink', id: link.get('id') };
													})
												}
											}
										};
									}),
									    serializedLinks = linksToSend.map(function (link) {
										return {
											id: link.get('id'),
											type: 'potentialLink',
											attributes: link.toJSON(),
											relationships: {
												item: {
													data: { type: 'item', id: link.get('item.id') }
												}
											}
										};
									}),
									    serializedDates = dates.map(function (date) {
										var tps = date.get('trippoints');
										return {
											id: date.get('id'),
											type: 'date',
											attributes: date.toJSON(),
											relationships: {
												collection: {
													data: { type: 'collection', id: self.get('id') }
												},
												trippoints: {
													data: tps.map(function (tp) {
														return { type: 'trippoint', id: tp.get('id') };
													})
												}
											}
										};
									}),
									    serializedTrippoints = trippointsToSend.map(function (tp) {
										return {
											id: tp.get('id'),
											type: 'trippoint',
											attributes: tp.toJSON(),
											relationships: {
												date: {
													data: { type: 'date', id: tp.get('date.id') }
												},
												item: {
													data: { type: 'item', id: tp.get('item.id') }
												}
											}
										};
									}),
									    serializedDateItems = dateItemsToSend.map(function (item) {
										var tps = item.get('trippoints');
										return {
											id: item.get('id'),
											type: 'item',
											attributes: item.toJSON(),
											relationships: {
												trippoints: {
													data: tps.map(function (tp) {
														return { type: 'trippoint', id: tp.get('id') };
													})
												}
											}
										};
									}),
									    serializedAncestors = ancestorItems.map(function (item) {
										return {
											id: item.get('id'),
											type: 'item',
											attributes: item.toJSON()
										};
									});

									serializedRecords = serializedRecords.concat(serializedItems).concat(serializedLinks).concat(serializedDates).concat(serializedTrippoints).concat(serializedDateItems).concat(serializedAncestors);
									var stringifiedRecords = JSON.stringify(serializedRecords);
									var compressedJSON = lzwCompress.pack(stringifiedRecords);
									var compressed = JSON.stringify(compressedJSON).length < stringifiedRecords.length;
									var compressedData = compressed ? compressedJSON : stringifiedRecords;
									return (0, _tripmindAppconfigHead_only_promise_from_ajax['default'])({
										url: _tripmindAppconfigConstants['default'].BASE_SERVER_URL + '/api/tm/tm_collections/' + self.get('tmToken'),
										type: 'PATCH',
										data: {
											tm_collection: {
												is_compressed: compressed,
												last_updated: self.get('updatedAt'),
												data: compressedData
											}
										}
									}).then(function () {
										console.log("resolve: ", compressedData);
										return compressedData;
									}, function (status) {
										console.log('reject:', status);
										return status;
									});
								})['catch'](function (error) {
									console.log('couldnt find all items', error);
								});
							})['catch'](function (error) {
								console.log('couldnt find all dateItems', error);
							});
						})['catch'](function (error) {
							console.log('couldnt find all trippoints', error);
						});
					})['catch'](function (error) {
						console.log('couldnt find all dates', error);
					});
				})['catch'](function (error) {
					console.log('couldnt find all links', error);
				});
			});
		},

		itemsChange: (function () {
			console.log('items changed!');
		}).observes('items.[]'),

		allItems: (function () {
			var allItems = _ember['default'].ArrayProxy.create({ content: [] });
			allItems.addObjects(this.get('items'));
			this.get('dates').forEach(function (date) {
				allItems.addObjects(date.get('items'));
			});
			return allItems;
		}).property('items.[]', 'dates.[].items')

	});
});
define('tripmind/models/date', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		date: _emberData['default'].attr('string'),
		order: _emberData['default'].attr('number'),
		collection: _emberData['default'].belongsTo('collection'),
		trippoints: _emberData['default'].hasMany('trippoint'),
		color: _emberData['default'].attr('string'),

		title: (function () {
			var date = this.get('date');
			if (date) {
				return moment(date, "X").format('MM/DD/YYYY');
			} else {
				return 'Day ' + this.get('order');
			}
		}).property('order', 'date'),

		items: _ember['default'].computed('trippoints.[].item', {
			// The get function is on purpose NOT a promise so it can be used in templates."use strict";
			// The route has to make sure that we are loading all the items correctly.
			get: function get(key) {
				return this.get('trippoints').filter(function (tp) {
					return tp.currentState.stateName.indexOf('deleted') == -1;
				}).sortBy('order').map(function (tp) {
					return tp.get('item');
				});
				/*var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
    	self.get('trippoints').then(function (tps) {
    		var itemPromises = tps
    			.filter(function (tp) {
    				return tp.currentState.stateName.indexOf('deleted') == -1
    			})
    			.sortBy('order').map(function (tp) {
    				return tp.get('item')
    			});
    		Ember.RSVP.allSettled(itemPromises)
    			.then(function (array) {
    				var response = array.map(function (el) {
    					if (el.state == 'fulfilled')return el.value;
    				});
    				resolve(response);
    			})
    	});
    });*/
			}, set: function set(key, value) {
				var self = this;
				var currentTps = this.get('trippoints');
				currentTps.forEach(function (trippoint) {
					if (trippoint.currentState.stateName.indexOf('inFlight') == -1) trippoint.destroyRecord();
				});
				var newItems = value.map(function (item, idx) {
					var trippoint = self.store.createRecord('trippoint', { order: idx, item: item, date: self });
					trippoint.save();
					item.save();
					return item;
				});
				return newItems;
			}
		}),

		firstItem: (function () {
			return this.get('items.firstObject');
		}).property('items.[]'),

		lastItem: (function () {
			return this.get('items.lastObject');
		}).property('items.[]')

	});
});
define('tripmind/models/item', ['exports', 'ember', 'ember-data', 'tripmind/mixins/with_item_image', 'tripmind/mixins/with_ancestry', 'tripmind/mixins/model_with_descs', 'tripmind/appconfig/constants', 'tripmind/appconfig/utils'], function (exports, _ember, _emberData, _tripmindMixinsWith_item_image, _tripmindMixinsWith_ancestry, _tripmindMixinsModel_with_descs, _tripmindAppconfigConstants, _tripmindAppconfigUtils) {

	var Item = _emberData['default'].Model.extend(_tripmindMixinsWith_item_image['default'], _tripmindMixinsWith_ancestry['default'], _tripmindMixinsModel_with_descs['default'], {
		name: _emberData['default'].attr('string'),
		category: _emberData['default'].attr('string'),
		captionName: _emberData['default'].attr('string'),
		captionLink: _emberData['default'].attr('string'),
		captionCc: _emberData['default'].attr('string'),
		image: _emberData['default'].attr('string'),
		address: _emberData['default'].attr('string'),
		ancestry: _emberData['default'].attr('string'),
		ancestryDepth: _emberData['default'].attr('number'),
		ancestryNames: _emberData['default'].attr('string'),
		duration: _emberData['default'].attr('number', { defaultValue: 3600 }),
		lat: _emberData['default'].attr('number'),
		lng: _emberData['default'].attr('number'),
		boundSwLat: _emberData['default'].attr('number'),
		boundSwLng: _emberData['default'].attr('number'),
		boundNeLat: _emberData['default'].attr('number'),
		boundNeLng: _emberData['default'].attr('number'),
		userId: _emberData['default'].attr('number'),
		itemType: _emberData['default'].attr('string'),
		googleHours: _emberData['default'].attr(),
		externalLinks: _emberData['default'].attr(),
		phone: _emberData['default'].attr('string'),
		rating: _emberData['default'].attr('number'),
		source: _emberData['default'].attr('string'),
		price: _emberData['default'].attr('string'),
		openingHoursText: _emberData['default'].attr('string'),
		topItems: _emberData['default'].attr('number'),
		isHighlight: _emberData['default'].attr('boolean', { defaultValue: false }),
		canHaveChildren: _emberData['default'].attr('boolean'),
		hasSuggestedTrips: _emberData['default'].attr('boolean'),
		isEditLocked: _emberData['default'].attr('boolean', { defaultValue: false }),
		collections: _emberData['default'].hasMany('collection'),
		//trip: DS.belongsTo('trip', {inverse: 'items'}),
		//potentialTrip: DS.belongsTo('trip', {inverse: 'potentialItems'}),
		parent: _emberData['default'].belongsTo('item'),
		gmapsReference: _emberData['default'].attr('string'),
		isGoogle: _emberData['default'].attr('boolean', { defaultValue: false }),
		isHidden: _emberData['default'].attr('boolean', { defaultValue: false }),
		additionalInfoComplete: _emberData['default'].attr('boolean', { defaultValue: false }),
		needsWikiContent: _emberData['default'].attr('boolean'),
		needsFullGoogleInfo: _emberData['default'].attr('boolean'),
		imageBaseUrl: _emberData['default'].attr('string'),
		imageProvider: _emberData['default'].attr('number'),
		reviewDigest: _emberData['default'].attr('number'),
		googleResultOrder: _emberData['default'].attr('number'),
		googleTypes: _emberData['default'].attr(),
		ancestryObject: _emberData['default'].attr(),
		parentOptions: _emberData['default'].attr(),
		recentlyUpdated: _emberData['default'].attr('boolean', { defaultValue: false }),
		trackingStatus: _emberData['default'].attr('boolean', { defaultValue: true }),
		trippointsCount: _emberData['default'].attr('number'),
		destinationRoute: 'item.overview',
		isTemporary: _emberData['default'].attr('boolean', { defaultValue: false }),
		updatedAt: _emberData['default'].attr('string'),
		potentialLinks: _emberData['default'].hasMany('potentialLink'),
		trippoints: _emberData['default'].hasMany('trippoint'),

		save: function save(options) {
			if (this.currentState.stateName.indexOf('deleted') == -1) {
				this.set('updatedAt', moment().format("X"));
				// next 2 lines are for temporary items so they get properly saved and come up later
				if (!this.get('trackingStatus')) this.set('trackingStatus', !!this.get('trackingStatus'));
				this.set('isTemporary', false);
			}
			return this._super(options);
		},

		visitedLinks: (function () {
			return this.get('potentialLinks').filter(function (link) {
				return link.get('lastVisited');
			});
		}).property('potentialLinks.[].lastVisited'),

		itemDetailsService: _ember['default'].inject.service('item-details-service'),

		googleLink: (function () {
			var parentName = this.get('parentName');
			var nameInParent = parentName ? this.get('name') + ", " + parentName : this.get('name');
			return 'https://www.google.com/webhp?ie=UTF-8#safe=off&q=' + nameInParent.replace(/\s/g, "+");
		}).property('name', 'parentName'),

		googleImagesLink: (function () {
			var parentName = this.get('parentName');
			var nameInParent = parentName ? this.get('name') + ", " + parentName : this.get('name');
			return 'https://www.google.com/search?q=' + nameInParent.replace(/\s/g, "+") + '&tbm=isch';
		}).property('name', 'parentName'),

		deletedStatus: _ember['default'].computed.not('trackingStatus'),

		updatedAtRecently: (function () {
			return moment(this.get('updatedAt'), "X").startOf('day').calendar(null, {
				sameDay: '[Today]',
				nextDay: '[Tomorrow]',
				nextWeek: 'dddd',
				lastDay: '[Yesterday]',
				lastWeek: 'MM/DD',
				sameElse: 'MM/DD'
			});
		}).property('updatedAt'),

		updatedAtDate: (function () {
			return moment(this.get('updatedAt'), "X").format('MM/DD/YYYY');
		}).property('updatedAt'),

		itemTypeClean: (function () {
			var itemType = this.get('itemType');
			return itemType ? itemType.replace(/_/g, " ") : null;
		}).property('itemType'),

		operatingHours: (function () {
			var googleHours = this.get('googleHours');
			if (googleHours) {
				return this.convertGoogleHours(googleHours);
			} else {
				return this.get('operatingHoursText');
			}
		}).property('googleHours', 'operatingHoursText'),

		imageUrl: _ember['default'].computed.alias('itemImageUrl'),
		imageStyle: _ember['default'].computed.alias('itemImageStyle'),

		photoStyle: (function () {
			if (this.get('image')) {
				return _ember['default'].String.htmlSafe('background-image: url(' + this.get('image') + ')');
			} else {
				var colorLength = _tripmindAppconfigConstants['default'].FLAT_DESIGN_COLORS.length,
				    color = _tripmindAppconfigConstants['default'].FLAT_DESIGN_COLORS[Math.floor(Math.random() * colorLength)];
				return _ember['default'].String.htmlSafe('background-image: url(\'assets/images/background-pattern.png\'); background-color: ' + color + ';');
			}
		}).property('image'),

		details: (function () {
			var details = [],
			    detailNames = ['address', 'phone'];
			for (var i = 0; i < detailNames.length; i++) {
				var name = detailNames[i];
				if (this.get(name)) {
					details.push({
						name: name.capitalize(),
						value: this.get(name)
					});
				}
			}
			return details;
		}).property('address', 'phone', 'operatingHours'),

		itemTypeName: (function () {
			return _tripmindAppconfigConstants['default'].ITEM_TYPES_ARRAY[this.get('itemType')] ? _tripmindAppconfigConstants['default'].ITEM_TYPES_ARRAY[this.get('itemType')].name.capitalize() : 'Attraction';
		}).property('itemType'),

		slug: (function () {
			var name = this.get('name');
			return [this.get('id').toString(), name ? name.toLowerCase() : ""].join(' ').replace(/ /g, '+');
		}).property('id', 'name'),

		reviewedByArray: (function () {
			var reviewDigest = this.get('reviewDigest');
			if (!reviewDigest) return;
			var reviewsArray = reviewDigest.toString(2).split("").reverse();
			return reviewsArray.map(function (el, index) {
				return el == 1 ? { 'class': "review_source_" + index } : null;
			}).compact();
		}).property('reviewDigest'),

		getAdditionalItemInfo: function getAdditionalItemInfo() {
			console.log('getting more info for ', this.get('name'));
			this.get('itemDetailsService').getAdditionalItemInfo(this.get('id'));
		},

		isRegion: (function () {
			return _tripmindAppconfigUtils['default'].itemTypeIsRegion(this.get('itemType'));
		}).property('itemType'),

		websiteLink: (function () {
			var links = this.get('externalLinks');
			if (links && links.length > 0) {
				return links[0]["source"];
			}
		}).property('externalLinks'),

		mapLink: (function () {
			return 'http://maps.google.com/maps?daddr=' + this.get('lat') + ',' + this.get('lng') + '&amp;ll=';
		}).property('lat', 'lng'),

		phoneLink: (function () {
			return 'tel:' + this.get('phone');
		}).property('phone'),

		convertGoogleHours: function convertGoogleHours(periods) {
			if (periods) {
				var nextDayIndex = function nextDayIndex(dayIndex) {
					return (dayIndex + 1) % 7;
				};

				var prevDayIndex = function prevDayIndex(dayIndex) {
					return (dayIndex + 6) % 7;
				};

				var daysBetween = function daysBetween(startDayIndex, endDayIndex) {
					if (startDayIndex > endDayIndex) {
						var currentIndex = startDayIndex,
						    result = [];
						while (currentIndex != prevDayIndex(endDayIndex)) {
							currentIndex = nextDayIndex(currentIndex);
							result.push(currentIndex);
						}
						return result;
					} else {
						var array = new Array(endDayIndex - startDayIndex + 1);
						for (var i = 0; i < array.length; i++) {
							array[i] = startDayIndex + i;
						}
						return array;
					}
				};

				var parseTimestring = function parseTimestring(timestring) {
					return parseInt(timestring.slice(0, 2)) * 3600 + parseInt(timestring.slice(2, 4)) * 60;
				};

				// local constants
				var startOfDaySeconds = 0,
				    endOfDaySeconds = 86400,
				    allDayPeriod = [0, 86400];

				// Don't calculate anything if there are no periods
				if (!periods || periods.length == 0) {
					return null;
				}

				//periods = JSON.parse(periods) if periods.class.name == "String"

				// Open 24/7
				if (periods.length == 1 && periods[0].open.time == "0000" && undefined === periods[0].close) {
					var array = new Array(7);
					for (var i = 0; i < array.length; i++) {
						array[i] = [allDayPeriod];
					}
					return array;
				}

				//Use this version of Array.new so that all values don't reference the same object
				var result = new Array(7);
				for (var i = 0; i < result.length; i++) {
					result[i] = [];
				}

				periods.forEach(function (period) {

					var dayIndexOpen = period.open.day,
					    dayIndexClose = period.close.day;

					var timeOpenSeconds = parseTimestring(period.open.time),
					    timeCloseSeconds = parseTimestring(period.close.time);
					//open and close on the same day
					if (dayIndexOpen == dayIndexClose) {
						result[dayIndexOpen].push([timeOpenSeconds, timeCloseSeconds]);
						// don't open and close on the same day. Example: Bar opens at 16:00 and closes at 04:00 the next day
					} else {
							result[dayIndexOpen].push([timeOpenSeconds, endOfDaySeconds]);
							if (timeCloseSeconds > startOfDaySeconds) {
								result[dayIndexClose].push([startOfDaySeconds, timeCloseSeconds]);
							}

							// if difference between open and close is more than 1 day, set days between as open 24 hours
							if (nextDayIndex(dayIndexOpen) != dayIndexClose) {
								daysBetween(dayIndexOpen, dayIndexClose).forEach(function (dayIndex) {
									result[dayIndex] = [allDayPeriod];
								});
							}
						}
				});
				return result;
			} else {
				return null;
			}
		},

		secondsToTime: function secondsToTime(seconds) {
			var date = new Date(seconds * 1000);
			var hours = date.getUTCHours(); // returns 0 for both 00:00 and 24:00
			var minutes = date.getUTCMinutes();
			var suffix = hours >= 12 ? "PM" : "AM";

			if (hours == 0) hours = 12;
			if (hours > 12) hours -= 12;

			//hours = ["0", hours].join("").slice(-2);
			minutes = ["0", minutes].join("").slice(-2);

			return minutes > 0 ? [hours, ':', ["0", minutes].join("").slice(-2), suffix].join("") : [hours, suffix].join("");
		},

		textOperatingHours: (function () {
			var operatingHours = this.get('operatingHours');

			if (operatingHours && operatingHours.length == 7) {
				var dayNames;

				if (operatingHours.isUniform()) {
					operatingHours = [operatingHours[0]];
					dayNames = ["Every day"];
				} else {
					operatingHours = operatingHours.rotate();
					dayNames = _tripmindAppconfigConstants['default'].DAY_NAMES.rotate();
				}

				var result = [];

				for (var i = 0; i < operatingHours.length; i++) {
					var title = dayNames[i];
					var periods = operatingHours[i];
					var resultPeriods = [];

					for (var j = 0; j < periods.length; j++) {
						var period = periods[j];
						var startTime = this.secondsToTime(period[0]);
						var endTime = this.secondsToTime(period[1]);
						var resultPeriod = startTime == endTime ? "Open 24 hours" : [startTime, ' - ', endTime].join("");

						resultPeriods[j] = { period: resultPeriod };
					}

					result[i] = { title: title, periods: resultPeriods.length ? resultPeriods : [{ period: 'Closed' }] };
				}

				return result;
			} else {
				return [];
			}
		}).property('operatingHours')

	});

	exports['default'] = Item;
});
define('tripmind/models/path-index', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		itemId: _emberData['default'].attr('string')
	});
});
define('tripmind/models/potential-link', ['exports', 'ember', 'ember-data', 'tripmind/appconfig/constants'], function (exports, _ember, _emberData, _tripmindAppconfigConstants) {
	exports['default'] = _emberData['default'].Model.extend({
		createdAt: _emberData['default'].attr('string'),
		lastVisited: _emberData['default'].attr('string'),
		note: _emberData['default'].attr('string'),
		image: _emberData['default'].attr('string'),
		title: _emberData['default'].attr('string'),
		description: _emberData['default'].attr('string'),
		item: _emberData['default'].belongsTo('item'),

		noteOrDesc: _ember['default'].computed('note', 'description', {
			get: function get(key) {
				return _ember['default'].String.htmlSafe(this.get('note') || this.get('description'));
			}, set: function set(key, value) {
				this.set('note', value);
				return _ember['default'].String.htmlSafe(value);
			}
		}),

		domain: (function () {
			var a = $('<a>', { href: this.get('id') })[0];
			return a.hostname;
		}).property("id"),

		photoStyle: (function () {
			if (this.get('image')) {
				return _ember['default'].String.htmlSafe('background-image: url(' + this.get('image') + ')');
			} else {
				var colorLength = _tripmindAppconfigConstants['default'].FLAT_DESIGN_COLORS.length,
				    color = _tripmindAppconfigConstants['default'].FLAT_DESIGN_COLORS[Math.floor(Math.random() * colorLength)];
				return _ember['default'].String.htmlSafe('background-image: url(\'assets/images/background-pattern.png\'); background-color: ' + color + ';');
			}
		}).property('image')

	});
});
define('tripmind/models/trippoint', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		date: _emberData['default'].belongsTo('date'),
		item: _emberData['default'].belongsTo('item'),
		order: _emberData['default'].attr('number')

	});
});
define('tripmind/router', ['exports', 'ember', 'tripmind/config/environment'], function (exports, _ember, _tripmindConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _tripmindConfigEnvironment['default'].locationType,
		feedbackService: _ember['default'].inject.service('feedback-service'),

		doSomethingOnUrlChange: (function () {
			_ember['default'].run.schedule('afterRender', this, 'prepView');
			ga('send', 'pageview', {
				'page': this.get('url'),
				'title': this.get('url')
			});
		}).on('didTransition'),

		// Close any menus, and send a message to applicationRouter to scroll to the appropriate tab
		prepView: function prepView() {
			if (!this.get('feedbackService.persistAfterUrlChange')) {
				this.set('feedbackService.isShowing', false);
			}
			//this.get('mapService').minimizeMap({closeAll: true});
			$('.loader').addClass('hidden');
			$(document).scrollTop(0);
		}
	});

	Router.map(function () {
		this.route('item', { resetNamespace: true, path: '/items/:item_slug' }, function () {});
		this.route('trash');
		this.route('collections');
		this.route('search', function () {
			this.route('index', { path: '/' });
			this.route('results', { path: '/:query' });
		});
		this.route('recent', { resetNamespace: true, path: '/recent' }, function () {});
		this.route('collection', { resetNamespace: true, path: '/collections/:collection_slug' }, function () {});
		this.route('tutorial');
		this.route('error');
	});

	exports['default'] = Router;
});
define('tripmind/routes/application', ['exports', 'ember', 'tripmind/config/environment'], function (exports, _ember, _tripmindConfigEnvironment) {
	exports['default'] = _ember['default'].Route.extend({
		actions: {
			loading: function loading(transition, originRoute) {
				$('.loader.main-loader').removeClass('hidden');
			},
			stopLoading: function stopLoading(transition, originRoute) {
				$('.loader.main-loader').addClass('hidden');
			},
			error: function error(transition, originRoute) {
				$('.loader.main-loader').addClass('hidden');
				return this.transitionTo('error');
			},
			triggerTransition: function triggerTransition(destination, payload) {
				this.transitionTo(destination, payload);
			},
			openExtension: function openExtension(withCurrentRoute) {
				if (typeof chrome.runtime != "undefined") {
					chrome.runtime.sendMessage(_tripmindConfigEnvironment['default'].chromeExtensionId, {
						message: "openTripmind",
						addedRoute: withCurrentRoute ? "#" + this.get('router.url') : null
					});
				}
			}
		}
	});
});
define('tripmind/routes/collection', ['exports', 'ember', 'tripmind/appconfig/promise_from_ajax', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigPromise_from_ajax, _tripmindAppconfigConstants) {
	exports['default'] = _ember['default'].Route.extend({

		_reloadFromServer: function _reloadFromServer(collectionId) {
			var store = this.get('store');
			return (0, _tripmindAppconfigPromise_from_ajax['default'])({
				url: _tripmindAppconfigConstants['default'].BASE_SERVER_URL + '/api/tm/tm_collections/' + collectionId,
				type: 'GET'
			}).then(function (result) {
				var compressedData = result.data.attributes.data,
				    unpackedData = lzwCompress.unpack(compressedData),
				    rebuiltData = JSON.parse(unpackedData);
				store.push({ data: rebuiltData });
				return store.peekRecord('collection', collectionId);
			});
		},

		_checkDateAndUpdate: function _checkDateAndUpdate(collection) {
			if (!collection) return;
			var self = this;
			return (0, _tripmindAppconfigPromise_from_ajax['default'])({
				url: _tripmindAppconfigConstants['default'].BASE_SERVER_URL + '/api/tm/tm_collections/' + collection.get('id') + '/check_date',
				type: 'GET'
			}).then(function (result) {
				if (result.date > collection.get('updatedAt')) {
					self._reloadFromServer(collection.get('id'));
				}
			});
		},
		// We first check the store for the collection.
		// Then we check it's last updated date vs the server's
		// if it doesn't exist or is outdated then we load it from server
		model: function model(params) {
			var self = this,
			    collectionId = params.collection_slug.split('-')[0],
			    store = this.get('store');
			return store.findRecord('collection', collectionId).then(function (collection) {
				_ember['default'].run.scheduleOnce('sync', self, '_checkDateAndUpdate', collection);
				return collection.get('items').then(function () {
					return collection.get('dates');
				}).then(function (dates) {
					var dateTrippointPromises = dates.map(function (date) {
						return date.get('trippoints');
					});
					return _ember['default'].RSVP.allSettled(dateTrippointPromises).then(function (array) {
						var concatenatedTps = _ember['default'].ArrayProxy.create({ content: [] });
						array.forEach(function (el) {
							el.value.forEach(function (tp) {
								concatenatedTps.pushObject(tp);
							});
						});
						var trippointItemPromises = concatenatedTps.map(function (tp) {
							return tp.get('item');
						});
						return _ember['default'].RSVP.allSettled(trippointItemPromises);
					}).then(function () {
						return collection;
					});
				});
			}, function () {
				console.log('couldnt find collection, looking on server');
				return self._reloadFromServer(collectionId);
			});
		},
		serialize: function serialize(model) {
			return { collection_path: model.get('collection.slug').replace(/[\/\s]/g, "_") };
		}
	});
});
define('tripmind/routes/collections', ['exports', 'ember', 'tripmind/appconfig/utils'], function (exports, _ember, _tripmindAppconfigUtils) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.get('store').findAll('collection').then(function (results) {
				return results.sortBy('updatedAt').reverse();
			});
		}
	});
});
define('tripmind/routes/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			var store = this.get('store');
			return store.findAll('item').then(function (results) {
				return results.filter(function (item) {
					return item.get('trackingStatus') && !item.get('isTemporary');
				});
			});
		},
		setupController: function setupController(controller, model) {
			this._super(controller, model);
			controller.set('prefilterAttribute', 'trackingStatus');
		}
	});
});
define('tripmind/routes/item', ['exports', 'ember', 'tripmind/appconfig/utils', 'tripmind/appconfig/promise_from_ajax', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigUtils, _tripmindAppconfigPromise_from_ajax, _tripmindAppconfigConstants) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model(params) {
			var itemId = params.item_slug.split('+')[0],
			    store = this.get('store');
			return store.findRecord('item', itemId).then(function (itemRecord) {
				return itemRecord.get('potentialLinks').then(function (links) {
					console.log('loaded the links', links);
					itemRecord.notifyPropertyChange('potentialLinks.[].lastVisited');
				}, function (s) {
					console.log('didnt load links', s);
				}).then(function () {
					return store.findAll('item').then(function (items) {
						var descendants = items.filter(function (i) {
							return i.get('trackingStatus') && i.get('ancestry') && i.get('ancestry').indexOf(itemRecord.get('path')) == 0 && !i.get('isTemporary');
						});
						if (itemRecord.get('canHaveChildren') || _tripmindAppconfigConstants['default'].GOOGLE_PLACE_DESTINATION_TYPES.indexOf(itemRecord.get('itemType')) > -1) {
							return (0, _tripmindAppconfigPromise_from_ajax['default'])({
								url: _tripmindAppconfigConstants['default'].BASE_SERVER_URL + '/api/ember2/items/gmaps_recs/',
								type: 'GET',
								data: { ref: itemId }
							}).then(function (results) {
								if (results.data) {
									var recs = _ember['default'].ArrayProxy.create({ content: [] });
									results.data.forEach(function (result) {
										if (store.hasRecordForId('item', result.attributes['gmaps-reference'])) {
											var newItem = store.peekRecord('item', result.attributes['gmaps-reference']);
											recs.addObject(newItem);
										} else {
											var updatedAttributes = {};
											for (var key in result.attributes) {
												if (result.attributes.hasOwnProperty(key)) {
													updatedAttributes[key.camelize()] = result.attributes[key];
												}
											}
											updatedAttributes.ancestry = itemRecord.get('path');
											updatedAttributes.ancestryNames = itemRecord.get('pathNames');
											updatedAttributes.itemType = _tripmindAppconfigConstants['default'].ITEM_TYPES_ARRAY[updatedAttributes.itemType] ? _tripmindAppconfigConstants['default'].ITEM_TYPES_ARRAY[updatedAttributes.itemType].name : 'attraction';
											updatedAttributes.isTemporary = true;
											updatedAttributes.lat = updatedAttributes.latitude;
											updatedAttributes.lng = updatedAttributes.longitude;
											updatedAttributes.rating = updatedAttributes.rating / 10;
											var newTempName = "tmp" + result.attributes['ancestry-names'] + "/" + result.attributes.name;
											newTempName = newTempName.replace(/[\s\/]/g, "-");

											var itemAttribs = {
												data: {
													attributes: updatedAttributes,
													id: result.attributes['gmaps-reference'] || newTempName,
													type: 'item'
												}
											};
											var newItem = store.push(itemAttribs);
											newItem.set('image', newItem.get('mediumImageUrl'));
											recs.addObject(newItem);
										}
									});
									recs.removeObjects(descendants);
								}
								return _ember['default'].Object.create({
									item: itemRecord,
									descendants: descendants,
									recs: recs
								});
							});
						} else {
							return _ember['default'].Object.create({
								item: itemRecord,
								descendants: descendants,
								recs: []
							});
						}
					});
				});
			});
		},
		serialize: function serialize(model) {
			return { item_path: model.get('item.path').replace(/[\/\s]/g, "_") };
		},
		setupController: function setupController(controller, model) {
			this._super(controller, model.get('item'));
			controller.setProperties({
				descendants: model.get('descendants'),
				recs: model.get('recs')
			});
		}
	});
});
define('tripmind/routes/recent', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			var store = this.get('store');
			return store.findAll('item').then(function (results) {
				return results.filter(function (item) {
					return item.get('trackingStatus');
				}).sortBy('updatedAt').reverseObjects();
			});
		},
		setupController: function setupController(controller, model) {
			this._super(controller, model);
			controller.set('prefilterAttribute', 'trackingStatus');
		}
	});
});
define('tripmind/routes/search/results', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		searchService: _ember['default'].inject.service('search-service'),
		model: function model(params) {
			this.set('query', params.query);
			return this.get('searchService').executeQuery(params.query);
		},
		setupController: function setupController(controller, model) {
			this._super(controller, model);
			this.controllerFor('search').set('query', this.get('query'));
		}
	});
});
define('tripmind/routes/search', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		actions: {
			transitionToSearch: function transitionToSearch(query) {
				this.transitionTo('search.index');
			},
			transitionToResults: function transitionToResults(query) {
				this.transitionTo('search.results', query);
			}
		}
	});
});
define('tripmind/routes/trash', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			var store = this.get('store');
			return store.findAll('item').then(function (results) {
				return results.filter(function (item) {
					return !item.get('trackingStatus') && !item.get('isTemporary');
				});
			});
		},
		templateName: 'index',
		setupController: function setupController(controller, model) {
			this._super(controller, model);
			controller.set('prefilterAttribute', 'trackingStatus-not');
			controller.set('actionBarVersion', 'trash');
			controller.set('isTrash', true);
		}
	});
});
define('tripmind/serializers/localforage', ['exports', 'ember-localforage-adapter/serializers/localforage'], function (exports, _emberLocalforageAdapterSerializersLocalforage) {
  exports['default'] = _emberLocalforageAdapterSerializersLocalforage['default'];
});
define('tripmind/services/action-service', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		selectedIds: null,
		store: _ember['default'].inject.service('store'),

		init: function init() {
			this._super.apply(this, arguments);
			this.set('selectedIds', _ember['default'].ArrayProxy.create({ content: [] }));
		},

		clearSelected: function clearSelected() {
			this.get('selectedIds').clear();
		},

		removeFromCollection: function removeFromCollection(collection) {
			var selectedIds = this.get('selectedIds');
			var itemsToRemove = this.get('store').peekAll('item').filter(function (item) {
				return selectedIds.indexOf(item.get('id')) > -1;
			});
			collection.get('items').removeObjects(itemsToRemove);
			collection.save();
			itemsToRemove.forEach(function (item) {
				item.save();
			});
			this.clearSelected();
			ga('send', 'event', 'removeFromCollection');
		},

		toggleSelected: function toggleSelected(targetId) {
			if (this.selectedIncludes(targetId)) {
				this.get('selectedIds').removeObject(targetId);
			} else {
				this.get('selectedIds').addObject(targetId);
			}
		},

		trashSelected: function trashSelected(targetModel) {
			var selectedIds = this.get('selectedIds');
			var itemsToTrash = targetModel ? [targetModel] : this.get('store').peekAll('item').filter(function (item) {
				return selectedIds.indexOf(item.get('id')) > -1;
			});
			itemsToTrash.forEach(function (item) {
				item.toggleProperty('trackingStatus');
				item.save();
			});
			this.clearSelected();
			ga('send', 'event', 'sendToTrash');
		},

		numOfSelected: (function () {
			return this.get('selectedIds.length');
		}).property('selectedIds.[]'),

		selectedIncludes: function selectedIncludes(id) {
			return this.get('selectedIds').indexOf(id) > -1;
		},

		hasSelected: (function () {
			return this.get('numOfSelected') > 0;
		}).property('numOfSelected')
	});
});
define('tripmind/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('tripmind/services/auth-service', ['exports', 'ember', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigConstants) {
	exports['default'] = _ember['default'].Service.extend({
		authenticityToken: null,

		init: function init() {
			this.getTokens();
		},

		getTokens: function getTokens() {
			var self = this;
			$.get(_tripmindAppconfigConstants['default'].BASE_SERVER_URL + '/tokens', function (results) {
				self.set('authenticityToken', results.token);
			});
		},

		authenticityTokenObserver: (function () {
			$.ajaxSetup({
				headers: {
					'X-CSRF-Token': this.get('authenticityToken')
				}
			});
		}).observes('authenticityToken')
	});
});
define('tripmind/services/display-service', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		modalIsOpen: false,
		modalComponentName: null,

		closeTopModal: function closeTopModal() {
			this.setProperties({
				modalIsOpen: false,
				modalComponentName: null,
				model: null
			});
			$('body').removeClass('modal-open');
		},

		actions: {
			openTopModal: function openTopModal(modalName, model) {
				this.setProperties({
					modalIsOpen: true,
					modalComponentName: modalName.dasherize(),
					model: model
				});
				$('body').addClass('modal-open');
				_ember['default'].run.schedule('afterRender', this, function () {
					$('.top-modal, .modal-dialog').addClass('in');
				});
				ga('send', 'event', 'topModal', modalName);
			}

		}
	});
});
define('tripmind/services/feedback-service', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		component: null,
		isShowing: false,

		feedbackSentence: 'This will be the standard sentence',
		feedbackLinkRoute: null,
		feedbackLinkTarget: null,
		feedbackLinkModel: null,
		feedbackActionName: null,
		feedbackAddedClass: null,
		feedbackAction: function feedbackAction() {
			console.log('running the action');
		},

		feedbackDuration: null,

		feedbackIntervalDidChange: (function () {
			var duration = this.get('feedbackDuration');
			if (duration) {
				_ember['default'].run.later(this, 'hideThenReset', duration);
			}
		}).observes('feedbackDuration'),

		hideThenReset: function hideThenReset() {
			_ember['default'].run.later(this, 'reset', 1500);
			this.set('isShowing', false);
		},

		reset: function reset() {
			this.setProperties({
				isShowing: false,
				feedbackSentence: null,
				feedbackLinkRoute: null,
				feedbackLinkTarget: null,
				feedbackLinkModel: null,
				feedbackActionName: null,
				feedbackAddedClass: null,
				feedbackDuration: null
			});
		}

	});
});
define('tripmind/services/google-places', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		gmaps: _ember['default'].inject.service('map-service'),
		map: _ember['default'].computed.alias('gmaps.googleMapObject'),
		service: null,

		init: function init() {
			this._super();
			this.set('service', new google.maps.places.PlacesService(this.get('map')));
		},

		googlePlaceIdGoogleQuery: function googlePlaceIdGoogleQuery(placeId) {
			var placesService = this.get('service');
			return new _ember['default'].RSVP.Promise(function (resolve, reject) {
				placesService.getDetails({ placeId: placeId }, function (result, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						_ember['default'].run(null, resolve, result);
					} else {
						_ember['default'].run(null, reject, status);
					}
				});
			});
		}

	});
});
define('tripmind/services/item-details-service', ['exports', 'ember', 'tripmind/appconfig/constants'], function (exports, _ember, _tripmindAppconfigConstants) {
	exports['default'] = _ember['default'].Service.extend({
		store: _ember['default'].inject.service('store'),
		googlePlaces: _ember['default'].inject.service('google-places'),
		placesAutocomplete: _ember['default'].inject.service('places-autocomplete'),

		getAdditionalItemInfo: function getAdditionalItemInfo(placeId) {
			var store = this.get('store'),
			    self = this;
			return new _ember['default'].RSVP.Promise(function (resolve, reject) {
				// First check if the item is already in the store - if it is no need to bring it again!
				var itemRecord = store.peekRecord('item', placeId);
				if (itemRecord && itemRecord.get('additionalInfoComplete')) resolve(itemRecord);
				// Otherwise, we will get additional information with a delay to prevent overloading the quota
				_ember['default'].run.later(function () {
					self.get('googlePlaces.service').getDetails({ placeId: placeId }, function (result, status) {
						//console.log(result);
						var item = store.peekRecord('item', placeId);
						if (!item || !result) {
							//TODO: if the status is "over query limit" we could resend the request later
							reject({ message: "didn't find the item or its representation in the store," + status });
						} else {
							ga('send', 'event', 'googlePlaces', 'getDetails');
							item.set('phone', result.international_phone_number);
							if (!item.get('googleHours') && result.opening_hours) item.set('googleHours', result.opening_hours.periods);
							if (!item.get('name')) item.set('name', result.name);
							if (!item.get('lat') && result.geometry) {
								item.set('lat', result.geometry.location.lat());
								item.set('lng', result.geometry.location.lng());
							}
							if (result.types && result.types.length > 0) {
								item.set('itemType', result.types[0]);
							}
							if (!item.get('image') && result.photos && result.photos[0]) {
								item.set('image', result.photos[0].getUrl({ maxWidth: 3000 }));
								//item.set('imageAttribution', result.photos[0].html_attributions[0]);
							}
							//TODO: save additional photos
							//TODO: Save reviews
							if (result.address_components) {
								var ancestryNames = self.getAncestryFromAddress(result.address_components, result.name);
								//console.log('ancestryNames', ancestryNames);
								// Update the item record with the proper ancestry names
								item.set('ancestryNames', ancestryNames);
								// Save an index in the store to easily find this item based on its pathname
								var pathNames = item.get('pathNames');
								store.push({ data: { id: pathNames,
										type: 'pathIndex',
										attributes: {
											itemId: placeId
										} }
								});
								self.findParentFromAncestry(ancestryNames, item.get('lat'), item.get('lng'), item).then(function (parent) {
									if (parent) {
										item.set('ancestryNames', parent.get('pathNames'));
										item.set('ancestry', parent.get('path'));
									}
									item.save().then(function (savedItem) {
										resolve(savedItem);
									});
								});
							} else {
								item.save().then(function (savedItem) {
									resolve(savedItem);
								});
							}
						}
					});
				}, 1100);
			});
		},

		getAncestryFromAddress: function getAncestryFromAddress(addr, name) {
			var ancestryArray = [];
			for (var i = addr.length - 1; i >= 0; i--) {
				var obj = addr[i];
				if (obj.long_name && obj.long_name.length > 1 && obj.long_name != name && obj.types && obj.types[0] && _tripmindAppconfigConstants['default'].allowedLocationTypesLimited.indexOf(obj.types[0]) > -1) {
					ancestryArray.push(obj.long_name);
				}
			}
			return ancestryArray.join("/");
		},

		// Returns a promise that resolves to a parent record based on ancestry
		findParentFromAncestry: function findParentFromAncestry(ancestryNames, lat, lng, item) {
			var store = this.get('store'),
			    self = this;
			return new Promise(function (resolve, reject) {
				// If there's not ancestry, we resolve quickly with a null item
				if (ancestryNames.length == 0) {
					resolve(null);
					// Else there should be a parent
				} else {
						// If we find the parent in the store based on its path index then we resolve with it
						var parentPlaceId = store.peekRecord('pathIndex', ancestryNames);
						if (parentPlaceId) {
							var parentItem = store.peekRecord('item', parentPlaceId.get('itemId'));
							resolve(parentItem);
							// If we don't find it already in the store then we have to find it first:
						} else {
								// first, query it
								var ancestryNamesArr = ancestryNames.split("/"),
								    types = ancestryNamesArr.length > 1 ? '(cities)' : null;
								var query = { input: ancestryNamesArr.reverse().join(", "), location: new google.maps.LatLng(lat, lng), radius: 10000 };
								self.findParentFromQuery(query)
								// then we have to find its full info so that its'  path is filled in
								.then(function (itemRecord) {
									return self.getAdditionalItemInfo(itemRecord.get('id'));
								})
								// only then we can resolve it.
								.then(function (filledInItem) {
									resolve(filledInItem);
								});
							}
					}
			});
		},

		// This find request uses autocomplete, where we can scope the results by destinations only.
		findParentFromQuery: function findParentFromQuery(query) {
			var store = this.get('store'),
			    self = this;
			return new Promise(function (resolve, reject) {
				self.get('placesAutocomplete.service').getPlacePredictions(query, function (results, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						if (results && results.length > 0) {
							var filteredResults = results.filter(function (r) {
								return _tripmindAppconfigConstants['default'].allowedLocationTypes.indexOf(r.types[0]) > -1;
							});
							var topResult = filteredResults[0];
							var massagedResult = $.extend(topResult, { name: topResult.terms[0].value }); // used to be: description, but this includes commas: NYC, NY, USA
							var item = self.buildItemInfoFromResults({}, massagedResult);
							var itemRecord = store.peekRecord('item', item.gmapsReference);
							//if it doesn't exist, create it.
							if (!itemRecord) {
								itemRecord = store.createRecord('item', $.extend(item, { id: item.gmapsReference }));
							}
							resolve(itemRecord);
						} else {
							reject({ message: 'no results found' });
						}
					} else {
						reject(status);
					}
				});
			});
		},

		buildItemInfoFromResults: function buildItemInfoFromResults(data, result) {
			//console.log('original item data:', data)
			var item = data;
			// This function reshapes item data into the Ember item model structure
			if (!item.lat && result.geometry) {
				item.lat = result.geometry.location.lat();
				item.lng = result.geometry.location.lng();
			}
			if (result.photos && result.photos.length > 0) {
				item.image = result.photos[0].getUrl({ maxWidth: 3000 });
				item.image_attribution = result.photos[0].html_attributions[0];
			}
			if (result.types && result.types.length > 0) {
				item.itemType = result.types[0];
			}
			if (result.rating) {
				item.rating = result.rating;
			}
			item.gmapsReference = result.place_id;
			item.address = result.formatted_address;
			item.rating = result.rating;
			if (!item.name) item.name = result.name;
			if (!item.id) item.id = result.place_id;
			return item;
		}

	});
});
define('tripmind/services/map-service', ['exports', 'ember', 'tripmind/appconfig/gmaps'], function (exports, _ember, _tripmindAppconfigGmaps) {
	exports['default'] = _ember['default'].Service.extend({
		constantOptions: {
			mapTypeControl: false,
			zoom: 3,
			maxZoom: 19,
			minZoom: 2,
			noClear: true,
			mapTypeControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			streetViewControl: false
		},
		//styles: gmaps.styles.originalStyles[0]
		withAllMarkers: false,
		mapComponent: null,
		centerMarker: null,
		centerLat: 34.851939,
		centerLng: -82.399752,
		zoom: 15,
		draggable: true,
		scrollwheel: true,
		disableDefaultUI: false,
		bounds: null,
		lastHolder: null,
		googleMapObject: null,
		isExpanded: false,

		init: function init() {
			this._super();
			var container = $('.map-canvas')[0];
			var options = this.get('options');
			var map = new window.google.maps.Map(container, options);
			this.set('googleMapObject', map);
			this._setMapListeners(map);
			this.set('directionsService', new google.maps.DirectionsService());
		},

		_setMapListeners: function _setMapListeners(map) {
			var self = this;

			google.maps.event.addListener(map, 'zoom_changed', function () {
				_ember['default'].run.debounce(self, '_updateEmberBounds', 200);
			});

			google.maps.event.addListener(map, 'click', function () {
				self.get('collectionMarkers').send('minimizeAllMarkers');
			});

			google.maps.event.addListener(map, 'resize', function () {
				self.scheduleFitBounds();
				//	self.get('mapService.collectionMarkers').send('minimizeAllMarkers');
			});

			google.maps.event.addListener(map, 'dragend', function () {
				_ember['default'].run.debounce(self, '_updateEmberBounds', 200);
				/*
     self._addMarkersFromBounds(map);
     */
			});

			google.maps.event.addListener(map, 'bounds_changed', function () {});
		},

		_updateEmberBounds: function _updateEmberBounds() {
			if (!this.get('isExpanded')) return;
			if (this.get('automaticFittingInProgress')) return;
			console.log('updating bounds');
			this.set('preventBoundsListener', true);
			var boundsObject = this.get('googleMapObject').getBounds(),
			    bounds = {
				neLat: boundsObject.getNorthEast().lat(),
				neLng: boundsObject.getNorthEast().lng(),
				swLat: boundsObject.getSouthWest().lat(),
				swLng: boundsObject.getSouthWest().lng()
			};
			this.set('bounds', bounds);
			var self = this;
			_ember['default'].run.scheduleOnce('afterRender', this, function () {
				self.set('preventBoundsListener', false);
			});
		},

		resizeMap: function resizeMap() {
			_ember['default'].run.scheduleOnce('afterRender', this, '_resizeMap');
		},

		_resizeMap: function _resizeMap() {
			google.maps.event.trigger(this.get('googleMapObject'), 'resize');
		},

		mapOptionsDidChange: (function () {
			_ember['default'].run.scheduleOnce('afterRender', this, 'updateOptions');
		}).observes('options'),

		mapBoundsDidChange: (function () {
			if (this.get('bounds')) this.scheduleFitBounds();
		}).observes('bounds').on('init'),

		updateOptions: function updateOptions() {
			var options = this.get('options');
			this.get('googleMapObject').setOptions(options);
		},

		scheduleFitBounds: function scheduleFitBounds() {
			if (this.get('isExpanded')) {
				_ember['default'].run.scheduleOnce('afterRender', this, 'fitToBounds');
			}
		},

		fitToBounds: function fitToBounds() {
			if (this.get('preventBoundsListener')) return;
			console.log('fitting bounds!');
			var bounds = this.get('bounds');
			if (!bounds) return;
			var map = this.get('googleMapObject');
			var sw = new google.maps.LatLng(bounds.swLat, bounds.swLng);
			var ne = new google.maps.LatLng(bounds.neLat, bounds.neLng);
			this.set('automaticFittingInProgress', true);
			map.fitBounds(new google.maps.LatLngBounds(sw, ne));
			var self = this;
			_ember['default'].run.later(this, function () {
				self.set('automaticFittingInProgress', false);
			}, 1000);
		},

		center: (function () {
			return new window.google.maps.LatLng(this.get('centerLat'), this.get('centerLng'));
		}).property('centerlLat', 'centerLng'),

		options: (function () {
			return $.extend(this.get('constantOptions'), {
				center: this.get('center'),
				zoom: this.get('zoom'),
				draggable: this.get('draggable'),
				scrollwheel: this.get('scrollwheel'),
				disableDefaultUI: this.get('disableDefaultUI')
			});
		}).property('center', 'zoom', 'draggable', 'disableDefaultUI', 'scrollwheel'),

		moveDomToElement: function moveDomToElement(elem) {
			$('#actual-map').appendTo(elem);
			var map = this.get('googleMapObject');
			google.maps.event.trigger(map, 'resize');
			this.set('currentElement', elem);
		},

		changeCenter: function changeCenter(lat, lng) {
			this.setProperties({
				centerLat: lat,
				centerLng: lng
			});
			this.reCenter();
		},

		reCenter: function reCenter() {
			this.get('googleMapObject').setCenter(this.get('center'));
		},

		scheduleReCenter: function scheduleReCenter() {
			_ember['default'].run.scheduleOnce('afterRender', this, 'reCenter');
		},

		toggleExpanded: function toggleExpanded() {
			if (this.get('isExpanded')) {
				this.minimizeMap();
			} else {
				this.expandMap();
			}
		},

		expandMap: function expandMap(currentElem) {
			this.set('isExpanded', true);
			this.set('lastCurrentItem', this.get('currentItem.item'));
			this.set('withAllMarkers', true);
			$('#actual-map').appendTo('#expanded-map');
			this.resizeMap();
			this.scheduleReCenter();
			this.setProperties({
				draggable: true,
				scrollwheel: true,
				disableDefaultUI: false
			});
		},
		minimizeMap: function minimizeMap(options) {
			this.set('isExpanded', false);
			var closeAll = options ? options.closeAll : false;
			if (this.get('minimizedHolder')) {
				$('#actual-map').appendTo(this.get('minimizedHolder'));
			}
			//		this.get('currentItem').setProperties({
			//			isOpen: closeAll ? false : this.get('lastItemCardPosition'),
			//			item: this.get('lastCurrentItem'),
			//			withMap: true,
			//			withPhoto: false
			//		});
			this.set('withAllMarkers', false);
			this.resizeMap();
			this.scheduleReCenter();
			$('#expanded-map').removeClass('is-expanded');
			this.setProperties({
				draggable: false,
				scrollwheel: false,
				disableDefaultUI: true
			});
		},

		openItemMenu: function openItemMenu(model) {
			var currentItem = this.get('currentItem');
			currentItem.setProperties({
				item: model,
				isOpen: true,
				withMap: false,
				withPhoto: true,
				isAd: this.get('isAd'),
				currentListCard: null
			});
		},

		getBoundingBox: function getBoundingBox(coordsArray) {
			if (coordsArray.length > 0) {
				var D_WRAP_LNG = 180;
				var minLat = coordsArray[0][0],
				    maxLat = coordsArray[0][0],
				    minLng = coordsArray[0][1],
				    maxLng = coordsArray[0][1];
				for (var i = 0; i < coordsArray.length; i++) {
					var coords = coordsArray[i];
					// Fix the longitudinal wrapping if in a country where there is discontinuity in coords (e.g., Mexico)
					if (coords[1] - minLng > D_WRAP_LNG) coords[1] -= 360;
					if (coords[1] - minLng < -D_WRAP_LNG) coords[1] += 360;

					if (coords[0] < minLat) minLat = coords[0];
					if (coords[0] > maxLat) maxLat = coords[0];
					if (coords[1] < minLng) minLng = coords[1];
					if (coords[1] > maxLng) maxLng = coords[1];
				}
				return { swLat: minLat, swLng: minLng, neLat: maxLat, neLng: maxLng };
			} else {
				return false;
			}
		}

	});
});
define('tripmind/services/modal-dialog', ['exports', 'ember-modal-dialog/services/modal-dialog'], function (exports, _emberModalDialogServicesModalDialog) {
  exports['default'] = _emberModalDialogServicesModalDialog['default'];
});
define('tripmind/services/places-autocomplete', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		gmaps: _ember['default'].inject.service('map-service'),
		map: _ember['default'].computed.alias('gmaps.googleMapObject'),
		service: null,

		init: function init() {
			this._super();
			this.set('service', new google.maps.places.AutocompleteService());
		}

	});
});
define('tripmind/services/recs-service', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		withRecs: true

	});
});
define('tripmind/services/screen-defs', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		mapService: _ember['default'].inject.service('map-service'),
		mapWidth: 300,
		screenWidth: null,

		init: function init() {
			this._super();
			this.setScreenDims();
			var self = this;
			$(window).on('resize.defs', function () {
				self.setScreenDims();
			});
		},

		setScreenDims: function setScreenDims() {
			this.set('screenWidth', $(window).width());
			this.set('screenHeight', $(window).height());
			this.get('mapService').resizeMap();
		},

		actualMapWidth: (function () {
			var screenWidth = this.get('screenWidth');
			var mapWidth = screenWidth < 500 ? screenWidth : this.get('mapWidth');
			return this.get('mapService.isExpanded') ? mapWidth : 0;
		}).property('mapWidth', 'mapService.isExpanded', 'screenWidth')
	});
});
define('tripmind/services/search-service', ['exports', 'ember', 'tripmind/mixins/promise_utils', 'tripmind/mixins/google-item'], function (exports, _ember, _tripmindMixinsPromise_utils, _tripmindMixinsGoogleItem) {
	exports['default'] = _ember['default'].Service.extend(_tripmindMixinsGoogleItem['default'], {
		store: _ember['default'].inject.service('store'),
		googlePlaces: _ember['default'].inject.service('google-places'),
		itemDetailsService: _ember['default'].inject.service('item-details-service'),

		getQueryPredictions: function getQueryPredictions(input) {
			return new _ember['default'].RSVP.Promise(function (resolve, reject) {
				WA.Gmaps.PlacesAutocompleteService.getQueryPredictions({ input: input }, function (predictions, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						resolve(predictions);
					} else {
						reject(status);
					}
				});
			});
		},

		googleTextQuery: function googleTextQuery(query, location) {
			var self = this;
			if (undefined === location) {
				var request = { query: query };
			} else {
				var request = { query: query, location: location, radius: 1000 };
			}
			ga('send', 'event', 'search', 'googleTextQuery', query);

			return new _ember['default'].RSVP.Promise(function (resolve, reject) {
				self.get('googlePlaces.service').textSearch(request, function (results, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						_ember['default'].run(null, resolve, results);
					} else {
						_ember['default'].run(null, reject, status);
					}
				});
			});
		},

		executeQuery: function executeQuery(query) {
			var self = this,
			    store = this.get('store'),
			    itemDetailsService = this.get('itemDetailsService');
			return self.googleTextQuery(query).then(function (results) {
				var existingItems = [],
				    itemsToBuild = [];
				for (var i = 0; i < results.length; i++) {
					var result = results[i];
					var itemRecord = store.peekRecord('item', result.place_id);
					if (itemRecord) {
						existingItems.push(itemRecord);
					} else {
						itemsToBuild.push({
							id: result.place_id,
							type: 'item',
							attributes: itemDetailsService.buildItemInfoFromResults({ isTemporary: true }, result)
						});
					}
				}
				var newItems = store.push({ data: itemsToBuild });
				return existingItems.concat(newItems);
			});
		},

		findOrCreateFromPlaceId: function findOrCreateFromPlaceId(placeId) {
			var store = this.get('store'),
			    self = this;
			return store.find('item', placeId).then(function (item) {
				return item;
			}, function (status) {
				var currentTime = moment().format("X"),
				    itemRecord = store.createRecord('item', { id: placeId, name: "", updatedAt: currentTime });
				return self.get('itemDetailsService').getAdditionalItemInfo(placeId);
			});
		}

	});
});
define("tripmind/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 26,
                "column": 1
              },
              "end": {
                "line": 31,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/application.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "close-btn modal-close");
            var el2 = dom.createTextNode("✕");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["element", "action", ["toggleModal"], [], ["loc", [null, [29, 37], [29, 61]]]], ["inline", "component", [["get", "displayService.modalComponentName", ["loc", [null, [30, 14], [30, 47]]]]], ["model", ["subexpr", "@mut", [["get", "displayService.model", ["loc", [null, [30, 54], [30, 74]]]]], [], []], "closeAction", ["subexpr", "action", ["toggleModal"], [], ["loc", [null, [30, 87], [30, 109]]]]], ["loc", [null, [30, 2], [30, 111]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "modal-dialog", [], ["close", "toggleModal", "targetAttachment", "none", "translucentOverlay", true], 0, null, ["loc", [null, [26, 1], [31, 18]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 42,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "rhs-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "prevent-click");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "main-loader loader");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "brain");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "dot1");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "dot2");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "dot3");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "text");
        var el3 = dom.createTextNode("Loading...");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        morphs[5] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[8] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "auth-tokens", ["loc", [null, [1, 0], [1, 15]]]], ["content", "style-guide", ["loc", [null, [2, 0], [2, 15]]]], ["content", "open-tripmind", ["loc", [null, [3, 0], [3, 17]]]], ["content", "left-menu", ["loc", [null, [5, 0], [5, 13]]]], ["content", "outlet", ["loc", [null, [11, 1], [11, 11]]]], ["block", "if", [["get", "displayService.modalIsOpen", ["loc", [null, [25, 6], [25, 32]]]]], [], 0, null, ["loc", [null, [25, 0], [32, 7]]]], ["content", "feed-back", ["loc", [null, [35, 0], [35, 13]]]], ["content", "google-map", ["loc", [null, [38, 0], [38, 14]]]], ["content", "map-resize", ["loc", [null, [39, 0], [39, 14]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/collection", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/collection.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "flat-btn icon-tag");
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [2]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(element3, 1, 1);
          return morphs;
        },
        statements: [["element", "action", ["toggleCategories"], [], ["loc", [null, [9, 31], [9, 60]]]], ["inline", "if", [["get", "withCategories", ["loc", [null, [10, 6], [10, 20]]]], "Hide Sorting", "Sort by categories"], [], ["loc", [null, [10, 1], [10, 58]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/collection.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "major-sections-holder", [], ["parentItem", ["subexpr", "@mut", [["get", "model", ["loc", [null, [15, 36], [15, 41]]]]], [], []], "majorSectionType", "category", "model", ["subexpr", "@mut", [["get", "model.items", ["loc", [null, [15, 76], [15, 87]]]]], [], []], "canHaveRecs", false], ["loc", [null, [15, 1], [15, 108]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 18,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/collection.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "items-sorter", [], ["model", ["subexpr", "@mut", [["get", "model.items", ["loc", [null, [17, 22], [17, 33]]]]], [], []], "modelToUpdate", ["subexpr", "@mut", [["get", "model", ["loc", [null, [17, 48], [17, 53]]]]], [], []], "update", true, "withRefresh", true], ["loc", [null, [17, 1], [17, 84]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 30,
                "column": 1
              },
              "end": {
                "line": 32,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/collection.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "date-view", [], ["model", ["subexpr", "@mut", [["get", "date", ["loc", [null, [31, 20], [31, 24]]]]], [], []], "orderedDates", ["subexpr", "@mut", [["get", "model.orderedDates", ["loc", [null, [31, 38], [31, 56]]]]], [], []]], ["loc", [null, [31, 2], [31, 58]]]]],
          locals: ["date"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 0
            },
            "end": {
              "line": 36,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/collection.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "add-date flat-btn extension-only");
          var el3 = dom.createTextNode("+1 day");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "add-date flat-btn extension-only");
          var el3 = dom.createTextNode("+1 day");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1, 1]);
          var element2 = dom.childAt(fragment, [5, 1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          morphs[2] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["element", "action", ["addDate", "before"], [], ["loc", [null, [28, 47], [28, 76]]]], ["block", "each", [["get", "model.orderedDates", ["loc", [null, [30, 9], [30, 27]]]]], [], 0, null, ["loc", [null, [30, 1], [32, 10]]]], ["element", "action", ["addDate", "after"], [], ["loc", [null, [34, 47], [34, 75]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 0
            },
            "end": {
              "line": 38,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/collection.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "add-date flat-btn icon-date extension-only");
          var el2 = dom.createTextNode("Add a daily itinerary");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["addDate", "before"], [], ["loc", [null, [37, 57], [37, 86]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/collection.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [1, 59], [1, 73]]]]], ["loc", [null, [1, 29], [1, 74]]]], "targetCollection", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 92], [1, 97]]]]], [], []], "isInCollection", true], ["loc", [null, [1, 0], [1, 119]]]], ["inline", "collection-action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [3, 70], [3, 84]]]]], ["loc", [null, [3, 40], [3, 85]]]], "addedClass", "in", "targetModel", ["subexpr", "@mut", [["get", "model", ["loc", [null, [3, 114], [3, 119]]]]], [], []]], ["loc", [null, [3, 0], [3, 121]]]], ["inline", "input-with-default", [], ["value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [5, 27], [5, 37]]]]], [], []], "addedClass", "collection-title", "default", "Untitled", "saveOnExit", ["subexpr", "@mut", [["get", "model", ["loc", [null, [5, 98], [5, 103]]]]], [], []]], ["loc", [null, [5, 0], [5, 105]]]], ["block", "if", [["get", "model.items", ["loc", [null, [7, 6], [7, 17]]]]], [], 0, null, ["loc", [null, [7, 0], [12, 7]]]], ["block", "if", [["get", "withCategories", ["loc", [null, [14, 6], [14, 20]]]]], [], 1, 2, ["loc", [null, [14, 0], [18, 7]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "model.allItems", ["loc", [null, [21, 27], [21, 41]]]]], [], []]], ["loc", [null, [21, 0], [21, 44]]]], ["inline", "collection-search-field-wrapper", [], ["value", ["subexpr", "@mut", [["get", "query", ["loc", [null, [24, 40], [24, 45]]]]], [], []], "foundItem", "addToCollection", "addedClass", "extension-only", "fromItems", ["subexpr", "@mut", [["get", "model.allItems", ["loc", [null, [24, 112], [24, 126]]]]], [], []]], ["loc", [null, [24, 0], [24, 128]]]], ["block", "if", [["get", "model.dates", ["loc", [null, [26, 6], [26, 17]]]]], [], 3, 4, ["loc", [null, [26, 0], [38, 7]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("tripmind/templates/collections", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/collections.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "collection-card", [], ["model", ["subexpr", "@mut", [["get", "collection", ["loc", [null, [2, 25], [2, 35]]]]], [], []]], ["loc", [null, [2, 1], [2, 37]]]]],
        locals: ["collection"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/collections.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("You currently don't have any collections to show.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("Create a collection by selecting a few places then clicking on the \"+\" button to add them to a new collection.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/collections.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [1, 8], [1, 13]]]]], [], 0, 1, ["loc", [null, [1, 0], [6, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/action-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/action-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "cancel-btn has-tooltip");
          var el2 = dom.createTextNode("✕\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "tooltip from-left");
          var el3 = dom.createTextNode("Clear selection");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "num-selected");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" Selected");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element6 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element6);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["clearSelection"], [], ["loc", [null, [2, 37], [2, 64]]]], ["content", "service.numOfSelected", ["loc", [null, [5, 27], [5, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 2
              },
              "end": {
                "line": 19,
                "column": 2
              }
            },
            "moduleName": "tripmind/templates/components/action-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "action-btn icon-trash has-tooltip tooltip-below undo");
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "tooltip");
            var el3 = dom.createTextNode("Undelete");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element4 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element4);
            return morphs;
          },
          statements: [["element", "action", ["trashSelected", ["get", "targetModel", ["loc", [null, [16, 94], [16, 105]]]]], [], ["loc", [null, [16, 69], [16, 107]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 19,
                  "column": 2
                },
                "end": {
                  "line": 23,
                  "column": 2
                }
              },
              "moduleName": "tripmind/templates/components/action-bar.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "action-btn icon-trash has-tooltip tooltip-below");
              var el2 = dom.createTextNode("\n				");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("div");
              dom.setAttribute(el2, "class", "tooltip");
              var el3 = dom.createTextNode("Remove from collection");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n			");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element3 = dom.childAt(fragment, [1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element3);
              return morphs;
            },
            statements: [["element", "action", ["removeFromCollection", ["get", "targetCollection", ["loc", [null, [20, 96], [20, 112]]]]], [], ["loc", [null, [20, 64], [20, 114]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 23,
                  "column": 2
                },
                "end": {
                  "line": 27,
                  "column": 2
                }
              },
              "moduleName": "tripmind/templates/components/action-bar.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "action-btn icon-trash has-tooltip tooltip-below");
              var el2 = dom.createTextNode("\n				");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("div");
              dom.setAttribute(el2, "class", "tooltip");
              var el3 = dom.createTextNode("Delete (stop tracking)");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n			");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n		");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element2 = dom.childAt(fragment, [1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element2);
              return morphs;
            },
            statements: [["element", "action", ["trashSelected", ["get", "targetModel", ["loc", [null, [24, 89], [24, 100]]]]], [], ["loc", [null, [24, 64], [24, 102]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 2
              },
              "end": {
                "line": 27,
                "column": 2
              }
            },
            "moduleName": "tripmind/templates/components/action-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "isInCollection", ["loc", [null, [19, 12], [19, 26]]]]], [], 0, 1, ["loc", [null, [19, 2], [27, 2]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 1
            },
            "end": {
              "line": 28,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/action-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "action-btn icon-share has-tooltip tooltip-below");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "tooltip");
          var el3 = dom.createTextNode("Share");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "action-btn icon-plus has-tooltip tooltip-below");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "tooltip");
          var el3 = dom.createTextNode("Add to collection");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [3]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element5);
          morphs[1] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["element", "action", ["openTopModal", "addToCollection", ["get", "targetModel", ["loc", [null, [12, 104], [12, 115]]]]], [], ["loc", [null, [12, 62], [12, 117]]]], ["block", "if", [["get", "isTrash", ["loc", [null, [15, 8], [15, 15]]]]], [], 0, 1, ["loc", [null, [15, 2], [27, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 2
              },
              "end": {
                "line": 33,
                "column": 2
              }
            },
            "moduleName": "tripmind/templates/components/action-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "action-btn icon-check-circle has-tooltip tooltip-below undo");
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "tooltip");
            var el3 = dom.createTextNode("Remove from selection");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element1);
            return morphs;
          },
          statements: [["element", "action", ["toggleSelected", ["get", "targetModel", ["loc", [null, [30, 102], [30, 113]]]]], [], ["loc", [null, [30, 76], [30, 115]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 33,
                "column": 2
              },
              "end": {
                "line": 37,
                "column": 2
              }
            },
            "moduleName": "tripmind/templates/components/action-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "action-btn icon-check-circle has-tooltip tooltip-below");
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "tooltip");
            var el3 = dom.createTextNode("Add to selection");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [["element", "action", ["toggleSelected", ["get", "targetModel", ["loc", [null, [34, 97], [34, 108]]]]], [], ["loc", [null, [34, 71], [34, 110]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 1
            },
            "end": {
              "line": 38,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/action-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "currentIsSelected", ["loc", [null, [29, 8], [29, 25]]]]], [], 0, 1, ["loc", [null, [29, 2], [37, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 42,
            "column": 6
          }
        },
        "moduleName": "tripmind/templates/components/action-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "action-buttons");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "service.numOfSelected", ["loc", [null, [1, 6], [1, 27]]]]], [], 0, null, ["loc", [null, [1, 0], [6, 7]]]], ["block", "if", [["get", "showActionButtons", ["loc", [null, [8, 7], [8, 24]]]]], [], 1, 2, ["loc", [null, [8, 1], [38, 8]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tripmind/templates/components/add-to-collection", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 1
            },
            "end": {
              "line": 12,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/add-to-collection.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "collection-option");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "image-container");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "name");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createAttrMorph(element1, 'style');
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["chooseCollection", ["get", "collection", ["loc", [null, [8, 61], [8, 71]]]]], [], ["loc", [null, [8, 33], [8, 73]]]], ["attribute", "style", ["get", "collection.items.firstObject.photoStyle", ["loc", [null, [9, 40], [9, 79]]]]], ["content", "collection.name", ["loc", [null, [10, 21], [10, 40]]]]],
        locals: ["collection"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/add-to-collection.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-title");
        var el2 = dom.createTextNode("Add to Collection");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-content");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "collection-option new");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "image-container");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createTextNode("New Collection");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [2]);
        var element3 = dom.childAt(element2, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element3);
        morphs[1] = dom.createMorphAt(element2, 3, 3);
        return morphs;
      },
      statements: [["element", "action", ["chooseCollection"], [], ["loc", [null, [3, 36], [3, 65]]]], ["block", "each", [["get", "collections", ["loc", [null, [7, 9], [7, 20]]]]], [], 0, null, ["loc", [null, [7, 1], [12, 10]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/autosave-editable", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 11
          }
        },
        "moduleName": "tripmind/templates/components/autosave-editable.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "valueOW", ["loc", [null, [1, 0], [1, 11]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/components/button-with-confirmation", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/button-with-confirmation.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "confirm-holder");
          var el2 = dom.createTextNode("\n		Are you sure?\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "confirm-button");
          var el3 = dom.createTextNode("Yes");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "confirm-button");
          var el3 = dom.createTextNode("No");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["element", "action", ["confirm", true], [], ["loc", [null, [4, 30], [4, 55]]]], ["element", "action", ["confirm", false], [], ["loc", [null, [5, 30], [5, 56]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/button-with-confirmation.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [8, 1], [8, 10]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 7
          }
        },
        "moduleName": "tripmind/templates/components/button-with-confirmation.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isConfirming", ["loc", [null, [1, 6], [1, 18]]]]], [], 0, 1, ["loc", [null, [1, 0], [9, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/collection-action-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "tripmind/templates/components/collection-action-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "action-buttons");
        var el2 = dom.createTextNode("\n		");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "action-btn icon-share has-tooltip tooltip-below");
        var el3 = dom.createTextNode("\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "tooltip");
        var el4 = dom.createTextNode("Share");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["openTopModal", "shareCollection", ["get", "targetModel", ["loc", [null, [2, 105], [2, 116]]]]], [], ["loc", [null, [2, 63], [2, 118]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/components/collection-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 54
            }
          },
          "moduleName": "tripmind/templates/components/collection-card.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/collection-card.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "image-container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "flex-vert-align");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 0, 0);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["attribute", "style", ["get", "model.items.firstObject.photoStyle", ["loc", [null, [1, 37], [1, 71]]]]], ["content", "model.name", ["loc", [null, [3, 20], [3, 34]]]], ["block", "link-to", ["collection", ["get", "model.slug", ["loc", [null, [6, 24], [6, 34]]]]], ["class", "card-link"], 0, null, ["loc", [null, [6, 0], [6, 66]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/collection-markers", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/collection-markers.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "collection-marker", [], ["model", ["subexpr", "@mut", [["get", "wrapper.item", ["loc", [null, [2, 27], [2, 39]]]]], [], []], "isExpanded", ["subexpr", "@mut", [["get", "wrapper.isExpanded", ["loc", [null, [3, 12], [3, 30]]]]], [], []], "isClicked", ["subexpr", "@mut", [["get", "wrapper.isClicked", ["loc", [null, [3, 41], [3, 58]]]]], [], []], "minimizeAllAction", ["subexpr", "action", ["minimizeAllMarkers"], [], ["loc", [null, [4, 19], [4, 48]]]], "markerColor", ["subexpr", "@mut", [["get", "markerColor", ["loc", [null, [5, 13], [5, 24]]]]], [], []]], ["loc", [null, [2, 1], [5, 26]]]]],
        locals: ["wrapper"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 9
          }
        },
        "moduleName": "tripmind/templates/components/collection-markers.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "markerWrappers", ["loc", [null, [1, 8], [1, 22]]]]], [], 0, null, ["loc", [null, [1, 0], [6, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/collection-search-field-wrapper", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/collection-search-field-wrapper.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	Working...\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 1
              },
              "end": {
                "line": 15,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/collection-search-field-wrapper.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "temp-item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [14, 25], [14, 29]]]]], [], []], "addedClass", "small inline", "withoutLink", true, "selectAction", ["subexpr", "action", ["foundItem"], [], ["loc", [null, [14, 86], [14, 106]]]], "fromItems", ["subexpr", "@mut", [["get", "fromItems", ["loc", [null, [14, 117], [14, 126]]]]], [], []]], ["loc", [null, [14, 2], [14, 128]]]]],
          locals: ["item"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 17,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/collection-search-field-wrapper.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "each", [["get", "results", ["loc", [null, [13, 9], [13, 16]]]]], [], 0, null, ["loc", [null, [13, 1], [15, 10]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "results", ["loc", [null, [16, 28], [16, 35]]]]], [], []]], ["loc", [null, [16, 1], [16, 37]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/collection-search-field-wrapper.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "collection-search-field-wrapper");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-holder icon-search");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "clear-search has-tooltip");
        var el4 = dom.createTextNode("✕\n		 	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "tooltip");
        var el5 = dom.createTextNode("Clear");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "search-field", [], ["value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [3, 23], [3, 28]]]]], [], []], "foundItem", "foundItem", "action", "submit", "placeholder", "Find something to add...", "withAutofocus", false], ["loc", [null, [3, 2], [3, 127]]]], ["element", "action", ["clearSearch"], [], ["loc", [null, [4, 40], [4, 64]]]], ["block", "if", [["get", "loading", ["loc", [null, [9, 6], [9, 13]]]]], [], 0, null, ["loc", [null, [9, 0], [11, 7]]]], ["block", "if", [["get", "results", ["loc", [null, [12, 6], [12, 13]]]]], [], 1, null, ["loc", [null, [12, 0], [17, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/date-view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 30,
                "column": 3
              },
              "end": {
                "line": 34,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/date-view.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "fun icon-pin has-tooltip");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n					");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "tooltip");
            var el3 = dom.createTextNode("Fun time");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "funTimeText", ["loc", [null, [31, 42], [31, 57]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 3
              },
              "end": {
                "line": 39,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/date-view.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "travel icon-drive has-tooltip");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n					");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "tooltip");
            var el3 = dom.createTextNode("Travel time");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "travelTimeText", ["loc", [null, [36, 47], [36, 65]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 41,
                "column": 2
              },
              "end": {
                "line": 43,
                "column": 2
              }
            },
            "moduleName": "tripmind/templates/components/date-view.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("			");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "time-away");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "timeAwayText", ["loc", [null, [42, 26], [42, 42]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 48,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/date-view.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "time-indicator");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "radial-progress");
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "circle fun");
          var el4 = dom.createTextNode("\n				");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "mask full");
          var el5 = dom.createTextNode("\n					");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "fill");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "mask half");
          var el5 = dom.createTextNode("\n					");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "fill");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n					");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "fill fix");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "radial-progress base-rotate");
          var el4 = dom.createTextNode("\n				");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "circle travel");
          var el5 = dom.createTextNode("\n					");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "mask full");
          var el6 = dom.createTextNode("\n						");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "fill");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n					");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n					");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("div");
          dom.setAttribute(el5, "class", "mask half");
          var el6 = dom.createTextNode("\n						");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "fill");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n						");
          dom.appendChild(el5, el6);
          var el6 = dom.createElement("div");
          dom.setAttribute(el6, "class", "fill fix");
          dom.appendChild(el5, el6);
          var el6 = dom.createTextNode("\n					");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n				");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "inset");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "zoom-date icon-zoom has-tooltip");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "tooltip from-left above");
          var el3 = dom.createTextNode("Zoom to day");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element1, [3]);
          var element3 = dom.childAt(element0, [3]);
          var element4 = dom.childAt(fragment, [3]);
          var morphs = new Array(6);
          morphs[0] = dom.createAttrMorph(element1, 'data-fun');
          morphs[1] = dom.createAttrMorph(element2, 'data-travel');
          morphs[2] = dom.createMorphAt(element3, 1, 1);
          morphs[3] = dom.createMorphAt(element3, 2, 2);
          morphs[4] = dom.createMorphAt(element0, 5, 5);
          morphs[5] = dom.createElementMorph(element4);
          return morphs;
        },
        statements: [["attribute", "data-fun", ["get", "funTimeProgress", ["loc", [null, [7, 42], [7, 57]]]]], ["attribute", "data-travel", ["get", "travelTimeProgress", ["loc", [null, [17, 58], [17, 76]]]]], ["block", "if", [["get", "funTimeText", ["loc", [null, [30, 9], [30, 20]]]]], [], 0, null, ["loc", [null, [30, 3], [34, 10]]]], ["block", "if", [["get", "travelTimeText", ["loc", [null, [35, 9], [35, 23]]]]], [], 1, null, ["loc", [null, [35, 3], [39, 10]]]], ["block", "if", [["get", "timeAwayText", ["loc", [null, [41, 8], [41, 20]]]]], [], 2, null, ["loc", [null, [41, 2], [43, 9]]]], ["element", "action", ["zoomDate"], [], ["loc", [null, [45, 46], [45, 67]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 51,
            "column": 6
          }
        },
        "moduleName": "tripmind/templates/components/date-view.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "date-name");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "delete-date icon-trash has-tooltip extension-only");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "tooltip from-left above");
        var el3 = dom.createTextNode("Remove day");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [7]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[4] = dom.createElementMorph(element5);
        return morphs;
      },
      statements: [["content", "model.title", ["loc", [null, [1, 23], [1, 38]]]], ["inline", "items-sorter", [], ["model", ["subexpr", "@mut", [["get", "itemLegs", ["loc", [null, [3, 21], [3, 29]]]]], [], []], "withDirections", true, "update", true, "modelToUpdate", ["subexpr", "@mut", [["get", "model", ["loc", [null, [3, 76], [3, 81]]]]], [], []], "compToUpdate", ["subexpr", "@mut", [["get", "this", ["loc", [null, [3, 95], [3, 99]]]]], [], []], "addedClass", "small"], ["loc", [null, [3, 0], [3, 120]]]], ["inline", "map-route", [], ["items", ["subexpr", "@mut", [["get", "itemsWithPrev", ["loc", [null, [4, 18], [4, 31]]]]], [], []], "color", ["subexpr", "@mut", [["get", "model.color", ["loc", [null, [4, 38], [4, 49]]]]], [], []], "modelForDistance", ["subexpr", "@mut", [["get", "this", ["loc", [null, [4, 67], [4, 71]]]]], [], []]], ["loc", [null, [4, 0], [4, 73]]]], ["block", "if", [["get", "model.items", ["loc", [null, [5, 6], [5, 17]]]]], [], 0, null, ["loc", [null, [5, 0], [48, 7]]]], ["element", "action", ["deleteDate"], [], ["loc", [null, [49, 63], [49, 86]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/distance-leg", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/distance-leg.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "displayText", ["loc", [null, [2, 1], [2, 16]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 7
          }
        },
        "moduleName": "tripmind/templates/components/distance-leg.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "model", ["loc", [null, [1, 6], [1, 11]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/feed-back", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 43
            },
            "end": {
              "line": 1,
              "column": 118
            }
          },
          "moduleName": "tripmind/templates/components/feed-back.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["content", "feedbackLinkModel.name", ["loc", [null, [1, 92], [1, 118]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/feed-back.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "button");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["element", "action", ["callAction"], [], ["loc", [null, [3, 21], [3, 44]]]], ["content", "feedbackActionName", ["loc", [null, [3, 45], [3, 67]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/feed-back.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "sentence");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "dismiss");
        var el2 = dom.createTextNode("✕");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(fragment, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1, 0, 0);
        morphs[1] = dom.createMorphAt(element1, 2, 2);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["content", "feedbackSentence", ["loc", [null, [1, 22], [1, 42]]]], ["block", "link-to", [["get", "feedbackLinkRoute", ["loc", [null, [1, 54], [1, 71]]]], ["get", "feedbackLinkTarget", ["loc", [null, [1, 72], [1, 90]]]]], [], 0, null, ["loc", [null, [1, 43], [1, 130]]]], ["block", "if", [["get", "feedbackActionName", ["loc", [null, [2, 6], [2, 24]]]]], [], 1, null, ["loc", [null, [2, 0], [4, 7]]]], ["element", "action", ["dismiss"], [], ["loc", [null, [5, 21], [5, 41]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/google-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/google-map.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "map-expand-toggle", ["loc", [null, [1, 0], [1, 21]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/components/horizontal-item-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 1
              },
              "end": {
                "line": 3,
                "column": 58
              }
            },
            "moduleName": "tripmind/templates/components/horizontal-item-card.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes", "wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/horizontal-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "card-link");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["element", "action", ["toggleSelected"], [], ["loc", [null, [2, 24], [2, 51]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [3, 19], [3, 29]]]]], ["class", "zoom-btn icon-zoom"], 0, null, ["loc", [null, [3, 1], [3, 70]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 1
              },
              "end": {
                "line": 5,
                "column": 49
              }
            },
            "moduleName": "tripmind/templates/components/horizontal-item-card.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/horizontal-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [5, 19], [5, 29]]]]], ["class", "card-link"], 0, null, ["loc", [null, [5, 1], [5, 61]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 1
            },
            "end": {
              "line": 17,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/horizontal-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		in ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "model.parentName", ["loc", [null, [16, 5], [16, 25]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/horizontal-item-card.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "selector-holder");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "selector icon-check-circle");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "image-container");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "name");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "type");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "date");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [1, 1]);
        var element2 = dom.childAt(fragment, [3]);
        var element3 = dom.childAt(fragment, [7]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createAttrMorph(element2, 'style');
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [5]), 0, 0);
        morphs[4] = dom.createMorphAt(element3, 0, 0);
        morphs[5] = dom.createMorphAt(element3, 2, 2);
        morphs[6] = dom.createMorphAt(dom.childAt(fragment, [9]), 0, 0);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "inSelectMode", ["loc", [null, [1, 6], [1, 18]]]]], [], 0, 1, ["loc", [null, [1, 0], [6, 7]]]], ["element", "action", ["toggleSelected"], [], ["loc", [null, [8, 41], [8, 68]]]], ["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [11, 37], [11, 53]]]]], ["content", "model.name", ["loc", [null, [13, 18], [13, 32]]]], ["content", "model.itemTypeClean", ["loc", [null, [14, 18], [14, 41]]]], ["block", "if", [["get", "model.parentName", ["loc", [null, [15, 7], [15, 23]]]]], [], 2, null, ["loc", [null, [15, 1], [17, 8]]]], ["content", "model.updatedAtDate", ["loc", [null, [19, 18], [19, 41]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tripmind/templates/components/input-with-default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 67
          }
        },
        "moduleName": "tripmind/templates/components/input-with-default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "valueOrDefault", ["loc", [null, [1, 14], [1, 28]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "default", ["loc", [null, [1, 41], [1, 48]]]]], [], []], "class", ["subexpr", "@mut", [["get", "addedClass", ["loc", [null, [1, 55], [1, 65]]]]], [], []]], ["loc", [null, [1, 0], [1, 67]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/components/item-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "rating icon-star");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "model.rating", ["loc", [null, [9, 33], [9, 49]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 1
              },
              "end": {
                "line": 15,
                "column": 58
              }
            },
            "moduleName": "tripmind/templates/components/item-card.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "card-link");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["element", "action", ["toggleSelected"], [], ["loc", [null, [14, 24], [14, 51]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [15, 19], [15, 29]]]]], ["class", "zoom-btn icon-zoom"], 0, null, ["loc", [null, [15, 1], [15, 70]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 17,
                "column": 1
              },
              "end": {
                "line": 17,
                "column": 49
              }
            },
            "moduleName": "tripmind/templates/components/item-card.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 18,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [17, 19], [17, 29]]]]], ["class", "card-link"], 0, null, ["loc", [null, [17, 1], [17, 61]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/item-card.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "id");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "image-container");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "details-box");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "vertical-center-parent");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "type");
        var el4 = dom.createElement("b");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "selector-holder extension-only");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "selector icon-check-circle");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(fragment, [2]);
        var element3 = dom.childAt(fragment, [4, 1]);
        var element4 = dom.childAt(element3, [3]);
        var element5 = dom.childAt(element4, [0]);
        var element6 = dom.childAt(fragment, [7, 1]);
        var morphs = new Array(9);
        morphs[0] = dom.createAttrMorph(element1, 'data-id');
        morphs[1] = dom.createAttrMorph(element2, 'style');
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(element5, 0, 0);
        morphs[4] = dom.createMorphAt(element5, 1, 1);
        morphs[5] = dom.createMorphAt(element4, 2, 2);
        morphs[6] = dom.createMorphAt(element3, 5, 5);
        morphs[7] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[8] = dom.createElementMorph(element6);
        return morphs;
      },
      statements: [["attribute", "data-id", ["get", "model.id", ["loc", [null, [1, 26], [1, 34]]]]], ["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [2, 37], [2, 53]]]]], ["content", "model.name", ["loc", [null, [5, 20], [5, 34]]]], ["content", "model.itemTypeInParent", ["loc", [null, [6, 23], [6, 49]]]], ["inline", "if", [["get", "model.onelinerOrLong", ["loc", [null, [6, 54], [6, 74]]]], ":"], [], ["loc", [null, [6, 49], [6, 80]]]], ["content", "model.onelinerOrLong", ["loc", [null, [6, 85], [6, 109]]]], ["block", "if", [["get", "model.rating", ["loc", [null, [8, 8], [8, 20]]]]], [], 0, null, ["loc", [null, [8, 2], [10, 9]]]], ["block", "if", [["get", "inSelectMode", ["loc", [null, [13, 6], [13, 18]]]]], [], 1, 2, ["loc", [null, [13, 0], [18, 7]]]], ["element", "action", ["toggleSelected"], [], ["loc", [null, [20, 41], [20, 68]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tripmind/templates/components/item-draggable-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 3
            },
            "end": {
              "line": 8,
              "column": 3
            }
          },
          "moduleName": "tripmind/templates/components/item-draggable-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				in ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "model.parentName", ["loc", [null, [7, 7], [7, 27]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 1
              },
              "end": {
                "line": 14,
                "column": 58
              }
            },
            "moduleName": "tripmind/templates/components/item-draggable-card.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/item-draggable-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "card-link");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["element", "action", ["toggleSelected"], [], ["loc", [null, [13, 24], [13, 51]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [14, 19], [14, 29]]]]], ["class", "zoom-btn icon-zoom"], 0, null, ["loc", [null, [14, 1], [14, 70]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 16,
                "column": 1
              },
              "end": {
                "line": 16,
                "column": 49
              }
            },
            "moduleName": "tripmind/templates/components/item-draggable-card.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 0
            },
            "end": {
              "line": 17,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/item-draggable-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [16, 19], [16, 29]]]]], ["class", "card-link"], 0, null, ["loc", [null, [16, 1], [16, 61]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/item-draggable-card.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "image-container");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "details-box");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "vertical-center-parent");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "type");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "selector-holder");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "selector icon-check-circle");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(fragment, [2, 1]);
        var element3 = dom.childAt(element2, [3]);
        var element4 = dom.childAt(fragment, [5, 1]);
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element1, 'style');
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[2] = dom.createMorphAt(element3, 0, 0);
        morphs[3] = dom.createMorphAt(element3, 2, 2);
        morphs[4] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[5] = dom.createElementMorph(element4);
        return morphs;
      },
      statements: [["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [1, 37], [1, 53]]]]], ["content", "model.name", ["loc", [null, [4, 20], [4, 34]]]], ["content", "model.itemTypeClean", ["loc", [null, [5, 20], [5, 43]]]], ["block", "if", [["get", "model.parentName", ["loc", [null, [6, 9], [6, 25]]]]], [], 0, null, ["loc", [null, [6, 3], [8, 10]]]], ["block", "if", [["get", "inSelectMode", ["loc", [null, [12, 6], [12, 18]]]]], [], 1, 2, ["loc", [null, [12, 0], [17, 7]]]], ["element", "action", ["toggleSelected"], [], ["loc", [null, [19, 41], [19, 68]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tripmind/templates/components/items-sorter", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/items-sorter.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "refresh-done", [], ["parentComponent", ["subexpr", "@mut", [["get", "this", ["loc", [null, [2, 32], [2, 36]]]]], [], []]], ["loc", [null, [2, 1], [2, 38]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 5,
                  "column": 2
                },
                "end": {
                  "line": 8,
                  "column": 2
                }
              },
              "moduleName": "tripmind/templates/components/items-sorter.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n			");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
              return morphs;
            },
            statements: [["inline", "distance-leg", [], ["model", ["subexpr", "@mut", [["get", "itemLeg.leg", ["loc", [null, [6, 24], [6, 35]]]]], [], []]], ["loc", [null, [6, 3], [6, 37]]]], ["inline", "item-card", [], ["model", ["subexpr", "@mut", [["get", "itemLeg.item", ["loc", [null, [7, 21], [7, 33]]]]], [], []], "addedClass", ["subexpr", "@mut", [["get", "addedClass", ["loc", [null, [7, 45], [7, 55]]]]], [], []]], ["loc", [null, [7, 3], [7, 57]]]]],
            locals: ["itemLeg"],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 8,
                  "column": 2
                },
                "end": {
                  "line": 10,
                  "column": 2
                }
              },
              "moduleName": "tripmind/templates/components/items-sorter.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "sorter-explain extension-only");
              var el2 = dom.createTextNode("Drag stuff here");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 1
              },
              "end": {
                "line": 11,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/items-sorter.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "model", ["loc", [null, [5, 10], [5, 15]]]]], [], 0, 1, ["loc", [null, [5, 2], [10, 11]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 12,
                  "column": 2
                },
                "end": {
                  "line": 14,
                  "column": 2
                }
              },
              "moduleName": "tripmind/templates/components/items-sorter.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [13, 21], [13, 25]]]]], [], []], "addedClass", ["subexpr", "@mut", [["get", "addedClass", ["loc", [null, [13, 37], [13, 47]]]]], [], []]], ["loc", [null, [13, 3], [13, 49]]]]],
            locals: ["item"],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 14,
                  "column": 2
                },
                "end": {
                  "line": 16,
                  "column": 2
                }
              },
              "moduleName": "tripmind/templates/components/items-sorter.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "sorter-explain extension-only");
              var el2 = dom.createTextNode("Drag stuff here");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 1
              },
              "end": {
                "line": 17,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/items-sorter.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "model", ["loc", [null, [12, 10], [12, 15]]]]], [], 0, 1, ["loc", [null, [12, 2], [16, 11]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 18,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/items-sorter.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "withDirections", ["loc", [null, [4, 7], [4, 21]]]]], [], 0, 1, ["loc", [null, [4, 1], [17, 8]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/items-sorter.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "needsRefresh", ["loc", [null, [1, 6], [1, 18]]]]], [], 0, 1, ["loc", [null, [1, 0], [18, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/left-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 2,
              "column": 49
            }
          },
          "moduleName": "tripmind/templates/components/left-menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("b");
          var el2 = dom.createTextNode("Trip");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("Mind");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/left-menu.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "menu-open");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" <a class=\"menu-link starred icon-star\">Starred</a> ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "menu-line extension-only");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("<a class=\"menu-link shared-collections icon-group\">Shared collections</a> ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "menu-line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("<a class=\"menu-link settings icon-cog\">Settings</a>   ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 18, 18, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 22, 22, contextualElement);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["id", "top-logo"], 0, null, ["loc", [null, [2, 0], [2, 61]]]], ["inline", "link-to", ["Search", "search"], ["class", "menu-link icon-search"], ["loc", [null, [3, 0], [3, 59]]]], ["inline", "link-to", ["Recent", "recent"], ["class", "menu-link icon-history extension-only"], ["loc", [null, [4, 0], [4, 75]]]], ["inline", "link-to", ["Places", "index"], ["class", "menu-link icon-pin"], ["loc", [null, [6, 0], [6, 55]]]], ["inline", "link-to", ["collections", "collections"], ["class", "menu-link icon-collections"], ["loc", [null, [7, 0], [7, 74]]]], ["inline", "link-to", ["Trash", "trash"], ["class", "menu-link icon-trash extension-only"], ["loc", [null, [10, 0], [10, 71]]]], ["inline", "link-to", ["Tutorial", "tutorial"], ["class", "menu-link icon-info"], ["loc", [null, [12, 0], [12, 61]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/link-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 0
              }
            },
            "moduleName": "tripmind/templates/components/link-card.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("	");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "has-tooltip icon-trash extension-only");
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "tooltip");
            var el3 = dom.createTextNode("Delete");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n	");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes", "wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/link-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "subtitle");
          var el2 = dom.createTextNode("Saved from ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "target", "_blank");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "image-container");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "expand-hint");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [3, 1]);
          var element1 = dom.childAt(fragment, [5]);
          var element2 = dom.childAt(fragment, [9]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          morphs[2] = dom.createAttrMorph(element0, 'href');
          morphs[3] = dom.createMorphAt(element0, 0, 0);
          morphs[4] = dom.createAttrMorph(element1, 'style');
          morphs[5] = dom.createMorphAt(fragment, 7, 7, contextualElement);
          morphs[6] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["content", "model.title", ["loc", [null, [2, 19], [2, 34]]]], ["block", "button-with-confirmation", [], ["onConfirm", ["subexpr", "action", ["deleteLink"], [], ["loc", [null, [3, 38], [3, 59]]]], "addedClass", "delete-btn"], 0, null, ["loc", [null, [3, 0], [7, 29]]]], ["attribute", "href", ["get", "model.id", ["loc", [null, [8, 59], [8, 67]]]]], ["content", "model.domain", ["loc", [null, [8, 70], [8, 86]]]], ["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [9, 37], [9, 53]]]]], ["inline", "autosave-editable", [], ["class", "description", "canEditContent", ["subexpr", "@mut", [["get", "isExpanded", ["loc", [null, [10, 55], [10, 65]]]]], [], []], "isEditable", ["subexpr", "@mut", [["get", "isExpanded", ["loc", [null, [10, 77], [10, 87]]]]], [], []], "saveOnExit", ["subexpr", "@mut", [["get", "model", ["loc", [null, [10, 99], [10, 104]]]]], [], []], "value", ["subexpr", "@mut", [["get", "model.noteOrDesc", ["loc", [null, [10, 111], [10, 127]]]]], [], []]], ["loc", [null, [10, 0], [10, 129]]]], ["element", "action", ["toggleExpanded"], [], ["loc", [null, [11, 25], [11, 52]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/link-card.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "model", ["loc", [null, [1, 6], [1, 11]]]]], [], 0, null, ["loc", [null, [1, 0], [12, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/major-section", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 1
            },
            "end": {
              "line": 6,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/major-section.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "selector-holder extension-only");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "selector icon-check-circle");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["toggleSelected"], [], ["loc", [null, [4, 43], [4, 70]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 1
            },
            "end": {
              "line": 7,
              "column": 71
            }
          },
          "moduleName": "tripmind/templates/components/major-section.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" (");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(")");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["content", "model.title", ["loc", [null, [7, 31], [7, 46]]]], ["content", "model.items.length", ["loc", [null, [7, 48], [7, 70]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 12,
                  "column": 2
                },
                "end": {
                  "line": 12,
                  "column": 35
                }
              },
              "moduleName": "tripmind/templates/components/major-section.hbs"
            },
            isEmpty: true,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 1
              },
              "end": {
                "line": 13,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/major-section.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["block", "sub-section", [], ["model", ["subexpr", "@mut", [["get", "subsection", ["loc", [null, [12, 23], [12, 33]]]]], [], []]], 0, null, ["loc", [null, [12, 2], [12, 51]]]]],
          locals: ["subsection"],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 1
              },
              "end": {
                "line": 16,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/major-section.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [15, 20], [15, 24]]]]], [], []]], ["loc", [null, [15, 2], [15, 26]]]]],
          locals: ["item"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 17,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/major-section.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.subsections", ["loc", [null, [11, 9], [11, 26]]]]], [], 0, null, ["loc", [null, [11, 1], [13, 10]]]], ["block", "each", [["get", "model.sortedItems", ["loc", [null, [14, 9], [14, 26]]]]], [], 1, null, ["loc", [null, [14, 1], [16, 10]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/major-section.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-title major-section-title");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "toggle-minimized");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [5]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element1, 'id');
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createElementMorph(element2);
        morphs[4] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["attribute", "id", ["concat", ["major-section-", ["get", "model.scrollSlug", ["loc", [null, [1, 25], [1, 41]]]]]]], ["block", "if", [["get", "model.items", ["loc", [null, [2, 7], [2, 18]]]]], [], 0, null, ["loc", [null, [2, 1], [6, 8]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [7, 19], [7, 29]]]]], [], 1, null, ["loc", [null, [7, 1], [7, 83]]]], ["element", "action", ["toggleMinimized"], [], ["loc", [null, [8, 31], [8, 59]]]], ["block", "unless", [["get", "isMinimized", ["loc", [null, [10, 10], [10, 21]]]]], [], 2, null, ["loc", [null, [10, 0], [17, 11]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tripmind/templates/components/major-sections-holder", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 3
              },
              "end": {
                "line": 6,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "scroll-link");
            var el2 = dom.createTextNode("Top");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element7 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element7);
            return morphs;
          },
          statements: [["element", "action", ["scrollToSection", "top"], [], ["loc", [null, [5, 29], [5, 63]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 3
              },
              "end": {
                "line": 9,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "scroll-link");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element6 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element6);
            morphs[1] = dom.createMorphAt(element6, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["scrollToSection", ["get", "majorSection.scrollSlug", ["loc", [null, [8, 56], [8, 79]]]]], [], ["loc", [null, [8, 29], [8, 81]]]], ["content", "majorSection.title", ["loc", [null, [8, 82], [8, 104]]]]],
          locals: ["majorSection"],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 3
              },
              "end": {
                "line": 12,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "scroll-link");
            var el2 = dom.createTextNode("Recommendations");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element5 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element5);
            return morphs;
          },
          statements: [["element", "action", ["scrollToSection", "recs"], [], ["loc", [null, [11, 29], [11, 64]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 1
            },
            "end": {
              "line": 14,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "scroll-menu");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element8 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(element8, 1, 1);
          morphs[1] = dom.createMorphAt(element8, 2, 2);
          morphs[2] = dom.createMorphAt(element8, 3, 3);
          return morphs;
        },
        statements: [["block", "if", [["get", "majorSections", ["loc", [null, [4, 9], [4, 22]]]]], [], 0, null, ["loc", [null, [4, 3], [6, 10]]]], ["block", "each", [["get", "majorSections", ["loc", [null, [7, 11], [7, 24]]]]], [], 1, null, ["loc", [null, [7, 3], [9, 12]]]], ["block", "if", [["get", "showRecs", ["loc", [null, [10, 9], [10, 17]]]]], [], 2, null, ["loc", [null, [10, 3], [12, 10]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 22,
                  "column": 7
                },
                "end": {
                  "line": 27,
                  "column": 7
                }
              },
              "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("								");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "menu-section");
              var el2 = dom.createTextNode("\n									");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("div");
              dom.setAttribute(el2, "class", "menu-section-title");
              var el3 = dom.createTextNode("Sort by:");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n									");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n								");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 3, 3);
              return morphs;
            },
            statements: [["inline", "select-one", [], ["options", ["subexpr", "@mut", [["get", "majorSortOptions", ["loc", [null, [25, 30], [25, 46]]]]], [], []], "onChange", ["subexpr", "action", ["updateSortOptions"], [], ["loc", [null, [25, 56], [25, 84]]]]], ["loc", [null, [25, 9], [25, 86]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 5
              },
              "end": {
                "line": 33,
                "column": 5
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("						");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "menu-column");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("							");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "menu-section");
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3, "class", "menu-section-title");
            var el4 = dom.createTextNode("Sort subsections by:");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n							");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n						");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element2, 1, 1);
            morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 3, 3);
            return morphs;
          },
          statements: [["block", "unless", [["get", "majorSectionType", ["loc", [null, [22, 17], [22, 33]]]]], [], 0, null, ["loc", [null, [22, 7], [27, 18]]]], ["inline", "select-one", [], ["options", ["subexpr", "@mut", [["get", "subSortOptions", ["loc", [null, [30, 29], [30, 43]]]]], [], []], "onChange", ["subexpr", "action", ["updateSortOptions"], [], ["loc", [null, [30, 53], [30, 81]]]]], ["loc", [null, [30, 8], [30, 83]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 39,
                  "column": 7
                },
                "end": {
                  "line": 41,
                  "column": 7
                }
              },
              "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("								");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "menu-line");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 6
              },
              "end": {
                "line": 42,
                "column": 6
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("							");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "menu-section");
            var el2 = dom.createTextNode("\n								");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n							");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["inline", "select-many", [], ["options", ["subexpr", "@mut", [["get", "filterOptions", ["loc", [null, [37, 30], [37, 43]]]]], [], []], "onChange", ["subexpr", "action", ["updateFilter"], [], ["loc", [null, [37, 53], [37, 76]]]]], ["loc", [null, [37, 8], [37, 78]]]], ["block", "if", [["get", "canHaveRecs", ["loc", [null, [39, 13], [39, 24]]]]], [], 0, null, ["loc", [null, [39, 7], [41, 14]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 43,
                "column": 6
              },
              "end": {
                "line": 47,
                "column": 6
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("							");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createTextNode("\n								Recommendations\n							");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element1, 'class');
            morphs[1] = dom.createElementMorph(element1);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["menu-option ", ["subexpr", "if", [["get", "withRecs", ["loc", [null, [44, 36], [44, 44]]]], "is-selected"], [], ["loc", [null, [44, 31], [44, 60]]]]]]], ["element", "action", ["toggleRecs"], [], ["loc", [null, [44, 62], [44, 85]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 2
            },
            "end": {
              "line": 52,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "options-menu section-options-menu");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "toggle-btn");
          var el3 = dom.createTextNode("Options");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("					");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "menu-column");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("					");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "prevent-click");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1, 3]);
          var element4 = dom.childAt(element3, [3]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element3, 'class');
          morphs[1] = dom.createMorphAt(element3, 1, 1);
          morphs[2] = dom.createMorphAt(element4, 1, 1);
          morphs[3] = dom.createMorphAt(element4, 2, 2);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["menu-body ", ["subexpr", "if", [["get", "majorSections", ["loc", [null, [19, 31], [19, 44]]]], "two-column"], [], ["loc", [null, [19, 26], [19, 59]]]]]]], ["block", "if", [["get", "majorSections", ["loc", [null, [20, 11], [20, 24]]]]], [], 0, null, ["loc", [null, [20, 5], [33, 12]]]], ["block", "if", [["get", "model", ["loc", [null, [35, 12], [35, 17]]]]], [], 1, null, ["loc", [null, [35, 6], [42, 13]]]], ["block", "if", [["get", "canHaveRecs", ["loc", [null, [43, 12], [43, 23]]]]], [], 2, null, ["loc", [null, [43, 6], [47, 13]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 53,
              "column": 2
            },
            "end": {
              "line": 55,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "major-section", [], ["model", ["subexpr", "@mut", [["get", "majorSection", ["loc", [null, [54, 25], [54, 37]]]]], [], []]], ["loc", [null, [54, 3], [54, 39]]]]],
        locals: ["majorSection"],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 56,
              "column": 2
            },
            "end": {
              "line": 58,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "major-section", [], ["model", ["subexpr", "@mut", [["get", "recsSection", ["loc", [null, [57, 25], [57, 36]]]]], [], []]], ["loc", [null, [57, 3], [57, 38]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 60,
                "column": 3
              },
              "end": {
                "line": 62,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				Your trashcan is empty. This will hold any items you decide not to track.\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 59,
              "column": 2
            },
            "end": {
              "line": 63,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "unless", [["get", "majorSections", ["loc", [null, [60, 13], [60, 26]]]]], [], 0, null, ["loc", [null, [60, 3], [62, 14]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child5 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 65,
                  "column": 4
                },
                "end": {
                  "line": 70,
                  "column": 4
                }
              },
              "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n					You don't have any tracked items yet. Try searching for something on Google, or use the search bar\n					on\n					the left.\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 64,
                "column": 3
              },
              "end": {
                "line": 71,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "unless", [["get", "withScrollMenu", ["loc", [null, [65, 14], [65, 28]]]]], [], 0, null, ["loc", [null, [65, 4], [70, 15]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 73,
                  "column": 4
                },
                "end": {
                  "line": 75,
                  "column": 4
                }
              },
              "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("					");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "flat-btn blue-text");
              var el2 = dom.createTextNode("Find some recommendations");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element0);
              return morphs;
            },
            statements: [["element", "action", ["toggleRecs"], [], ["loc", [null, [74, 37], [74, 60]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 72,
                "column": 3
              },
              "end": {
                "line": 76,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "unless", [["get", "withRecs", ["loc", [null, [73, 14], [73, 22]]]]], [], 0, null, ["loc", [null, [73, 4], [75, 15]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 63,
              "column": 2
            },
            "end": {
              "line": 77,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "canHaveRecs", ["loc", [null, [64, 9], [64, 20]]]]], [], 0, null, ["loc", [null, [64, 3], [71, 10]]]], ["block", "if", [["get", "canHaveRecs", ["loc", [null, [72, 9], [72, 20]]]]], [], 1, null, ["loc", [null, [72, 3], [76, 10]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child6 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 85,
              "column": 0
            },
            "end": {
              "line": 87,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "recs", ["loc", [null, [86, 28], [86, 32]]]]], [], []], "markerColor", "blue"], ["loc", [null, [86, 1], [86, 53]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 88,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/major-sections-holder.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "flex-container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "scrollable-rhs-content");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element9 = dom.childAt(fragment, [0]);
        var element10 = dom.childAt(element9, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(element9, 1, 1);
        morphs[1] = dom.createMorphAt(element10, 1, 1);
        morphs[2] = dom.createMorphAt(element10, 2, 2);
        morphs[3] = dom.createMorphAt(element10, 3, 3);
        morphs[4] = dom.createMorphAt(element10, 4, 4);
        morphs[5] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "withScrollMenu", ["loc", [null, [2, 7], [2, 21]]]]], [], 0, null, ["loc", [null, [2, 1], [14, 8]]]], ["block", "if", [["get", "withOptionsMenu", ["loc", [null, [16, 8], [16, 23]]]]], [], 1, null, ["loc", [null, [16, 2], [52, 9]]]], ["block", "each", [["get", "majorSections", ["loc", [null, [53, 10], [53, 23]]]]], [], 2, null, ["loc", [null, [53, 2], [55, 11]]]], ["block", "if", [["get", "showRecs", ["loc", [null, [56, 8], [56, 16]]]]], [], 3, null, ["loc", [null, [56, 2], [58, 9]]]], ["block", "if", [["get", "isTrash", ["loc", [null, [59, 8], [59, 15]]]]], [], 4, 5, ["loc", [null, [59, 2], [77, 9]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "filteredItems", ["loc", [null, [84, 27], [84, 40]]]]], [], []]], ["loc", [null, [84, 0], [84, 42]]]], ["block", "if", [["get", "showRecs", ["loc", [null, [85, 6], [85, 14]]]]], [], 6, null, ["loc", [null, [85, 0], [87, 7]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6]
    };
  })());
});
define("tripmind/templates/components/map-expand-toggle", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 68
          }
        },
        "moduleName": "tripmind/templates/components/map-expand-toggle.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "tooltip");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" map");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["inline", "if", [["get", "isExpanded", ["loc", [null, [1, 26], [1, 36]]]], "Minimize", "Expand"], [], ["loc", [null, [1, 21], [1, 58]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/components/map-placeholder", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/map-placeholder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "map-expand-toggle", ["loc", [null, [2, 1], [2, 22]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 11
          }
        },
        "moduleName": "tripmind/templates/components/map-placeholder.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "unless", [["get", "mapService.isExpanded", ["loc", [null, [1, 10], [1, 31]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('tripmind/templates/components/modal-dialog', ['exports', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, _emberModalDialogTemplatesComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsModalDialog['default'];
    }
  });
});
define("tripmind/templates/components/modal-holder", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/modal-holder.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "top-modal fade");
        dom.setAttribute(el1, "style", "display:block;");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-content");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "close-btn");
        var el5 = dom.createTextNode("✕");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-backdrop fade in");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["modal-dialog fade ", ["subexpr", "if", [["get", "isExpanded:is-expanded", ["loc", [null, [2, 36], [2, 58]]]]], [], ["loc", [null, [2, 31], [2, 60]]]]]]], ["element", "action", ["closeTopModal"], [], ["loc", [null, [4, 26], [4, 52]]]], ["content", "yield", ["loc", [null, [5, 3], [5, 12]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/components/open-tripmind", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/open-tripmind.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "has-extension");
        var el2 = dom.createTextNode("Open in TripMind");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "class", "no-extension");
        dom.setAttribute(el1, "target", "_blank");
        dom.setAttribute(el1, "href", "https://chrome.google.com/webstore/detail/tripmind/jefanopdgmnpggnnicgfkbajikmabhgf");
        var el2 = dom.createTextNode("Get my own TripMind >");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["openExtension"], [], ["loc", [null, [1, 27], [1, 53]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/components/search-field-wrapper", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 1
              },
              "end": {
                "line": 11,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/search-field-wrapper.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "temp-item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [10, 25], [10, 29]]]]], [], []]], ["loc", [null, [10, 2], [10, 31]]]]],
          locals: ["item"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/search-field-wrapper.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "search-field-spacer");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "results", ["loc", [null, [9, 9], [9, 16]]]]], [], 0, null, ["loc", [null, [9, 1], [11, 10]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/search-field-wrapper.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "search-field-wrapper");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-holder");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "clear-search");
        var el4 = dom.createTextNode("✕");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "search-field", [], ["value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [3, 23], [3, 28]]]]], [], []], "foundItem", "foundItem", "action", "submit"], ["loc", [null, [3, 2], [3, 68]]]], ["element", "action", ["clearSearch"], [], ["loc", [null, [4, 28], [4, 52]]]], ["block", "if", [["get", "results", ["loc", [null, [7, 6], [7, 13]]]]], [], 0, null, ["loc", [null, [7, 0], [12, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/section-holder", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 1
              },
              "end": {
                "line": 5,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/section-holder.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [4, 20], [4, 24]]]]], [], []]], ["loc", [null, [4, 2], [4, 26]]]]],
          locals: ["item"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/section-holder.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "model", ["loc", [null, [3, 9], [3, 14]]]]], [], 0, null, ["loc", [null, [3, 1], [5, 10]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/section-holder.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "section-title");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0, 0, 0);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["element", "action", ["toggleMinimized"], [], ["loc", [null, [1, 27], [1, 55]]]], ["content", "title", ["loc", [null, [1, 56], [1, 65]]]], ["block", "unless", [["get", "isMinimized", ["loc", [null, [2, 10], [2, 21]]]]], [], 0, null, ["loc", [null, [2, 0], [6, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/select-many", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 1
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/select-many.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "menu-line");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/select-many.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [2]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createAttrMorph(element0, 'class');
          morphs[2] = dom.createElementMorph(element0);
          morphs[3] = dom.createMorphAt(element0, 0, 0);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "if", [["get", "option.hasLineBefore", ["loc", [null, [2, 8], [2, 28]]]]], [], 0, null, ["loc", [null, [2, 1], [4, 8]]]], ["attribute", "class", ["concat", ["menu-option ", ["subexpr", "if", [["get", "option.isSelected", ["loc", [null, [5, 30], [5, 47]]]], "is-selected"], [], ["loc", [null, [5, 25], [5, 63]]]]]]], ["element", "action", ["toggleThis", ["get", "option.value", ["loc", [null, [5, 87], [5, 99]]]]], [], ["loc", [null, [5, 65], [5, 101]]]], ["content", "option.name", ["loc", [null, [5, 102], [5, 117]]]]],
        locals: ["option"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 9
          }
        },
        "moduleName": "tripmind/templates/components/select-many.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "options", ["loc", [null, [1, 8], [1, 15]]]]], [], 0, null, ["loc", [null, [1, 0], [6, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/select-one", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "modifiers",
            "modifiers": ["action"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/select-one.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createElementMorph(element0);
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["menu-option ", ["subexpr", "if", [["get", "option.isSelected", ["loc", [null, [2, 30], [2, 47]]]], "is-selected"], [], ["loc", [null, [2, 25], [2, 63]]]]]]], ["element", "action", ["selectThis", ["get", "option.value", ["loc", [null, [2, 87], [2, 99]]]]], [], ["loc", [null, [2, 65], [2, 101]]]], ["content", "option.name", ["loc", [null, [2, 102], [2, 117]]]]],
        locals: ["option"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 9
          }
        },
        "moduleName": "tripmind/templates/components/select-one.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "options", ["loc", [null, [1, 8], [1, 15]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/components/share-collection", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 1
            },
            "end": {
              "line": 5,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/share-collection.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		Loading...\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 1
            },
            "end": {
              "line": 14,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/share-collection.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "collection-option");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "image-container");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "name");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "target", "_blank");
          dom.setAttribute(el1, "class", "share-link");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "share-copy");
          var el2 = dom.createTextNode("COPY");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(fragment, [5]);
          var element3 = dom.childAt(fragment, [7]);
          var morphs = new Array(6);
          morphs[0] = dom.createAttrMorph(element1, 'style');
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[2] = dom.createAttrMorph(element2, 'href');
          morphs[3] = dom.createMorphAt(element2, 0, 0);
          morphs[4] = dom.createElementMorph(element3);
          morphs[5] = dom.createMorphAt(fragment, 9, 9, contextualElement);
          return morphs;
        },
        statements: [["attribute", "style", ["get", "model.items.firstObject.photoStyle", ["loc", [null, [7, 40], [7, 74]]]]], ["content", "model.name", ["loc", [null, [8, 21], [8, 35]]]], ["attribute", "href", ["get", "sharedLink", ["loc", [null, [11, 12], [11, 22]]]]], ["content", "sharedLink", ["loc", [null, [11, 60], [11, 74]]]], ["element", "action", ["copyLink"], [], ["loc", [null, [12, 26], [12, 47]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "sharedLink", ["loc", [null, [13, 16], [13, 26]]]]], [], []], "class", "share-input"], ["loc", [null, [13, 2], [13, 48]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/share-collection.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-title");
        var el2 = dom.createTextNode("Share Collection");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal-content");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["get", "loading", ["loc", [null, [3, 7], [3, 14]]]]], [], 0, 1, ["loc", [null, [3, 1], [14, 8]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/style-guide", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 2
            },
            "end": {
              "line": 24,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/style-guide.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		.extension-only {\n			display: none !important;\n		}\n\n		.online-only {\n			display: block !important;\n		}\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 2
              },
              "end": {
                "line": 31,
                "column": 2
              }
            },
            "moduleName": "tripmind/templates/components/style-guide.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		.has-extension {\n			display: block !important;\n		}\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 2
              },
              "end": {
                "line": 35,
                "column": 2
              }
            },
            "moduleName": "tripmind/templates/components/style-guide.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		.no-extension {\n			display: block !important;\n		}\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 1
            },
            "end": {
              "line": 36,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/components/style-guide.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "hasExtension", ["loc", [null, [27, 8], [27, 20]]]]], [], 0, 1, ["loc", [null, [27, 2], [35, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 39,
            "column": 8
          }
        },
        "moduleName": "tripmind/templates/components/style-guide.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("style");
        var el2 = dom.createTextNode("\n	#rhs-container {\n		border-right-width: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("px;\n		border-top-width: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("px;\n	}\n\n	#expanded-map {\n		width: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("px;\n		transform: translate3d(-");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("px, 0, 0);\n	}\n\n	.action-bar {\n		right: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("px;\n	}\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        morphs[3] = dom.createMorphAt(element0, 7, 7);
        morphs[4] = dom.createMorphAt(element0, 9, 9);
        morphs[5] = dom.createMorphAt(element0, 11, 11);
        morphs[6] = dom.createMorphAt(element0, 13, 13);
        return morphs;
      },
      statements: [["content", "rhsBorderRight", ["loc", [null, [3, 22], [3, 40]]]], ["content", "rhsBorderTop", ["loc", [null, [4, 20], [4, 36]]]], ["content", "mapWidth", ["loc", [null, [8, 9], [8, 21]]]], ["content", "mapWidth", ["loc", [null, [9, 26], [9, 38]]]], ["content", "barRightWidth", ["loc", [null, [13, 9], [13, 26]]]], ["block", "if", [["get", "hideEditing", ["loc", [null, [16, 8], [16, 19]]]]], [], 0, null, ["loc", [null, [16, 2], [24, 9]]]], ["block", "if", [["get", "doneCheckExtension", ["loc", [null, [26, 7], [26, 25]]]]], [], 1, null, ["loc", [null, [26, 1], [36, 8]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/sub-section", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 72
              }
            },
            "moduleName": "tripmind/templates/components/sub-section.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" (");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(")");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
            dom.insertBoundary(fragment, 0);
            return morphs;
          },
          statements: [["content", "model.title", ["loc", [null, [6, 32], [6, 47]]]], ["content", "model.items.length", ["loc", [null, [6, 49], [6, 71]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 12,
                  "column": 3
                },
                "end": {
                  "line": 12,
                  "column": 51
                }
              },
              "moduleName": "tripmind/templates/components/sub-section.hbs"
            },
            isEmpty: true,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 1
              },
              "end": {
                "line": 14,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/sub-section.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "item-card sub-section-minimized");
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "image-container");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n			");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n		");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var element3 = dom.childAt(element2, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element3, 'style');
            morphs[1] = dom.createMorphAt(element2, 3, 3);
            return morphs;
          },
          statements: [["attribute", "style", ["get", "model.items.firstObject.photoStyle", ["loc", [null, [11, 40], [11, 74]]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [12, 21], [12, 31]]]]], ["class", "card-link"], 0, null, ["loc", [null, [12, 3], [12, 63]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 15,
                  "column": 2
                },
                "end": {
                  "line": 17,
                  "column": 2
                }
              },
              "moduleName": "tripmind/templates/components/sub-section.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [16, 21], [16, 25]]]]], [], []]], ["loc", [null, [16, 3], [16, 27]]]]],
            locals: ["item"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 1
              },
              "end": {
                "line": 18,
                "column": 1
              }
            },
            "moduleName": "tripmind/templates/components/sub-section.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "model.items", ["loc", [null, [15, 10], [15, 21]]]]], [], 0, null, ["loc", [null, [15, 2], [17, 11]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes", "wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/sub-section.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "section-title sub-section-title");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "selector-holder extension-only");
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "selector icon-check-circle");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "toggle-minimized");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var element5 = dom.childAt(element4, [1, 1]);
          var element6 = dom.childAt(element4, [5]);
          var morphs = new Array(4);
          morphs[0] = dom.createElementMorph(element5);
          morphs[1] = dom.createMorphAt(element4, 3, 3);
          morphs[2] = dom.createElementMorph(element6);
          morphs[3] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["element", "action", ["toggleSelected"], [], ["loc", [null, [4, 43], [4, 70]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [6, 20], [6, 30]]]]], [], 0, null, ["loc", [null, [6, 2], [6, 84]]]], ["element", "action", ["toggleMinimized"], [], ["loc", [null, [7, 32], [7, 60]]]], ["block", "if", [["get", "isMinimized", ["loc", [null, [9, 7], [9, 18]]]]], [], 1, 2, ["loc", [null, [9, 1], [18, 8]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 21,
                "column": 2
              },
              "end": {
                "line": 21,
                "column": 72
              }
            },
            "moduleName": "tripmind/templates/components/sub-section.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" (");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(")");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
            dom.insertBoundary(fragment, 0);
            return morphs;
          },
          statements: [["content", "model.title", ["loc", [null, [21, 32], [21, 47]]]], ["content", "model.items.length", ["loc", [null, [21, 49], [21, 71]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 25,
                "column": 2
              },
              "end": {
                "line": 25,
                "column": 50
              }
            },
            "moduleName": "tripmind/templates/components/sub-section.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 27,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/sub-section.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "sub-section-title");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "item-card sub-section-minimized");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "image-container");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [3]);
          var element1 = dom.childAt(element0, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          morphs[1] = dom.createAttrMorph(element1, 'style');
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [21, 20], [21, 30]]]]], [], 0, null, ["loc", [null, [21, 2], [21, 84]]]], ["attribute", "style", ["get", "model.items.firstObject.photoStyle", ["loc", [null, [24, 39], [24, 73]]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [25, 20], [25, 30]]]]], ["class", "card-link"], 1, null, ["loc", [null, [25, 2], [25, 62]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 29,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/components/sub-section.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "model.items", ["loc", [null, [1, 6], [1, 17]]]]], [], 0, 1, ["loc", [null, [1, 0], [27, 8]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/components/temp-item-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 3
            },
            "end": {
              "line": 8,
              "column": 3
            }
          },
          "moduleName": "tripmind/templates/components/temp-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				in ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "model.parentName", ["loc", [null, [7, 7], [7, 27]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/temp-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createMorphAt(element1, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["distance ", ["get", "closestDistance.travelClass", ["loc", [null, [11, 26], [11, 53]]]]]]], ["content", "closestDistance.distanceText", ["loc", [null, [11, 57], [11, 89]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 2
            },
            "end": {
              "line": 15,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/components/temp-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "rating icon-star");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "model.rating", ["loc", [null, [14, 33], [14, 49]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 0
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/temp-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "card-link");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["selectAction", "item", ["get", "model.slug", ["loc", [null, [19, 55], [19, 65]]]]], [], ["loc", [null, [19, 24], [19, 67]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 21,
                "column": 1
              },
              "end": {
                "line": 21,
                "column": 76
              }
            },
            "moduleName": "tripmind/templates/components/temp-item-card.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 0
            },
            "end": {
              "line": 22,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/components/temp-item-card.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [21, 19], [21, 29]]]]], ["class", "card-link", "invokeAction", "persistItem"], 0, null, ["loc", [null, [21, 1], [21, 88]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 7
          }
        },
        "moduleName": "tripmind/templates/components/temp-item-card.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "image-container");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "details-box");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "vertical-center-parent");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "name");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "type");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(fragment, [2, 1]);
        var element4 = dom.childAt(element3, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createAttrMorph(element2, 'style');
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[2] = dom.createMorphAt(element4, 0, 0);
        morphs[3] = dom.createMorphAt(element4, 2, 2);
        morphs[4] = dom.createMorphAt(element3, 5, 5);
        morphs[5] = dom.createMorphAt(element3, 6, 6);
        morphs[6] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [1, 37], [1, 53]]]]], ["content", "model.name", ["loc", [null, [4, 20], [4, 34]]]], ["content", "model.itemType", ["loc", [null, [5, 20], [5, 38]]]], ["block", "if", [["get", "model.parentName", ["loc", [null, [6, 9], [6, 25]]]]], [], 0, null, ["loc", [null, [6, 3], [8, 10]]]], ["block", "if", [["get", "closestDistance", ["loc", [null, [10, 8], [10, 23]]]]], [], 1, null, ["loc", [null, [10, 2], [12, 9]]]], ["block", "if", [["get", "model.rating", ["loc", [null, [13, 8], [13, 20]]]]], [], 2, null, ["loc", [null, [13, 2], [15, 9]]]], ["block", "if", [["get", "withoutLink", ["loc", [null, [18, 6], [18, 17]]]]], [], 3, 4, ["loc", [null, [18, 0], [22, 7]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define('tripmind/templates/components/tether-dialog', ['exports', 'ember-modal-dialog/templates/components/tether-dialog'], function (exports, _emberModalDialogTemplatesComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsTetherDialog['default'];
    }
  });
});
define("tripmind/templates/error", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 31
          }
        },
        "moduleName": "tripmind/templates/error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("Hmm... nothing here.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [1, 59], [1, 73]]]]], ["loc", [null, [1, 29], [1, 74]]]], "addedClass", ["subexpr", "@mut", [["get", "actionBarVersion", ["loc", [null, [1, 86], [1, 102]]]]], [], []]], ["loc", [null, [1, 0], [1, 104]]]], ["content", "action-bar-placeholder", ["loc", [null, [2, 0], [2, 26]]]], ["inline", "major-sections-holder", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [4, 30], [4, 35]]]]], [], []], "prefilterAttribute", ["subexpr", "@mut", [["get", "prefilterAttribute", ["loc", [null, [4, 55], [4, 73]]]]], [], []], "isTrash", ["subexpr", "@mut", [["get", "isTrash", ["loc", [null, [4, 82], [4, 89]]]]], [], []], "canHaveRecs", false], ["loc", [null, [4, 0], [4, 109]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [2, 60], [2, 74]]]]], ["loc", [null, [2, 30], [2, 75]]]]], ["loc", [null, [2, 1], [2, 77]]]], ["content", "action-bar-placeholder", ["loc", [null, [3, 1], [3, 27]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [5, 60], [5, 74]]]]], ["loc", [null, [5, 30], [5, 75]]]], "addedClass", "in", "targetModel", ["subexpr", "@mut", [["get", "model", ["loc", [null, [5, 104], [5, 109]]]]], [], []], "isTrash", ["subexpr", "@mut", [["get", "model.deletedStatus", ["loc", [null, [5, 118], [5, 137]]]]], [], []], "canBeSelected", true], ["loc", [null, [5, 1], [5, 158]]]], ["inline", "action-bar-placeholder", [], ["addedClass", "in"], ["loc", [null, [6, 1], [6, 43]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 2
              },
              "end": {
                "line": 12,
                "column": 61
              }
            },
            "moduleName": "tripmind/templates/item.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "ancestor.name", ["loc", [null, [12, 44], [12, 61]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 1
            },
            "end": {
              "line": 13,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" >\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", [["get", "ancestor.target", ["loc", [null, [12, 13], [12, 28]]]], ["get", "ancestor.slug", ["loc", [null, [12, 29], [12, 42]]]]], [], 0, null, ["loc", [null, [12, 2], [12, 73]]]]],
        locals: ["ancestor"],
        templates: [child0]
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 1
            },
            "end": {
              "line": 16,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "refresh-done", [], ["parentComponent", ["subexpr", "@mut", [["get", "this", ["loc", [null, [15, 33], [15, 37]]]]], [], []]], ["loc", [null, [15, 2], [15, 39]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 1
            },
            "end": {
              "line": 18,
              "column": 1
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "autosave-editable", [], ["class", "name", "canEditContent", true, "isEditable", true, "saveOnExit", ["subexpr", "@mut", [["get", "model", ["loc", [null, [17, 82], [17, 87]]]]], [], []], "value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [17, 94], [17, 104]]]]], [], []], "refreshModel", ["subexpr", "@mut", [["get", "this", ["loc", [null, [17, 118], [17, 122]]]]], [], []], "defaultValue", "Unnamed place"], ["loc", [null, [17, 2], [17, 153]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 5
            },
            "end": {
              "line": 34,
              "column": 5
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("						");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1, "class", "detail-line");
          var el2 = dom.createTextNode("\n							");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n							");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "detail-value");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(element1, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element2, 'class');
          morphs[1] = dom.createMorphAt(element2, 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["detail-title ", ["get", "detail.name", ["loc", [null, [31, 33], [31, 44]]]]]]], ["content", "detail.name", ["loc", [null, [31, 48], [31, 63]]]], ["content", "detail.value", ["loc", [null, [32, 32], [32, 48]]]]],
        locals: ["detail"],
        templates: []
      };
    })();
    var child6 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 43,
                  "column": 9
                },
                "end": {
                  "line": 45,
                  "column": 9
                }
              },
              "moduleName": "tripmind/templates/item.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("										");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("td");
              dom.setAttribute(el1, "class", "detail-hours");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
              return morphs;
            },
            statements: [["content", "period.period", ["loc", [null, [44, 35], [44, 52]]]]],
            locals: ["period"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 40,
                "column": 8
              },
              "end": {
                "line": 47,
                "column": 8
              }
            },
            "moduleName": "tripmind/templates/item.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("									");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("tr");
            var el2 = dom.createTextNode("\n									");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "detail-day-title");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("									");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
            morphs[1] = dom.createMorphAt(element0, 3, 3);
            return morphs;
          },
          statements: [["content", "day.title", ["loc", [null, [42, 38], [42, 51]]]], ["block", "each", [["get", "day.periods", ["loc", [null, [43, 17], [43, 28]]]]], [], 0, null, ["loc", [null, [43, 9], [45, 18]]]]],
          locals: ["day"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 5
            },
            "end": {
              "line": 52,
              "column": 5
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("						");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1, "class", "detail-line");
          var el2 = dom.createTextNode("\n							");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "detail-title");
          var el3 = dom.createTextNode("Opening Hours");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n							");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "detail-value");
          var el3 = dom.createTextNode("\n								");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("table");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("								");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n							");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n						");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1, "class", "detail-line");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3, 1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.textOperatingHours", ["loc", [null, [40, 16], [40, 40]]]]], [], 0, null, ["loc", [null, [40, 8], [47, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child7 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 67,
              "column": 2
            },
            "end": {
              "line": 69,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "refresh-done", [], ["parentComponent", ["subexpr", "@mut", [["get", "this", ["loc", [null, [68, 34], [68, 38]]]]], [], []]], ["loc", [null, [68, 3], [68, 40]]]]],
        locals: [],
        templates: []
      };
    })();
    var child8 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 69,
              "column": 2
            },
            "end": {
              "line": 71,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "autosave-editable", [], ["class", "long-desc", "canEditContent", true, "isEditable", true, "saveOnExit", ["subexpr", "@mut", [["get", "model", ["loc", [null, [70, 88], [70, 93]]]]], [], []], "value", ["subexpr", "@mut", [["get", "model.longDescEditable", ["loc", [null, [70, 100], [70, 122]]]]], [], []], "refreshModel", ["subexpr", "@mut", [["get", "this", ["loc", [null, [70, 136], [70, 140]]]]], [], []]], ["loc", [null, [70, 3], [70, 142]]]]],
        locals: [],
        templates: []
      };
    })();
    var child9 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 84,
                "column": 3
              },
              "end": {
                "line": 86,
                "column": 3
              }
            },
            "moduleName": "tripmind/templates/item.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "link-card", [], ["model", ["subexpr", "@mut", [["get", "link", ["loc", [null, [85, 22], [85, 26]]]]], [], []]], ["loc", [null, [85, 4], [85, 28]]]]],
          locals: ["link"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 81,
              "column": 2
            },
            "end": {
              "line": 87,
              "column": 2
            }
          },
          "moduleName": "tripmind/templates/item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "top-section-title");
          var el2 = dom.createTextNode("Links visited and reviews:");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.visitedLinks", ["loc", [null, [84, 11], [84, 29]]]]], [], 0, null, ["loc", [null, [84, 3], [86, 12]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 98,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "title-ancestry");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "top-content");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "rhs");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "image-container main-image");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n			");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "details-holder");
        var el4 = dom.createTextNode("\n				");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("					");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        dom.setAttribute(el5, "class", "detail-line");
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "detail-title");
        var el7 = dom.createTextNode("More");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n						");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("td");
        dom.setAttribute(el6, "class", "detail-value");
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "class", "link-blue");
        dom.setAttribute(el7, "target", "_blank");
        var el8 = dom.createTextNode("Find this on Google >");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "class", "link-blue");
        dom.setAttribute(el7, "target", "_blank");
        var el8 = dom.createTextNode("More photos >");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("br");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "lhs");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "bottom-content");
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "rhs");
        var el3 = dom.createTextNode("\n\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "lhs");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [2]);
        var element4 = dom.childAt(fragment, [4]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element5, [5, 1]);
        var element8 = dom.childAt(element7, [4, 3]);
        var element9 = dom.childAt(element8, [1]);
        var element10 = dom.childAt(element8, [7]);
        var morphs = new Array(13);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element3, 1, 1);
        morphs[2] = dom.createMorphAt(element3, 2, 2);
        morphs[3] = dom.createAttrMorph(element6, 'style');
        morphs[4] = dom.createMorphAt(element5, 3, 3);
        morphs[5] = dom.createMorphAt(element7, 1, 1);
        morphs[6] = dom.createMorphAt(element7, 2, 2);
        morphs[7] = dom.createAttrMorph(element9, 'href');
        morphs[8] = dom.createAttrMorph(element10, 'href');
        morphs[9] = dom.createMorphAt(dom.childAt(element4, [3]), 1, 1);
        morphs[10] = dom.createMorphAt(dom.childAt(fragment, [6, 3]), 1, 1);
        morphs[11] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[12] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "descendants", ["loc", [null, [1, 6], [1, 17]]]]], [], 0, 1, ["loc", [null, [1, 0], [7, 7]]]], ["block", "each", [["get", "model.ancestorsArray", ["loc", [null, [11, 9], [11, 29]]]]], [], 2, null, ["loc", [null, [11, 1], [13, 10]]]], ["block", "if", [["get", "needsRefresh", ["loc", [null, [14, 7], [14, 19]]]]], [], 3, 4, ["loc", [null, [14, 1], [18, 8]]]], ["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [23, 50], [23, 66]]]]], ["inline", "map-placeholder", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [24, 26], [24, 31]]]]], [], []]], ["loc", [null, [24, 2], [24, 33]]]], ["block", "each", [["get", "model.details", ["loc", [null, [29, 13], [29, 26]]]]], [], 5, null, ["loc", [null, [29, 5], [34, 14]]]], ["block", "if", [["get", "model.textOperatingHours", ["loc", [null, [35, 11], [35, 35]]]]], [], 6, null, ["loc", [null, [35, 5], [52, 12]]]], ["attribute", "href", ["get", "model.googleLink", ["loc", [null, [56, 51], [56, 67]]]]], ["attribute", "href", ["get", "model.googleImagesLink", ["loc", [null, [59, 51], [59, 73]]]]], ["block", "if", [["get", "needsRefresh", ["loc", [null, [67, 8], [67, 20]]]]], [], 7, 8, ["loc", [null, [67, 2], [71, 9]]]], ["block", "if", [["get", "model.visitedLinks", ["loc", [null, [81, 8], [81, 26]]]]], [], 9, null, ["loc", [null, [81, 2], [87, 9]]]], ["inline", "major-sections-holder", [], ["parentItem", ["subexpr", "@mut", [["get", "model", ["loc", [null, [93, 35], [93, 40]]]]], [], []], "model", ["subexpr", "@mut", [["get", "descendants", ["loc", [null, [93, 47], [93, 58]]]]], [], []], "recs", ["subexpr", "@mut", [["get", "recs", ["loc", [null, [93, 64], [93, 68]]]]], [], []], "majorSectionType", "item", "prefilterAttribute", "trackingStatus"], ["loc", [null, [93, 0], [93, 130]]]], ["inline", "center-marker", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [96, 22], [96, 27]]]]], [], []]], ["loc", [null, [96, 0], [96, 29]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9]
    };
  })());
});
define("tripmind/templates/modals/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 12
          }
        },
        "moduleName": "tripmind/templates/modals/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Hello world!");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/recent", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/recent.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "horizontal-item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [11, 30], [11, 34]]]]], [], []]], ["loc", [null, [11, 1], [11, 36]]]]],
        locals: ["item"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/recent.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	Nothing has been tracked yet. Try searching for something on Google or using the search bar to the left.\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/recent.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "recent-titles");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "title image-container");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "title name");
        var el3 = dom.createTextNode("Name");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "title type");
        var el3 = dom.createTextNode("Type");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "title date");
        var el3 = dom.createTextNode("Last updated");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 7, 7, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [1, 59], [1, 73]]]]], ["loc", [null, [1, 29], [1, 74]]]], "addedClass", ["subexpr", "@mut", [["get", "actionBarVersion", ["loc", [null, [1, 86], [1, 102]]]]], [], []]], ["loc", [null, [1, 0], [1, 104]]]], ["content", "action-bar-placeholder", ["loc", [null, [2, 0], [2, 26]]]], ["block", "each", [["get", "model", ["loc", [null, [10, 8], [10, 13]]]]], [], 0, 1, ["loc", [null, [10, 0], [14, 9]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [15, 27], [15, 32]]]]], [], []]], ["loc", [null, [15, 0], [15, 34]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tripmind/templates/search/results", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.4.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tripmind/templates/search/results.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "temp-item-card", [], ["model", ["subexpr", "@mut", [["get", "result", ["loc", [null, [2, 24], [2, 30]]]]], [], []]], ["loc", [null, [2, 1], [2, 32]]]]],
        locals: ["result"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/search/results.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [1, 8], [1, 13]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 9]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [5, 27], [5, 32]]]]], [], []]], ["loc", [null, [5, 0], [5, 34]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tripmind/templates/search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "tripmind/templates/search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "search-page");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-field-spacer");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 5, 5);
        return morphs;
      },
      statements: [["inline", "search-field-wrapper", [], ["value", ["subexpr", "@mut", [["get", "query", ["loc", [null, [2, 30], [2, 35]]]]], [], []], "foundItem", "triggerTransition"], ["loc", [null, [2, 1], [2, 67]]]], ["content", "outlet", ["loc", [null, [4, 1], [4, 11]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tripmind/templates/tutorial", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.4.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "tripmind/templates/tutorial.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "style", "color: #E74C3C; font-weight: 400;");
        var el2 = dom.createTextNode("Welcome to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("b");
        var el3 = dom.createTextNode("Trip");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("Mind!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1, "style", "color: #333; font-weight: 400;");
        var el2 = dom.createTextNode("Here's how it works:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.setAttribute(el1, "src", "/assets/images/tutorial.png");
        dom.setAttribute(el1, "width", "600");
        dom.setAttribute(el1, "style", "float:left; margin-right: 1em;");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "tutorial extension-only");
        var el2 = dom.createTextNode("\n	For example, try looking for\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "target", "_blank");
        dom.setAttribute(el2, "href", "https://www.google.com/webhp?ie=UTF-8#safe=off&q=things+to+do+in+paris");
        var el3 = dom.createTextNode("\"Things to do in Paris\" on Google");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	, then click around on some of the attractions\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "tutorial online-only");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "flat-btn small no-extension");
        dom.setAttribute(el2, "target", "_blank");
        dom.setAttribute(el2, "href", "https://chrome.google.com/webstore/detail/tripmind/jefanopdgmnpggnnicgfkbajikmabhgf");
        var el3 = dom.createTextNode("Get my own TripMind >");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "flat-btn small has-extension");
        dom.setAttribute(el2, "target", "_blank");
        var el3 = dom.createTextNode("Open TripMind >");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8, 3]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["openExtension"], [], ["loc", [null, [13, 59], [13, 85]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('tripmind/config/environment', ['ember'], function(Ember) {
  var prefix = 'tripmind';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */
if (!runningTests) {
  require("tripmind/app")["default"].create({"itai":3,"name":"tripmind","version":"0.0.0+df78c3e8"});
}
/* jshint ignore:end */
//# sourceMappingURL=tripmind.map