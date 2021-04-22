var customIcon = document.createElement('img');
customIcon.src = './icon.svg';
//var fb=document.getElementById("fb").value;
var customIconMulti = new SelectPure(".allmulti-select-custom", {
  options: [
    {
      label: "CGH branch- Kopitiam",
      value: "CGH branch- Kopitiam",
      disabled: false
      //disabled:true
    },

    {
      label: "CGH branch- 1983",
      value: "CGH branch- 1983"
    },

    {
      label: "CGH branch- Subway",
      value: "CGH branch- Subway"
    },
    {
      label: "CGH branch- 7-Eleven",
      value: "CGH branch- 7-Eleven"
    },
    {
      label: "CGH branch- Starbucks",
      value: "CGH branch- Starbucks"
    },
    {
      label: "CGH branch- UmiSushi",
      value: "CGH branch- UmiSushi"
    },
    {
      label: "CGH branch- Mr Bean",
      value: "CGH branch- Mr Bean"
    },
    {
      label: "CGH branch- Gong Cha",
      value: "CGH branch- Gong Cha"
    },
    {
      label: "CGH branch- Foodfare",
      value: "CGH branch- Foodfare"
    },
    {
      label: "CGH branch- 168 Florist",
      value: "CGH branch- 168 Florist"
    },
    {
      label: "KKH branch- Mr Bean",
      value: "KKH branch- Mr Bean"
    },
    {
      label: "KKH branch- Delifrance",
      value: "KKH branch- Delifrance"
    },
    {
      label: "KKH branch- Orchird Thai",
      value: "KKH branch- Orchird Thai"
    },
    {
      label: "KKH branch- FairPrice Xpress",
      value: "KKH branch- FairPrice Xpress"
    },
    {
      label: "KKH branch- Triplets",
      value: "KKH branch- Triplets"
    },
    {
      label: "KKH branch- Kopitiam",
      value: "KKH branch- Kopitiam"
    },
    {
      label: "KKH branch- Ma Mum",
      value: "KKH branch- Ma Mum"
    },
    {
      label: "KKH branch- Heavenly Wang",
      value: "KKH branch- Heavenly Wang"
    },
    {
      label: "KKH Branch- Polar",
      value: "KKH Branch- Polar"
    },
    {
      label: "KKH branch- Coffee Bean",
      value: "KKH branch- Coffee Bean"
    },
    {
      label: "KKH branch- Eu Yan Sang",
      value: "KKH branch- Eu Yan Sang"
    },
    {
      label: "KKH branch- Huaxia Taimaobi Centre",
      value: "KKH branch- Huaxia Taimaobi Centre"
    },
    {
      label: "KKH branch- Mothercare",
      value: "KKH branch- Mothercare"
    },
    {
      label: "KKH branch- The Choice Gift House",
      value: "KKH branch- The Choice Gift House"
    },
    {
      label: "KKH branch- B&G LifeCasting",
      value: "KKH branch- B&G LifeCasting"
    },
    {
      label: "KKH branch- Junior Page",
      value: "KKH branch- Junior Page"
    },
    {
      label: "KKH branch- Noel Gifts",
      value: "KKH branch- Noel Gifts"
    },
    {
      label: "KKH branch- Spextacular Optics",
      value: "KKH branch- Spextacular Optics"
    },

    {
      label: "SGH branch- Kaki Makan",
      value: "SGH branch- Kaki Makan"
    },
    {
      label: "SGH branch- Coffee Bean",
      value: "SGH branch- Coffee Bean"
    },
    {
      label: "SGH branch- Triplets",
      value: "SGH branch- Triplets"
    },
    {
      label: "SGH branch- 7-Eleven",
      value: "SGH branch- 7-Eleven"
    },
    {
      label: "SGH branch- Kaffe & Toast",
      value: "SGH branch- Kaffe & Toast"
    },
    {
      label: "SGH branch- Kopitiam",
      value: "SGH branch- Kopitiam"
    },
    {
      label: "SGH branch- Polar",
      value: "SGH branch- Polar"
    },
    {
      label: "SGH branch- Orchird Thai",
      value: "SGH branch- Orchird Thai"
    },
    {
      label: "SGH Branch- Mr Bean",
      value: "SGH Branch- Mr Bean",
    },
    {
      label: "SGH branch- Lifeforce Limbs",
      value: "SGH branch- Lifeforce Limbs"
    },
    {
      label: "SGH branch- Noel",
      value: "SGH branch- Noel"
    },
    {
      label: "SGH branch- Lifeline",
      value: "SGH branch- Lifeline"
    },

    {
      label: "SKH branch- Koufu",
      value: "SKH branch- Koufu"
    },
    {
      label: "SKH branch- Mr Bean",
      value: "SKH branch- Mr Bean"
    },
    {
      label: "SKH branch- Kaffe & Toast",
      value: "SKH branch- Kaffe & Toast"
    },
    {
      label: "SKH branch- Polar",
      value: "SKH branch- Polar"
    },
    {
      label: "SKH branch- Coffee Club",
      value: "SKH branch- Coffee Club"
    },
    {
      label: "SKH branch-Heavenly Wang",
      value: "SKH branch-Heavenly Wang"
    },
    {
      label: "SKH branch- Aunty Rosie",
      value: "SKH branch- Aunty Rosie"
    },
    {
      label: "SKH branch- Jewel Coffee",
      value: "SKH branch- Jewel Coffee"
    },
    {
      label: "SKH branch- Cheers",
      value: "SKH branch- Cheers"
    },
    {
      label: "SKH branch- Noel Gifts",
      value: "SKH branch- Noel Gifts"
    },
    {
      label: "SKH branch- Kcuts",
      value: "SKH branch- Kcuts"
    },
    {
      label: "SKH branch- Anytime Fitness",
      value: "SKH branch- Anytime Fitness"
    },
    {
      label: "SKH branch- Kindermusk",
      value: "SKH branch- Kindermusk"
    },


    {
      label: "NCHS branch- Kopitiam",
      value: "NCHS branch- Kopitiam"
    },
    {
      label: "NCHS branch- Kaffe & Toast",
      value: "NCHS branch- Kaffe & Toast"
    },


    {
      label: "OCH branch- Starbucks",
      value: "OCH branch- Starbucks"
    },
    {
      label: "OCH branch- The Caffeine Experience",
      value: "OCH branch- The Caffeine Experience"
    },
    {
      label: "OCH branch- Fairprice Express",
      value: "OCH branch- Fairprice Express"
    },

    {
      label: "Academia branch- Coffee Club",
      value: "Academia branch- Coffee Club"
    }

  ],
  value: ["CGH branch- Kopitiam"],
  multiple: true,
  autocomplete: true,
  inlineIcon: customIcon,
  onChange: value => { console.log(value); },
  classNames: {
    select: "select-pure__select",
    dropdownShown: "select-pure__select--opened",
    multiselect: "select-pure__select--multiple",
    label: "select-pure__label",
    placeholder: "select-pure__placeholder",
    dropdown: "select-pure__options",
    option: "select-pure__option",
    autocompleteInput: "select-pure__autocomplete",
    selectedLabel: "select-pure__selected-label",
    selectedOption: "select-pure__option--selected",
    placeholderHidden: "select-pure__placeholder--hidden",
    optionHidden: "select-pure__option--hidden",
  }
});

var institutionsonly = new SelectPure(".multi-select-custom", {
  options: [
    {
      label: "CGH",
      value: "CGH"
    },
    {
      label: "KKH",
      value: "KKH"
    },
    {
      label: "SGH",
      value: "SGH"
    },
    {
      label: "SKH",
      value: "SKH"
    },
    {
      label: "NCCS",
      value: "NCCS"
    },
    {
      label: "NHCS",
      value: "NHCS"
    },
    {
      label: "BVH",
      value: "BVH"
    },
    {
      label: "OCH",
      value: "OCH"
    },
    {
      label: "Academia",
      value: "Academia"
    },
  ],
  value: ["SKH"],
  multiple: true,
  autocomplete: true,
  inlineIcon: customIcon,
  onChange: value => { console.log(value); },
  classNames: {
    select: "select-pure__select",
    dropdownShown: "select-pure__select--opened",
    multiselect: "select-pure__select--multiple",
    label: "select-pure__label",
    placeholder: "select-pure__placeholder",
    dropdown: "select-pure__options",
    option: "select-pure__option",
    autocompleteInput: "select-pure__autocomplete",
    selectedLabel: "select-pure__selected-label",
    selectedOption: "select-pure__option--selected",
    placeholderHidden: "select-pure__placeholder--hidden",
    optionHidden: "select-pure__option--hidden",
  }
});
