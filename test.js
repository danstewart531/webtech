const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(3)
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
        id:1,
        text: 'The ship slowly drifts above a small blasted rocky orb, you know it as Mercury, the closest planet to Sol.',
        options: [
            {
                text: 'View Mercury',
                nextText: 11
            },
            {
                text: 'Approach Sol',
                nextText: 12
            },
            {
                text: 'Perform a planetary scan',
                nextText: 13
            },
            {
                text: 'Deploy a survey probe',
                nextText: 14
            }
        ],
        
        id:2,
        text: 'Your vessel comes to a stop above Venus, a broiling hothouse rich in greenhouse gasses, and one of the brightest objects in the night sky.',
        options: [
            {
                text: 'View Venus',
                nextText: 21
            },
            {
                text: 'Attempt to land',
                nextText: 22
            },
            {
                text: 'Perform a planetary scan',
                nextText: 23
            },
            {
                text: 'Deploy a survey drone',
                nextText: 24
            }
        ],
        
        id:3,
        text: 'Your ship slowly drifts within the orbit of Terra, the cradle of humanity',
        options: [
            {
                text: 'Venture to Luna',
                nextText: 31
            },
            {
                text: 'Inspect Luna',
                nextText: 32
            },
            {
                text: 'Inspect Terra',
                nextText: 33
            },
            {
                text: 'Complete expedition',
                nextText: 34
            }
        ],
        
        id:4,
        text: 'Arriving above a small orange orb shrouded with dust, you find yourself gazing at Mars.',
        options: [
            {
                text: 'View the planet',
                nextText: 41
            },
            {
                text: 'Inspect its moons',
                nextText: 42
            },
            {
                text: 'Perform a planetary scan',
                nextText: 43
            },
            {
                text: 'Deploy a survey drone',
                nextText: 44
            }
        ],
        
        id:5,
        text: "Emerging out of the asteroid belt, a colossal striped orange sphere takes up your entire viewport. You've arrived at Jupiter, the king of the planets.",
        options: [
            {
                text: 'View the gas giant',
                nextText: 51
            },
            {
                text: 'Perform a scan of the atmosphere',
                nextText: 52
            },
            {
                text: 'Inspect the anomaly',
                nextText: 53
            },
            {
                text: 'Deploy a survey drone',
                nextText: 54
            }
        ],
        id:6,
        text: 'Venturing outward, you encounter the second great giant of Sol system, Saturn. A gas giant gifted with beautiful rings and many moons.',
        options: [
            {
                text: 'View the gas giant',
                nextText: 61
            },
            {
                text: 'Perform a scan of the atmosphere',
                nextText: 62
            },
            {
                text: 'Inspect the anomaly',
                nextText: 63
            },
            {
                text: 'Deploy a survey drone',
                nextText: 64
            }
        ],
        id:7,
        text: 'Travelling far beyond the realm of the gas giants, you arrive upon a far paler, colder cousin of theirs: Uranus. The pale blue ball of ice.',
        options: [
            {
                text: 'Take a closer look at the ice giant',
                nextText: 71
            },
            {
                text: 'Perform a scan of the atmosphere',
                nextText: 72
            },
            {
                text: 'Anomaly detected',
                nextText: 73
            },
            {
                text: 'Deploy a survey drone',
                nextText: 74
            }
        ],
        id:8,
        text: 'Approaching the final target, the grand sapphire of the system, Neptune.',
        options: [
            {
                text: 'Take a closer look at the icy gas giant',
                nextText: 81
            },
            {
                text: 'Perform an upper atmospheric scan',
                nextText: 82
            },
            {
                text: 'Deploy a survey drone',
                nextText: 83
            },
            {
                text: 'Go further outwards',
                nextText: 84
            }
        ]
    }
]

startGame()


<script type="text/javascript"> 
ChangeIt();
</script> 

<script type="text/javascript"> 
var totalCount = 5;
function ChangeIt() 
{
var num = Math.ceil( Math.random() * totalCount );
document.body.background = 'assets/images/'+num+'.jpg';
document.body.style.backgroundSize = "fu";
}
</script>