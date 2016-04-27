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
		GOOGLE_TYPE_FILTER_CATEGORIES: [{ type: "art_gallery", filterOption: "Art" }, { type: "administrative_area_level_1", filterOption: "Destination" }, { type: "administrative_area_level_2", filterOption: "Destination" }, { type: "administrative_area_level_3", filterOption: "Destination" }, { type: "administrative_area_level_4", filterOption: "Destination" }, { type: "administrative_area_level_5", filterOption: "Destination" }, { type: "colloquial_area", filterOption: "Destination" }, { type: "country", filterOption: "Destination" }, { type: "geocode", filterOption: "Destination" }, { type: "intersection", filterOption: "Destination" }, { type: "locality", filterOption: "Destination" }, { type: "neighborhood", filterOption: "Destination" }, { type: "political", filterOption: "Destination" }, { type: "post_box", filterOption: "Destination" }, { type: "postal_code", filterOption: "Destination" }, { type: "postal_code_prefix", filterOption: "Destination" }, { type: "postal_code_suffix", filterOption: "Destination" }, { type: "postal_town", filterOption: "Destination" }, { type: "route", filterOption: "Destination" }, { type: "street_address", filterOption: "Destination" }, { type: "street_number", filterOption: "Destination" }, { type: "sublocality", filterOption: "Destination" }, { type: "sublocality_level_1", filterOption: "Destination" }, { type: "sublocality_level_2", filterOption: "Destination" }, { type: "sublocality_level_3", filterOption: "Destination" }, { type: "sublocality_level_4", filterOption: "Destination" }, { type: "sublocality_level_5", filterOption: "Destination" }, { type: "casino", filterOption: "Entertainment" }, { type: "movie_theater", filterOption: "Entertainment" }, { type: "stadium", filterOption: "Entertainment" }, { type: "amusement_park", filterOption: "Family" }, { type: "lodging", filterOption: "Hotels" }, { type: "city_hall", filterOption: "Landmark" }, { type: "library", filterOption: "Landmark" }, { type: "local_government_office", filterOption: "Landmark" }, { type: "beauty_salon", filterOption: "Lifestyle" }, { type: "gym", filterOption: "Lifestyle" }, { type: "spa", filterOption: "Lifestyle" }, { type: "museum", filterOption: "Museum" }, { type: "aquarium", filterOption: "Nature" }, { type: "natural_feature", filterOption: "Nature" }, { type: "park", filterOption: "Nature" }, { type: "zoo", filterOption: "Nature" }, { type: "bar", filterOption: "Nightlife" }, { type: "night_club", filterOption: "Nightlife" }, { type: "accounting", filterOption: "Other" }, { type: "airport", filterOption: "Other" }, { type: "atm", filterOption: "Other" }, { type: "bank", filterOption: "Other" }, { type: "bicycle_store", filterOption: "Other" }, { type: "bowling_alley", filterOption: "Other" }, { type: "bus_station", filterOption: "Other" }, { type: "campground", filterOption: "Other" }, { type: "car_dealer", filterOption: "Other" }, { type: "car_rental", filterOption: "Other" }, { type: "car_repair", filterOption: "Other" }, { type: "car_wash", filterOption: "Other" }, { type: "cemetery", filterOption: "Other" }, { type: "courthouse", filterOption: "Other" }, { type: "dentist", filterOption: "Other" }, { type: "doctor", filterOption: "Other" }, { type: "electrician", filterOption: "Other" }, { type: "embassy", filterOption: "Other" }, { type: "establishment", filterOption: "Other" }, { type: "finance", filterOption: "Other" }, { type: "fire_station", filterOption: "Other" }, { type: "floor", filterOption: "Other" }, { type: "food", filterOption: "Other" }, { type: "funeral_home", filterOption: "Other" }, { type: "gas_station", filterOption: "Other" }, { type: "general_contractor", filterOption: "Other" }, { type: "grocery_or_supermarket", filterOption: "Other" }, { type: "hair_care", filterOption: "Other" }, { type: "health", filterOption: "Other" }, { type: "hospital", filterOption: "Other" }, { type: "insurance_agency", filterOption: "Other" }, { type: "laundry", filterOption: "Other" }, { type: "lawyer", filterOption: "Other" }, { type: "locksmith", filterOption: "Other" }, { type: "meal_delivery", filterOption: "Other" }, { type: "meal_takeaway", filterOption: "Other" }, { type: "movie_rental", filterOption: "Other" }, { type: "moving_company", filterOption: "Other" }, { type: "painter", filterOption: "Other" }, { type: "parking", filterOption: "Other" }, { type: "pharmacy", filterOption: "Other" }, { type: "physiotherapist", filterOption: "Other" }, { type: "plumber", filterOption: "Other" }, { type: "point_of_interest", filterOption: "Other" }, { type: "police", filterOption: "Other" }, { type: "post_office", filterOption: "Other" }, { type: "premise", filterOption: "Other" }, { type: "real_estate_agency", filterOption: "Other" }, { type: "roofing_contractor", filterOption: "Other" }, { type: "room", filterOption: "Other" }, { type: "rv_park", filterOption: "Other" }, { type: "school", filterOption: "Other" }, { type: "storage", filterOption: "Other" }, { type: "subpremise", filterOption: "Other" }, { type: "subway_station", filterOption: "Other" }, { type: "taxi_stand", filterOption: "Other" }, { type: "train_station", filterOption: "Other" }, { type: "transit_station", filterOption: "Other" }, { type: "travel_agency", filterOption: "Other" }, { type: "university", filterOption: "Other" }, { type: "veterinary_care", filterOption: "Other" }, { type: "church", filterOption: "Religious" }, { type: "hindu_temple", filterOption: "Religious" }, { type: "mosque", filterOption: "Religious" }, { type: "place_of_worship", filterOption: "Religious" }, { type: "synagogue", filterOption: "Religious" }, { type: "bakery", filterOption: "Restaurants" }, { type: "cafe", filterOption: "Restaurants" }, { type: "restaurant", filterOption: "Restaurants" }, { type: "book_store", filterOption: "Shopping" }, { type: "clothing_store", filterOption: "Shopping" }, { type: "convenience_store", filterOption: "Shopping" }, { type: "department_store", filterOption: "Shopping" }, { type: "electronics_store", filterOption: "Shopping" }, { type: "florist", filterOption: "Shopping" }, { type: "furniture_store", filterOption: "Shopping" }, { type: "hardware_store", filterOption: "Shopping" }, { type: "home_goods_store", filterOption: "Shopping" }, { type: "jewelry_store", filterOption: "Shopping" }, { type: "liquor_store", filterOption: "Shopping" }, { type: "pet_store", filterOption: "Shopping" }, { type: "shoe_store", filterOption: "Shopping" }, { type: "shopping_mall", filterOption: "Shopping" }, { type: "store", filterOption: "Shopping" }]

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

			var markerIconSmallBlue = {};

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
			polylineAlternateOptions: createPolylineOptions('#5ba0d0', '#0078b4'),
			directionsDisplayOptions: {
				suppressMarkers: true,
				preserveViewport: true,
				polylineOptions: {
					strokeOpacity: 0
				}
			}
		});
	})();

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
		classNames: ['action-bar'],
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
				var js = JSON.stringify(collection.toJSON());
				console.log('collection:', js);
				js = lzwCompress.pack(js);
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
		classNameBindings: ['isEditable'],
		attributeBindings: ['contenteditable'],
		valueOW: _ember['default'].computed.oneWay('value'),

		mouseDown: function mouseDown(e) {
			if (e.target.tagName != "A") {
				this.set('contenteditable', this.get('canEditContent'));
			}
		},

		_updateValue: function _updateValue(value) {
			this.set('value', value);
			this.$().html(value);
		},

		focusOut: function focusOut() {
			var modelToSave = this.get('saveOnExit'),
			    self = this;
			if (modelToSave) {
				var currentValue = this.$().html();
				this.set('contenteditable', false);
				this.set('value', null);
				this.$().html("");
				this.set('value', currentValue);
				this.$().html(currentValue);
				if (modelToSave.get('updatedAt')) {
					modelToSave.set('updatedAt', moment().format("X"));
				}
				modelToSave.save();
			}
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
/*collItemsDidChange: function(){
	var isInCollection = this.get('currentCollection.itemIds').indexOf(this.get('model.id')) > -1;
	if (isInCollection) {
		this.setProperties({
			addedLabelClass: 'center collection',
			unhoveredIcon: gmaps.markerIcons.largeOrange
		})
	} else {
		this.setProperties({
			addedLabelClass: 'center',
			unhoveredIcon: gmaps.markerIcons.largeRed
		})
	}
}.observes('currentCollection.itemIds.[]', 'model.id').on('init'),*/
define('tripmind/components/collection-action-bar', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		elementId: 'collection-action-bar',
		service: _ember['default'].inject.service('action-service'),
		classNames: ['action-bar'],
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
			if (e.Qb.offsetX >= 120 && e.Qb.offsetX <= 220 && e.Qb.offsetY >= 180 && e.Qb.offsetY <= 220) {
				console.log('going to item!', this.get('model.name'));
				this.get('targetObject.targetObject.targetObject').send('triggerTransition', 'item', this.get('model.slug'));
				//ga('send', 'event', 'marker', 'readMore');
			}
			var currentSetting = this.get('isClicked');
			/*if (this.get('minimizeAllAction')) { this.get('minimizeAllAction')()}
   */
			this.set('isExpanded', !currentSetting);
			this.set('isClicked', !currentSetting);
			if (!currentSetting) {

				this.centerMarker();
				//ga('send', 'event', 'marker', 'enlarge');
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
			if (!this.get('model')) {
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
		classNames: ['major-sections-holder'],
		classNameBindings: [],
		model: null,
		filteredItems: null,
		orderedMajorSections: null,
		majorSectionType: null,
		minorSectionType: null,

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
			    filterOptionsOrder = ["Art", "Entertainment", "Family", "Landmark", "Lifestyle", "Museum", "Nature", "Religious", "Other", "Restaurants", "Nightlife", "Shopping", "Hotels"],
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
					    itemId = item.get('id');
					if (!ancestry || ancestry.length == (options.minDepth - 1 || 0)) {
						treeObject[itemId] = treeObject[itemId] || {
							ancestryArray: [],
							count: 0,
							descs: [],
							depth: 1,
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
					if (descCount >= options.threshold || treeObject[itemId].depth == options.minDepth) {
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
			submit: function submit(query) {
				this.get('targetObject').send('loading');
				this.get('wrappedField').$().autocomplete('close');
				var self = this;
				if (query.length > 0) this.get('targetObject').send('transitionToResults', query);
				this.get('wrappedField').$().autocomplete("close");
				this.get('wrappedField').$().blur();
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

		init: function init() {
			this._super();
			this.set('autocomplete_emberobj', this);
		},

		didInsertElement: function didInsertElement() {
			this.setupWidget();
			this.set('parentView.wrappedField', this);
			this.$().focus();
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
			this.get('targetObject.targetObject').send('loading');

			// if user selected a specific place, we immediately look for it in Wanderant's db then google's
			if (selectedPrediction.place_id) {
				var searchService = this.get('searchService');
				searchService.findOrCreateFromPlaceId(selectedPrediction.place_id).then(function (item) {
					self.sendAction('foundItem', 'item', item.get('slug'));
					self.get('targetObject.targetObject').send('stopLoading');
				}, function (status) {
					console.log('no results found');
				});
				//ga('send', 'search', 'autocompleteSelect', selectedPrediction.place_id);
			} else {
					//submit the search
					self.get('parentView').send('submit', this.get('query'));
					//ga('send', 'search', 'searchSubmit', this.get('query'));
				}
		},

		actions: {
			clearSearch: function clearSearch() {
				this.set('query', '');
				//ga('send', 'search', 'clearSearch');
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
define('tripmind/components/style-guide', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		service: _ember['default'].inject.service('screen-defs'),
		mapWidth: _ember['default'].computed.alias('service.actualMapWidth'),
		barRightWidth: (function () {
			return Math.max(this.get('mapWidth'), 48);
		}).property('mapWidth')

	});
});
define('tripmind/components/sub-section', ['exports', 'ember', 'tripmind/mixins/section-mixin'], function (exports, _ember, _tripmindMixinsSectionMixin) {
	exports['default'] = _ember['default'].Component.extend(_tripmindMixinsSectionMixin['default'], {
		store: _ember['default'].inject.service('store'),
		classNames: ['sub-section'],

		mouseEnter: function mouseEnter() {
			if (this.get('model.count')) return;
			var item = this.get('store').peekRecord('item', this.get('model.slug').split("+")[0]);
			item.set('isHovered', true);
		},
		mouseLeave: function mouseLeave() {
			if (this.get('model.count')) return;
			var item = this.get('store').peekRecord('item', this.get('model.slug').split("+")[0]);
			item.set('isHovered', false);
		}
	});
});
define('tripmind/components/temp-item-card', ['exports', 'ember', 'tripmind/components/item-card'], function (exports, _ember, _tripmindComponentsItemCard) {
	exports['default'] = _tripmindComponentsItemCard['default'].reopen({
		classNames: ['temporary'],
		persistRecord: false,
		store: _ember['default'].inject.service('store'),

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
			store.push(addlData);
			var formattedData = places.map(function (place) {
				return formatPlace(place);
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
			return this.get('altOneliner') || this.get('oneliner') || this.get('itemType');
		}).property('oneliner', 'altOneliner'),

		onelinerOrLong: (function () {
			if (this.get('onelinerOrAlt')) return this.get('onelinerOrAlt');
			if (this.get('longDescOrAlt')) return this.get('longDescOrAlt').replace(/<(?:.|\n)*?>/gm, '').slice(0, 80) + "...";
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
			return this.get('model.items').every(function (item) {
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
define('tripmind/mixins/widget', ['exports', 'ember'], function (exports, _ember) {

	// Create a new mixin for jQuery UI widgets using the Ember
	// mixin syntax.
	var Widget = _ember['default'].Mixin.create({
		// call this method to set up the widget
		// IL: best if not done on every didInsertElement to save useless effort
		// e.g. when cards are still moving about.
		setupWidget: function setupWidget() {
			this._super();
			if (!this.get('widgetIsUp')) {

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
			var itemTypeName = this.get('itemType');
			var parentName = this.get('parentName');

			if (parentName) {
				return itemTypeName + ' in ' + parentName;
			} else {
				return itemTypeName;
			}
		}).property('itemTypeName', 'parentName'),

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
			response.push({ target: 'item', name: this.get('name'), slug: this.get('slug'), offsetClass: 'offset-' + (ancestryLength + 1) + ' is-selected' });
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
		imageProvider: null,

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

		slug: (function () {
			return this.get('id') + '-' + this.get('name');
		}).property('id', 'name'),

		getTmToken: function getTmToken() {
			var self = this,
			    store = this.store;
			return new _ember['default'].RSVP.Promise(function (resolve, reject) {
				if (self.get('tmToken')) {
					resolve();
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
						var newCollection = store.createRecord('collection', $.extend(attributes, { id: result.tm_token, tmToken: result.tm_token }));

						newCollection.save().then(function () {
							attributes.items.forEach(function (item) {
								var itemCollections = item.get('collections');
								itemCollections.removeObject(self);
								itemCollections.addObject(newCollection);
								item.save();
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
			    linksToSend = _ember['default'].ArrayProxy.create({ content: [] });
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
					});
					serializedRecords = serializedRecords.concat(serializedItems).concat(serializedLinks);
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
					console.log('couldnt find all links', error);
				});
			});
		},

		itemsChange: (function () {
			console.log('items changed!');
		}).observes('items.[]')

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
		rating: _emberData['default'].attr('number', { defaultValue: 3 }),
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

		visitedLinks: (function () {
			return this.get('potentialLinks').filter(function (link) {
				return link.get('lastVisited');
			});
		}).property('potentialLinks.[].lastVisited'),

		itemDetailsService: _ember['default'].inject.service('item-details-service'),

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
define('tripmind/router', ['exports', 'ember', 'tripmind/config/environment'], function (exports, _ember, _tripmindConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _tripmindConfigEnvironment['default'].locationType,
		feedbackService: _ember['default'].inject.service('feedback-service'),

		doSomethingOnUrlChange: (function () {
			_ember['default'].run.schedule('afterRender', this, 'prepView');
			/*ga('send', 'pageview', {
   	'page': this.get('url'),
   	'title': this.get('url')
   });*/
		}).on('didTransition'),

		// Close any menus, and send a message to applicationRouter to scroll to the appropriate tab
		prepView: function prepView() {
			if (!this.get('feedbackService.persistAfterUrlChange')) {
				this.set('feedbackService.isShowing', false);
			}
			//this.get('mapService').minimizeMap({closeAll: true});
			$('.loader').addClass('hidden');
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
		this.route('error');
	});

	exports['default'] = Router;
});
define('tripmind/routes/application', ['exports', 'ember'], function (exports, _ember) {
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
				var items = collection.get('items');
				_ember['default'].run.scheduleOnce('sync', self, '_checkDateAndUpdate', collection);
				return collection;
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
define('tripmind/routes/item', ['exports', 'ember', 'tripmind/appconfig/utils'], function (exports, _ember, _tripmindAppconfigUtils) {
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
							return i.get('trackingStatus') && i.get('ancestry') && i.get('ancestry').indexOf(itemRecord.get('path')) == 0;
						});
						return _ember['default'].Object.create({ item: itemRecord, descendants: descendants });
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
				descendants: model.get('descendants')
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
					self.get('googlePlaces.service').getDetails({ placeId: placeId }, function (result) {
						//console.log(result);
						var item = store.peekRecord('item', placeId);
						if (!item || !result) {
							reject({ message: "didn't find the item or its representation in the store" });
						} else {
							item.set('phone', result.international_phone_number);
							if (!item.get('googleHours') && result.opening_hours) item.set('googleHours', result.opening_hours.periods);
							if (!item.get('name')) item.set('name', result.name);
							if (!item.get('lat') && result.geometry) {
								item.set('lat', result.geometry.location.lat());
								item.set('lng', result.geometry.location.lng());
							}
							if (result.types && result.types.length > 0) {
								item.itemType = result.types[0];
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
									item.set('updatedAt', moment().format("X"));
									item.save().then(function (savedItem) {
										resolve(savedItem);
									});
								});
							} else {
								item.set('updatedAt', moment().format("X"));
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
							var massagedResult = $.extend(topResult, { name: topResult.description });
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
		},

		_setMapListeners: function _setMapListeners(map) {
			var self = this;

			google.maps.event.addListener(map, 'zoom_changed', function () {
				/*var zoomLevel = this.getZoom();
     this.setOptions({ styles: WA.Gmaps.styles.originalStyles[WA.Gmaps.stylesByZoomLevel[zoomLevel]] });
     Ember.run.debounce(self, '_addMarkersFromBounds', map, 200);
     Ember.run.debounce(self, '_toggleRoutes', zoomLevel, 200);
     Ember.run.debounce(self, '_addClassToTiles', 200);*/
			});

			google.maps.event.addListener(map, 'click', function () {
				self.get('collectionMarkers').send('minimizeAllMarkers');
				/*self.get('generatedMarkersList').invoke('reset');
    self.get('currentCollectionMarkersList').invoke('reset');
    self.get('currentRoute').reset();
    self.get('viewedRoute').reset();*/
			});

			google.maps.event.addListener(map, 'resize', function () {
				self.scheduleFitBounds();
				//	self.get('mapService.collectionMarkers').send('minimizeAllMarkers');
			});

			google.maps.event.addListener(map, 'dragend', function () {
				/*
     self._addMarkersFromBounds(map);
     */
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
		}).observes('bounds'),

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
			console.log('fitting bounds!');
			var bounds = this.get('bounds');
			if (!bounds) return;
			var map = this.get('googleMapObject');
			var sw = new google.maps.LatLng(bounds.swLat, bounds.swLng);
			var ne = new google.maps.LatLng(bounds.neLat, bounds.neLng);

			map.fitBounds(new google.maps.LatLngBounds(sw, ne));
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
define('tripmind/services/screen-defs', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		mapService: _ember['default'].inject.service('map-service'),
		mapWidth: 300,
		screenWidth: null,

		init: function init() {
			this._super();
			this.setScreenWidth();
			var self = this;
			$(window).on('resize.defs', function () {
				self.setScreenWidth();
			});
		},

		setScreenWidth: function setScreenWidth() {
			this.set('screenWidth', $(document).innerWidth());
			this.get('mapService').resizeMap();
		},

		actualMapWidth: (function () {
			return this.get('mapService.isExpanded') ? this.get('mapWidth') : 0;
		}).property('mapWidth', 'mapService.isExpanded')
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
			//ga('send', 'event', 'search', 'googleTextQuery', query);

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
                "line": 24,
                "column": 1
              },
              "end": {
                "line": 29,
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
          statements: [["element", "action", ["toggleModal"], [], ["loc", [null, [27, 37], [27, 61]]]], ["inline", "component", [["get", "displayService.modalComponentName", ["loc", [null, [28, 14], [28, 47]]]]], ["model", ["subexpr", "@mut", [["get", "displayService.model", ["loc", [null, [28, 54], [28, 74]]]]], [], []], "closeAction", ["subexpr", "action", ["toggleModal"], [], ["loc", [null, [28, 87], [28, 109]]]]], ["loc", [null, [28, 2], [28, 111]]]]],
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
              "line": 23,
              "column": 0
            },
            "end": {
              "line": 30,
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
        statements: [["block", "modal-dialog", [], ["close", "toggleModal", "targetAttachment", "none", "translucentOverlay", true], 0, null, ["loc", [null, [24, 1], [29, 18]]]]],
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
            "line": 40,
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
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [6]), 1, 1);
        morphs[4] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 14, 14, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "auth-tokens", ["loc", [null, [1, 0], [1, 15]]]], ["content", "style-guide", ["loc", [null, [2, 0], [2, 15]]]], ["content", "left-menu", ["loc", [null, [4, 0], [4, 13]]]], ["content", "outlet", ["loc", [null, [10, 1], [10, 11]]]], ["block", "if", [["get", "displayService.modalIsOpen", ["loc", [null, [23, 6], [23, 32]]]]], [], 0, null, ["loc", [null, [23, 0], [30, 7]]]], ["content", "feed-back", ["loc", [null, [33, 0], [33, 13]]]], ["content", "google-map", ["loc", [null, [36, 0], [36, 14]]]], ["content", "map-resize", ["loc", [null, [37, 0], [37, 14]]]]],
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
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
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
        statements: [["inline", "item-card", [], ["model", ["subexpr", "@mut", [["get", "item", ["loc", [null, [7, 19], [7, 23]]]]], [], []]], ["loc", [null, [7, 1], [7, 25]]]]],
        locals: ["item"],
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
            "line": 10,
            "column": 40
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
        var el1 = dom.createTextNode("\n");
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
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [1, 59], [1, 73]]]]], ["loc", [null, [1, 29], [1, 74]]]], "targetCollection", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 92], [1, 97]]]]], [], []], "isInCollection", true], ["loc", [null, [1, 0], [1, 119]]]], ["inline", "collection-action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [3, 70], [3, 84]]]]], ["loc", [null, [3, 40], [3, 85]]]], "addedClass", "in", "targetModel", ["subexpr", "@mut", [["get", "model", ["loc", [null, [3, 114], [3, 119]]]]], [], []]], ["loc", [null, [3, 0], [3, 121]]]], ["inline", "input-with-default", [], ["value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [5, 27], [5, 37]]]]], [], []], "addedClass", "collection-title", "default", "Untitled", "saveOnExit", ["subexpr", "@mut", [["get", "model", ["loc", [null, [5, 98], [5, 103]]]]], [], []]], ["loc", [null, [5, 0], [5, 105]]]], ["block", "each", [["get", "model.items", ["loc", [null, [6, 8], [6, 19]]]]], [], 0, null, ["loc", [null, [6, 0], [8, 9]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "model.items", ["loc", [null, [10, 27], [10, 38]]]]], [], []]], ["loc", [null, [10, 0], [10, 40]]]]],
      locals: [],
      templates: [child0]
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
            "line": 2,
            "column": 0
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
              "line": 5,
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
        statements: [["inline", "collection-marker", [], ["model", ["subexpr", "@mut", [["get", "wrapper.item", ["loc", [null, [2, 27], [2, 39]]]]], [], []], "isExpanded", ["subexpr", "@mut", [["get", "wrapper.isExpanded", ["loc", [null, [3, 12], [3, 30]]]]], [], []], "isClicked", ["subexpr", "@mut", [["get", "wrapper.isClicked", ["loc", [null, [3, 41], [3, 58]]]]], [], []], "minimizeAllAction", ["subexpr", "action", ["minimizeAllMarkers"], [], ["loc", [null, [4, 19], [4, 48]]]]], ["loc", [null, [2, 1], [4, 50]]]]],
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
            "line": 5,
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
      statements: [["block", "each", [["get", "markerWrappers", ["loc", [null, [1, 8], [1, 22]]]]], [], 0, null, ["loc", [null, [1, 0], [5, 9]]]]],
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
              "line": 6,
              "column": 3
            },
            "end": {
              "line": 8,
              "column": 3
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
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 15,
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
              "line": 15,
              "column": 0
            },
            "end": {
              "line": 17,
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
        "moduleName": "tripmind/templates/components/item-card.hbs"
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
define("tripmind/templates/components/left-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 1,
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
            "line": 13,
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
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "class", "menu-link starred icon-star");
        var el2 = dom.createTextNode("Starred");
        dom.appendChild(el1, el2);
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
        dom.setAttribute(el1, "class", "menu-line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "class", "menu-link shared-collections icon-group");
        var el2 = dom.createTextNode("Shared collections");
        dom.appendChild(el1, el2);
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
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "class", "menu-link settings icon-cog");
        var el2 = dom.createTextNode("Settings");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[5] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["id", "top-logo"], 0, null, ["loc", [null, [1, 0], [1, 61]]]], ["inline", "link-to", ["Search", "search"], ["class", "menu-link icon-search"], ["loc", [null, [2, 0], [2, 59]]]], ["inline", "link-to", ["Recent", "recent"], ["class", "menu-link icon-history"], ["loc", [null, [3, 0], [3, 60]]]], ["inline", "link-to", ["Places", "index"], ["class", "menu-link icon-pin"], ["loc", [null, [5, 0], [5, 55]]]], ["inline", "link-to", ["collections", "collections"], ["class", "menu-link icon-collections"], ["loc", [null, [6, 0], [6, 74]]]], ["inline", "link-to", ["Trash", "trash"], ["class", "menu-link icon-trash"], ["loc", [null, [9, 0], [9, 56]]]]],
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
            dom.setAttribute(el1, "class", "has-tooltip icon-trash");
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
          dom.setAttribute(el1, "class", "selector-holder");
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
                "line": 6,
                "column": 1
              },
              "end": {
                "line": 8,
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
            dom.setAttribute(el1, "class", "scroll-link");
            var el2 = dom.createTextNode("Top");
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
          statements: [["element", "action", ["scrollToSection", "top"], [], ["loc", [null, [7, 27], [7, 61]]]]],
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
                "line": 9,
                "column": 1
              },
              "end": {
                "line": 11,
                "column": 1
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
            var el1 = dom.createTextNode("		");
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
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createMorphAt(element0, 0, 0);
            return morphs;
          },
          statements: [["element", "action", ["scrollToSection", ["get", "majorSection.scrollSlug", ["loc", [null, [10, 54], [10, 77]]]]], [], ["loc", [null, [10, 27], [10, 79]]]], ["content", "majorSection.title", ["loc", [null, [10, 80], [10, 102]]]]],
          locals: ["majorSection"],
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
              "line": 13,
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
          dom.setAttribute(el1, "class", "scroll-menu");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [0]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element2, 1, 1);
          morphs[1] = dom.createMorphAt(element2, 2, 2);
          return morphs;
        },
        statements: [["block", "if", [["get", "majorSections", ["loc", [null, [6, 7], [6, 20]]]]], [], 0, null, ["loc", [null, [6, 1], [8, 8]]]], ["block", "each", [["get", "majorSections", ["loc", [null, [9, 9], [9, 22]]]]], [], 1, null, ["loc", [null, [9, 1], [11, 10]]]]],
        locals: [],
        templates: [child0, child1]
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
              "line": 19,
              "column": 4
            },
            "end": {
              "line": 24,
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
          dom.setAttribute(el1, "class", "menu-section");
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "menu-section-title");
          var el3 = dom.createTextNode("Sort by:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
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
        statements: [["inline", "select-one", [], ["options", ["subexpr", "@mut", [["get", "majorSortOptions", ["loc", [null, [22, 27], [22, 43]]]]], [], []], "onChange", ["subexpr", "action", ["updateSortOptions"], [], ["loc", [null, [22, 53], [22, 81]]]]], ["loc", [null, [22, 6], [22, 83]]]]],
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
              "line": 37,
              "column": 1
            },
            "end": {
              "line": 39,
              "column": 1
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
        statements: [["inline", "major-section", [], ["model", ["subexpr", "@mut", [["get", "majorSection", ["loc", [null, [38, 24], [38, 36]]]]], [], []]], ["loc", [null, [38, 2], [38, 38]]]]],
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
              "line": 39,
              "column": 1
            },
            "end": {
              "line": 41,
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
          var el1 = dom.createTextNode("		Nothing left here to see.. maybe remove some filters?\n");
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
            "line": 48,
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
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "flex-container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "scrollable-rhs-content");
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "options-menu section-options-menu");
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "toggle-btn");
        var el5 = dom.createTextNode("Options");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "menu-body two-column");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "menu-column");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "menu-section");
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "menu-section-title");
        var el8 = dom.createTextNode("Sort subsections by:");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "menu-column");
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "menu-section");
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
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
        var element3 = dom.childAt(fragment, [1]);
        var element4 = dom.childAt(element3, [2]);
        var element5 = dom.childAt(element4, [1, 3]);
        var element6 = dom.childAt(element5, [1]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(element3, 1, 1);
        morphs[1] = dom.createMorphAt(element6, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element6, [3]), 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element5, [3, 1]), 1, 1);
        morphs[4] = dom.createMorphAt(element4, 3, 3);
        morphs[5] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        return morphs;
      },
      statements: [["block", "if", [["get", "filteredItems.length", ["loc", [null, [4, 6], [4, 26]]]]], [], 0, null, ["loc", [null, [4, 0], [13, 7]]]], ["block", "unless", [["get", "majorSectionType", ["loc", [null, [19, 14], [19, 30]]]]], [], 1, null, ["loc", [null, [19, 4], [24, 15]]]], ["inline", "select-one", [], ["options", ["subexpr", "@mut", [["get", "subSortOptions", ["loc", [null, [27, 26], [27, 40]]]]], [], []], "onChange", ["subexpr", "action", ["updateSortOptions"], [], ["loc", [null, [27, 50], [27, 78]]]]], ["loc", [null, [27, 5], [27, 80]]]], ["inline", "select-many", [], ["options", ["subexpr", "@mut", [["get", "filterOptions", ["loc", [null, [32, 27], [32, 40]]]]], [], []], "onChange", ["subexpr", "action", ["updateFilter"], [], ["loc", [null, [32, 50], [32, 73]]]]], ["loc", [null, [32, 5], [32, 75]]]], ["block", "each", [["get", "majorSections", ["loc", [null, [37, 9], [37, 22]]]]], [], 2, 3, ["loc", [null, [37, 1], [41, 10]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "filteredItems", ["loc", [null, [46, 27], [46, 40]]]]], [], []]], ["loc", [null, [46, 0], [46, 42]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
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
            "line": 14,
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
        var el2 = dom.createTextNode("px;\n	}\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        morphs[3] = dom.createMorphAt(element0, 7, 7);
        return morphs;
      },
      statements: [["content", "mapWidth", ["loc", [null, [3, 22], [3, 34]]]], ["content", "mapWidth", ["loc", [null, [7, 9], [7, 21]]]], ["content", "mapWidth", ["loc", [null, [8, 26], [8, 38]]]], ["content", "barRightWidth", ["loc", [null, [12, 9], [12, 26]]]]],
      locals: [],
      templates: []
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
          dom.setAttribute(el2, "class", "selector-holder");
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
              "line": 12,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 75
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
        var element1 = dom.childAt(fragment, [2, 1]);
        var element2 = dom.childAt(element1, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
        morphs[2] = dom.createMorphAt(element2, 0, 0);
        morphs[3] = dom.createMorphAt(element2, 2, 2);
        morphs[4] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [1, 37], [1, 53]]]]], ["content", "model.name", ["loc", [null, [4, 20], [4, 34]]]], ["content", "model.itemType", ["loc", [null, [5, 20], [5, 38]]]], ["block", "if", [["get", "model.parentName", ["loc", [null, [6, 9], [6, 25]]]]], [], 0, null, ["loc", [null, [6, 3], [8, 10]]]], ["block", "link-to", ["item", ["get", "model.slug", ["loc", [null, [12, 18], [12, 28]]]]], ["class", "card-link", "invokeAction", "persistItem"], 1, null, ["loc", [null, [12, 0], [12, 87]]]]],
      locals: [],
      templates: [child0, child1]
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
      statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [1, 59], [1, 73]]]]], ["loc", [null, [1, 29], [1, 74]]]], "addedClass", ["subexpr", "@mut", [["get", "actionBarVersion", ["loc", [null, [1, 86], [1, 102]]]]], [], []]], ["loc", [null, [1, 0], [1, 104]]]], ["content", "action-bar-placeholder", ["loc", [null, [2, 0], [2, 26]]]], ["inline", "major-sections-holder", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [4, 30], [4, 35]]]]], [], []], "prefilterAttribute", ["subexpr", "@mut", [["get", "prefilterAttribute", ["loc", [null, [4, 55], [4, 73]]]]], [], []]], ["loc", [null, [4, 0], [4, 75]]]]],
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
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.0",
            "loc": {
              "source": null,
              "start": {
                "line": 24,
                "column": 5
              },
              "end": {
                "line": 29,
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
          statements: [["attribute", "class", ["concat", ["detail-title ", ["get", "detail.name", ["loc", [null, [26, 33], [26, 44]]]]]]], ["content", "detail.name", ["loc", [null, [26, 48], [26, 63]]]], ["content", "detail.value", ["loc", [null, [27, 32], [27, 48]]]]],
          locals: ["detail"],
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
                    "line": 38,
                    "column": 9
                  },
                  "end": {
                    "line": 40,
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
              statements: [["content", "period.period", ["loc", [null, [39, 35], [39, 52]]]]],
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
                  "line": 35,
                  "column": 8
                },
                "end": {
                  "line": 42,
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
            statements: [["content", "day.title", ["loc", [null, [37, 38], [37, 51]]]], ["block", "each", [["get", "day.periods", ["loc", [null, [38, 17], [38, 28]]]]], [], 0, null, ["loc", [null, [38, 9], [40, 18]]]]],
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
                "line": 30,
                "column": 5
              },
              "end": {
                "line": 46,
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
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3, 1]), 1, 1);
            return morphs;
          },
          statements: [["block", "each", [["get", "model.textOperatingHours", ["loc", [null, [35, 16], [35, 40]]]]], [], 0, null, ["loc", [null, [35, 8], [42, 17]]]]],
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
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 49,
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
          var el1 = dom.createTextNode("\n			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "details-holder");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("table");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("				");
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
          var element3 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element3, 1, 1);
          morphs[1] = dom.createMorphAt(element3, 2, 2);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.details", ["loc", [null, [24, 13], [24, 26]]]]], [], 0, null, ["loc", [null, [24, 5], [29, 14]]]], ["block", "if", [["get", "model.textOperatingHours", ["loc", [null, [30, 11], [30, 35]]]]], [], 1, null, ["loc", [null, [30, 5], [46, 12]]]]],
        locals: [],
        templates: [child0, child1]
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
                "line": 66,
                "column": 3
              },
              "end": {
                "line": 68,
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
          statements: [["inline", "link-card", [], ["model", ["subexpr", "@mut", [["get", "link", ["loc", [null, [67, 22], [67, 26]]]]], [], []]], ["loc", [null, [67, 4], [67, 28]]]]],
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
              "line": 63,
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
        statements: [["block", "each", [["get", "model.visitedLinks", ["loc", [null, [66, 11], [66, 29]]]]], [], 0, null, ["loc", [null, [66, 3], [68, 12]]]]],
        locals: [],
        templates: [child0]
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
              "line": 75,
              "column": 0
            },
            "end": {
              "line": 77,
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
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "major-sections-holder", [], ["model", ["subexpr", "@mut", [["get", "descendants", ["loc", [null, [76, 31], [76, 42]]]]], [], []], "majorSectionType", "item", "prefilterAttribute", "trackingStatus"], ["loc", [null, [76, 1], [76, 104]]]]],
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
            "line": 81,
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
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "lhs");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "top-section-title");
        var el4 = dom.createTextNode("Description:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [4]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element5, [1]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[2] = dom.createAttrMorph(element6, 'style');
        morphs[3] = dom.createMorphAt(element5, 3, 3);
        morphs[4] = dom.createMorphAt(element5, 5, 5);
        morphs[5] = dom.createMorphAt(dom.childAt(element4, [3]), 3, 3);
        morphs[6] = dom.createMorphAt(dom.childAt(fragment, [6, 3]), 1, 1);
        morphs[7] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[8] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "descendants", ["loc", [null, [1, 6], [1, 17]]]]], [], 0, 1, ["loc", [null, [1, 0], [7, 7]]]], ["block", "each", [["get", "model.ancestorsArray", ["loc", [null, [11, 9], [11, 29]]]]], [], 2, null, ["loc", [null, [11, 1], [13, 10]]]], ["attribute", "style", ["get", "model.photoStyle", ["loc", [null, [18, 50], [18, 66]]]]], ["inline", "map-placeholder", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [19, 26], [19, 31]]]]], [], []]], ["loc", [null, [19, 2], [19, 33]]]], ["block", "unless", [["get", "descendants", ["loc", [null, [20, 12], [20, 23]]]]], [], 3, null, ["loc", [null, [20, 2], [49, 13]]]], ["inline", "autosave-editable", [], ["class", "long-desc", "canEditContent", true, "isEditable", true, "saveOnExit", ["subexpr", "@mut", [["get", "model", ["loc", [null, [53, 87], [53, 92]]]]], [], []], "value", ["subexpr", "@mut", [["get", "model.longDescEditable", ["loc", [null, [53, 99], [53, 121]]]]], [], []]], ["loc", [null, [53, 2], [53, 123]]]], ["block", "if", [["get", "model.visitedLinks", ["loc", [null, [63, 8], [63, 26]]]]], [], 4, null, ["loc", [null, [63, 2], [69, 9]]]], ["block", "if", [["get", "descendants", ["loc", [null, [75, 6], [75, 17]]]]], [], 5, null, ["loc", [null, [75, 0], [77, 7]]]], ["inline", "center-marker", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [79, 22], [79, 27]]]]], [], []]], ["loc", [null, [79, 0], [79, 29]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
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
      statements: [["inline", "action-bar", [], ["openModalAction", ["subexpr", "action", ["openTopModal"], ["target", ["get", "displayService", ["loc", [null, [1, 59], [1, 73]]]]], ["loc", [null, [1, 29], [1, 74]]]], "addedClass", ["subexpr", "@mut", [["get", "actionBarVersion", ["loc", [null, [1, 86], [1, 102]]]]], [], []]], ["loc", [null, [1, 0], [1, 104]]]], ["content", "action-bar-placeholder", ["loc", [null, [2, 0], [2, 26]]]], ["block", "each", [["get", "model", ["loc", [null, [10, 8], [10, 13]]]]], [], 0, null, ["loc", [null, [10, 0], [12, 9]]]], ["inline", "collection-markers", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [13, 27], [13, 32]]]]], [], []]], ["loc", [null, [13, 0], [13, 34]]]]],
      locals: [],
      templates: [child0]
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
  require("tripmind/app")["default"].create({"itai":3,"name":"tripmind","version":"0.0.0+55d444c6"});
}
/* jshint ignore:end */
//# sourceMappingURL=tripmind.map