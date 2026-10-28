const u = (id, w = 1600) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const tours = [
    {
        name: "The Sea Explorer",
        duration: 7,
        maxGroupSize: 20,
        difficulty: "medium",
        ratingsAverage: 4.1,
        ratingsQuantity: 8,
        price: 497,
        summary:
            "US East Coast · By foot and by boat",
        description:
            "Exploring the jaw-dropping US east coast by foot and by boat. Seven days of quiet coves, hidden trails and long dinners by the shoreline.",
        imageCover: u("photo-1507525428034-b723cf961d3e"),
        images: [
            u("photo-1507525428034-b723cf961d3e"),
            u("photo-1519046904884-53103b34b206"),
            u("photo-1502680390469-be75c86b636f"),
        ],
        startDates: [
            "2026-06-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-80.1918, 25.7617],
            address: "Miami, FL, USA",
            description: "Miami, USA",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-80.1285, 25.7818],
                description: "Miami Beach",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-80.0808, 25.1167],
                description: "Key Largo",
                day: 3,
            },
            {
                type: "Point",
                coordinates: [-80.7821, 25.2866],
                description: "Everglades",
                day: 5,
            },
            {
                type: "Point",
                coordinates: [-81.0998, 32.0809],
                description: "Savannah",
                day: 7,
            },
        ],
        guides: [
            {
                name: "Steve T. Scaife",
                email: "steve@example.com",
                photo: u("photo-1500648767791-00dcc994a43e", 200),
                role: "lead-guide",
            },
            {
                name: "Kate Morrison",
                email: "kate@example.com",
                photo: u("photo-1544005313-94ddf0286df2", 200),
                role: "guide",
            },
            {
                name: "Leo J. Gillespie",
                email: "leo@example.com",
                photo: u("photo-1519085360753-af0119f7cbe7", 200),
                role: "guide",
            },
        ],
        slug: "the-sea-explorer",
    },

    {
        name: "The Forest Hiker",
        duration: 5,
        maxGroupSize: 30,
        difficulty: "easy",
        ratingsAverage: 4.8,
        ratingsQuantity: 11,
        price: 397,
        summary:
            "Banff National Park · Canadian Rockies",
        description:
            "A breathtaking hike through the Canadian Banff National Park. Five days weaving between glacial lakes and old-growth forest.",
        imageCover: u("photo-1441974231531-c6227db76b6e"),
        images: [
            u("photo-1441974231531-c6227db76b6e"),
            u("photo-1464822759023-fed622ff2c3b"),
            u("photo-1476514525535-07fb3b4ae5f1"),
        ],
        startDates: [
            "2026-04-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-115.5708, 51.1784],
            address: "Banff, AB, Canada",
            description: "Banff, CAN",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-115.5708, 51.1784],
                description: "Banff",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-116.671, 51.3217],
                description: "Moraine Lake",
                day: 3,
            },
            {
                type: "Point",
                coordinates: [-113.787, 48.7596],
                description: "Glacier National Park",
                day: 5,
            },
        ],
        guides: [
            {
                name: "Steve T. Scaife",
                email: "steve@example.com",
                photo: u("photo-1500648767791-00dcc994a43e", 200),
                role: "lead-guide",
            },
            {
                name: "Kate Morrison",
                email: "kate@example.com",
                photo: u("photo-1544005313-94ddf0286df2", 200),
                role: "guide",
            },
            {
                name: "Leo J. Gillespie",
                email: "leo@example.com",
                photo: u("photo-1519085360753-af0119f7cbe7", 200),
                role: "guide",
            },
        ],
        slug: "the-forest-hiker",
    },

    {
        name: "The Park Camper",
        duration: 10,
        maxGroupSize: 18,
        difficulty: "medium",
        ratingsAverage: 4.6,
        ratingsQuantity: 8,
        price: 1497,
        summary:
            "America's most spectacular National Parks",
        description:
            "Breathing in Nature in America's most spectacular National Parks. Ten days of granite cathedrals and starry desert skies.",
        imageCover: u("photo-1472396961693-142e6e269027"),
        images: [
            u("photo-1472396961693-142e6e269027"),
            u("photo-1508739773434-c26b3d09e071"),
            u("photo-1505142468610-359e7d316be0"),
        ],
        startDates: [
            "2026-08-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-115.1727, 36.1109],
            address: "Las Vegas, NV, USA",
            description: "Las Vegas, USA",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-112.9874, 37.1981],
                description: "Zion Canyon National Park",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-112.1677, 37.6283],
                description: "Bryce Canyon",
                day: 4,
            },
            {
                type: "Point",
                coordinates: [-112.1401, 36.0544],
                description: "Grand Canyon",
                day: 7,
            },
            {
                type: "Point",
                coordinates: [-112.1401, 36.0544],
                description: "Grand Canyon South Rim",
                day: 10,
            },
        ],
        guides: [
            {
                name: "Steve T. Scaife",
                email: "steve@example.com",
                photo: u("photo-1500648767791-00dcc994a43e", 200),
                role: "lead-guide",
            },
            {
                name: "Kate Morrison",
                email: "kate@example.com",
                photo: u("photo-1544005313-94ddf0286df2", 200),
                role: "guide",
            },
        ],
        slug: "the-park-camper",
    },

    {
        name: "The City Wanderer",
        duration: 9,
        maxGroupSize: 25,
        difficulty: "easy",
        ratingsAverage: 4.4,
        ratingsQuantity: 7,
        price: 1197,
        summary:
            "NYC · America's most beautiful cities",
        description:
            "Living the life of Wanderlust in the US' most beautiful cities. Nine days of neighborhoods, night markets and neon.",
        imageCover: u("photo-1496442226666-8d4d0e62e6e9"),
        images: [
            u("photo-1496442226666-8d4d0e62e6e9"),
            u("photo-1500916434205-0c77489c6cf7"),
            u("photo-1477959858617-67f85cf4f1df"),
        ],
        startDates: [
            "2026-03-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
            address: "New York, NY, USA",
            description: "New York, USA",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-73.9857, 40.7484],
                description: "Manhattan",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-87.6298, 41.8781],
                description: "Chicago",
                day: 5,
            },
            {
                type: "Point",
                coordinates: [-122.4194, 37.7749],
                description: "San Francisco",
                day: 9,
            },
        ],
        guides: [
            {
                name: "Steve T. Scaife",
                email: "steve@example.com",
                photo: u("photo-1500648767791-00dcc994a43e", 200),
                role: "lead-guide",
            },
            {
                name: "Leo J. Gillespie",
                email: "leo@example.com",
                photo: u("photo-1519085360753-af0119f7cbe7", 200),
                role: "guide",
            },
        ],
        slug: "the-city-wanderer",
    },

    {
        name: "The Snow Adventurer",
        duration: 4,
        maxGroupSize: 12,
        difficulty: "difficult",
        ratingsAverage: 4.4,
        ratingsQuantity: 8,
        price: 997,
        summary:
            "Aspen · Snowboarding and skiing",
        description:
            "Exciting adventure in the snow with snowboarding and skiing. Four days of powder, fires and mountain-side hot tubs.",
        imageCover: u("photo-1551524559-8af4e6624178"),
        images: [
            u("photo-1551524559-8af4e6624178"),
            u("photo-1517299321609-52687d1bc55a"),
            u("photo-1548199973-03cce0bbc87b"),
        ],
        startDates: [
            "2026-01-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-106.8175, 39.1911],
            address: "Aspen, CO, USA",
            description: "Aspen, USA",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-106.855, 39.1865],
                description: "Highland Bowl",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-106.8175, 39.1911],
                description: "Aspen",
                day: 4,
            },
        ],
        guides: [
            {
                name: "Steve T. Scaife",
                email: "steve@example.com",
                photo: u("photo-1500648767791-00dcc994a43e", 200),
                role: "lead-guide",
            },
        ],
        slug: "the-snow-adventurer",
    },

    {
        name: "The Sports Lover",
        duration: 14,
        maxGroupSize: 10,
        difficulty: "difficult",
        ratingsAverage: 3.3,
        ratingsQuantity: 9,
        price: 2997,
        summary:
            "California · All-in-one adventure",
        description:
            "Surfing, skating, parajumping, rock climbing and more, all in one tour. Fourteen days at full throttle.",
        imageCover: u("photo-1502680390469-be75c86b636f"),
        images: [
            u("photo-1502680390469-be75c86b636f"),
            u("photo-1500375592092-40eb2168fd21"),
            u("photo-1519055548599-6d4d129508c4"),
        ],
        startDates: [
            "2026-07-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-118.2437, 34.0522],
            address: "Los Angeles, CA, USA",
            description: "Los Angeles, USA",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-118.4695, 33.985],
                description: "Venice Beach",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-118.2437, 34.0522],
                description: "Los Angeles",
                day: 5,
            },
            {
                type: "Point",
                coordinates: [-119.5383, 37.8651],
                description: "Yosemite National Park",
                day: 14,
            },
        ],
        guides: [
            {
                name: "Steve T. Scaife",
                email: "steve@example.com",
                photo: u("photo-1500648767791-00dcc994a43e", 200),
                role: "lead-guide",
            },
            {
                name: "Kate Morrison",
                email: "kate@example.com",
                photo: u("photo-1544005313-94ddf0286df2", 200),
                role: "guide",
            },
        ],
        slug: "the-sports-lover",
    },

    {
        name: "The Northern Lights",
        duration: 3,
        maxGroupSize: 14,
        difficulty: "easy",
        ratingsAverage: 4.9,
        ratingsQuantity: 22,
        price: 897,
        summary:
            "Iceland · Chase the aurora",
        description:
            "Three days chasing the aurora across glaciers and geothermal fields.",
        imageCover: u("photo-1483347756197-71ef80e95f73"),
        images: [
            u("photo-1483347756197-71ef80e95f73"),
            u("photo-1520626338767-9a1a2c1b5a1e"),
        ],
        startDates: [
            "2026-11-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-21.9426, 64.1466],
            address: "Reykjavik, Iceland",
            description: "Reykjavík, ISL",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-20.533, 64.3271],
                description: "Golden Circle",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-16.1792, 64.0485],
                description: "Jökulsárlón Glacier Lagoon",
                day: 3,
            },
        ],
        guides: [
            {
                name: "Leo J. Gillespie",
                email: "leo@example.com",
                photo: u("photo-1519085360753-af0119f7cbe7", 200),
                role: "lead-guide",
            },
        ],
        slug: "the-northern-lights",
    },

    {
        name: "The Star Gazer",
        duration: 9,
        maxGroupSize: 16,
        difficulty: "medium",
        ratingsAverage: 4.7,
        ratingsQuantity: 14,
        price: 1697,
        summary:
            "Atacama Desert · Nine nights under the sky",
        description:
            "Nine days in the driest desert on earth, home to the clearest skies you'll ever see.",
        imageCover: u("photo-1419242902214-272b3f66ee7a"),
        images: [
            u("photo-1419242902214-272b3f66ee7a"),
            u("photo-1444080748397-f442aa95c3e5"),
        ],
        startDates: [
            "2026-05-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [-68.2, -22.91],
            address: "San Pedro de Atacama, Chile",
            description: "San Pedro de Atacama, CHL",
        },
        locations: [
            {
                type: "Point",
                coordinates: [-68.73, -22.9],
                description: "Moon Valley",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [-67.755, -23.005],
                description: "ALMA Observatory",
                day: 9,
            },
        ],
        guides: [
            {
                name: "Kate Morrison",
                email: "kate@example.com",
                photo: u("photo-1544005313-94ddf0286df2", 200),
                role: "lead-guide",
            },
        ],
        slug: "the-star-gazer",
    },

    {
        name: "The Wine Taster",
        duration: 5,
        maxGroupSize: 12,
        difficulty: "easy",
        ratingsAverage: 4.8,
        ratingsQuantity: 18,
        price: 1297,
        summary:
            "Tuscany · Five days of vineyards",
        description:
            "Five slow days through Tuscan cellars, hilltop villages and long lunches.",
        imageCover: u("photo-1506905925346-21bda4d32df4"),
        images: [
            u("photo-1506905925346-21bda4d32df4"),
            u("photo-1470071459604-3b5ec3a7fe05"),
        ],
        startDates: [
            "2026-09-01T09:00:00.000Z",
        ],
        secretTour: false,
        startLocation: {
            type: "Point",
            coordinates: [11.2558, 43.7696],
            address: "Florence, Italy",
            description: "Florence, ITA",
        },
        locations: [
            {
                type: "Point",
                coordinates: [11.3156, 43.5853],
                description: "Chianti Classico",
                day: 1,
            },
            {
                type: "Point",
                coordinates: [11.4897, 43.0577],
                description: "Montalcino",
                day: 5,
            },
        ],
        guides: [
            {
                name: "Kate Morrison",
                email: "kate@example.com",
                photo: u("photo-1544005313-94ddf0286df2", 200),
                role: "lead-guide",
            },
        ],
        slug: "the-wine-taster",
    },
];

export const currentUser = {
    name: "Aymen Abderrahmane Laouar",
    email: "aymen@natours.io",
    avatar: u("photo-1508214751196-bcfd4ca60f91", 200),
};

export const bookings = [
    {
        id: "b1",
        tourSlug: "the-forest-hiker",
        tourName: "The Forest Hiker",
        date: "April 2026",
        price: 397,
        status: "Confirmed",
        participants: 2
    },
    {
        id: "b2",
        tourSlug: "the-sea-explorer",
        tourName: "The Sea Explorer",
        date: "June 2026",
        price: 497,
        status: "Confirmed",
        participants: 1
    },
    {
        id: "b3",
        tourSlug: "the-wine-taster",
        tourName: "The Wine Taster",
        date: "September 2025",
        price: 1297,
        status: "Completed",
        participants: 2
    },
];

export const reviews = [
    {
        id: "r1",
        tourName: "The Forest Hiker",
        rating: 5,
        date: "May 2025",
        body: "Absolutely magical. Every campsite felt hand-picked and the guides made every day effortless."
    },
    {
        id: "r2",
        tourName: "The Wine Taster",
        rating: 5,
        date: "October 2024",
        body: "Five days that felt like a small novel. I'm still thinking about the lunch on the third day."
    },
    {
        id: "r3",
        tourName: "The Sea Explorer",
        rating: 4,
        date: "July 2024",
        body: "Beautifully paced. The boat days were the highlight — sunsets I won't forget."
    },
];

export const billing = [
    {id: "i1", tour: "The Forest Hiker", date: "Feb 12, 2026", amount: 397, method: "Visa •• 4242", status: "Paid"},
    {id: "i2", tour: "The Sea Explorer", date: "Jan 30, 2026", amount: 497, method: "Visa •• 4242", status: "Paid"},
    {id: "i3", tour: "The Wine Taster", date: "Aug 03, 2025", amount: 1297, method: "Amex •• 1008", status: "Paid"},
];

export const testimonials = [
    {
        name: "Ayla Cornell",
        avatar: u("photo-1494790108377-be9c29b29330", 200),
        rating: 5,
        body: "Every detail was thought through. It felt like a private trip designed only for us."
    },
    {
        name: "Eliana Stout",
        avatar: u("photo-1438761681033-6461ffad8d80", 200),
        rating: 5,
        body: "Beautiful pacing, beautiful people. I came home lighter than I've been in years."
    },
    {
        name: "Cristian Vega",
        avatar: u("photo-1531427186611-ecfd6d936c79", 200),
        rating: 5,
        body: "The guides were exceptional. Warm, curious, and unbelievably prepared."
    },
    {
        name: "Laura S. Wilson",
        avatar: u("photo-1554151228-14d9def656e4", 200),
        rating: 5,
        body: "This is what travel should feel like — considered, quiet, and completely present."
    },
];
