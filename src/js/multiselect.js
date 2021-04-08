
    var customIcon = document.createElement('img');
    customIcon.src = './icon.svg';
    var customIconMulti = new SelectPure(".multi-select-custom", {
      options: [
      {
        label:"CGH branch- Kopitiam",
        value:"CGH branch- Kopitiam"},

        {
          label:"1983",
          value:"1983"},

          {
            label:"Subway",
            value:"Subway"},
            {
              label:"7-Eleven",
              value:"7-Eleven"},
              {
                label:"Starbucks",
                value:"Starbucks"},
                {
                  label:"UmiSushi",
                  value:"UmiSushi"},
                  {
                    label:"CGH branch- Mr Bean",
                    value:"CGH branch- Mr Bean"},
                    {
                      label:"Gong Cha",
                      value:"Gong Cha"},
                    {
                      label:"Foodfare",
                      value:"Foodfare"},
                      {
                        label:"168 Florist",
                        value:"168 Florist"},
      {
        label:"KKH branch-Mr Bean",
        value:"KKH branch-Mr Bean"},
        {
          label:"Delifrance",
          value:"Delifrance"},
          {
            label:"KKH branch- Orchird Thai",
            value:"KKH branch- Orchird Thai"},
            {
              label:"FairPrice Xpress",
              value:"FairPrice Xpress"},
              {
                label:"KKH branch- Triplets",
                value:"KKH branch- Triplets"},
                {
                  label:"KKH branch- Kopitiam",
                  value:"KKH branch- Kopitiam"},
                  {
                    label:"Ma Mum",
                    value:"Ma Mum"},
                    {
                      label:"KKH branch- Heavenly Wang",
                      value:"KKH branch- Heavenly Wang"},
                      {
                        label:"KKH Branch- Polar",
                        value:"KKH Branch- Polar"},
                        {
                          label:"KKH branch- Coffee Bean",
                          value:"KKH branch- Coffee Bean"},
                          {
                            label:"Eu Yan Sang",
                            value:"Eu Yan Sang"},
                            {
                              label:"Huaxia Taimaobi Centre",
                              value:"Huaxia Taimaobi Centre"},
                              {
                                label:"Mothercare",
                                value:"Mothercare"},
                                {
                                  label:"The Choice Gigft House",
                                  value:"The Choice Gigft House"},
                                  {
                                    label:"B&G LifeCasting",
                                    value:"B&G LifeCasting"},
                                    {
                                      label:"Junior Page",
                                      value:"Junior Page"},
                                      {
                                        label:"KKH branch- Noel Gifts",
                                        value:"KKH branch- Noel Gifts"},
                                        {
                                          label:"Spextacular Optics",
                                          value:"Spextacular Optics"},

      {
        label:"Kaki Makan",
        value:"Kaki Makan"},
        {
          label:"SGH branch- Coffee Bean",
          value:"SGH branch- Coffee Bean"},
          {
            label:"SGH branch- Triplets",
            value:"SGH branch- Triplets"},
            {
              label:"7-Eleven",
              value:"7-Eleven"},
              {
                label:"SGH branch- Kaffe & Toast",
                value:"SGH branch- Kaffe & Toast"},
                {
                  label:"SGH branch- Kopitiam",
                  value:"SGH branch- Kopitiam"},
                  {
                    label:"SGH branch- Polar",
                    value:"SGH branch- Polar"},
                    {
                      label:"SGH branch- Orchird Thai",
                      value:"SGH branch- Orchird Thai"},
                      {
                        label:"SGH Branch- Mr Bean",
                        value:"SGH Branch- Mr Bean",},
                        {
                          label:"Lifeforce Limbs",
                          value:"Lifeforce Limbs"},
                          {
                            label:"Noel",
                            value:"Noel"},
                            {
                              label:"Lifeline",
                              value:"Lifeline"},

      {
      label:"Koufu",
      value:"Koufu"},
        {
          label:"SKH branch- Mr Bean",
          value:"SKH branch- Mr Bean"},
          {
            label:"SKH branch- Kaffe & Toast",
            value:"SKH branch- Kaffe & Toast"},
            {
              label:"SKH branch- Polar",
              value:"SKH branch- Polar"},
              {
                label:"Coffee Club",
                value:"Coffee Club"},
                {
                  label:"SKH branch-Heavenly Wang",
                  value:"SKH branch-Heavenly Wang"},
                  {
                    label:"Aunty Rosie",
                    value:"Aunty Rosie"},
                    {
                      label:"Jewel Coffee",
                      value:"Jewel Coffee"},
                      {
                        label:"Cheers",
                        value:"Cheers"},
                        {
                          label:"SKH branch- Noel Gifts",
                          value:"SKH branch- Noel Gifts"},
                          {
                            label:"Kcuts",
                            value:"Kcuts"},
                            {
                              label:"Anytime Fitness",
                              value:"Anytime Fitness"},
                              {
                                label:"Kindermusk",
                                value:"Kindermusk"},
    {
      label:"ALL",
      value:"ALL"},


        
      ],
      value: ["ALL"],
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
    var resetCustomMulti = function() {
      customIconMulti.reset();
    };


    function getSelected(){return customIconMulti.value();}
