var customIcon = document.createElement('img');
customIcon.src = './icon.svg';
//var fb=document.getElementById("fb").value;
var customIconMulti = new SelectPure(".allmulti-select-custom", {
  options: [
    {
      label: "CGH - Kopitiam",
      value: "CGH - Kopitiam",
    },

    {
      label: "CGH - 1983",
      value: "CGH - 1983"
    },

    {
      label: "CGH - Subway",
      value: "CGH - Subway"
    },
    {
      label: "CGH - 7-Eleven",
      value: "CGH - 7-Eleven"
    },
    {
      label: "CGH - Starbucks",
      value: "CGH - Starbucks"
    },
    {
      label: "CGH - UmiSushi",
      value: "CGH - UmiSushi"
    },
    {
      label: "CGH - Mr Bean",
      value: "CGH - Mr Bean"
    },
    {
      label: "CGH - Gong Cha",
      value: "CGH - Gong Cha"
    },
    {
      label: "CGH - Foodfare",
      value: "CGH - Foodfare"
    },
    {
      label: "CGH - 168 Florist",
      value: "CGH - 168 Florist"
    },
    {
      label: "KKH - Mr Bean",
      value: "KKH - Mr Bean"
    },
    {
      label: "KKH - Delifrance",
      value: "KKH - Delifrance"
    },
    {
      label: "KKH - Orchird Thai",
      value: "KKH - Orchird Thai"
    },
    {
      label: "KKH - FairPrice Xpress",
      value: "KKH - FairPrice Xpress"
    },
    {
      label: "KKH - Triplets",
      value: "KKH - Triplets"
    },
    {
      label: "KKH - Kopitiam",
      value: "KKH - Kopitiam"
    },
    {
      label: "KKH - Ma Mum",
      value: "KKH - Ma Mum"
    },
    {
      label: "KKH - Heavenly Wang",
      value: "KKH - Heavenly Wang"
    },
    {
      label: "KKH - Polar",
      value: "KKH - Polar"
    },
    {
      label: "KKH - Coffee Bean",
      value: "KKH - Coffee Bean"
    },
    {
      label: "KKH - Eu Yan Sang",
      value: "KKH - Eu Yan Sang"
    },
    {
      label: "KKH - Huaxia Taimaobi Centre",
      value: "KKH - Huaxia Taimaobi Centre"
    },
    {
      label: "KKH - Mothercare",
      value: "KKH - Mothercare"
    },
    {
      label: "KKH - The Choice Gift House",
      value: "KKH - The Choice Gift House"
    },
    {
      label: "KKH - B&G LifeCasting",
      value: "KKH - B&G LifeCasting"
    },
    {
      label: "KKH - Junior Page",
      value: "KKH - Junior Page"
    },
    {
      label: "KKH - Noel Gifts",
      value: "KKH - Noel Gifts"
    },
    {
      label: "KKH - Spextacular Optics",
      value: "KKH - Spextacular Optics"
    },

    {
      label: "SGH - Kaki Makan",
      value: "SGH - Kaki Makan"
    },
    {
      label: "SGH - Coffee Bean",
      value: "SGH - Coffee Bean"
    },
    {
      label: "SGH - Triplets",
      value: "SGH - Triplets"
    },
    {
      label: "SGH - 7-Eleven",
      value: "SGH - 7-Eleven"
    },
    {
      label: "SGH - Kaffe & Toast",
      value: "SGH - Kaffe & Toast"
    },
    {
      label: "SGH - Kopitiam",
      value: "SGH - Kopitiam"
    },
    {
      label: "SGH - Polar",
      value: "SGH - Polar"
    },
    {
      label: "SGH - Orchird Thai",
      value: "SGH - Orchird Thai"
    },
    {
      label: "SGH - Mr Bean",
      value: "SGH - Mr Bean",
    },
    {
      label: "SGH - Lifeforce Limbs",
      value: "SGH - Lifeforce Limbs"
    },
    {
      label: "SGH - Noel",
      value: "SGH - Noel"
    },
    {
      label: "SGH - Lifeline",
      value: "SGH - Lifeline"
    },

    {
      label: "SKH - Koufu",
      value: "SKH - Koufu"
    },
    {
      label: "SKH - Mr Bean",
      value: "SKH - Mr Bean"
    },
    {
      label: "SKH - Kaffe & Toast",
      value: "SKH - Kaffe & Toast"
    },
    {
      label: "SKH - Polar",
      value: "SKH - Polar"
    },
    {
      label: "SKH - Coffee Club",
      value: "SKH - Coffee Club"
    },
    {
      label: "SKH -Heavenly Wang",
      value: "SKH -Heavenly Wang"
    },
    {
      label: "SKH - Aunty Rosie",
      value: "SKH - Aunty Rosie"
    },
    {
      label: "SKH - Jewel Coffee",
      value: "SKH - Jewel Coffee"
    },
    {
      label: "SKH - Cheers",
      value: "SKH - Cheers"
    },
    {
      label: "SKH - Noel Gifts",
      value: "SKH - Noel Gifts"
    },
    {
      label: "SKH - Kcuts",
      value: "SKH - Kcuts"
    },
    {
      label: "SKH - Anytime Fitness",
      value: "SKH - Anytime Fitness"
    },
    {
      label: "SKH - Kindermusk",
      value: "SKH - Kindermusk"
    },


    {
      label: "NCHS - Kopitiam",
      value: "NCHS - Kopitiam"
    },
    {
      label: "NCHS - Kaffe & Toast",
      value: "NCHS - Kaffe & Toast"
    },


    {
      label: "OCH - Starbucks",
      value: "OCH - Starbucks"
    },
    {
      label: "OCH - The Caffeine Experience",
      value: "OCH - The Caffeine Experience"
    },
    {
      label: "OCH - Fairprice Express",
      value: "OCH - Fairprice Express"
    },

    {
      label: "Academia - Coffee Club",
      value: "Academia - Coffee Club"
    }

  ],
  value: ["CGH - Kopitiam"],
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
