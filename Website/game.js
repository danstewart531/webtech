const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Looking out of your ship canopy, you find yourself above Mercury. A harsh pitted rock placed scorchingly close to the sun. You think to yourself about how excellent of a place this would be to construct solar arrays.',
    options: [
      {
        text: 'Scan the blasted planet and deploy a probe',
        setState: { mScan: true },
        nextText: 2
      },
      {
        text: 'Leave for Venus',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Moving forward from Mercury, you reach Venus. A boiling acidic pressure cooker that is all but inhospitable to life as we know it.',
    options: [
      {
        text: 'Take an atmospheric sample and conduct a brief terrain scan.',
        setState: { mScan: true, vScan: true},
        nextText: 3
      },
      {
        text: 'Observe the planet more.',
        nextText: 3
      },
      {
        text: 'Try to land on the planets surface.',
        nextText: 6
      }
    ]
  },
  {
    id: 3,
    text: 'As you begin to observe the planet more, you see a break in the clouds. However you are unsure if your ship would be able to land in this weather.',
    options: [
        {
            text: 'Attempt a safe landing on the planets surface',
            requiredState: (currentState) => currentState.vScan,
            nextText: 4
        },
        {
            text: 'Move on without landing.',
            nextText: 5
        },
    ]
    },
    {
    id: 4,
    text: 'Landing on the surface of Venus, you look out your ships canopy, unable to venture further due to the hostile conditions.',
    options: [
        {
            text: 'Leave the surface of Venus',
            nextText: 5
        },
        {
            text: 'Attempt to leave your ship',
            nextText: 6
        }
    ]
    },
    {
    id: 5,
    text: 'Leaving the planet, you set your ship to travel towards home; Terra.',
    options: [
        {
            text: 'Approach Terra',
            nextText: 7
        },
        {
            text: 'Continue past Terra towards Mars',
            nextText: 11
        }
    ]
    },
    {
    id: 6,
    text: "The chaotic weather conditions and extreme pressure of Venus's atmosphere cause incredible damage to your ship. You become stranded on Venus, and eventually succumb to the crushing pressure and acid rains.",
    options: [
        {
            text: 'Return to start',
            nextText: -1
        }
    ]
    },
    {
    id: 7,
    text: "The small blue marble that humanity has made it's home on comes in to view. The planet shines a bright vibrant blue, with patches of green land and wispy white clouds trailing across the skies. Higher up, the dark space above is dotted with satellites and orbital stations.",
    options: [
        {
            text: 'Request permission to dock at a nearby station',
            nextText: 8
        },
        {
            text: 'Leave Terra towards Mars',
            nextText: 11
        }
    ]
    },
    {
    id: 8,
    text: 'Docking at the station, you find yourself in a large hangar with a number of other ships and satellites docked for various reasons. You walk forward to a brightly lit terminal screen where you are presented with a set of options.',
    options: [
        {
            text: 'Deposit Mercury scan data.',
            requiredState: (currentState) => currentState.mScan,
            setState: { mScan: false},
            nextText: 8,
        },
        {
            text: 'Deposit Venus scan data.',
            requiredState: (currentState) => currentState.vScan,
            setState: { vScan: false},
            nextText: 8,
        },
        {
            text: 'Deposit Mars scan data',
            requiredState: (currentState) => currentState.maScan,
            setState: { maScan: false},
            nextText: 9
        },
        {
            text: 'Return to your ship',
            nextText: 7
        },
    ]
    },
    {
    id: 9,
    text: "Upon providing all the inner planetary scan data, you are given clearance to proceed to Jupiter and beyond.",
    options: [
        {
            text: 'Confirm acceptance of flight clearance',
            setState: { jClear: true},
            nextText: 7
        }
    ]
    },
    {
    id: 10,
    text: "Completing your mission, you return to Terra. Having ventured all over the system, exploring curious and dangerous places, you feel at ease knowing your efforts have benefitted all of humanity. Well done Pilot, you may now rest.",
    options: [
        {
            text: 'End game',
            nextText: -1
        }
    ]
    },
    {
    id: 11,
    text: "You observe a small dusty rust-coloured rock in the distance. Approaching the dusty planet below and pause high above the surface reveals that you have arrived above Mars.",
    options: [
            {
                text: 'Perform a scan of the atmosphere and terrain',
                setState: {maScan: true},
                nextText: 12
            },
            {
                text: 'Attempt to land on the surface of Mars',
                nextText: 13
            },
            {
                text: 'Proceed forward to Jupiter',
                requiredState: (currentState) => currentState.jClear,
                nextText: 14
            }
        ]
    },
    {
    id: 12,
    text: "Having performed a scan of the atmosphere and geology or Mars, you realise that there is a violent dust storm choking the planet. It was obscured from sight by high altitude haze from the planet's thin atmosphere. Descending down into that would've meant certain death.",
    options: [
        {
            text: 'Return to Terra with the scan data',
            nextText: 7
        }
    ]
    },
    {
    id: 13,
    text: "Not having realised the severity of the storm enshrouding the planet, you descend into the colossal swirling mass of dust and sand. Unfortunately, your ship's atmospheric engines choke out from the dust storm which results in the ship plummeting out of the sky, slamming into the ground from high altitude and instantly killing you.",
    options: [
            {
                text: 'Restart game',
                nextText: -1
            }
        ]
    },
    {
    id: 14,
    text: "On your way to Jupiter, you encounter the great debris field known as the asteroid belt. How do you choose to proceed?",
    options: [
            {
                text: 'Focus on raw shield strength.',
                nextText: 15
            },
            {
                text: 'Focus on engine speed and thruster manoeuvrability.',
                nextText: 16
            },
            {
                text: 'Focus on a mixture of both tactics.',
                nextText: 17
            }
        ]
    },
    {
    id: 15,
    text: "Focusing your ships energy into it's shielding, you venture forth into the swarm of asteroids, debris, and miniature planetoids. Unfortunately, despite your shielding, your ship is pummelled and shattered by the repeated impacts. Wreckage is scattered everywhere, and you float lifelessly among it all.",
     options: [
            {
                text: 'Restart game',
                nextText: -1
            }
        ]
    },
    {
    id: 16,
    text: "Rather than focus on durability, you pour your ships energy into supercharging the thrusters, making it as manouverable as possible, aiming to dodge any incoming debris. Despite being able to dodge larger rocks, your ship is unable to dodge the small high speed micrometeorites. Your ship is completely perforated causing the reactor to detonate, annihilating almost all traces of the ships existence in one massive energy discharge.",
    options: [
            {
                text: 'Restart game',
                nextText: -1
            }
        ]
    },
    {
    id: 17,
    text: "Adopting a general survivability approach, you boost both the shielding and the thrusters of your ship. This allows you to shrug off smaller high velocity impacts, whilst being able to dodge the larger slower threats. After the longest 15 minutes of your life, you emerge from the debris field and continue onwards to Jupiter. ",
    options: [
            {
                text: 'Continue to Jupiter',
                nextText: 18
            }
        ]
    },
    {
    id: 18,
    text: "After some time, you arrive at Jupiter, the vast yellow-orange giant of the solar system. On the southern half of the giant, you witness the Great Red Spot raging amongst the bands of the atmosphere.",
    options: [
            {
                text: 'Observe and scan the storm from a distance',
                nextText: 19
            },
            {
                text: 'Move closer and scan the storm for anything of interest.',
                nextText: 20
            }
        ]
    },
    {
    id: 19,
    text: "Observing the Great Red Spot from a distance, you are able to capture spectrometry readings of the atmospheric composition surrounding the vortex. This information will be of great value to humanity's future energy developments.",
    options: [
            {
                text: 'Capture atmospheric data scan',
                setState: { jScan: true},
                nextText: 21
            }
        ]
    },
    {
    id: 20,
    text: "Moving closer towards the vortex, you attempt to capture a scan of the surrounding clouds. The information looks promising, but as you attempt to leave, you realise all too late that you've fallen into the giant's gravity well. You're doomed to a crushing end, assuming you're able to survive the intense radiation long enough.",
    options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
    id: 21,
    text: "After capturing promising scan data, you hasten onwards to Saturn. Staying in proximity of Jupiter would expose you to excessive amounts of radiation, which would not only fry your ships electronics, but also you.",
    options: [
        {
            text: 'Hasten towards the ringed giant',
            nextText: 22
        }
    ]
    },
    {
    id: 22,
    text: "Another colossal figure appears from the blackness of space, growing larger until it takes up the majority of your viewport. This behemoth is adorned with an immaculate, beautiful network of rings, and many moons.",
    options: [
        {
            text: 'Observe the rings',
            nextText: 23
        },
        {
            text: 'Observe the polar storms and perform a scan of them',
            requiredState: (currentState) => currentState.jScan,
            setState: {jScan: false, jsScan: true},
            nextText: 24
        }
    ]
    },
    {
    id: 23,
    text: "Observing the majestic rings, you notice the positioning of Janus, one of Saturn's smaller moons, is well situated as an outpost for mining and fuel scooping operations.",
    options: [
        {
            text: "Mark the moon with a geo-beacon as a point of interest",
            setState: {moonBeacon: true},
            nextText: 24
        },
        {
            text: "Do nothing.",
            nextText: 22
        }
    ]
    },
    {
    id: 24,
    text: "Having explored Saturns possibilties, you feel as though you should move on every outward towards its colder cousins. Faintly glimmering in the night, a pair of small pale dots twinkle in the distance. Due to the current orbits of Saturn, Uranus, and Neptune, they are equidistant from eachother. You only have enough fuel to journey to one of them before having to turn back.",
    options: [
        {
            text: "Approach Neptune",
            nextText: 28
        },
        {
            text: "Approach Uranus",
            nextText: 25
        }
    ]
    },
    {
    id: 25,
    text: "Choosing the former of the pair, you make your way towards Uranus, named after the primordial aspect of sky and heaven in Greek mythology. Arriving at the planet, you are greeted by an almost featureless pale cyan orb. The atmosphere looks thin, and potentially traversable, however the planet is known for being exceptionally cold.",
    options: [
        {
            text: "Scan the upper atmosphere and take a sample",
            setState: {uScan: true},
            nextText: 26
        },
        {
            text: "Descend into the upper atmosphere",
            nextText: 27
        }
    ]
    },
    {
    id: 26,
    text: "After capturing the necessary data and samples, you turn back and head back to Terra on a high efficiency burn to preserve fuel. How do you choose to pass the time?",
    options: [
        {
            text: "Short term cryosleep",
            requiredState: (currentState) => currentState.uScan,
            nextText: 30
        },
        {
            text: "Recreational neural simulations",
            requiredState: (currentState) => currentState.uScan,
            nextText: 31
        },
        {
            text: "Process and interpret captured data",
            requiredState: (currentState) => currentState.nScan,
            nextText: 32
        },
        {
            text: "Meditate and ponder on the universe.",
            requiredState: (currentState) => currentState.nBeacon,
            nextText: 33
        }
    ]
    },
    {
    id: 27,
    text: "Having flown deeper into Uranus' upper atmosphere than was safe, the extreme cold and methane clouds begin to build up ice on your ships vital exterior hardware. Within minutes your viewport freezes over and the engines choke out, with you succumbing to thermodynamics a few dozen hours later.",
    options: [
        {
            text: "Restart",
            nextText: -1
        }
    ]
    },
    {
    id: 28,
    text: "Choosing the latter of the pair, you make your way towards Neptune, the giant vibrant blue sapphire of our neighbourhood.",
    options: [
        {
            text: "Observe the ice giants incredible storms",
            nextText: 29
        },
        {
            text: "Perform an atmospheric composition scan",
            setState: {nScan: true},
            nextText: 26
        }
    ]
    },
    {
    id: 29,
    text: "Moving in closer towards the Great Dark Spot, one of the largest areas of turbulence on Neptune, you position yourself to take a 3D scan of the storm. This would hopefully allow scientists and engineers to be able to harness the energy contained within for possible habitation spaces.",
    options: [
        {
            text: "Deploy a beacon to monitor the storm",
            setState: {nBeacon: true},
            nextText: 26
        }
    ]
    },
    {
    id: 30,
    text: "Emerging from a shallow cryosleep, you feel refreshed, and weeks of travel time have been reduced to a blink. You find yourself docking at the nearest station upon waking up, where you are presented with the same terminal as last time.",
    options: [
        {
            text: "Enter in the data you have captured, and submit any samples for analysis.",
            nextText: 34
        }
    ]
    },
    {
    id: 31,
    text: "Having passed the time with anything your mind can think of, you 'wake up' not far from the previously visited orbital station. Docking at the station and leaving your ship, you are presented with the same terminal as last time.",
    options: [
        {
            text: "Enter in the data you have captured, and submit any samples for analysis.",
            nextText: 34
        }
    ]
    },
    {
    id: 32,
    text: "Always the productive kind, you spend your time awake as normal, but pre-processing some of the vast swathes of information you have captured. Before you know it, you are back above Terra docked and stepping off your ship. Making your way over to the exit of the hangar, you are presented with the same terminal as last time.",
    options: [
        {
            text: "Enter in the data you have captured, and submit any samples for analysis.",
            nextText: 35
        }
    ]
    },
    {
    id: 33,
    text: "Taking time to reflect on your journey, you spend time contemplating everything you have experienced, as well as everything that can be experienced. Time passes rapidly as you enter a meditative trance, and soon you find yourself docking with the station above Terra. Disembarking your ship, you are presented with the same terminal as last time.",
    options: [
        {
            text: "Enter in the data you have captured, and submit any samples for analysis, as well as entering beacon locator data.",
            nextText: 36
        }
    ]
    },
    {
    id: 34,
    text: "After completing your tasks across the Solar System, scanning planets like Saturn, Venus, Jupiter, and even reaching as far as Uranus, you decide to return home and rest.",
    options: [
        {
            text: "Congratulations on completing your mission!",
            nextText: -1
        }
    ]
    },
    {
    id: 35,
    text: "After completing your tasks across the Solar System, scanning planets like Saturn, Venus, Jupiter, and even reaching as far as Neptune, you decide to return home and rest.",
    options: [
        {
            text: "Congratulations on completing your mission!",
            nextText: -1
        }
    ]
    },
    {
    id: 36,
    text: "After completing your tasks across the Solar System, scanning planets like Saturn, Venus, Jupiter, as well as deploying many useful survey drones, you decide to return home and rest.",
    options: [
        {
            text: "Congratulations on completing your mission!",
            nextText: -1
        }
    ]
    }

]

startGame()