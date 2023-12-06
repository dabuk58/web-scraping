const config = [
  {
    url: 'https://rozklad-pkp.pl/',
    modal: '.css-47sehv',
    inputFrom: '#from-station',
    inputTo: '#to-station',
    inputDate: [
      'input[name="date"]',
      'input[name="dateStart"]',
      'input[name="dateEnd"]',
      'input[name="REQ0JourneyDate"]',
    ],
    inputTime: [
      'input[name="time"]',
      'input[name="REQ0JourneyTime"]'
    ],
    submit: [
      '#singlebutton'
    ]
  },
  {
    url: 'https://portalpasazera.pl/',
    modal: null,
    inputFrom: '#departureFrom',
    inputTo: '#arrivalTo',
    inputDate: [
      'main-search__dateStart',
    ],
    inputTime: [
      'main-search__timeStart',
    ],
    submit: [
      '.main-search__connection-directCheck',
      '.btn-start-search',
    ]
  }
]

module.exports = config;