
    var customIcon = document.createElement('img');
    customIcon.src = './icon.svg';
    var customIconMulti = new SelectPure(".multi-select-custom", {
      options: [
        {
          label: "O Chang Kee",
          value: "O Chang Kee",
        },
        {
          label: "K-Cuts",
          value: "K-Cuts",
        },
        {
          label: "Noel Gifts International",
          value: "Noel Gifts International",
        },
        {
          label: "Mr Bean",
          value: "Mr Bean",
        },
        {
          label: "Heavenly Wang Cafe",
          value: "Heavenly Wang Cafe",
        },
      ],
      value: [],
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
