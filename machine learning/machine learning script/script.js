// const inputs = [
//        //portalpasazera
//        '<input id="tw-odjazd" type="radio" class="mate-input" placeholder="">',
//        '<input id="tw-przyjazd" type="radio" class="mate-input" placeholder="">',
//        '<input id="departureFrom" type="text" class="field-with-floating-label k-input" placeholder="">',
//        '<input id="arrivalTo" type="text" class="field-with-floating-label k-input" placeholder="">',
//        '<input id="main-search__dateStart" type="text" class="kendoDatePicker field-with-floating-label" placeholder="">',
//        '<input id="main-search__timeStart" type="text" class="kendoTimePicker field-with-floating-label" placeholder="">',
//        '<input id="dirChck" type="checkbox" class="mate-input" placeholder="">',
//        '<input id="direct-connection" type="radio" class="mate-input" placeholder="">',
//        '<input id="indirect-connection" type="radio" class="mate-input" placeholder="">',
//        //rozkladjazdypkp
//        '<input id="search-content" type="text" class="form-control search" placeholder="Szukaj w serwisie…">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="from-station" type="text" class="form-control form-control--switch station-autocomplete z1 ui-autocomplete-input" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="wcag-via" type="text" class="form-control form-control--switch station-autocomplete ui-autocomplete-input" placeholder="">',
//        '<input id="hour2" type="text" class="form-control md-1" placeholder="00:15">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="text" class="form-control form-control--switch station-autocomplete ui-autocomplete-input" placeholder="">',
//        '<input id="" type="text" class="form-control md-1" placeholder="00:15">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="to-station" type="text" class="form-control form-control--switch station-autocomplete z1 ui-autocomplete-input" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="hour0" type="text" class="day-hour form-control" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="hour" type="text" class="day-hour form-control" placeholder="">',
//        '<input id="odj" type="radio" class="" placeholder="">',
//        '<input id="prz" type="radio" class="" placeholder="">',
//        '<input id="directCheckbox" type="checkbox" class="checkbox directConnectionsOnlyCheckbox" placeholder="">',
//        '<input id="globalBike" type="checkbox" class="checkbox" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="disabledTravellersCheckbox" type="checkbox" class="checkbox" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="kidsCheckbox" type="checkbox" class="checkbox" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="product_0_0" type="checkbox" class="multicheck" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="product_0_1" type="checkbox" class="multicheck" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="product_0_2" type="checkbox" class="multicheck" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="product_0_3" type="checkbox" class="multicheck" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
//        '<input id="subOp" type="checkbox" class="" placeholder="">',
//        '<input id="withoutReservationServiceCheckbox" type="checkbox" class="checkbox" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="skipLongChg" type="checkbox" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="allProvidersCheckbox" type="checkbox" class="" placeholder="">',
//        '<input id="P1" type="checkbox" class="" placeholder="">',
//        '<input id="P1FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P5" type="checkbox" class="" placeholder="">',
//        '<input id="P5FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P2" type="checkbox" class="" placeholder="">',
//        '<input id="P2FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P7" type="checkbox" class="" placeholder="">',
//        '<input id="P7FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P3" type="checkbox" class="" placeholder="">',
//        '<input id="P3FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P4" type="checkbox" class="" placeholder="">',
//        '<input id="P4FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P0" type="checkbox" class="" placeholder="">',
//        '<input id="P0FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P9" type="checkbox" class="" placeholder="">',
//        '<input id="P9FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P8" type="checkbox" class="" placeholder="">',
//        '<input id="P8FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="P6" type="checkbox" class="" placeholder="">',
//        '<input id="P6FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="O1" type="checkbox" class="" placeholder="">',
//        '<input id="O1FinalValue" type="hidden" class="" placeholder="">',
//        '<input id="PZ" type="checkbox" class="" placeholder="">',
//        '<input id="PZFinalValue" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        //intercity
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="stname-0" type="search" class="jsStationTypeaheadItem jsNearestStationItem form-control" placeholder="np. Poznań Gł.">',
//        '<input id="stid-0" type="hidden" class="jsTypeaheadItem-Value" placeholder="">',
//        '<input id="vianame-0" type="search" class="jsStationTypeaheadItem  form-control" placeholder="np. Szczecin Gł.">',
//        '<input id="" type="hidden" class="jsTypeaheadItem-Value" placeholder="">',
//        '<input id="stname-1" type="search" class="jsStationTypeaheadItem  form-control" placeholder="np. Szczecin Gł.">',
//        '<input id="stid-1" type="hidden" class="jsTypeaheadItem-Value" placeholder="">',
//        '<input id="inlineRadio1" type="radio" class="form-check-input" placeholder="">',
//        '<input id="inlineRadio2" type="radio" class="form-check-input" placeholder="">',
//        '<input id="date_picker" type="text" class="form-control datepicker-input" placeholder="RRRR-MM-DD">',
//        '<input id="ic-seek-time" type="text" class="jsTimepickerItem form-control clock-icon ui-timepicker-input" placeholder="">',
//        '<input id="inlineCheckbox1" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="inlineCheckbox2" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="inlineCheckbox3" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="inlineCheckbox4" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="inlineCheckbox5" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="ic-seek-direct" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="ic-seek-bike" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="ic-seek-couchette" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="ic-seek-sleeper" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="ic-seek-for_disabled" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="ic-seek-braille" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="ic-seek-unsharp" type="checkbox" class="form-check-input" placeholder="">',
//        '<input id="" type="hidden" class="jsVariable-HafasPage" placeholder="">',
//        '<input id="" type="hidden" class="jsVariable-HafasSort" placeholder="">',
//        '<input id="" type="hidden" class="jsVariable-HafasSort" placeholder="">',
//        //kolejeslaskie
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="search" class="search-field" placeholder="">',
//        '<input id="" type="submit" class="search-submit" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="fromCityId_1702023216921" type="hidden" class="" placeholder="">',
//        '<input id="toCityId_1702023216921" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        '<input id="" type="radio" class="fldRadio" placeholder="">',
//        '<input id="" type="radio" class="fldRadio" placeholder="">',
//        '<input id="fromText_1702023216921" type="text" class="fldText ac_input" placeholder="Wpisz stację, miasto">',
//        '<input id="toText_1702023216921" type="text" class="fldText ac_input" placeholder="Wpisz stację, miasto">',
//        '<input id="dateV_1702023216921" type="text" class="fldText" placeholder="">',
//        '<input id="ommitDate_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
//        '<input id="timeV_1702023216921" type="text" class="fldText" placeholder="">',
//        '<input id="" type="radio" class="fldRadio" placeholder="">',
//        '<input id="" type="radio" class="fldRadio" placeholder="">',
//        '<input id="ommitTime_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
//        '<input id="returnDateV_1702023216921" type="text" class="fldText" placeholder="">',
//        '<input id="ommitReturnDate_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
//        '<input id="returnTimeV_1702023216921" type="text" class="fldText" placeholder="">',
//        '<input id="" type="radio" class="fldRadio" placeholder="">',
//        '<input id="" type="radio" class="fldRadio" placeholder="">',
//        '<input id="ommitReturnTime_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
//        '<input id="" type="checkbox" class="fldCheckbox fldPreferDirects" placeholder="">',
//        '<input id="" type="checkbox" class="fldCheckbox fldPreferSellable" placeholder="">',
//        '<input id="" type="radio" class="radio" placeholder="">',
//        '<input id="" type="radio" class="radio" placeholder="">',
//        '<input id="" type="radio" class="radio" placeholder="">',
//        '<input id="" type="radio" class="radio" placeholder="">',
//        '<input id="" type="radio" class="radio" placeholder="">',
//        '<input id="" type="radio" class="radio" placeholder="">',
//        '<input id="" type="hidden" class="" placeholder="">',
//        //kolejemazowieckie
//        '<input id="search" type="text" class="form-search form-control" placeholder="">',
//        '<input id="station-from" type="text" class="stations form-control ui-autocomplete-input" placeholder="Stacja początkowa">',
//        '<input id="station-from-id" type="hidden" class="" placeholder="">',
//        '<input id="station-to" type="text" class="stations form-control ui-autocomplete-input" placeholder="Stacja końcowa">',
//        '<input id="station-to-id" type="hidden" class="" placeholder="">',
//        '<input id="date" type="text" class="form-control" placeholder="Data odjazdu">',
//        '<input id="hour" type="text" class="form-control" placeholder="Godzina odjazdu">',
//        //kolejepomorskie
//        '<input id="" type="text" class="start_station" placeholder="Z">',
//        '<input id="" type="text" class="end_station" placeholder="DO">',
//        '<input id="" type="text" class="date" placeholder="KIEDY">',
//        '<input id="" type="submit" class="submit" placeholder="">',
//        //koleo.pl
//        '<input id="query_start_station" type="text" class="ember-view ember-text-field string optional stations-autocomplete has-right-icon" placeholder="Z">',
//        '<input id="query_end_station" type="text" class="ember-view ember-text-field string optional stations-autocomplete has-right-icon-medium-down" placeholder="DO">',
//        '<input id="query_date" type="text" class="ember-view ember-text-field string optional" placeholder="KIEDY">',
//         //omio.com
//         '<input id="" type="text" class="_82da8 _df5b8 _b355f" placeholder="Z: Miejscowość, dworzec, lotnisko lub port">',
//         '<input id="" type="text" class="_82da8 _df5b8" placeholder="Do: Miejscowość, dworzec, lotnisko lub port">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="hidden" class="" placeholder="">',
//         '<input id="" type="checkbox" class="react-toggle-screenreader-only" placeholder="">',
//         //polregio
//         '<input id="menu-search" type="text" class="form-control" placeholder="Wpisz szukaną frazę">',
//         '<input id="" type="text" class="start_station" placeholder="Stacja Odjazdu">',
//         '<input id="" type="text" class="end_station" placeholder="Stacja Przyjazdu">',
//         '<input id="" type="text" class="date" placeholder="KIEDY">',
//         '<input id="" type="submit" class="submit" placeholder="">',
//         '<input id="fromLocation" type="text" class="" placeholder="Wyjazd z">',
//         '<input id="toLocation" type="text" class="" placeholder="Przyjazd do">',
//         '<input id="departuredate" type="text" class="form-control js-datepicker" placeholder="">',
//         '<input id="departuretime" type="text" class="form-control js-timepicker" placeholder="">',
//         '<input id="arrivedepart" type="checkbox" class="" placeholder="">',
//         '<input id="autocompletetype" type="checkbox" class="" placeholder="">',
//         '<input id="showhidestations" type="checkbox" class="" placeholder="">'
// ]

const inputs = [
    //portalpasazera
    '<input id="tw-odjazd" type="radio" class="mate-input" placeholder="">',
    '<input id="tw-przyjazd" type="radio" class="mate-input" placeholder="">',
    '<input id="departureFrom" type="text" class="field-with-floating-label k-input" placeholder="">',
    '<input id="arrivalTo" type="text" class="field-with-floating-label k-input" placeholder="">',
    '<input id="main-search__dateStart" type="text" class="kendoDatePicker field-with-floating-label" placeholder="">',
    '<input id="main-search__timeStart" type="text" class="kendoTimePicker field-with-floating-label" placeholder="">',
    '<input id="dirChck" type="checkbox" class="mate-input" placeholder="">',
    '<input id="direct-connection" type="radio" class="mate-input" placeholder="">',
    '<input id="indirect-connection" type="radio" class="mate-input" placeholder="">',
    '<input id="recaptchaResponse" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="ft-odjazd" type="radio" class="mate-input abt-n-db" placeholder="">',
    '<input id="ft-przyjazd" type="radio" class="mate-input abt-n-db" placeholder="">',
    '<input id="ft-station" type="text" class="field-with-floating-label k-input" placeholder="">',
    '<input id="ft-timeStart" type="text" class="kendoTimePicker field-with-floating-label" placeholder="">',
    '<input id="ftn-number" type="text" class="field-with-floating-label k-input" placeholder="">',
    '<input id="searchStationMobile" type="text" class="field-with-floating-label" placeholder="">',
    '<input id="searchStationMobileAgl" type="text" class="field-with-floating-label" placeholder="">',
    '<input id="searchNumberMobile" type="text" class="field-with-floating-label" placeholder="">',
    '<input id="ksAG" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="ksLO" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="ksDA" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="ksSZ" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="" type="checkbox" class="mate-input options-select-all abt-n-db" placeholder="">',
    '<input id="khPRM" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="khIC_TLK" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="khOSP" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="khEX" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="khPSP" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="khOS" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="" type="checkbox" class="mate-input options-select-all abt-n-db" placeholder="">',
    '<input id="uK1" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uKL" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uBP" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uPR" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uMS" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uOB" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uNP" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uST" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uWF" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uDB" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uPK" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uML" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uUN" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uUD" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="uRM" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="" type="checkbox" class="mate-input options-select-all abt-n-db" placeholder="">',
    '<input id="pAR" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pKMŁ" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pKS" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pLEO" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pŁKA" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pCARGO" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pSKMT" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pRJ" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pSKM" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pKD" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pKM" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pKW" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pLeo Express" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pODEG" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pIC" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pPR" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="pSKPL" type="checkbox" class="mate-input abt-n-db" placeholder="">',
    '<input id="" type="checkbox" class="mate-input options-select-all abt-n-db" placeholder="">',
    '<input id="" type="checkbox" class="cmcheck float-right mr-5 mt-2" placeholder="">',
    '<input id="operationalCheck" type="checkbox" class="cmcheck float-right mr-5 mt-2" placeholder="">',
    '<input id="statisticsCheck" type="checkbox" class="cmcheck float-right mr-5 mt-2" placeholder="">',
    //rozkladjazdypkp
    '<input id="search-content" type="text" class="form-control search" placeholder="Szukaj w serwisie…">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="from-station" type="text" class="form-control form-control--switch station-autocomplete z1 ui-autocomplete-input" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="wcag-via" type="text" class="form-control form-control--switch station-autocomplete ui-autocomplete-input" placeholder="">',
    '<input id="hour2" type="text" class="form-control md-1" placeholder="00:15">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="text" class="form-control form-control--switch station-autocomplete ui-autocomplete-input" placeholder="">',
    '<input id="" type="text" class="form-control md-1" placeholder="00:15">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="to-station" type="text" class="form-control form-control--switch station-autocomplete z1 ui-autocomplete-input" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="hour0" type="text" class="day-hour form-control" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="hour" type="text" class="day-hour form-control" placeholder="">',
    '<input id="odj" type="radio" class="" placeholder="">',
    '<input id="prz" type="radio" class="" placeholder="">',
    '<input id="directCheckbox" type="checkbox" class="checkbox directConnectionsOnlyCheckbox" placeholder="">',
    '<input id="globalBike" type="checkbox" class="checkbox" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="disabledTravellersCheckbox" type="checkbox" class="checkbox" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="kidsCheckbox" type="checkbox" class="checkbox" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="product_0_0" type="checkbox" class="multicheck" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="product_0_1" type="checkbox" class="multicheck" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="product_0_2" type="checkbox" class="multicheck" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="product_0_3" type="checkbox" class="multicheck" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="" type="hidden" class="multicheck-suboption" placeholder="">',
    '<input id="subOp" type="checkbox" class="" placeholder="">',
    '<input id="withoutReservationServiceCheckbox" type="checkbox" class="checkbox" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="skipLongChg" type="checkbox" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="allProvidersCheckbox" type="checkbox" class="" placeholder="">',
    '<input id="P1" type="checkbox" class="" placeholder="">',
    '<input id="P1FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P5" type="checkbox" class="" placeholder="">',
    '<input id="P5FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P2" type="checkbox" class="" placeholder="">',
    '<input id="P2FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P7" type="checkbox" class="" placeholder="">',
    '<input id="P7FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P3" type="checkbox" class="" placeholder="">',
    '<input id="P3FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P4" type="checkbox" class="" placeholder="">',
    '<input id="P4FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P0" type="checkbox" class="" placeholder="">',
    '<input id="P0FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P9" type="checkbox" class="" placeholder="">',
    '<input id="P9FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P8" type="checkbox" class="" placeholder="">',
    '<input id="P8FinalValue" type="hidden" class="" placeholder="">',
    '<input id="P6" type="checkbox" class="" placeholder="">',
    '<input id="P6FinalValue" type="hidden" class="" placeholder="">',
    '<input id="O1" type="checkbox" class="" placeholder="">',
    '<input id="O1FinalValue" type="hidden" class="" placeholder="">',
    '<input id="PZ" type="checkbox" class="" placeholder="">',
    '<input id="PZFinalValue" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    //intercity
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="stname-0" type="search" class="jsStationTypeaheadItem jsNearestStationItem form-control" placeholder="np. Poznań Gł.">',
    '<input id="stid-0" type="hidden" class="jsTypeaheadItem-Value" placeholder="">',
    '<input id="vianame-0" type="search" class="jsStationTypeaheadItem  form-control" placeholder="np. Szczecin Gł.">',
    '<input id="" type="hidden" class="jsTypeaheadItem-Value" placeholder="">',
    '<input id="stname-1" type="search" class="jsStationTypeaheadItem  form-control" placeholder="np. Szczecin Gł.">',
    '<input id="stid-1" type="hidden" class="jsTypeaheadItem-Value" placeholder="">',
    '<input id="inlineRadio1" type="radio" class="form-check-input" placeholder="">',
    '<input id="inlineRadio2" type="radio" class="form-check-input" placeholder="">',
    '<input id="date_picker" type="text" class="form-control datepicker-input" placeholder="RRRR-MM-DD">',
    '<input id="ic-seek-time" type="text" class="jsTimepickerItem form-control clock-icon ui-timepicker-input" placeholder="">',
    '<input id="inlineCheckbox1" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="inlineCheckbox2" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="inlineCheckbox3" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="inlineCheckbox4" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="inlineCheckbox5" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="ic-seek-direct" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="ic-seek-bike" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="ic-seek-couchette" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="ic-seek-sleeper" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="ic-seek-for_disabled" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="ic-seek-braille" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="ic-seek-unsharp" type="checkbox" class="form-check-input" placeholder="">',
    '<input id="" type="hidden" class="jsVariable-HafasPage" placeholder="">',
    '<input id="" type="hidden" class="jsVariable-HafasSort" placeholder="">',
    '<input id="" type="hidden" class="jsVariable-HafasSort" placeholder="">',
    //kolejeslaskie
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="search" class="search-field" placeholder="">',
    '<input id="" type="submit" class="search-submit" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="fromCityId_1702023216921" type="hidden" class="" placeholder="">',
    '<input id="toCityId_1702023216921" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    '<input id="" type="radio" class="fldRadio" placeholder="">',
    '<input id="" type="radio" class="fldRadio" placeholder="">',
    '<input id="fromText_1702023216921" type="text" class="fldText ac_input" placeholder="Wpisz stację, miasto">',
    '<input id="toText_1702023216921" type="text" class="fldText ac_input" placeholder="Wpisz stację, miasto">',
    '<input id="dateV_1702023216921" type="text" class="fldText" placeholder="">',
    '<input id="ommitDate_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
    '<input id="timeV_1702023216921" type="text" class="fldText" placeholder="">',
    '<input id="" type="radio" class="fldRadio" placeholder="">',
    '<input id="" type="radio" class="fldRadio" placeholder="">',
    '<input id="ommitTime_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
    '<input id="returnDateV_1702023216921" type="text" class="fldText" placeholder="">',
    '<input id="ommitReturnDate_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
    '<input id="returnTimeV_1702023216921" type="text" class="fldText" placeholder="">',
    '<input id="" type="radio" class="fldRadio" placeholder="">',
    '<input id="" type="radio" class="fldRadio" placeholder="">',
    '<input id="ommitReturnTime_1702023216921" type="checkbox" class="fldCheckbox" placeholder="">',
    '<input id="" type="checkbox" class="fldCheckbox fldPreferDirects" placeholder="">',
    '<input id="" type="checkbox" class="fldCheckbox fldPreferSellable" placeholder="">',
    '<input id="" type="radio" class="radio" placeholder="">',
    '<input id="" type="radio" class="radio" placeholder="">',
    '<input id="" type="radio" class="radio" placeholder="">',
    '<input id="" type="radio" class="radio" placeholder="">',
    '<input id="" type="radio" class="radio" placeholder="">',
    '<input id="" type="radio" class="radio" placeholder="">',
    '<input id="" type="hidden" class="" placeholder="">',
    //kolejemazowieckie
    '<input id="search" type="text" class="form-search form-control" placeholder="">',
    '<input id="station-from" type="text" class="stations form-control ui-autocomplete-input" placeholder="Stacja początkowa">',
    '<input id="station-from-id" type="hidden" class="" placeholder="">',
    '<input id="station-to" type="text" class="stations form-control ui-autocomplete-input" placeholder="Stacja końcowa">',
    '<input id="station-to-id" type="hidden" class="" placeholder="">',
    '<input id="date" type="text" class="form-control" placeholder="Data odjazdu">',
    '<input id="hour" type="text" class="form-control" placeholder="Godzina odjazdu">',
    //kolejepomorskie
    '<input id="" type="text" class="start_station" placeholder="Z">',
    '<input id="" type="text" class="end_station" placeholder="DO">',
    '<input id="" type="text" class="date" placeholder="KIEDY">',
    '<input id="" type="submit" class="submit" placeholder="">',
    //koleo.pl
    '<input id="query_start_station" type="text" class="ember-view ember-text-field string optional stations-autocomplete has-right-icon" placeholder="Z">',
    '<input id="query_end_station" type="text" class="ember-view ember-text-field string optional stations-autocomplete has-right-icon-medium-down" placeholder="DO">',
    '<input id="query_date" type="text" class="ember-view ember-text-field string optional" placeholder="KIEDY">',
     //omio.com
     '<input id="" type="text" class="_82da8 _df5b8 _b355f" placeholder="Z: Miejscowość, dworzec, lotnisko lub port">',
     '<input id="" type="text" class="_82da8 _df5b8" placeholder="Do: Miejscowość, dworzec, lotnisko lub port">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="hidden" class="" placeholder="">',
     '<input id="" type="checkbox" class="react-toggle-screenreader-only" placeholder="">',
     //polregio
     '<input id="menu-search" type="text" class="form-control" placeholder="Wpisz szukaną frazę">',
     '<input id="" type="text" class="start_station" placeholder="Stacja Odjazdu">',
     '<input id="" type="text" class="end_station" placeholder="Stacja Przyjazdu">',
     '<input id="" type="text" class="date" placeholder="KIEDY">',
     '<input id="" type="submit" class="submit" placeholder="">',
     '<input id="fromLocation" type="text" class="" placeholder="Wyjazd z">',
     '<input id="toLocation" type="text" class="" placeholder="Przyjazd do">',
     '<input id="departuredate" type="text" class="form-control js-datepicker" placeholder="">',
     '<input id="departuretime" type="text" class="form-control js-timepicker" placeholder="">',
     '<input id="arrivedepart" type="checkbox" class="" placeholder="">',
     '<input id="autocompletetype" type="checkbox" class="" placeholder="">',
     '<input id="showhidestations" type="checkbox" class="" placeholder="">'
]


function convertStringToAscii(inputs, fixedLength = 175){
    return inputs.map(inputString => {
        let asciiArray = [];
        for (let i = 0; i < fixedLength; i++) {
            if(i < inputString.length){
                asciiArray.push((inputString.charCodeAt(i)));
            } else {
                asciiArray.push(0);
            }
        }
        return asciiArray;
    });
}

const bad = ['<input id="departureFrom" type="text" class="field-with-floating-label k-input">'];
const badConverted = convertStringToAscii(bad);
console.log(badConverted);

const inputsAsciiRepresentation = convertStringToAscii(inputs);

console.log(inputsAsciiRepresentation);

const X = tf.tensor2d(inputsAsciiRepresentation, [256, 175]);

const Y = tf.tensor2d([
    //portal pasazera
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    //rozkladjazdypkp
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
    //intercity
    0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    //kolejeslaskie
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    //kolejemazowieckie
    0, 1, 0, 1, 0, 0, 0,
    //kolejepomorskie
    1, 1, 0, 0,
    //koleo.pl
    1, 1, 0,
    //omio.com
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    //polregio
    0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0
], [256, 1]);

// const Y = tf.tensor2d([
//     //portal pasazera
//     0, 0, 1, 1, 0, 0, 0, 0, 0,
//     //rozkladjazdypkp
//     0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
//     0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0,
//     //intercity
//     0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0,
//     //kolejeslaskie
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//     //kolejemazowieckie
//     0, 1, 0, 1, 0, 0, 0,
//     //kolejepomorskie
//     1, 1, 0, 0,
//     //koleo.pl
//     1, 1, 0,
//     //omio.com
//     1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0,
//     //polregio
//     0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
//     0, 0
// ], [256, 1]);

const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [175]}));

model.compile({loss: 'meanSquaredError', optimizer: 'adam'});

tfvis.visor().open();

async function trainModel() {
    const surface = {name: 'Loss', tab: 'Training'};
    const history = [];

    await model.fit(X, Y,{
        epochs:  1000,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoka ${epoch + 1}: strata = ${logs.loss}`);
                history.push(logs);
                tfvis.show.history(surface, history, ['loss']);
            }
        }});
    console.log("koniec treningu");

    model.predict(tf.tensor2d(badConverted, [1, 175])).print();
}

trainModel();



// const tab = inputs.map((input) => {
//     let idPass, typePass, classPass;
//     idPass = checkId(extractId(input)) ? 1 : 0;
//     typePass = checkType(extractType(input)) ? 1 : 0;
//     classPass = checkClass(extractClass(input)) ? 1 : 0;
//     return [idPass, typePass, classPass];
// });

// console.log(tab);

// function extractId(inputTag) {
//     const idMatch = inputTag.match(/id="([^"]+)"/);
//     return idMatch ? idMatch[1] : '';
// }

// function extractType(inputTag) {
//     const typeMatch = inputTag.match(/type="([^"]+)"/);
//     return typeMatch ? typeMatch[1] : '';
// }

// function extractClass(inputTag) {
//     const classMatch = inputTag.match(/class="([^"]+)"/);
//     return classMatch ? classMatch[1] : '';
// }

// function checkId(id){
//     return (id.includes('from') || id.includes('station')|| id.includes('train')|| id.includes('departure') || id.includes('arrival')) ? true : false;
// }

// function checkType(type){
//     return (type === 'text' || type === 'search') ? true : false;
// }

// function checkClass(className){
//     return false;
// }