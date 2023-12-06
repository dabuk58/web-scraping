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
  },
  {
    url: 'https://int.bahn.de/pl',
    modal: `document.querySelector("body > div:nth-child(1)").shadowRoot.querySelector("#consent-layer > div.consent-layer__btn-container > button.btn.btn--secondary.js-accept-all-cookies")`,
    inputFrom: '[placeholder="Z"]',
    inputTo: '[placeholder="Do"]',
    inputDate: [
      'h2.quick-finder-option-area__heading',
      '.db-web-date-picker-input__field-overlay',
      'span.db-web-icon.icon-next2',
      '.swiper-slide-active .db-web-date-picker-calendar-day.db-web-date-picker-calendar-day--day-in-month-or-selectable span.db-web-date-picker-calendar-day--label'
    ],
    inputTime: [
      'main-search__timeStart',
    ],
    age: '.db-web-text-input__input-field.db-web-text-input__input-field--dark',
    submit: [
      '.db-web-button.test-db-web-button.db-web-button--type-primary.db-web-button--size-regular.quick-finder-overlay-control-buttons__button.quick-finder-overlay-control-buttons__button--commit',
      '.db-web-button.test-db-web-button.quick-finder-basic__search-btn.quick-finder-basic__search-btn--desktop.db-web-button--type-primary.db-web-button--size-large',
      `document.querySelector("#dialog-content > div.db-web-plugin-dialog__footer > button.db-web-button.test-db-web-button.db-web-plugin-dialog__footer-button.db-web-plugin-dialog__footer-button--primary.db-web-button--type-primary.db-web-button--size-regular")`,
    ]
  }
]

module.exports = config;