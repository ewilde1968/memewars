var defaultObjects = {
    memes:[
            {name:'Transhumanism',
             locales:['Near Earth Orbit','Tokyo','Singapore'],
             researchName:'Research',
             monetaryUnit:'₡',
             leaderOdds:['Human','Alpha','Angel','Sapient AI','Cyborg','Android'],
             leadersAtStart:3,
             startingCorporationOdds:['']
            },
            {name:'Metal Gods',
             locales:['Tokyo','Moscow','Johannesburg'],
             researchName:'Research',
             monetaryUnit:'₡',
             leaderOdds:['Sapient AI','Cyborg','Cyborg','Android','Android'],
             leadersAtStart:1
            },
            {name:'Corporate Fascism',
             locales:['New York','Hong Kong','Near Earth Orbit'],
             researchName:'Lobbying',
             monetaryUnit:'℔',
             leaderOdds:['Natural','Human','Alpha','Sapient AI','Cyborg','Android'],
             leadersAtStart:3
            },
            {name:'Sons of Abraham',
             locales:['Rome','Mecca','Jeruselem'],
             researchName:'Lobbying',
             monetaryUnit:'$',
             leaderOdds:['Natural','Natural','Human','Human','Alpha'],
             leadersAtStart:4
            },
            {name:'US Nationalism',
             locales:['New York','Los Angeles','Washington DC'],
             researchName:'Military',
             monetaryUnit:'$',
             leaderOdds:['Natural','Natural','Natural','Human','Human','Alpha'],
             leadersAtStart:3
            },
            {name:'Chinese Nationalism',
             locales:['Beijing','Hong Kong','Shanghai'],
             researchName:'Military',
             monetaryUnit:'¥',
             leaderOdds:['Natural','Natural','Human','Human','Alpha','Cyborg'],
             leadersAtStart:3
            },
            {name:'EU Nationalism',
             locales:['London','Rome','Berlin'],
             researchName:'Military',
             monetaryUnit:'€',
             leaderOdds:['Natural','Natural','Human','Human','Alpha','Cyborg'],
             leadersAtStart:3
            },
            {name:'Naturalism',
             locales:['Berlin','Rome','Mecca'],
             researchName:'Lobbying',
             monetaryUnit:'€',
             leaderOdds:['Natural','Natural','Human'],
             leadersAtStart:4
            },
            {name:'Universal Socialism',
             locales:['Beijing','Johannesburg','Mars'],
             researchName:'Lobbying',
             monetaryUnit:'¥',
             leaderOdds:['Natural','Human','Alpha','Angel','Sapient AI','Cyborg','Android'],
             leadersAtStart:3
            }
        ],
    locales:[
             {name:'New York'
             },
             {name:'Los Angeles'
             },
             {name:'Washington DC'
             },
             {name:'Beijing'
             },
             {name:'Hong Kong'
             },
             {name:'Shanghai'
             },
             {name:'Berlin'
             },
             {name:'Rome'
             },
             {name:'Mecca'
             },
             {name:'Jeruselem'
             },
             {name:'London'
             },
             {name:'Singapore'
             },
             {name:'Tokyo'
             },
             {name:'Moscow'
             },
             {name:'Mars'
             },
             {name:'Johannesburg'
             },
             {name:'Near Earth Orbit'
             }
        ],
    corporations:[
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        {name:
         locales:['','']
        },
        ],
    risks:['CubeSat Swarm',
           'Mumbo Mumble',
           'Happy Hunting'
          ],
    creatureTemplates:[
        {race:'Natural',
         humanity:100,
         body:'10d10',
         mind:'10d10',
         level:'1d5'
        },
        {race:'Human',
         humanity:98,
         body:'9d10+10',
         mind:'9d10+10',
         level:'1d5'
        },
        {race:'Alpha',
         humanity:90,
         body:'8d10+30',
         mind:'9d10+10',
         level:'1d5'
        },
        {race:'Angel',
         humanity:90,
         body:'6d10+30',
         mind:'10d10',
         level:'1d5',
         bonuses:['Zero-G','Low Gravity']
        },
        {race:'Nonsapient AI',
         humanity:0,
         body:0,
         mind:'7d10',
         level:'2d3',
         bonuses:['Tireless','High Radiation']
        },
        {race:'Sapient AI',
         humanity:30,
         body:0,
         mind:'10d10+20',
         level:'3d3',
         bonuses:['Tireless','High Radiation']
        },
        {race:'Cyborg',
         humanity:50,
         body:'10d10+30',
         mind:'10d10+20',
         level:'2d3+1',
         bonuses:['Zero-G','Low Gravity']
        },
        {race:'Android',
         humanity:30,
         body:'10d10+30',
         mind:'10d10+20',
         level:'3d3',
         bonuses:['Tireless','High Radiation','Zero-G','Low Gravity']
        }
    ]
};

module.exports = defaultObjects;