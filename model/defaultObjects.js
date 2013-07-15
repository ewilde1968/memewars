var defaultObjects = {
    memes:[
            {name:'Transhumanism',
             locales:['Near Earth Orbit','Tokyo','Singapore'],
             researchName:'Research',
             monetaryUnit:'₡',
             leaderOdds:['Human','Alpha','Angel','Sapient AI','Cyborg','Android'],
             leadersAtStart:3,
             startingCorporationOdds:['Beyond Robotics','Biohumanity','Publicom']
            },
            {name:'Metal Gods',
             locales:['Tokyo','Moscow','Johannesburg'],
             researchName:'Research',
             monetaryUnit:'₡',
             leaderOdds:['Sapient AI','Cyborg','Cyborg','Android','Android'],
             leadersAtStart:1,
             startingCorporationOdds:['Beyond Robotics','Huedyn Energy','Crandall Data']
            },
            {name:'Corporate Fascism',
             locales:['New York','Hong Kong','Near Earth Orbit'],
             researchName:'Lobbying',
             monetaryUnit:'℔',
             leaderOdds:['Natural','Human','Alpha','Sapient AI','Cyborg','Android'],
             leadersAtStart:3,
             startingCorporationOdds:['El Grillo Entertainment','Huedyn Energy','Crandall Data']
            },
            {name:'Sons of Abraham',
             locales:['Rome','Mecca','Jeruselem'],
             researchName:'Lobbying',
             monetaryUnit:'$',
             leaderOdds:['Natural','Natural','Human','Human','Alpha'],
             leadersAtStart:4,
             startingCorporationOdds:['El Grillo Entertainment','Huedyn Energy','Grumman Group']
            },
            {name:'US Nationalism',
             locales:['New York','Los Angeles','Washington DC'],
             researchName:'Military',
             monetaryUnit:'$',
             leaderOdds:['Natural','Natural','Natural','Human','Human','Alpha'],
             leadersAtStart:3,
             startingCorporationOdds:['El Grillo Entertainment','Huedyn Energy','Grumman Group','Crandall Data']
            },
            {name:'Chinese Nationalism',
             locales:['Beijing','Hong Kong','Shanghai'],
             researchName:'Military',
             monetaryUnit:'¥',
             leaderOdds:['Natural','Natural','Human','Human','Alpha','Cyborg'],
             leadersAtStart:3,
             startingCorporationOdds:['Erganics','Huedyn Energy','Beyond Robotics']
            },
            {name:'EU Nationalism',
             locales:['London','Rome','Berlin'],
             researchName:'Military',
             monetaryUnit:'€',
             leaderOdds:['Natural','Natural','Human','Human','Alpha','Cyborg'],
             leadersAtStart:3,
             startingCorporationOdds:['Publicom','Huedyn Energy','Virgin Aerospace']
            },
            {name:'Naturalism',
             locales:['Berlin','Rome','Mecca'],
             researchName:'Lobbying',
             monetaryUnit:'€',
             leaderOdds:['Natural','Natural','Human'],
             leadersAtStart:4,
             startingCorporationOdds:['Complex Ecosystems Consortium','Huedyn Energy','Crandall Data']
            },
            {name:'Universal Socialism',
             locales:['Beijing','Johannesburg','Mars'],
             researchName:'Lobbying',
             monetaryUnit:'¥',
             leaderOdds:['Natural','Human','Alpha','Angel','Sapient AI','Cyborg','Android'],
             leadersAtStart:3,
             startingCorporationOdds:['Publicom','Huedyn Energy','Crandall Data']
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
        {name:'Beyond Robotics',
         locales:['','']
        },
        {name:'Biohumanity',
         locales:['','']
        },
        {name:'Complex Ecosystems Consortium',
         locales:['','']
        },
        {name:'El Grillo Entertainment',
         locales:['','']
        },
        {name:'Huedyn Energy',
         locales:['','']
        },
        {name:'Erganics',        // intelligent clothes grown to omnipresence
         locales:['','']
        },
        {name:'Publicom',       // distributed employment grown to massive labor force   
         locales:['','']
        },
        {name:'Grumman Group',  // american arms dealer
         locales:['','']
        },
        {name:'Tsinitok',       // russian arms dealer
         locales:['','']
        },
        {name:'Crandall Data',  // data warehousing giant
         locales:['','']
        },
        {name:'Virgin Aerospace',
         locales:['','']
        }
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