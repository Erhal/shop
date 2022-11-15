const getNormalizedPhone = (value: string) => {
    value = value.replace(/\D/g, '');

    if(value.length > 12) value = value.slice(0, 12)
    if(value.length === 12) value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5, 8)}-${value.slice(8, 10)}-${value.slice(10, 12)}`;
    if(value.length === 11) value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5, 8)}-${value.slice(8, 10)}-${value.slice(10)}`;
    if(value.length === 10) value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5, 8)}-${value.slice(8, 10)}`;
    if(value.length === 9) value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5, 8)}-${value.slice(8)}`;
    if(value.length === 8) value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5, 8)}`;
    if(value.length === 7) value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5)}`;
    if(value.length === 6) value = `+${value.slice(0, 3)} (${value.slice(3, 5)}) ${value.slice(5)}`;
    if(value.length === 5) value = `+${value.slice(0, 3)} ${value.slice(3, 5)}`;
    if(value.length === 4) value = `+${value.slice(0, 3)} ${value.slice(3)}`;
    if(value.slice(0, 4) !== '+380') value = `+380`;

    return value;
}

export default getNormalizedPhone;